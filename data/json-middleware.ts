import type { PersonalityClass, TestQuestion } from "../lib/personality-test";
import type { PersonalityClassGroupType } from "../lib/personality-types";

/** Legacy shape of `personality-class-groups.json`（仅用于校验旧 JSON，结果页已改用 result-archetypes） */
export interface PersonalityClassGroup {
  type: PersonalityClassGroupType;
  name: string;
  nameDescription: string;
  epithet: string;
  description: string;
  jungianFunctionalPreference: {
    dominant: string;
    auxiliary: string;
    tertiary: string;
    inferior: string;
  };
  generalTraits: string[];
  relationshipStrengths: string[];
  relationshipWeaknesses: string[];
  successDefinition: string;
  strengths: string[];
  gifts: string[];
  potentialProblemAreas: string[];
  explanationOfProblems: string;
  solutions: string;
  livingHappilyTips: string;
  suggestions?: string[];
  tenRulesToLive: string[];
}

type JsonRecord = Record<string, unknown>;

const TEST_ANSWER_TYPES = new Set(["A", "B"]);
/** P/E、S/M、A/I、C/B 八极 */
const PERSONALITY_CLASS_TYPES = new Set(["P", "E", "S", "M", "A", "I", "C", "B"]);
/** 四字母顺序：P/E → S/M → A/I → C/B */
const PERSONALITY_CLASS_GROUP_PATTERN = /^[PE][MS][AI][CB]$/;

function expectArray(value: unknown, path: string): unknown[] {
  if (!Array.isArray(value)) {
    throw new TypeError(`${path} must be an array`);
  }

  return value;
}

function expectRecord(value: unknown, path: string): JsonRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new TypeError(`${path} must be an object`);
  }

  return value as JsonRecord;
}

function expectString(value: unknown, path: string): string {
  if (typeof value !== "string") {
    throw new TypeError(`${path} must be a string`);
  }

  return value;
}

function expectNumber(value: unknown, path: string): number {
  if (typeof value !== "number") {
    throw new TypeError(`${path} must be a number`);
  }

  return value;
}

function expectStringArray(value: unknown, path: string): string[] {
  return expectArray(value, path).map((entry, index) =>
    expectString(entry, `${path}[${index}]`)
  );
}

function expectTestAnswerType(
  value: unknown,
  path: string
): "A" | "B" {
  const parsedValue = expectString(value, path);

  if (!TEST_ANSWER_TYPES.has(parsedValue)) {
    throw new TypeError(`${path} must be one of A or B`);
  }

  return parsedValue as "A" | "B";
}

function expectPersonalityClassType(
  value: unknown,
  path: string
): PersonalityClass["type"] {
  const parsedValue = expectString(value, path);

  if (!PERSONALITY_CLASS_TYPES.has(parsedValue)) {
    throw new TypeError(`${path} must be a valid personality class type`);
  }

  return parsedValue as PersonalityClass["type"];
}

function expectPersonalityClassGroupType(
  value: unknown,
  path: string
): PersonalityClassGroupType {
  const parsedValue = expectString(value, path);

  if (!PERSONALITY_CLASS_GROUP_PATTERN.test(parsedValue)) {
    throw new TypeError(`${path} must be a valid personality class group type`);
  }

  return parsedValue as PersonalityClassGroupType;
}

export function buildPersonalityClasses(input: unknown): PersonalityClass[] {
  return expectArray(input, "personality-classes.json").map((entry, index) => {
    const json = expectRecord(entry, `personality-classes.json[${index}]`);

    const personalityClass = {
      type: expectPersonalityClassType(
        json.type,
        `personality-classes.json[${index}].type`
      ),
      description: expectString(
        json.description,
        `personality-classes.json[${index}].description`
      ),
    } satisfies PersonalityClass;

    return personalityClass;
  });
}

