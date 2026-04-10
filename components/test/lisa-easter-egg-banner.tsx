import { Box, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { LISA_IMAI_EASTER_EGG_QUOTE } from "../../lib/lisa-easter-egg";
import { useLocalizeBody, useT } from "../../lib/locale-context";

/** 解锁今井莉莎隐藏彩蛋时，在结果页展示的横幅 */
export default function LisaEasterEggBanner() {
  const { basePath } = useRouter();
  const t = useT();
  const localizeBody = useLocalizeBody();
  const imageSrc = `${basePath}/images/mbti/lisa!!!.png`;

  return (
    <Box
      w="full"
      rounded="lg"
      borderWidth="2px"
      borderColor="pink.400"
      bg="pink.50"
      px={4}
      py={4}
      aria-live="polite"
    >
      <Box
        w="full"
        mb={3}
        rounded="md"
        overflow="hidden"
        bg="white"
      >
        <Image
          src={imageSrc}
          alt={t("lisaImageAlt")}
          w="full"
          maxH={{ base: "220px", sm: "280px" }}
          objectFit="contain"
          objectPosition="center top"
        />
      </Box>
      <Text
        fontSize="xs"
        fontWeight="bold"
        color="pink.700"
        letterSpacing="wider"
        mb={2}
      >
        {t("lisaEggBadge")}
      </Text>
      <Text
        fontSize="md"
        fontWeight="semibold"
        color="gray.800"
        fontStyle="italic"
      >
        {localizeBody(LISA_IMAI_EASTER_EGG_QUOTE)}
      </Text>
    </Box>
  );
}
