import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";

@Injectable()
export class QueuesService {
  private analysisQueue = new Queue("analysis", { connection: { url: process.env.REDIS_URL } });

  async enqueueAnalysis(payload: { responseId: string; campaignId: string }) {
    return this.analysisQueue.add("analyze-response", payload, { removeOnComplete: true });
  }
}
