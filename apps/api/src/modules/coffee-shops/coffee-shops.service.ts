import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CoffeeShopsService {
  constructor(private readonly prisma: PrismaService) {}

  listApproved() {
    return this.prisma.coffeeShop.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" }
    });
  }
}
