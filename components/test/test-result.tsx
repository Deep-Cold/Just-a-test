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
import { useLocalizeBody, useT } from "../../lib/locale-context";
import LisaEasterEggBanner from "./lisa-easter-egg-banner";
import PolyuSurvivalGuide from "./polyu-survival-guide";

interface TestResultProps {
  testResult: ITestResult;
}

const CLUB_PROMO_SC =
  "马上签名期就要截止啦(｡>ㅅ<｡)，我们还差一些签名才能成为正式的社团，如果你是理大的同学又觉得这个测试有意思。麻烦填一下下面链接的表格拜托啦！";

const CLUB_FORM_URL =
  "https://forms.office.com/pages/responsepage.aspx?id=1-QJ7A89_06cHnuoBgxUFwQ65cePsnRNqvo5heiTSI1UNkFSMTdQWTQxSDc1WUtETzlHTU43MENDNS.4u&route=shorturl";

const DIMENSION_RECAP_KEYS = [
  "dimensionRecapPE",
  "dimensionRecapSM",
  "dimensionRecapAI",
  "dimensionRecapCB",
] as const;

export default function TestResult(props: TestResultProps) {
  const t = useT();
  const localizeBody = useLocalizeBody();
  const archetype = getPersonalityClassGroupByTestScores(
    props.testResult.testScores
  );
  const lisaEggUnlocked = isLisaImaiEasterEgg(props.testResult.testAnswers);

  const nameZh = localizeBody(archetype.name);
  const categoryZh = localizeBody(archetype.category);
  const descriptionZh = localizeBody(archetype.description);
  const polyuSoulZh = localizeBody(archetype.polyuSoul);

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
          {localizeBody(CLUB_PROMO_SC)}
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
          {`${archetype.type} · ${nameZh}`}
        </Highlight>
      </Heading>

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
        {t("resultDimensionRecap")}
      </Heading>
      <UnorderedList spacing={2}>
        {DIMENSION_RECAP_KEYS.map((key) => (
          <ListItem key={key}>{t(key)}</ListItem>
        ))}
      </UnorderedList>

      <Heading
        as="h2"
        id="your-result"
        scrollMarginTop={8}
        size="md"
      >
        {t("resultYourResult")}
      </Heading>
      <Text
        fontWeight="semibold"
        color="primary.600"
      >
        {categoryZh}
      </Text>
      <Table
        size="sm"
        variant="simple"
      >
        <Thead>
          <Tr>
            <Th>{t("resultTableCode")}</Th>
            <Th>{t("resultTableName")}</Th>
            <Th>{t("resultTableDesc")}</Th>
            <Th display={{ base: "none", md: "table-cell" }}>
              {t("resultTableSoul")}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td fontWeight="bold">{archetype.type}</Td>
            <Td>
              {nameZh}
              <Text
                display={{ base: "block", md: "none" }}
                mt={2}
                fontSize="sm"
                color="gray.600"
              >
                {polyuSoulZh}
              </Text>
            </Td>
            <Td>{descriptionZh}</Td>
            <Td display={{ base: "none", md: "table-cell" }}>
              {polyuSoulZh}
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
        {t("resultSurvivalTitle")}
      </Heading>
      <PolyuSurvivalGuide archetype={archetype} />

      <Text
        mt={4}
        fontSize="sm"
        color="gray.600"
        textAlign="justify"
      >
        {t("spectrumFootnote")}
      </Text>
    </Flex>
  );
}
