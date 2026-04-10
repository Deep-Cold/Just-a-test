import { Button, HStack } from "@chakra-ui/react";

import { useLocale, useT } from "../../lib/locale-context";
import type { AppLocale } from "../../lib/ui-strings";

export default function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();
  const t = useT();
  const aria = t("localeSwitcherAria");

  function pick(next: AppLocale) {
    setLocale(next);
  }

  return (
    <HStack
      spacing={0}
      role="group"
      aria-label={aria}
    >
      <Button
        size="xs"
        variant={locale === "zh-Hans" ? "solid" : "ghost"}
        colorScheme={locale === "zh-Hans" ? "primary" : "gray"}
        onClick={() => pick("zh-Hans")}
        rounded="md"
        px={2}
      >
        {t("localeHans")}
      </Button>
      <Button
        size="xs"
        variant={locale === "zh-Hant" ? "solid" : "ghost"}
        colorScheme={locale === "zh-Hant" ? "primary" : "gray"}
        onClick={() => pick("zh-Hant")}
        rounded="md"
        px={2}
      >
        {t("localeHant")}
      </Button>
    </HStack>
  );
}
