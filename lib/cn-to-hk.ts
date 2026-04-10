import * as OpenCC from "opencc-js/cn2t";

let convertCnToHk: ((text: string) => string) | undefined;

/** 简体 → 香港繁体（OpenCC cn→hk，用于题库正文等） */
export function cnToHk(text: string): string {
  if (!convertCnToHk) {
    convertCnToHk = OpenCC.Converter({ from: "cn", to: "hk" });
  }
  return convertCnToHk(text);
}
