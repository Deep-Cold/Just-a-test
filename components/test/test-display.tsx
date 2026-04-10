import { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";

import TestMenu from "./test-menu";
import TestInstructions from "./test-instructions";
import TestQuestion from "./test-question";

export default function TestDisplay() {
  const [showTestInstructions, setShowTestInstructions] = useState(true);

  function handleShowInstructionsButtonClick() {
    setShowTestInstructions(true);
  }

  function handleCloseTestInstructions() {
    setShowTestInstructions(false);
  }

  return (
    <Flex
      alignSelf="stretch"
      w="full"
      direction="column"
      alignItems="stretch"
      justifyContent="center"
    >
      <Box
        w="full"
        maxW={{ base: "100%", sm: "min(100%, 36rem)", lg: "min(100%, 42rem)" }}
        mx="auto"
        bg="white"
        borderRadius={{ base: "none", sm: "2xl" }}
        borderWidth={{ base: "0", sm: "1px" }}
        borderColor="gray.100"
        boxShadow={{ base: "none", sm: "md" }}
        px={{ base: 4, sm: 6, md: 8 }}
        py={{ base: 5, md: 8 }}
      >
        <TestMenu
          onShowInstructionsButtonClick={handleShowInstructionsButtonClick}
        />
        <Flex w="full">
          {showTestInstructions ? (
            <TestInstructions
              onCloseTestInstructions={handleCloseTestInstructions}
            />
          ) : (
            <TestQuestion />
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
