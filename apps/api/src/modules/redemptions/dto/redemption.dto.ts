import { IsString } from "class-validator";

export class RedeemQrDto {
  @IsString()
  token!: string;

  @IsString()
  coffeeShopId!: string;
}
