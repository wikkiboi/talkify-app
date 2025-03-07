import crypto from "node:crypto";

export default function generateCode(expiration?: number, usageLimit?: number) {
  const code = crypto.randomBytes(5).toString("hex");
  const expiresInHours = expiration ?? 24;
  const maxUses = usageLimit ?? 20;
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + expiresInHours);

  return {
    code,
    expiresAt,
    maxUses,
  };
}
