import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";
import Stripe from "stripe";

@Injectable()
export class SubscriptionsService {
  private readonly stripe: Stripe;
  private readonly webhookSecret: string;

  constructor(
    private readonly prisma: PrismaService,
    config: ConfigService
  ) {
    const stripeSecretKey = config.get<string>("STRIPE_SECRET_KEY");
    this.webhookSecret = config.get<string>("STRIPE_WEBHOOK_SECRET", "");
    if (!stripeSecretKey) {
      throw new InternalServerErrorException("STRIPE_SECRET_KEY is required");
    }
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-02-24.acacia"
    });
  }

  listPlans() {
    return this.prisma.subscriptionPlan.findMany({ orderBy: { cupsPerMonth: "asc" } });
  }

  async recordWebhookEvent(
    rawBody: Buffer,
    signature: string,
    eventId: string,
    type: string
  ) {
    if (!this.webhookSecret) {
      throw new InternalServerErrorException("STRIPE_WEBHOOK_SECRET is required");
    }

    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(rawBody, signature, this.webhookSecret);
    } catch {
      throw new BadRequestException("Invalid webhook signature");
    }

    if (event.id !== eventId || event.type !== type) {
      throw new BadRequestException("Webhook payload mismatch");
    }

    return this.prisma.stripeWebhookEvent.upsert({
      where: { stripeEventId: eventId },
      update: { type },
      create: { stripeEventId: eventId, type }
    });
  }
}
