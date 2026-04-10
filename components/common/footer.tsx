import { Flex, Text, Link } from "@chakra-ui/react";

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
      px={2}
      textAlign="center"
    >
      <Text fontSize="sm">
        🔨 Made by{" "}
        <Link
          href="https://github.com/Deep-Cold"
          isExternal
          color="primary.300"
          fontWeight="semibold"
        >
          Deep-Cold
        </Link>{" "}
        and{" "}
        <Link
          href="https://github.com/shiguangWilliam"
          isExternal
          color="primary.300"
          fontWeight="semibold"
        >
          shiguangWilliam
        </Link>{" "}
        based on the work of{" "}
        <Link
          href="https://github.com/rauf-21"
          isExternal
          color="primary.300"
          fontWeight="semibold"
        >
          rauf-21
        </Link>
      </Text>
    </Flex>
  );
}
