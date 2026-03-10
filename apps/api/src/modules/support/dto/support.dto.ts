import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreateSupportTicketDto {
  @IsOptional()
  @IsString()
  coffeeShopId?: string;

  @IsString()
  @MaxLength(120)
  subject!: string;

  @IsOptional()
  @IsString()
  @MaxLength(4000)
  description?: string;
}
