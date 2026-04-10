import { Text } from "@chakra-ui/react";

import { useT } from "../../lib/locale-context";

export function PageLoadingText() {
  const t = useT();
  return <Text>{t("pageLoading")}</Text>;
}

export function PageErrorText() {
  const t = useT();
  return <Text>{t("pageError")}</Text>;
}

export function PageNoDataText() {
  const t = useT();
  return <Text>{t("pageNoData")}</Text>;
}
