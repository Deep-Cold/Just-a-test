import type { TestAnswerOption } from "./personality-test";

/**
 * 隐藏彩蛋：连续 32 题均选择「表现 / 社交协作 / 直觉 / 稳定」一侧（即人格结果 EMIC · 今井莉莎型 的极端填答路径）。
 * 语义上同时强调舞台时尚感（E）、多人与氛围（M）、随性直觉（I）、可持续输出（C），与「团队协作 + 时尚」的莉莎印象一致。
 *
 * 与 `test-question` 中每题 A/B 展示顺序打乱无关：保存的是题库 `answerOptions[].type`（A/B），非上下位置。
 */
const LISA_IMAI_PATH: TestAnswerOption["type"][] = [
  "B",
  "B",
  "B",
  "B",
  "B",
  "B",
  "B",
  "B",
  "B",
  "B",
  "B",
  "B",
  "B",
  "B",
  "B",
  "B",
  "B",
  "B",
  "B",
  "B",
  "B",
  "B",
  "B",
  "B",
  "A",
  "A",
  "A",
  "A",
  "A",
  "A",
  "A",
  "A",
];

export const LISA_IMAI_EASTER_EGG_QUOTE =
  "你就是理大的氛围制造者，下一场 Live 见！";

export function isLisaImaiEasterEgg(
  testAnswers: TestAnswerOption["type"][]
): boolean {
  if (testAnswers.length !== LISA_IMAI_PATH.length) {
    return false;
  }
  return LISA_IMAI_PATH.every((expected, i) => testAnswers[i] === expected);
}
