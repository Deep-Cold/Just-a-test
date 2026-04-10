import {
  Flex,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Button,
} from "@chakra-ui/react";

interface TestInstructionsProps {
  onCloseTestInstructions: () => void;
}

export default function TestInstructions(props: TestInstructionsProps) {
  return (
    <Flex
      h="full"
      direction="column"
      gap={6}
    >
      <Heading size="md">说明</Heading>
      <Flex
        direction="column"
        gap={3}
      >
        <Text>
          本测试题库专为<strong>理大音游人</strong>定制。题目将理大的校园生活场景（如红砖墙、Z-Core、创新楼等）与主流音游（PJSK、Arcaea、maimai
          等）的语境结合，仅供娱乐与自我觉察。
        </Text>
        <Text fontWeight="semibold">
          请根据你的直觉选择 A 或 B。
        </Text>
        <UnorderedList spacing={2}>
          <ListItem>没有标准答案，按真实习惯选择即可。</ListItem>
          <ListItem>不要过度纠结措辞，第一印象往往更准。</ListItem>
        </UnorderedList>
      </Flex>
      <Button
        w="min-content"
        colorScheme="primary"
        alignSelf="flex-end"
        onClick={props.onCloseTestInstructions}
      >
        开始测试
      </Button>
    </Flex>
  );
}
