import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CampaignStatus, Role } from "@prisma/client";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class CampaignsService {
  constructor(private prisma: PrismaService) {}

  async list(user: { userId: string; role: Role }) {
    if (user.role === Role.ADMIN) {
      return this.prisma.campaign.findMany({ include: { questions: true } });
    }

    if (user.role === Role.COMPANY) {
      return this.prisma.campaign.findMany({
        where: {
          company: {
            members: {
              some: { userId: user.userId }
            }
          }
        },
        include: { questions: true }
      });
    }

    return this.prisma.campaign.findMany({
      where: { status: CampaignStatus.ACTIVE },
      include: { questions: true }
    });
  }

  async create(user: { userId: string; role: Role }, data: any) {
    if (!data?.companyId) {
      throw new BadRequestException("companyId is required");
    }

    await this.ensureCompanyAccess(user, data.companyId);
    return this.prisma.campaign.create({ data, include: { questions: true } });
  }

  async updateStatus(user: { userId: string; role: Role }, id: string, status: string) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id },
      select: { id: true, companyId: true }
    });

    if (!campaign) {
      throw new NotFoundException("Campaign not found");
    }

    await this.ensureCompanyAccess(user, campaign.companyId);
    return this.prisma.campaign.update({ where: { id }, data: { status: status as CampaignStatus } });
  }

  private async ensureCompanyAccess(user: { userId: string; role: Role }, companyId: string) {
    if (user.role === Role.ADMIN) {
      return;
    }

    const member = await this.prisma.companyMember.findUnique({
      where: {
        companyId_userId: {
          companyId,
          userId: user.userId
        }
      }
    });

    if (!member) {
      throw new ForbiddenException("You do not have access to this company");
    }
  }
}
