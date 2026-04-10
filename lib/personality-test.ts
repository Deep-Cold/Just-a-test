import { openDB } from "idb";
import { Option, Future, Result } from "@swan-io/boxed";
import { personalityTest } from "../data/personality-test";
import {
  getResultArchetype,
  type ResultArchetype,
} from "./result-archetypes";
import type { PersonalityLetter, PersonalityClassGroupType } from "./personality-types";

export type { PersonalityLetter, PersonalityClassGroupType } from "./personality-types";

export interface TestQuestion {
  no: number;
  question: string;
  answerOptions: TestAnswerOption[];
  /** 为 true 时不参与四维计分与结果页保存 */
  excludeFromScore?: boolean;
  /** 可选：社团征集等外链（展示在题干下方） */
  supportFormUrl?: string;
}

export function isScoredQuestion(question: TestQuestion): boolean {
  return question.excludeFromScore !== true;
}

export interface TestAnswerOption {
  type: "A" | "B";
  answer: string;
  score: PersonalityClass["type"];
}

export interface PersonalityClass {
  type: PersonalityLetter;
  description: string;
}

export interface TestResult {
  timestamp: number;
  testAnswers: TestAnswerOption["type"][];
  testScores: PersonalityClass["type"][];
}

const DB_NAME = "MBTI_PERSONALITY_TEST_APP_IDB";

const DB_VERSION = 2;

const TEST_RESULT_STORE = "TEST_RESULT_STORE";

async function getDb() {
  const db = await openDB<{
    [TEST_RESULT_STORE]: {
      key: number;
      value: TestResult;
    };
  }>(DB_NAME, DB_VERSION, {
    upgrade(idb, oldVersion) {
      if (oldVersion < 2 && idb.objectStoreNames.contains(TEST_RESULT_STORE)) {
        idb.deleteObjectStore(TEST_RESULT_STORE);
      }
      if (!idb.objectStoreNames.contains(TEST_RESULT_STORE)) {
        idb.createObjectStore(TEST_RESULT_STORE, {
          keyPath: "timestamp",
        });
      }
    },
  });

  return db;
}

export function getQuestionAnswerScore(
  questionNumber: number,
  answerOption: TestAnswerOption["type"]
) {
  const question = personalityTest.find(
    (question) => question.no === questionNumber
  )!;

  return question.answerOptions.find((option) => option.type === answerOption)!
    .score;
}

export type { ResultArchetype };

export function getPersonalityClassGroupByTestScores(
  testScores: PersonalityClass["type"][]
): ResultArchetype {
  const scoreCount = testScores.reduce(
    (acc, score) => {
      return {
        ...acc,
        [score]: acc[score] + 1,
      };
    },
    {
      P: 0,
      E: 0,
      S: 0,
      M: 0,
      A: 0,
      I: 0,
      C: 0,
      B: 0,
    }
  );

  const personalityClassGroupType = `${
    scoreCount.P >= scoreCount.E ? "P" : "E"
  }${scoreCount.M >= scoreCount.S ? "M" : "S"}${
    scoreCount.A >= scoreCount.I ? "A" : "I"
  }${scoreCount.C >= scoreCount.B ? "C" : "B"}`;

  return getResultArchetype(
    personalityClassGroupType as PersonalityClassGroupType
  );
}

export function getSavedTestResult(id: number) {
  return Future.make<Result<Option<TestResult>, Error>>((resolve) => {
    getDb()
      .then((db) => db.get(TEST_RESULT_STORE, id))
      .then(Option.fromNullable)
      .then((testResult) => resolve(Result.Ok(testResult)))
      .catch((error) => resolve(Result.Error(error)));
  });
}

export function getAllSavedTestResult() {
  return Future.make<Result<Option<TestResult[]>, Error>>((resolve) => {
    getDb()
      .then((db) => db.getAll(TEST_RESULT_STORE))
      .then(Option.fromNullable)
      .then((testResult) => resolve(Result.Ok(testResult)))
      .catch((error) => resolve(Result.Error(error)));
  });
}

export function saveTestResult(testResult: {
  timestamp: number;
  testAnswers: TestAnswerOption["type"][];
  testScores: PersonalityClass["type"][];
}) {
  return Future.make<Result<number, Error>>((resolve) => {
    getDb()
      .then((db) => db.put(TEST_RESULT_STORE, testResult))
      .then((id) => resolve(Result.Ok(id)))
      .catch((error) => resolve(Result.Error(error)));
  });
}
