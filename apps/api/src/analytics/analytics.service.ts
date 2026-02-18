import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Role } from "@prisma/client";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async campaignSummary(user: { userId: string; role: Role }, campaignId: string) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      select: { id: true, companyId: true }
    });

    if (!campaign) {
      throw new NotFoundException("Campaign not found");
    }

    if (user.role !== Role.ADMIN) {
      const member = await this.prisma.companyMember.findUnique({
        where: {
          companyId_userId: {
            companyId: campaign.companyId,
            userId: user.userId
          }
        }
      });

      if (!member) {
        throw new ForbiddenException("You do not have access to this campaign");
      }
    }

    const responses = await this.prisma.response.findMany({ where: { campaignId } });
    const avgSentiment = responses.length
      ? responses.reduce((acc, item) => acc + (item.sentiment || 0), 0) / responses.length
      : 0;

    return {
      responses: responses.length,
      avgSentiment
    };
  }
}
