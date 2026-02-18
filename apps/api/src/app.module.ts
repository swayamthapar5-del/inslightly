import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { CompaniesModule } from "./companies/companies.module";
import { CampaignsModule } from "./campaigns/campaigns.module";
import { SurveysModule } from "./surveys/surveys.module";
import { ResponsesModule } from "./responses/responses.module";
import { WalletModule } from "./wallet/wallet.module";
import { PaymentsModule } from "./payments/payments.module";
import { RewardsModule } from "./rewards/rewards.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { AnalyticsModule } from "./analytics/analytics.module";
import { AiModule } from "./ai/ai.module";
import { PrivacyModule } from "./privacy/privacy.module";
import { QueuesModule } from "./queues/queues.module";
import { AdminModule } from "./admin/admin.module";
import { PrismaModule } from "./database/prisma.module";
import { BotDetectionMiddleware } from "./common/middleware/bot-detection.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: Number(process.env.RATE_LIMIT_TTL || 60),
        limit: Number(process.env.RATE_LIMIT_LIMIT || 120)
      }
    ]),
    PrismaModule,
    AuthModule,
    UsersModule,
    CompaniesModule,
    CampaignsModule,
    SurveysModule,
    ResponsesModule,
    WalletModule,
    PaymentsModule,
    RewardsModule,
    NotificationsModule,
    AnalyticsModule,
    AiModule,
    PrivacyModule,
    QueuesModule,
    AdminModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BotDetectionMiddleware).forRoutes("*");
  }
}
