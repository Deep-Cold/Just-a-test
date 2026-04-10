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
import type { UiStringKey } from "../../lib/ui-strings";
import { useLocalizeBody, useT } from "../../lib/locale-context";

const POLYU_CLOSING_QUOTE_SC =
  "无论你是哪种谱面，理大的红砖都会记住你敲击屏幕的节奏。祝你在 PolyU 的这场大型音游中，刷出属于自己的高分！";

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

function guideTitleLine(
  archetype: ResultArchetype,
  t: (key: UiStringKey) => string,
  loc: (s: string) => string
): string {
  if (archetype.type === "EMIC") {
    return t("guideTitleEmic");
  }
  return `${archetype.type} 【${loc(archetype.name)}】`;
}

export default function PolyuSurvivalGuide({
  archetype,
}: {
  archetype: ResultArchetype;
}) {
  const t = useT();
  const loc = useLocalizeBody();
  const tip = getPolyuSurvivalTip(archetype.type);

  return (
    <Box w="full">
      <Text fontSize="sm" lineHeight="tall" color="gray.700" textAlign="justify">
        {t("polyIntroBefore")}{" "}
        <Bold>
          {archetype.type} · {loc(archetype.name)}
        </Bold>{" "}
        {t("polyIntroAfter")}{" "}
        <Bold>{t("polyIntroPolyu")}</Bold> {t("polyIntroTail")}
      </Text>

      <Divider my={6} borderColor="gray.200" />

      <Heading as="h3" size="sm" mb={3} scrollMarginTop={8}>
        {loc(archetype.category)}
      </Heading>
      <TraitQuote>
        <Bold>{t("polyTrait")}</Bold> {loc(tip.trait)}
      </TraitQuote>

      <Text fontWeight="bold" mb={2} fontSize="sm">
        {guideTitleLine(archetype, t, loc)}
      </Text>
      <UnorderedList spacing={2}>
        <ListItem>
          <Bold>{t("polySurvival")}</Bold>
          {loc(tip.survival)}
        </ListItem>
        <ListItem>
          <Bold>{t("polyPitfall")}</Bold>
          {loc(tip.pitfall)}
        </ListItem>
      </UnorderedList>

      <Divider my={8} borderColor="gray.200" />

      <Text fontWeight="bold" fontSize="sm" mb={2}>
        {t("polyClosingTitle")}
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
          &ldquo;{loc(POLYU_CLOSING_QUOTE_SC)}&rdquo;
        </Text>
      </Box>
    </Box>
  );
}
