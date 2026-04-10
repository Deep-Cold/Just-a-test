import {
  Flex,
  Box,
  Heading,
  Highlight,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  UnorderedList,
  ListItem,
  Link,
} from "@chakra-ui/react";

import {
  TestResult as ITestResult,
  getPersonalityClassGroupByTestScores,
} from "../../lib/personality-test";
import { isLisaImaiEasterEgg } from "../../lib/lisa-easter-egg";
import LisaEasterEggBanner from "./lisa-easter-egg-banner";
import PolyuSurvivalGuide from "./polyu-survival-guide";

interface TestResultProps {
  testResult: ITestResult;
}

const DIMENSION_RECAP_LINES = [
  "P/E (Precision/Expression)：精度至上 vs. 表现至上",
  "S/M (Solitary/Multi)：独行侠 vs. 社交达人",
  "A/I (Analytical/Intuitive)：逻辑分析 vs. 肌肉直觉",
  "C/B (Consistent/Burst)：持久稳定 vs. 瞬间爆发",
];

const SPECTRUM_FOOTNOTE =
  "这个系统涵盖了从「硬核技术宅」到「社交小蝴蝶」的所有光谱。";

const CLUB_FORM_URL =
  "https://forms.office.com/pages/responsepage.aspx?id=1-QJ7A89_06cHnuoBgxUFwQ65cePsnRNqvo5heiTSI1UNkFSMTdQWTQxSDc1WUtETzlHTU43MENDNS4u&route=shorturl";

export default function TestResult(props: TestResultProps) {
  const archetype = getPersonalityClassGroupByTestScores(
    props.testResult.testScores
  );
  const lisaEggUnlocked = isLisaImaiEasterEgg(props.testResult.testAnswers);

  return (
    <Flex
      my={4}
      w={{
        base: "full",
        lg: "50%",
      }}
      h="full"
      px={{ base: 4, md: 8 }}
      gap={6}
      alignItems="stretch"
      direction="column"
    >
      <Box
        w="full"
        rounded="lg"
        borderWidth="1px"
        borderColor="primary.200"
        bg="primary.50"
        px={4}
        py={3}
      >
        <Text
          fontSize="sm"
          lineHeight="tall"
          color="gray.700"
        >
          {
            "马上签名期就要截止啦(｡>ㅅ<｡)，我们还差一些签名才能成为正式的社团，如果你是理大的同学又觉得这个测试有意思。麻烦填一下下面链接的表格拜托啦！"
          }
        </Text>
        <Link
          href={CLUB_FORM_URL}
          isExternal
          display="block"
          mt={2}
          fontSize="sm"
          fontWeight="semibold"
          color="primary.600"
          wordBreak="break-all"
        >
          {CLUB_FORM_URL}
        </Link>
      </Box>

      <Heading
        id={archetype.type}
        as="h1"
        textAlign="center"
        size="lg"
      >
        <Highlight
          query={archetype.type}
          styles={{ color: "primary.500" }}
        >
          {`${archetype.type} · ${archetype.name}`}
        </Highlight>
      </Heading>
      <Text
        textAlign="center"
        color="gray.600"
        fontSize="sm"
      >
        {archetype.nameEn}
      </Text>

      <Box
        w={200}
        h={200}
        borderRadius="xl"
        bg="primary.50"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="3xl"
        fontWeight="bold"
        color="primary.600"
        flexShrink={0}
        alignSelf="center"
        aria-hidden
      >
        {archetype.type}
      </Box>

      <Heading
        as="h2"
        id="dimension-recap"
        scrollMarginTop={8}
        size="md"
      >
        维度回顾
      </Heading>
      <UnorderedList spacing={2}>
        {DIMENSION_RECAP_LINES.map((line) => (
          <ListItem key={line}>{line}</ListItem>
        ))}
      </UnorderedList>

      <Heading
        as="h2"
        id="your-result"
        scrollMarginTop={8}
        size="md"
      >
        测试结果
      </Heading>
      <Text
        fontWeight="semibold"
        color="primary.600"
      >
        {archetype.category}
      </Text>
      <Table
        size="sm"
        variant="simple"
      >
        <Thead>
          <Tr>
            <Th>编码</Th>
            <Th>名称</Th>
            <Th>描述</Th>
            <Th display={{ base: "none", md: "table-cell" }}>
              对应的理大灵魂
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td fontWeight="bold">{archetype.type}</Td>
            <Td>
              {archetype.name}
              <Text
                display={{ base: "block", md: "none" }}
                mt={2}
                fontSize="sm"
                color="gray.600"
              >
                {archetype.polyuSoul}
              </Text>
            </Td>
            <Td>{archetype.description}</Td>
            <Td display={{ base: "none", md: "table-cell" }}>
              {archetype.polyuSoul}
            </Td>
          </Tr>
        </Tbody>
      </Table>

      {lisaEggUnlocked ? <LisaEasterEggBanner /> : null}

      <Heading
        as="h2"
        id="survival-tips"
        scrollMarginTop={8}
        size="md"
      >
        给你的理大生存建议
      </Heading>
      <PolyuSurvivalGuide archetype={archetype} />

      <Text
        mt={4}
        fontSize="sm"
        color="gray.600"
        textAlign="justify"
      >
        {SPECTRUM_FOOTNOTE}
      </Text>
    </Flex>
  );
}
