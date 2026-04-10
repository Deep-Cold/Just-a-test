import Link from "next/link";
import { Flex, Button } from "@chakra-ui/react";
import { BiHistory } from "react-icons/bi";

import { useT } from "../../lib/locale-context";
import LocaleSwitcher from "./locale-switcher";

export default function Nav() {
  const t = useT();

  return (
    <Flex
      as="nav"
      py={2}
      px={{ base: 2, md: 5 }}
      w="full"
      minH={20}
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
      overflowX="hidden"
      bg="white"
      borderBottomWidth="1px"
      borderColor="gray.100"
    >
      <Flex
        alignItems="center"
        gap={2}
        flexWrap="wrap"
      >
        <Link href="/">
          <Button
            colorScheme="black"
            variant="link"
            fontWeight="bold"
            whiteSpace="normal"
            textAlign="left"
            h="auto"
            py={1}
          >
            {t("appTitle")}
          </Button>
        </Link>
        <LocaleSwitcher />
      </Flex>
      <Link href="/test/result/history">
        <Button
          variant="outline"
          leftIcon={<BiHistory size={24} />}
          size="sm"
        >
          {t("navHistory")}
        </Button>
      </Link>
    </Flex>
  );
}
