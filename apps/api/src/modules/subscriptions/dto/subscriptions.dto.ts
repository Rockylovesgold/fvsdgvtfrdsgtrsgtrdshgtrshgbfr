import { IsString } from "class-validator";

export class StripeWebhookBodyDto {
  @IsString()
  id!: string;

  @IsString()
  type!: string;
}
