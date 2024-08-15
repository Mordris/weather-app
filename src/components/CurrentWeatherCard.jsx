import React from "react";
import {
  Box,
  Text,
  VStack,
  Card,
  CardBody,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const CurrentWeatherCard = ({ weather }) => {
  const cardSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <MotionCard
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      boxShadow="lg"
      p={6}
      borderRadius="md"
      size={cardSize}
    >
      <CardBody>
        <Text fontSize="3xl" fontWeight="bold" mb={4}>
          Current Weather
        </Text>
        <VStack spacing={4} align="start">
          <Box>
            <Text fontSize="lg">
              Temperature:{" "}
              <Text as="span" fontWeight="bold" fontSize="xl">
                {weather.current.temperature_2m}°C
              </Text>
            </Text>
            <Text fontSize="lg">
              Wind Speed:{" "}
              <Text as="span" fontWeight="bold" fontSize="xl">
                {weather.current.wind_speed_10m} km/h
              </Text>
            </Text>
            <Text fontSize="lg">
              Precipitation:{" "}
              <Text as="span" fontWeight="bold" fontSize="xl">
                {weather.current.precipitation} mm
              </Text>
            </Text>
            <Text fontSize="lg">
              Relative Humidity:{" "}
              <Text as="span" fontWeight="bold" fontSize="xl">
                {weather.current.relative_humidity_2m}%
              </Text>
            </Text>
            <Text fontSize="lg">
              Sea-Level Pressure:{" "}
              <Text as="span" fontWeight="bold" fontSize="xl">
                {weather.current.pressure_msl} hPa
              </Text>
            </Text>
          </Box>
        </VStack>
      </CardBody>
    </MotionCard>
  );
};

export default CurrentWeatherCard;
