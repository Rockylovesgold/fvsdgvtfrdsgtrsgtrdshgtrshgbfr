import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCampaignDto } from "./dto/campaigns.dto";

@Injectable()
export class CampaignsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.campaign.findMany({ orderBy: { createdAt: "desc" } });
  }

  create(input: CreateCampaignDto) {
    return this.prisma.campaign.create({
      data: {
        name: input.name,
        startsAt: new Date(input.startsAt),
        endsAt: new Date(input.endsAt),
        audience: input.audience,
        status: "SCHEDULED"
      }
    });
  }
}
