import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  listUsers() {
    return this.prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  }

  listCoffeeShops() {
    return this.prisma.coffeeShop.findMany({
      orderBy: { createdAt: "desc" },
      take: 100
    });
  }
}
