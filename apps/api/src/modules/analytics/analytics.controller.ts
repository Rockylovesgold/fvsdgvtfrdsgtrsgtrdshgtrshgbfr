import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AnalyticsService } from "./analytics.service";

@Controller({ path: "analytics", version: "1" })
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get("platform")
  @UseGuards(JwtAuthGuard)
  @Roles("admin", "finance_admin", "super_admin")
  @UseGuards(RolesGuard)
  platform() {
    return this.analyticsService.dashboard();
  }
}
