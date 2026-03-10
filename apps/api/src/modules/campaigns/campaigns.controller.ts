import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { CreateCampaignDto } from "./dto/campaigns.dto";
import { CampaignsService } from "./campaigns.service";

@Controller({ path: "campaigns", version: "1" })
@UseGuards(JwtAuthGuard, RolesGuard)
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  @Roles("admin", "marketing_admin", "super_admin")
  list() {
    return this.campaignsService.list();
  }

  @Post()
  @Roles("admin", "marketing_admin", "super_admin")
  create(@Body() input: CreateCampaignDto) {
    return this.campaignsService.create(input);
  }
}
