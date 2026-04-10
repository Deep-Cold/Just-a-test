import personalityClassGroupsJson from "./personality-class-groups.json";
import { buildPersonalityClassGroups } from "./json-middleware";

export const personalityClassGroup = buildPersonalityClassGroups(
  personalityClassGroupsJson
);