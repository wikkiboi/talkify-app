export default function isHexColor(hex) {
  return typeof hex === "string" && /^#[0-9A-Fa-f]{6}$/.test(hex);
}
