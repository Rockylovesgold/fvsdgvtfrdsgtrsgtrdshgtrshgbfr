import { Body, Controller, Post } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { AuthService } from "./auth.service";
import {
  LoginDto,
  PasswordResetConfirmDto,
  PasswordResetRequestDto,
  RefreshDto,
  RegisterDto
} from "./dto/auth.dto";

@Controller({ path: "auth", version: "1" })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post("login")
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post("refresh")
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  refresh(@Body() dto: RefreshDto) {
    return this.authService.refreshToken(dto.refreshToken);
  }

  @Post("oauth/google")
  googleOAuth() {
    return { status: "todo", provider: "google" };
  }

  @Post("oauth/apple")
  appleOAuth() {
    return { status: "todo", provider: "apple" };
  }

  @Post("password/reset/request")
  @Throttle({ default: { limit: 3, ttl: 60_000 } })
  requestReset(@Body() dto: PasswordResetRequestDto) {
    return this.authService.requestPasswordReset(dto);
  }

  @Post("password/reset/confirm")
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  confirmReset(@Body() dto: PasswordResetConfirmDto) {
    return this.authService.confirmPasswordReset(dto);
  }
}
