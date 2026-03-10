import { SetMetadata } from "@nestjs/common";

export type AppRole =
  | "customer"
  | "owner"
  | "manager"
  | "staff"
  | "admin"
  | "finance_admin"
  | "support_admin"
  | "marketing_admin"
  | "super_admin";
export const ROLES_KEY = "roles";
export const Roles = (...roles: AppRole[]) => SetMetadata(ROLES_KEY, roles);
