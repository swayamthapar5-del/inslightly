import crypto from "crypto";

export function anonymizeUserId(userId: string, salt: string) {
  return crypto.createHash("sha256").update(`${userId}:${salt}`).digest("hex");
}

export function stripPii(input: Record<string, any>) {
  const piiKeys = ["email", "phone", "address", "fullName"];
  const cleaned: Record<string, any> = {};
  Object.entries(input).forEach(([key, value]) => {
    if (!piiKeys.includes(key)) {
      cleaned[key] = value;
    }
  });
  return cleaned;
}
