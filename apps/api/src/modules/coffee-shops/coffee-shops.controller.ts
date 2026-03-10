import { Controller, Get } from "@nestjs/common";
import { CoffeeShopsService } from "./coffee-shops.service";

@Controller({ path: "coffee-shops", version: "1" })
export class CoffeeShopsController {
  constructor(private readonly coffeeShopsService: CoffeeShopsService) {}

  @Get()
  list() {
    return this.coffeeShopsService.listApproved();
  }
}
