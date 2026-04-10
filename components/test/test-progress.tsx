import { Progress } from "@chakra-ui/react";

import { personalityTest } from "../../data/personality-test";
import useUserTestAnswersStore from "../../store/use-user-test-answers";

export default function TestProgress() {
  const { userTestAnswers } = useUserTestAnswersStore();

  const answeredCount = personalityTest.filter(
    (_, i) => userTestAnswers[i] !== undefined
  ).length;
  const progress = (answeredCount / personalityTest.length) * 100;

  return (
    <Progress
      w="full"
      size="lg"
      rounded="md"
      colorScheme="primary"
      value={progress}
    />
  );
}
