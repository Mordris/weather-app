import React from "react";
import { Box, Text, useBreakpointValue } from "@chakra-ui/react";

const Footer = () => {
  const textSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box as="footer" bg="brand.100" color="brand.300" py={4} px={6}>
      <Text textAlign="center" fontSize={textSize}>
        © {new Date().getFullYear()} WeatherApp. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
