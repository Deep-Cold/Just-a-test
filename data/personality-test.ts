import personalityTestJson from "./personality-test.json";
import { buildPersonalityTest } from "./json-middleware";

export const personalityTest = buildPersonalityTest(personalityTestJson);