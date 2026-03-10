import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req
} from "@nestjs/common";
import type { Request } from "express";
import { SubscriptionsService } from "./subscriptions.service";
import { StripeWebhookBodyDto } from "./dto/subscriptions.dto";

@Controller({ path: "subscriptions", version: "1" })
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get("plans")
  plans() {
    return this.subscriptionsService.listPlans();
  }

  @Post("webhook")
  webhook(
    @Req() req: Request & { rawBody?: Buffer },
    @Body() body: StripeWebhookBodyDto,
    @Headers("stripe-signature") signature?: string
  ) {
    if (!signature) {
      throw new BadRequestException("Missing stripe signature header");
    }
    if (!req.rawBody) {
      throw new BadRequestException("Missing raw webhook payload");
    }
    return this.subscriptionsService.recordWebhookEvent(
      req.rawBody,
      signature,
      body.id,
      body.type
    );
  }
}
