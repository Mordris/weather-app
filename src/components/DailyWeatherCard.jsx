import React from "react";
import { Box, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import "../index.css"; // Ensure this path is correct

const MotionBox = motion(Box);

const DailyWeatherCard = ({ weather, selectedDateIndex }) => {
  const cardSize = useBreakpointValue({ base: "sm", md: "md" });
  const currentDate = weather.daily?.time[selectedDateIndex];

  return (
    <Box>
      <Text fontSize="3xl" fontWeight="bold" mb={4}>
        Weather for {new Date(currentDate).toLocaleDateString()}
      </Text>
      <AnimatePresence>
        <MotionBox
          key={currentDate}
          initial={{ opacity: 0 }} // Fade in from transparent
          animate={{ opacity: 1 }} // Fade in to fully opaque
          exit={{ opacity: 0 }} // Fade out to transparent
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="shake" // Apply shake class for vibration effect
          boxShadow="lg"
          p={6}
          borderRadius="md"
          size={cardSize}
          bg="white"
        >
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
                {new Date(
                  weather.daily.sunrise[selectedDateIndex]
                ).toLocaleTimeString()}
              </Text>
            </Text>
            <Text fontSize="lg">
              Sunset:{" "}
              <Text as="span" fontWeight="bold" fontSize="xl">
                {new Date(
                  weather.daily.sunset[selectedDateIndex]
                ).toLocaleTimeString()}
              </Text>
            </Text>
            <Text fontSize="lg">
              UV Index:{" "}
              <Text as="span" fontWeight="bold" fontSize="xl">
                {weather.daily.uv_index_max[selectedDateIndex]}
              </Text>
            </Text>
            <Text fontSize="lg">
              Precipitation:{" "}
              <Text as="span" fontWeight="bold" fontSize="xl">
                {weather.daily.precipitation_sum[selectedDateIndex]} mm
              </Text>
            </Text>
          </VStack>
        </MotionBox>
      </AnimatePresence>
    </Box>
  );
};

export default DailyWeatherCard;
