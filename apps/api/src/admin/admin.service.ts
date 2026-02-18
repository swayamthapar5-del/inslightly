import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async platformMetrics() {
    const users = await this.prisma.user.count();
    const campaigns = await this.prisma.campaign.count();
    const responses = await this.prisma.response.count();
    return { users, campaigns, responses };
  }
}
