import { InternalServerErrorException, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { assertSecureSecret } from "../../common/security";
import { PrismaModule } from "../prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: (() => {
          try {
            return assertSecureSecret("JWT_ACCESS_SECRET", config.get<string>("JWT_ACCESS_SECRET"));
          } catch {
            throw new InternalServerErrorException("JWT_ACCESS_SECRET is not configured securely");
          }
        })()
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
