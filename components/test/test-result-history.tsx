import Link from "next/link";
import { Flex, Heading, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "dayjs/locale/zh-hk";
import { FiChevronRight } from "react-icons/fi";

import { TestResult } from "../../lib/personality-test";
import { useLocale, useT } from "../../lib/locale-context";

interface TestResultHistoryProps {
  testResults: TestResult[];
}

export default function TestResultHistory(props: TestResultHistoryProps) {
  const t = useT();
  const { locale } = useLocale();
  const dayjsLocale = locale === "zh-Hant" ? "zh-hk" : "zh-cn";

  return (
    <Flex
      my={4}
      w={{
        base: "full",
        lg: "50%",
      }}
      h="full"
      px={8}
      gap={8}
      alignSelf="flex-start"
      alignItems="center"
      direction="column"
    >
      <Heading
        as="h1"
        textAlign="center"
      >
        {t("historyTitle")}
      </Heading>
      <Flex
        w="full"
        gap={4}
        direction="column"
      >
        {props.testResults.map((testResult) => (
          <Flex
            key={testResult.timestamp}
            as={Link}
            href={`/test/result/${testResult.timestamp}`}
            py={2}
            px={4}
            w="full"
            rounded="md"
            cursor="pointer"
            alignItems="center"
            justifyContent="space-between"
            borderWidth={1}
            borderColor="gray.100"
            _hover={{
              bg: "gray.100",
            }}
          >
            <Text>
              {dayjs(testResult.timestamp)
                .locale(dayjsLocale)
                .format("YYYY年M月D日 HH:mm")}
            </Text>
            <FiChevronRight />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
