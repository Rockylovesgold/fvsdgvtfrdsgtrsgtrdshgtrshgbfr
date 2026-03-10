import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { assertSecureSecret, hashToken } from "../../common/security";
import { PrismaService } from "../prisma/prisma.service";
import {
  LoginDto,
  PasswordResetConfirmDto,
  PasswordResetRequestDto,
  RegisterDto
} from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService
  ) {}

  async register(dto: RegisterDto) {
    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        fullName: dto.fullName,
        passwordHash,
        role: "CUSTOMER"
      }
    });
    return this.issueTokens(user.id, user.email, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user?.passwordHash) throw new UnauthorizedException("Invalid credentials");
    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException("Invalid credentials");
    return this.issueTokens(user.id, user.email, user.role);
  }

  refreshToken(refreshToken: string) {
    const payload = this.jwt.verify(refreshToken, {
      secret: this.getRequiredSecret("JWT_REFRESH_SECRET")
    }) as { sub: string; email: string; role: string };
    return this.issueTokens(payload.sub, payload.email, payload.role);
  }

  async requestPasswordReset(dto: PasswordResetRequestDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) return { accepted: true };
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    const rawToken = randomBytes(32).toString("hex");
    const hashedToken = hashToken(rawToken);
    await this.prisma.passwordResetToken.updateMany({
      where: { userId: user.id, usedAt: null },
      data: { usedAt: new Date() }
    });
    await this.prisma.passwordResetToken.create({
      data: { userId: user.id, expiresAt, token: hashedToken }
    });
    // In production this token should be delivered out-of-band (email/SMS), never in API output.
    if (this.config.get<string>("NODE_ENV") === "development") {
      return { accepted: true, devResetToken: rawToken };
    }
    return { accepted: true };
  }

  async confirmPasswordReset(dto: PasswordResetConfirmDto) {
    const hashedToken = hashToken(dto.token);
    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { token: hashedToken }
    });
    if (!resetToken || resetToken.usedAt || resetToken.expiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException("Invalid token");
    }
    const passwordHash = await bcrypt.hash(dto.newPassword, 12);
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: resetToken.userId },
        data: { passwordHash }
      }),
      this.prisma.passwordResetToken.updateMany({
        where: { userId: resetToken.userId, usedAt: null },
        data: { usedAt: new Date() }
      })
    ]);
    return { reset: true };
  }

  private issueTokens(userId: string, email: string, role: string) {
    const accessToken = this.jwt.sign(
      { sub: userId, email, role: role.toLowerCase() },
      {
        expiresIn: "15m",
        secret: this.getRequiredSecret("JWT_ACCESS_SECRET")
      }
    );
    const refreshToken = this.jwt.sign(
      { sub: userId, email, role: role.toLowerCase() },
      {
        expiresIn: "30d",
        secret: this.getRequiredSecret("JWT_REFRESH_SECRET")
      }
    );
    return { accessToken, refreshToken };
  }

  private getRequiredSecret(key: "JWT_ACCESS_SECRET" | "JWT_REFRESH_SECRET") {
    const value = this.config.get<string>(key);
    try {
      return assertSecureSecret(key, value);
    } catch {
      throw new InternalServerErrorException(`${key} is not configured securely`);
    }
  }
}
