import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PartnerService {
  constructor(private readonly prisma: PrismaService) {}

  async dashboard(userId: string) {
    const coffeeShopIds = await this.getAccessibleCoffeeShopIds(userId);
    const [redeemedToday, redeemedMonth] = await Promise.all([
      this.prisma.redemption.count({
        where: {
          coffeeShopId: { in: coffeeShopIds },
          createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) }
        }
      }),
      this.prisma.redemption.count({
        where: {
          coffeeShopId: { in: coffeeShopIds },
          createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
        }
      })
    ]);
    return { redeemedToday, redeemedMonth };
  }

  async listOrders(userId: string) {
    const coffeeShopIds = await this.getAccessibleCoffeeShopIds(userId);
    return this.prisma.order.findMany({
      where: { coffeeShopId: { in: coffeeShopIds } },
      orderBy: { createdAt: "desc" },
      take: 100
    });
  }

  async updateOrderStatus(
    orderId: string,
    status: "NEW" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED",
    userId: string
  ) {
    const coffeeShopIds = await this.getAccessibleCoffeeShopIds(userId);
    const existingOrder = await this.prisma.order.findFirst({
      where: { id: orderId, coffeeShopId: { in: coffeeShopIds } },
      select: { id: true }
    });
    if (!existingOrder) {
      throw new NotFoundException("Order not found for this partner account");
    }
    return this.prisma.order.update({
      where: { id: existingOrder.id },
      data: { status }
    });
  }

  private async getAccessibleCoffeeShopIds(userId: string) {
    const [ownedCoffeeShops, memberships] = await Promise.all([
      this.prisma.coffeeShop.findMany({
        where: { ownerId: userId },
        select: { id: true }
      }),
      this.prisma.staffMembership.findMany({
        where: { userId },
        select: { coffeeShopId: true }
      })
    ]);
    return Array.from(
      new Set([
        ...ownedCoffeeShops.map((coffeeShop) => coffeeShop.id),
        ...memberships.map((membership) => membership.coffeeShopId)
      ])
    );
  }
}
