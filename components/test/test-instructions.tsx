import {
  Flex,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Button,
} from "@chakra-ui/react";

import { useT } from "../../lib/locale-context";

interface TestInstructionsProps {
  onCloseTestInstructions: () => void;
}

export default function TestInstructions(props: TestInstructionsProps) {
  const t = useT();

  return (
    <Flex
      h="full"
      direction="column"
      gap={6}
    >
      <Heading size="md">{t("instructionsHeading")}</Heading>
      <Flex
        direction="column"
        gap={3}
      >
        <Text
          dangerouslySetInnerHTML={{ __html: t("instructionsLeadHtml") }}
        />
        <Text fontWeight="semibold">{t("instructionsLine1")}</Text>
        <UnorderedList spacing={2}>
          <ListItem>{t("instructionsItem1")}</ListItem>
          <ListItem>{t("instructionsItem2")}</ListItem>
          <ListItem>{t("instructionsItem3")}</ListItem>
        </UnorderedList>
      </Flex>
      <Button
        w="min-content"
        colorScheme="primary"
        alignSelf="flex-end"
        onClick={props.onCloseTestInstructions}
      >
        {t("instructionsStart")}
      </Button>
    </Flex>
  );
}
