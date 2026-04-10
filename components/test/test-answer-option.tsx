import { useRadio, Box } from "@chakra-ui/react";

export default function TestAnswerOption(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps();
  const radio = getRadioProps();

  return (
    <Box
      w="full"
      as="label"
    >
      <input {...input} />
      <Box
        px={5}
        py={3}
        cursor="pointer"
        borderWidth={1}
        borderRadius="md"
        userSelect="none"
        _checked={{
          bg: "primary.500",
          color: "white",
          borderColor: "primary.500",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        {...radio}
      >
        {props.children}
      </Box>
    </Box>
  );
}
