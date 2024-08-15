import React from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Image,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaCloudSun, FaCity } from "react-icons/fa";
import logo from "../assets/logo.png";

const AppBar = () => {
  const headingSize = useBreakpointValue({ base: "lg", md: "xl" });

  return (
    <Box as="header" bg="brand.300" color="white" py={4} px={6}>
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <Image src={logo} alt="WeatherApp Logo" boxSize="40px" mr={2} />
          <Heading size={headingSize}>WeatherApp</Heading>
        </Flex>
        <Flex>
          <Button
            as={Link}
            to="/"
            variant="solid"
            mx={2}
            leftIcon={<Icon as={FaCloudSun} boxSize={6} />}
          >
            Weather
          </Button>
          <Button
            as={Link}
            to="/cities"
            variant="solid"
            mx={2}
            leftIcon={<Icon as={FaCity} boxSize={6} />}
          >
            Cities
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AppBar;
