import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useRadioGroup,
  Flex,
  Text,
  Button,
  Box,
  Spinner,
  Link,
} from "@chakra-ui/react";

import TestProgress from "./test-progress";
import TestAnswerOption from "./test-answer-option";

import { personalityTest } from "../../data/personality-test";
import {
  TestAnswerOption as TestAnswer,
  getQuestionAnswerScore,
  isScoredQuestion,
  saveTestResult,
} from "../../lib/personality-test";
import { useLocalizeBody, useT } from "../../lib/locale-context";
import useUserTestAnswersStore from "../../store/use-user-test-answers";

function shuffleArrayInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** 仅打乱「计分题」在题库中的下标顺序 */
function shuffleScoredQuestionIndices(): number[] {
  const scored = personalityTest
    .map((q, i) => (isScoredQuestion(q) ? i : -1))
    .filter((i): i is number => i >= 0);
  return shuffleArrayInPlace([...scored]);
}

/** 每题两个选项在界面上的显示顺序（索引 0/1 指向 answerOptions） */
function randomOptionOrders(
  questionCount: number
): [number, number][] {
  return Array.from({ length: questionCount }, () =>
    Math.random() < 0.5 ? ([0, 1] as [number, number]) : ([1, 0] as [number, number])
  );
}

function TestQuestionBlock({
  questionIndex,
  displayNumber,
  optionOrder,
}: {
  questionIndex: number;
  displayNumber: number;
  optionOrder: readonly [number, number];
}) {
  const question = personalityTest[questionIndex];
  const { userTestAnswers, setUserTestAnswers } = useUserTestAnswersStore();
  const selected = userTestAnswers[questionIndex];
  const localizeBody = useLocalizeBody();

  const { getRootProps, getRadioProps, setValue } = useRadioGroup({
    name: `answer-${questionIndex}`,
    defaultValue: selected ?? "",
    onChange: (value) => {
      setUserTestAnswers(
        personalityTest.map((_, idx) =>
          idx === questionIndex
            ? (value as TestAnswer["type"])
            : userTestAnswers[idx]
        )
      );
    },
  });

  useEffect(() => {
    setValue(selected ?? "");
  }, [selected, setValue]);

  const group = getRootProps();
  const qText = localizeBody(question.question);

  return (
    <Box
      as="section"
      w="full"
      py={6}
      borderBottomWidth="1px"
      borderColor="gray.200"
      _last={{ borderBottomWidth: 0 }}
      scrollMarginTop="5rem"
    >
      <Flex
        direction="column"
        w="full"
        alignItems="stretch"
        gap={2}
      >
        <Text
          fontWeight="bold"
          color="gray.600"
          textAlign="left"
          w="full"
        >
          #{displayNumber}
        </Text>
        <Text
          fontSize="lg"
          mb={2}
          textAlign="left"
          w="full"
        >
          {qText}
        </Text>
        {question.supportFormUrl ? (
          <Link
            href={question.supportFormUrl}
            isExternal
            color="primary.600"
            fontWeight="semibold"
            wordBreak="break-all"
            mb={2}
          >
            {question.supportFormUrl}
          </Link>
        ) : null}
      </Flex>
      <Flex
        w="full"
        gap={4}
        direction="column"
        alignItems="stretch"
        {...group}
      >
        {optionOrder.map((optionIdx) => {
          const answerOption = question.answerOptions[optionIdx];
          const radio = getRadioProps({ value: answerOption.type });

          return (
            <TestAnswerOption
              key={answerOption.type}
              {...radio}
            >
              {localizeBody(answerOption.answer)}
            </TestAnswerOption>
          );
        })}
      </Flex>
    </Box>
  );
}

export default function TestQuestion() {
  const router = useRouter();
  const t = useT();

  const { userTestAnswers, setUserTestAnswers } = useUserTestAnswersStore();

  const [testLayout, setTestLayout] = useState<{
    displayOrder: number[];
    optionOrders: [number, number][];
  } | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setTestLayout({
        displayOrder: shuffleScoredQuestionIndices(),
        optionOrders: randomOptionOrders(personalityTest.length),
      });
    });
  }, []);

  const allAnswered = personalityTest.every(
    (_, i) => userTestAnswers[i] !== undefined
  );

  function handleSeeResultButtonClick() {
    if (!allAnswered) return;

    const timestamp = Date.now();
    const scoredRows = personalityTest
      .map((q, i) => ({ q, i }))
      .filter(({ q }) => isScoredQuestion(q));
    const testAnswers = scoredRows.map(
      ({ i }) => userTestAnswers[i] as TestAnswer["type"]
    );
    const testScores = scoredRows.map(({ q, i }) =>
      getQuestionAnswerScore(q.no, userTestAnswers[i] as TestAnswer["type"])
    );

    saveTestResult({
      testAnswers,
      testScores,
      timestamp,
    })
      .tap(() => {
        setUserTestAnswers([]);
      })
      .tapOk((id) => {
        router.replace(`/test/result/${id}`);
      })
      .tapError((error) => {
        console.error(error);
      });
  }

  return (
    <Flex
      py={4}
      w="full"
      gap={6}
      direction="column"
      alignItems="stretch"
    >
      <Box
        position="sticky"
        top={0}
        zIndex={1}
        bg="white"
        pt={2}
        pb={3}
        borderBottomWidth="1px"
        borderColor="gray.100"
      >
        <TestProgress />
      </Box>

      <Flex
        direction="column"
        w="full"
        alignItems="stretch"
        minH={testLayout ? undefined : "40vh"}
        justifyContent={testLayout ? undefined : "center"}
      >
        {testLayout === null ? (
          <Spinner
            size="xl"
            color="primary.500"
            thickness="4px"
            label={t("testLoadingLayout")}
          />
        ) : (
          <>
            {testLayout.displayOrder.map((questionIndex, position) => (
              <TestQuestionBlock
                key={questionIndex}
                questionIndex={questionIndex}
                displayNumber={position + 1}
                optionOrder={testLayout.optionOrders[questionIndex]}
              />
            ))}
            {personalityTest
              .map((q, i) => ({ q, i }))
              .filter(({ q }) => q.excludeFromScore)
              .map(({ i }, bonusIdx) => (
                <TestQuestionBlock
                  key={`bonus-${i}`}
                  questionIndex={i}
                  displayNumber={
                    testLayout.displayOrder.length + 1 + bonusIdx
                  }
                  optionOrder={testLayout.optionOrders[i]}
                />
              ))}
          </>
        )}
      </Flex>

      <Box
        position="sticky"
        bottom={0}
        zIndex={1}
        bg="white"
        pt={3}
        pb={2}
        borderTopWidth="1px"
        borderColor="gray.100"
      >
        <Button
          w="full"
          colorScheme="primary"
          isDisabled={!allAnswered}
          onClick={handleSeeResultButtonClick}
        >
          {t("testSeeResult")}
        </Button>
      </Box>
    </Flex>
  );
}
