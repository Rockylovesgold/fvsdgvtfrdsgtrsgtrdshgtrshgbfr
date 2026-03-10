import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async dashboard() {
    const [users, activeSubscriptions, redemptions] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.subscription.count({ where: { status: "ACTIVE" } }),
      this.prisma.redemption.count()
    ]);
    return { users, activeSubscriptions, redemptions };
  }
}
