/**
 * 是否在构建/开发中启用「彩蛋预览」路由 `/lisa-egg-preview`。
 * 在 shell 或 `.env.local` 中设置 `LISA_EGG_PREVIEW=1`（或 `true` / `yes`）。
 */
export function isLisaEggPreviewEnabled(): boolean {
  const v = process.env.LISA_EGG_PREVIEW?.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}
