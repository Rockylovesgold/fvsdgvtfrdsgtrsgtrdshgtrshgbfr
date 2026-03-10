import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { RedeemQrDto } from "./dto/redemption.dto";
import { RedemptionsService } from "./redemptions.service";

@Controller({ path: "redemptions", version: "1" })
export class RedemptionsController {
  constructor(private readonly redemptionsService: RedemptionsService) {}

  @Post("qr-token")
  @UseGuards(JwtAuthGuard)
  @Roles("customer")
  @UseGuards(RolesGuard)
  generateQr(@Req() req: { user: { id: string } }) {
    return this.redemptionsService.generateQrToken(req.user.id);
  }

  @Post("redeem")
  @UseGuards(JwtAuthGuard)
  @Roles("owner", "manager", "staff")
  @UseGuards(RolesGuard)
  redeem(
    @Body() dto: RedeemQrDto,
    @Req() req: { user: { id: string } }
  ) {
    return this.redemptionsService.redeem(dto, req.user.id);
  }
}
