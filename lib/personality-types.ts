/** 八维得分字母：P/E、S/M、A/I、C/B 各两极 */
export type PersonalityLetter = "P" | "E" | "S" | "M" | "A" | "I" | "C" | "B";

/** 四字母顺序：P/E → S/M → A/I → C/B */
export type PersonalityClassGroupType =
  `${"P" | "E"}${"M" | "S"}${"A" | "I"}${"C" | "B"}`;
