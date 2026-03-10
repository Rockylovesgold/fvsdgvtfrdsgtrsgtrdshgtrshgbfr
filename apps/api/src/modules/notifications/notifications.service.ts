import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  listForUser(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50
    });
  }

  async markRead(notificationId: string, userId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
      select: { id: true, userId: true }
    });
    if (!notification) {
      throw new NotFoundException("Notification not found");
    }
    if (notification.userId !== userId) {
      throw new ForbiddenException("Cannot update another user's notification");
    }
    return this.prisma.notification.update({
      where: { id: notification.id },
      data: { isRead: true }
    });
  }
}
