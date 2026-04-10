import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  useRadioGroup,
  Flex,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";

import TestProgress from "./test-progress";
import TestAnswerOption from "./test-answer-option";

import { personalityTest } from "../../data/personality-test";
import {
  TestAnswerOption as TestAnswer,
  getQuestionAnswerScore,
  saveTestResult,
} from "../../lib/personality-test";
import useUserTestAnswersStore from "../../store/use-user-test-answers";

function TestQuestionBlock({ questionIndex }: { questionIndex: number }) {
  const question = personalityTest[questionIndex];
  const { userTestAnswers, setUserTestAnswers } = useUserTestAnswersStore();
  const selected = userTestAnswers[questionIndex];

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

  return (
    <Box
      as="section"
      py={6}
      borderBottomWidth="1px"
      borderColor="gray.200"
      _last={{ borderBottomWidth: 0 }}
      scrollMarginTop="5rem"
    >
      <Text
        fontWeight="bold"
        color="gray.600"
      >
        #{questionIndex + 1}
      </Text>
      <Text
        fontSize="lg"
        mb={4}
      >
        {question.question}
      </Text>
      <Flex
        w="full"
        gap={4}
        direction="column"
        {...group}
      >
        {question.answerOptions.map((answerOption) => {
          const radio = getRadioProps({ value: answerOption.type });

          return (
            <TestAnswerOption
              key={answerOption.type}
              {...radio}
            >
              {answerOption.answer}
            </TestAnswerOption>
          );
        })}
      </Flex>
    </Box>
  );
}

export default function TestQuestion() {
  const router = useRouter();

  const { userTestAnswers, setUserTestAnswers } = useUserTestAnswersStore();

  const allAnswered = personalityTest.every(
    (_, i) => userTestAnswers[i] !== undefined
  );

  function handleSeeResultButtonClick() {
    if (!allAnswered) return;

    const timestamp = Date.now();
    const testAnswers = personalityTest.map(
      (_, i) => userTestAnswers[i] as TestAnswer["type"]
    );
    const testScores = personalityTest.map((_, index) =>
      getQuestionAnswerScore(index + 1, testAnswers[index])
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
      >
        {personalityTest.map((_, questionIndex) => (
          <TestQuestionBlock
            key={questionIndex}
            questionIndex={questionIndex}
          />
        ))}
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
          See Result
        </Button>
      </Box>
    </Flex>
  );
}
