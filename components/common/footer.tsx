import { Flex, Text, Link } from "@chakra-ui/react";

import { useT } from "../../lib/locale-context";

export default function Footer() {
  const t = useT();

  return (
    <Flex
      as="footer"
      py={2}
      w="100%"
      h="full"
      bg="black"
      color="white"
      direction="column"
      justifyContent="center"
      alignItems="center"
      px={2}
      textAlign="center"
    >
      <Text fontSize="sm">
        🔨 {t("footerMadeBy")}{" "}
        <Link
          href="https://github.com/Deep-Cold"
          isExternal
          color="primary.300"
          fontWeight="semibold"
        >
          Deep-Cold
        </Link>{" "}
        {t("footerAnd")}{" "}
        <Link
          href="https://github.com/shiguangWilliam"
          isExternal
          color="primary.300"
          fontWeight="semibold"
        >
          shiguangWilliam
        </Link>{" "}
        {t("footerBasedOn")}{" "}
        <Link
          href="https://github.com/rauf-21"
          isExternal
          color="primary.300"
          fontWeight="semibold"
        >
          rauf-21
        </Link>
        {t("footerWork")}
      </Text>
    </Flex>
  );
}
