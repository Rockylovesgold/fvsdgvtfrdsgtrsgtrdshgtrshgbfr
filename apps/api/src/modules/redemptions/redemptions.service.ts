import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RedeemQrDto } from "./dto/redemption.dto";

@Injectable()
export class RedemptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async generateQrToken(userId: string) {
    const activeSubscription = await this.prisma.subscription.findFirst({
      where: { userId, status: "ACTIVE" },
      orderBy: { createdAt: "desc" }
    });
    if (!activeSubscription || activeSubscription.cupsRemaining < 1) {
      throw new BadRequestException("No cups available");
    }

    const expiresAt = new Date(Date.now() + 60_000);
    const qrToken = await this.prisma.qrToken.create({
      data: {
        userId,
        expiresAt
      }
    });

    return {
      token: qrToken.token,
      expiresAt
    };
  }

  async redeem(dto: RedeemQrDto, ownerUserId: string) {
    return this.prisma.$transaction(async (tx) => {
      const [ownedCoffeeShop, membership] = await Promise.all([
        tx.coffeeShop.findFirst({
          where: { id: dto.coffeeShopId, ownerId: ownerUserId },
          select: { id: true }
        }),
        tx.staffMembership.findFirst({
          where: { coffeeShopId: dto.coffeeShopId, userId: ownerUserId },
          select: { id: true }
        })
      ]);
      if (!ownedCoffeeShop && !membership) {
        throw new BadRequestException("You are not authorized for this coffee shop");
      }

      const token = await tx.qrToken.findUnique({ where: { token: dto.token } });
      if (!token) throw new NotFoundException("Token not found");
      if (token.isUsed) throw new BadRequestException("Token already redeemed");
      if (token.expiresAt.getTime() < Date.now()) {
        throw new BadRequestException("Token expired");
      }

      const subscription = await tx.subscription.findFirst({
        where: { userId: token.userId, status: "ACTIVE" },
        orderBy: { createdAt: "desc" }
      });
      if (!subscription || subscription.cupsRemaining < 1) {
        throw new BadRequestException("Insufficient cups");
      }

      await tx.subscription.update({
        where: { id: subscription.id },
        data: { cupsRemaining: { decrement: 1 } }
      });

      const redemption = await tx.redemption.create({
        data: {
          userId: token.userId,
          coffeeShopId: dto.coffeeShopId,
          qrTokenId: token.id,
          processedByOwnerId: ownerUserId
        }
      });

      await tx.transaction.create({
        data: {
          userId: token.userId,
          redemptionId: redemption.id,
          type: "CUP_REDEEMED",
          amountMinor: 0
        }
      });

      await tx.qrToken.update({
        where: { id: token.id },
        data: { isUsed: true, usedAt: new Date() }
      });

      return redemption;
    });
  }
}
