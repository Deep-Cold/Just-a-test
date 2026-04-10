import Link from "next/link";
import { Heading, Text, Highlight, Flex, Button } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";

import MainLayout from "../components/layouts/main-layout";
import { useT } from "../lib/locale-context";

export default function HomePage() {
  const t = useT();
  const title = t("appTitle");

  return (
    <MainLayout>
      <Flex
        w={{
          base: "full",
          lg: "50%",
        }}
        alignSelf="center"
        px={4}
        gap={8}
        minH="full"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Heading
          as="h1"
          lineHeight="tall"
          textAlign="center"
        >
          <Highlight
            query={title}
            styles={{
              py: 1,
              px: 4,
              rounded: "full",
              bg: "primary.500",
              color: "white",
            }}
          >
            {title}
          </Highlight>
        </Heading>
        <Text
          fontSize="xl"
          align="center"
        >
          {t("indexSubtitle")}
        </Text>
        <Link href="/test">
          <Button
            w="min-content"
            colorScheme="primary"
            variant="outline"
            rightIcon={<FiArrowRight size={20} />}
          >
            {t("indexTakeTest")}
          </Button>
        </Link>
      </Flex>
    </MainLayout>
  );
}
