import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { AdminModule } from "./admin/admin.module";
import { AnalyticsModule } from "./analytics/analytics.module";
import { AuthModule } from "./auth/auth.module";
import { CacheModule } from "./cache/cache.module";
import { CoffeeShopsModule } from "./coffee-shops/coffee-shops.module";
import { CampaignsModule } from "./campaigns/campaigns.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { PartnerModule } from "./partner/partner.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RedemptionsModule } from "./redemptions/redemptions.module";
import { SubscriptionsModule } from "./subscriptions/subscriptions.module";
import { SupportModule } from "./support/support.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),
    CacheModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    CoffeeShopsModule,
    SubscriptionsModule,
    RedemptionsModule,
    AnalyticsModule,
    AdminModule,
    CampaignsModule,
    SupportModule,
    NotificationsModule,
    PartnerModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
