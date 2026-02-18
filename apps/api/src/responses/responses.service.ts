import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { anonymizeUserId, stripPii } from "../common/utils/anonymize";
import { RewardsService } from "../rewards/rewards.service";
import { WalletService } from "../wallet/wallet.service";
import { QueuesService } from "../queues/queues.service";

@Injectable()
export class ResponsesService {
  constructor(
    private prisma: PrismaService,
    private rewardsService: RewardsService,
    private walletService: WalletService,
    private queuesService: QueuesService
  ) {}

  async submitResponse(userId: string, payload: any) {
    const campaign = await this.prisma.campaign.findUnique({ where: { id: payload.campaignId } });
    if (!campaign) {
      throw new Error("Campaign not found");
    }

    const salt = process.env.ANON_SALT || "default_salt";
    const anonymizedId = anonymizeUserId(userId, salt);
    const sanitizedAnswers = stripPii(payload.answers || {});

    const response = await this.prisma.response.create({
      data: {
        campaignId: campaign.id,
        userId,
        anonymizedId,
        answers: sanitizedAnswers
      }
    });

    const rewardCents = this.rewardsService.calculateReward(campaign.budgetPerResponse, payload.qualityScore);
    await this.walletService.credit(userId, rewardCents, {
      campaignId: campaign.id,
      responseId: response.id
    });

    await this.queuesService.enqueueAnalysis({ responseId: response.id, campaignId: campaign.id });

    return { responseId: response.id, rewardCents };
  }
}
