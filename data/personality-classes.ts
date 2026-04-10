import personalityClassesJson from "./personality-classes.json";
import { buildPersonalityClasses } from "./json-middleware";

export const personalityClasses = buildPersonalityClasses(
  personalityClassesJson
);