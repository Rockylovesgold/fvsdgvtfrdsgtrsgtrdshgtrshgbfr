import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { assertSecureSecret } from "../../common/security";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    let secret: string;
    try {
      secret = assertSecureSecret("JWT_ACCESS_SECRET", configService.get<string>("JWT_ACCESS_SECRET"));
    } catch {
      throw new InternalServerErrorException("JWT_ACCESS_SECRET is not configured securely");
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret
    });
  }

  validate(payload: { sub: string; email: string; role: string }) {
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