export function buildPersonalityTest(input: unknown): TestQuestion[] {
  return expectArray(input, "personality-test.json").map((entry, index) => {
    const json = expectRecord(entry, `personality-test.json[${index}]`);

    const question = {
      no: expectNumber(json.no, `personality-test.json[${index}].no`),
      question: expectString(
        json.question,
        `personality-test.json[${index}].question`
      ),
      excludeFromScore:
        json.excludeFromScore === undefined
          ? undefined
          : Boolean(json.excludeFromScore),
      supportFormUrl:
        json.supportFormUrl === undefined
          ? undefined
          : expectString(
              json.supportFormUrl,
              `personality-test.json[${index}].supportFormUrl`
            ),
      answerOptions: expectArray(
        json.answerOptions,
        `personality-test.json[${index}].answerOptions`
      ).map((answerOption, optionIndex) => {
        const answerOptionJson = expectRecord(
          answerOption,
          `personality-test.json[${index}].answerOptions[${optionIndex}]`
        );

        return {
          type: expectTestAnswerType(
            answerOptionJson.type,
            `personality-test.json[${index}].answerOptions[${optionIndex}].type`
          ),
          answer: expectString(
            answerOptionJson.answer,
            `personality-test.json[${index}].answerOptions[${optionIndex}].answer`
          ),
          score: expectPersonalityClassType(
            answerOptionJson.score,
            `personality-test.json[${index}].answerOptions[${optionIndex}].score`
          ),
        };
      }),
    } satisfies TestQuestion;

    return question;
  });
}

export function buildPersonalityClassGroups(
  input: unknown
): PersonalityClassGroup[] {
  return expectArray(input, "personality-class-groups.json").map(
    (entry, index) => {
      const json = expectRecord(
        entry,
        `personality-class-groups.json[${index}]`
      );
      const jungianFunctionalPreference = expectRecord(
        json.jungianFunctionalPreference,
        `personality-class-groups.json[${index}].jungianFunctionalPreference`
      );

      const personalityClassGroup = {
        type: expectPersonalityClassGroupType(
          json.type,
          `personality-class-groups.json[${index}].type`
        ),
        name: expectString(
          json.name,
          `personality-class-groups.json[${index}].name`
        ),
        nameDescription: expectString(
          json.nameDescription,
          `personality-class-groups.json[${index}].nameDescription`
        ),
        epithet: expectString(
          json.epithet,
          `personality-class-groups.json[${index}].epithet`
        ),
        description: expectString(
          json.description,
          `personality-class-groups.json[${index}].description`
        ),
        jungianFunctionalPreference: {
          dominant: expectString(
            jungianFunctionalPreference.dominant,
            `personality-class-groups.json[${index}].jungianFunctionalPreference.dominant`
          ),
          auxiliary: expectString(
            jungianFunctionalPreference.auxiliary,
            `personality-class-groups.json[${index}].jungianFunctionalPreference.auxiliary`
          ),
          tertiary: expectString(
            jungianFunctionalPreference.tertiary,
            `personality-class-groups.json[${index}].jungianFunctionalPreference.tertiary`
          ),
          inferior: expectString(
            jungianFunctionalPreference.inferior,
            `personality-class-groups.json[${index}].jungianFunctionalPreference.inferior`
          ),
        },
        generalTraits: expectStringArray(
          json.generalTraits,
          `personality-class-groups.json[${index}].generalTraits`
        ),
        relationshipStrengths: expectStringArray(
          json.relationshipStrengths,
          `personality-class-groups.json[${index}].relationshipStrengths`
        ),
        relationshipWeaknesses: expectStringArray(
          json.relationshipWeaknesses,
          `personality-class-groups.json[${index}].relationshipWeaknesses`
        ),
        successDefinition: expectString(
          json.successDefinition,
          `personality-class-groups.json[${index}].successDefinition`
        ),
        strengths: expectStringArray(
          json.strengths,
          `personality-class-groups.json[${index}].strengths`
        ),
        gifts: expectStringArray(
          json.gifts,
          `personality-class-groups.json[${index}].gifts`
        ),
        potentialProblemAreas: expectStringArray(
          json.potentialProblemAreas,
          `personality-class-groups.json[${index}].potentialProblemAreas`
        ),
        explanationOfProblems: expectString(
          json.explanationOfProblems,
          `personality-class-groups.json[${index}].explanationOfProblems`
        ),
        solutions: expectString(
          json.solutions,
          `personality-class-groups.json[${index}].solutions`
        ),
        livingHappilyTips: expectString(
          json.livingHappilyTips,
          `personality-class-groups.json[${index}].livingHappilyTips`
        ),
        suggestions:
          json.suggestions === undefined
            ? undefined
            : expectStringArray(
                json.suggestions,
                `personality-class-groups.json[${index}].suggestions`
              ),
        tenRulesToLive: expectStringArray(
          json.tenRulesToLive,
          `personality-class-groups.json[${index}].tenRulesToLive`
        ),
      } satisfies PersonalityClassGroup;

      return personalityClassGroup;
    }
  );
}