import { Flex, Button } from "@chakra-ui/react";
import { RiInformationLine } from "react-icons/ri";

import { useT } from "../../lib/locale-context";
import TestTimer from "./test-timer";

interface TestMenuProps {
  onShowInstructionsButtonClick: () => void;
}

export default function TestMenu(props: TestMenuProps) {
  const t = useT();

  return (
    <Flex
      width="full"
      my={2}
      px={0}
      direction="column"
      justifyContent="center"
      alignItems="flex-end"
      gap={2}
    >
      <Flex>
        <Button
          aria-label={t("testInstructionsAria")}
          variant="outline"
          leftIcon={<RiInformationLine size={24} />}
          onClick={props.onShowInstructionsButtonClick}
        >
          {t("testInstructions")}
        </Button>
        <TestTimer />
      </Flex>
    </Flex>
  );
}
