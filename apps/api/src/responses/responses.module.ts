import { Module } from "@nestjs/common";
import { ResponsesController } from "./responses.controller";
import { ResponsesService } from "./responses.service";
import { RewardsModule } from "../rewards/rewards.module";
import { WalletModule } from "../wallet/wallet.module";
import { QueuesModule } from "../queues/queues.module";

@Module({
  imports: [RewardsModule, WalletModule, QueuesModule],
  controllers: [ResponsesController],
  providers: [ResponsesService]
})
export class ResponsesModule {}
