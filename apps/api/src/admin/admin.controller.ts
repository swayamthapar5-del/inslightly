import { Controller, Get, UseGuards } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { Roles } from "../common/guards/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { Role } from "@prisma/client";

@Controller("admin")
export class AdminController {
  constructor(private adminService: AdminService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get("metrics")
  metrics() {
    return this.adminService.platformMetrics();
  }
}
