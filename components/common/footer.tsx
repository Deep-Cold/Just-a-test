import Link from "next/link";
import { Flex, Text, Button } from "@chakra-ui/react";

export default function Footer() {
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
    >
      <Text>
        🔨 Made by{" "}
        <Link
          href="https://github.com/rauf-21"
          target="_blank"
        >
          <Button
            colorScheme="primary"
            variant="link"
          >
            rauf-21
          </Button>
        </Link>
      </Text>
    </Flex>
  );
}
