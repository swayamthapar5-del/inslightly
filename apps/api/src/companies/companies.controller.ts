import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CompaniesService } from "./companies.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { Roles } from "../common/guards/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { Role } from "@prisma/client";

@Controller("companies")
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  list() {
    return this.companiesService.list();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.COMPANY, Role.ADMIN)
  @Post()
  create(@Body() body: any) {
    return this.companiesService.create(body);
  }
}
