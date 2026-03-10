import { Body, Controller, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { UpdateOrderStatusDto } from "./dto/partner.dto";
import { PartnerService } from "./partner.service";

@Controller({ path: "partner", version: "1" })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("owner", "manager", "staff", "super_admin")
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get("dashboard")
  dashboard(@Req() req: { user: { id: string } }) {
    return this.partnerService.dashboard(req.user.id);
  }

  @Get("orders")
  orders(@Req() req: { user: { id: string } }) {
    return this.partnerService.listOrders(req.user.id);
  }

  @Patch("orders/:id/status")
  setStatus(
    @Param("id") id: string,
    @Body() body: UpdateOrderStatusDto,
    @Req() req: { user: { id: string } }
  ) {
    return this.partnerService.updateOrderStatus(id, body.status, req.user.id);
  }
}
