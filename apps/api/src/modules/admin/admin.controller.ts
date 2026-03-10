import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AdminService } from "./admin.service";

@Controller({ path: "admin", version: "1" })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("admin", "support_admin", "finance_admin", "marketing_admin", "super_admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("users")
  users() {
    return this.adminService.listUsers();
  }

  @Get("coffee-shops")
  coffeeShops() {
    return this.adminService.listCoffeeShops();
  }
}
