import type { ReactNode } from "react";
import {
  Box,
  Divider,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

import type { ResultArchetype } from "../../lib/result-archetypes";
import { getPolyuSurvivalTip } from "../../lib/polyu-survival-tips";

function TraitQuote({ children }: { children: ReactNode }) {
  return (
    <Box
      borderLeftWidth="4px"
      borderColor="primary.300"
      pl={4}
      py={2}
      my={3}
      bg="gray.50"
      rounded="md"
    >
      <Text fontSize="sm" color="gray.700">
        {children}
      </Text>
    </Box>
  );
}

function Bold({ children }: { children: ReactNode }) {
  return (
    <Text as="span" fontWeight="bold">
      {children}
    </Text>
  );
}

function guideTitleLine(archetype: ResultArchetype): string {
  if (archetype.type === "EMIC") {
    return "EMIC 【理大向日葵 (莉莎型)】";
  }
  return `${archetype.type} 【${archetype.name}】`;
}

export default function PolyuSurvivalGuide({
  archetype,
}: {
  archetype: ResultArchetype;
}) {
  const tip = getPolyuSurvivalTip(archetype.type);

  return (
    <Box w="full">
      <Text fontSize="sm" lineHeight="tall" color="gray.700" textAlign="justify">
        下面是根据你的测试结果{" "}
        <Bold>
          {archetype.type} · {archetype.name}
        </Bold>{" "}
        定制的理大生存建议：既是音游向提示，也针对你在{" "}
        <Bold>香港理工大学（PolyU）</Bold> 学习与生活里容易踩坑的地方。
      </Text>

      <Divider my={6} borderColor="gray.200" />

      <Heading as="h3" size="sm" mb={3} scrollMarginTop={8}>
        {archetype.category}
      </Heading>
      <TraitQuote>
        <Bold>特质：</Bold> {tip.trait}
      </TraitQuote>

      <Text fontWeight="bold" mb={2} fontSize="sm">
        {guideTitleLine(archetype)}
      </Text>
      <UnorderedList spacing={2}>
        <ListItem>
          <Bold>生存建议：</Bold>
          {tip.survival}
        </ListItem>
        <ListItem>
          <Bold>避坑：</Bold>
          {tip.pitfall}
        </ListItem>
      </UnorderedList>

      <Divider my={8} borderColor="gray.200" />

      <Text fontWeight="bold" fontSize="sm" mb={2}>
        测试卡片底部寄语：
      </Text>
      <Box
        borderLeftWidth="4px"
        borderColor="primary.400"
        pl={4}
        py={3}
        bg="primary.50"
        rounded="md"
      >
        <Text fontSize="sm" color="gray.700" fontStyle="italic">
          &ldquo;无论你是哪种谱面，理大的红砖都会记住你敲击屏幕的节奏。祝你在
          PolyU 的这场大型音游中，刷出属于自己的高分！&rdquo;
        </Text>
      </Box>
    </Box>
  );
}
