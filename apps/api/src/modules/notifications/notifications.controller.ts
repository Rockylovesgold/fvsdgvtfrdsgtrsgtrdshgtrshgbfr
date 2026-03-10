import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { MarkNotificationReadDto } from "./dto/notifications.dto";
import { NotificationsService } from "./notifications.service";

@Controller({ path: "notifications", version: "1" })
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  list(@Req() req: { user: { id: string } }) {
    return this.notificationsService.listForUser(req.user.id);
  }

  @Post("mark-read")
  markRead(
    @Body() body: MarkNotificationReadDto,
    @Req() req: { user: { id: string } }
  ) {
    return this.notificationsService.markRead(body.notificationId, req.user.id);
  }
}
