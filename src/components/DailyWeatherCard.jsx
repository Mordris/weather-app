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

const DailyWeatherCard = ({ weather, selectedDateIndex }) => {
  const cardSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <MotionCard
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      boxShadow="lg"
      p={6}
      borderRadius="md"
      size={cardSize}
    >
      <CardBody>
        {weather.daily && weather.daily.time.length > 0 && (
          <Box>
            <Text fontSize="3xl" fontWeight="bold" mb={4}>
              Weather for{" "}
              {new Date(
                weather.daily.time[selectedDateIndex]
              ).toLocaleDateString()}
            </Text>
            <VStack spacing={3} align="start">
              <Text fontSize="lg">
                Max Temperature:{" "}
                <Text as="span" fontWeight="bold" fontSize="xl">
                  {weather.daily.temperature_2m_max[selectedDateIndex]}°C
                </Text>
              </Text>
              <Text fontSize="lg">
                Min Temperature:{" "}
                <Text as="span" fontWeight="bold" fontSize="xl">
                  {weather.daily.temperature_2m_min[selectedDateIndex]}°C
                </Text>
              </Text>
              <Text fontSize="lg">
                Sunrise:{" "}
                <Text as="span" fontWeight="bold" fontSize="xl">
                  {weather.daily.sunrise[selectedDateIndex]}
                </Text>
              </Text>
              <Text fontSize="lg">
                Sunset:{" "}
                <Text as="span" fontWeight="bold" fontSize="xl">
                  {weather.daily.sunset[selectedDateIndex]}
                </Text>
              </Text>
              <Text fontSize="lg">
                UV Index Max:{" "}
                <Text as="span" fontWeight="bold" fontSize="xl">
                  {weather.daily.uv_index_max[selectedDateIndex]}
                </Text>
              </Text>
              <Text fontSize="lg">
                Precipitation Sum:{" "}
                <Text as="span" fontWeight="bold" fontSize="xl">
                  {weather.daily.precipitation_sum[selectedDateIndex]} mm
                </Text>
              </Text>
              <Text fontSize="lg">
                Precipitation Hours:{" "}
                <Text as="span" fontWeight="bold" fontSize="xl">
                  {weather.daily.precipitation_hours[selectedDateIndex]} hours
                </Text>
              </Text>
            </VStack>
          </Box>
        )}
      </CardBody>
    </MotionCard>
  );
};

export default DailyWeatherCard;
