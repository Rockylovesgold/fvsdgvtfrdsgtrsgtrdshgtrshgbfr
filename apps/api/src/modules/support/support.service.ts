import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SupportService {
  constructor(private readonly prisma: PrismaService) {}

  listTickets() {
    return this.prisma.supportTicket.findMany({
      orderBy: { createdAt: "desc" },
      take: 100
    });
  }

  createTicket(input: { userId?: string; coffeeShopId?: string; subject: string; description?: string }) {
    return this.prisma.supportTicket.create({ data: input });
  }
}
