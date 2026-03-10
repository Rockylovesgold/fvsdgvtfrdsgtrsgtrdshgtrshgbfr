import { IsDateString, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCampaignDto {
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsDateString()
  startsAt!: string;

  @IsDateString()
  endsAt!: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  audience?: string;
}
