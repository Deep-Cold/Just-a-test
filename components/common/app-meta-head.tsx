import Head from "next/head";

import { useT } from "../../lib/locale-context";

/** 全站默认 title / description（随简繁切换） */
export default function AppMetaHead() {
  const t = useT();
  return (
    <Head>
      <title>{t("appTitle")}</title>
      <meta
        name="description"
        content={t("metaDescription")}
      />
    </Head>
  );
}
