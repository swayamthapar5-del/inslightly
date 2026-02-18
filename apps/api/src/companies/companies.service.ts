import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.company.findMany({ include: { campaigns: true } });
  }

  create(data: any) {
    return this.prisma.company.create({ data });
  }
}
