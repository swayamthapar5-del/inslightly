import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser, Roles } from "../common/guards/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { Role } from "@prisma/client";

@Controller("analytics")
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.COMPANY, Role.ADMIN)
  @Get("campaigns/:id")
  getCampaign(@CurrentUser() user: { userId: string; role: Role }, @Param("id") id: string) {
    return this.analyticsService.campaignSummary(user, id);
  }
}
