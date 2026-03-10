import { IsIn } from "class-validator";

export class UpdateOrderStatusDto {
  @IsIn(["NEW", "IN_PROGRESS", "COMPLETED", "ARCHIVED"])
  status!: "NEW" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED";
}
