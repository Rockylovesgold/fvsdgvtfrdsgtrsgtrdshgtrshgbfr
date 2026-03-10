import test from "node:test";
import assert from "node:assert/strict";
import { assertSecureSecret, hashToken } from "../src/common/security";

test("hashToken is deterministic", () => {
  assert.equal(hashToken("abc123"), hashToken("abc123"));
  assert.notEqual(hashToken("abc123"), hashToken("def456"));
});

test("assertSecureSecret rejects unsafe values", () => {
  assert.throws(() => assertSecureSecret("JWT_ACCESS_SECRET", undefined));
  assert.throws(() => assertSecureSecret("JWT_ACCESS_SECRET", "dev-secret"));
  assert.equal(assertSecureSecret("JWT_ACCESS_SECRET", "very-secure-key"), "very-secure-key");
});
