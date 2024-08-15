import React from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const AppBar = () => {
  const headingSize = useBreakpointValue({ base: "lg", md: "xl" });

  return (
    <Box as="header" bg="brand.300" color="white" py={4} px={6}>
      <Flex align="center" justify="space-between">
        <Heading size={headingSize}>WeatherApp</Heading>
        <Flex>
          <Button as={Link} to="/" variant="solid" mx={2}>
            Weather
          </Button>
          <Button as={Link} to="/cities" variant="solid" mx={2}>
            Cities
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AppBar;
