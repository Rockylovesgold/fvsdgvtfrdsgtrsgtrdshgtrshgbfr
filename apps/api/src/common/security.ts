import { createHash } from "crypto";

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function assertSecureSecret(key: string, value: string | undefined) {
  if (!value || value.startsWith("dev-")) {
    throw new Error(`Missing or insecure environment variable: ${key}`);
  }
  return value;
}
