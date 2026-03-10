export type UserRole = "customer" | "owner" | "admin";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface WalletSnapshot {
  subscriptionTier: "bronze" | "gold" | "platinum";
  cupsRemaining: number;
  nextBillingDate: string;
}

export interface QrTokenPayload {
  token: string;
  expiresAt: string;
}
