import { Injectable } from "@nestjs/common";
import { calculateRewardCents } from "../common/utils/rewards";

@Injectable()
export class RewardsService {
  calculateReward(budgetPerResponse: number, qualityScore?: number) {
    return calculateRewardCents(budgetPerResponse, qualityScore ?? 1);
  }
}
