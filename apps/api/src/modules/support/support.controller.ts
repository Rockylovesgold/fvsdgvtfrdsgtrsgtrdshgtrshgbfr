import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CreateSupportTicketDto } from "./dto/support.dto";
import { SupportService } from "./support.service";

@Controller({ path: "support", version: "1" })
@UseGuards(JwtAuthGuard, RolesGuard)
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Get("tickets")
  @Roles("admin", "support_admin", "super_admin")
  list() {
    return this.supportService.listTickets();
  }

  @Post("tickets")
  @Roles("customer", "owner", "manager", "staff", "admin", "support_admin", "super_admin")
  create(
    @Body() input: CreateSupportTicketDto,
    @Req() req: { user: { id: string } }
  ) {
    return this.supportService.createTicket({
      userId: req.user.id,
      coffeeShopId: input.coffeeShopId,
      subject: input.subject,
      description: input.description
    });
  }
}
