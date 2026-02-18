import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CampaignsService } from "./campaigns.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser, Roles } from "../common/guards/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { Role } from "@prisma/client";

@Controller("campaigns")
export class CampaignsController {
  constructor(private campaignsService: CampaignsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  list(@CurrentUser() user: { userId: string; role: Role }) {
    return this.campaignsService.list(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.COMPANY, Role.ADMIN)
  @Post()
  create(@CurrentUser() user: { userId: string; role: Role }, @Body() body: any) {
    return this.campaignsService.create(user, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.COMPANY, Role.ADMIN)
  @Patch(":id/status")
  updateStatus(
    @CurrentUser() user: { userId: string; role: Role },
    @Param("id") id: string,
    @Body() body: { status: string }
  ) {
    return this.campaignsService.updateStatus(user, id, body.status);
  }
}
