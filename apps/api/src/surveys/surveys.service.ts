import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CampaignStatus, Role } from "@prisma/client";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class SurveysService {
  constructor(private prisma: PrismaService) {}

  async getQuestions(user: { userId: string; role: Role }, campaignId: string) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      select: { id: true, companyId: true, status: true }
    });

    if (!campaign) {
      throw new NotFoundException("Campaign not found");
    }

    if (user.role === Role.USER && campaign.status !== CampaignStatus.ACTIVE) {
      throw new ForbiddenException("Campaign is not available");
    }

    if (user.role === Role.COMPANY) {
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

    return this.prisma.surveyQuestion.findMany({ where: { campaignId }, orderBy: { order: "asc" } });
  }
}
