import type { GetStaticProps } from "next";
import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";

import MainLayout from "../components/layouts/main-layout";
import LisaEasterEggBanner from "../components/test/lisa-easter-egg-banner";
import { isLisaEggPreviewEnabled } from "../lib/lisa-egg-preview-env";

/**
 * 静态预览：今井莉莎隐藏彩蛋横幅的实际样式（无需完成答题路径）。
 * 仅当环境变量 `LISA_EGG_PREVIEW` 为 1 / true / yes 时生成该页，否则为 404。
 */
export const getStaticProps: GetStaticProps = () => {
  if (!isLisaEggPreviewEnabled()) {
    return { notFound: true };
  }
  return { props: {} };
};

export default function LisaEggPreviewPage() {
  return (
    <MainLayout>
      <Head>
        <title>彩蛋预览 · 理大音游人格测试设计</title>
      </Head>
      <Flex
        direction="column"
        gap={6}
        w="full"
        maxW="lg"
        mx="auto"
        px={4}
      >
        <Text
          fontSize="sm"
          color="gray.600"
        >
          下方为解锁「今井莉莎限定评价」后在结果页中插入的区块样式预览（与真实解锁时一致）。
        </Text>
        <LisaEasterEggBanner />
      </Flex>
    </MainLayout>
  );
}
