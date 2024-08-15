import React from "react";
import { Button, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

const WeatherNavigation = ({
  handlePreviousDay,
  handleNextDay,
  selectedDateIndex,
  length,
}) => {
  // Determine button styles based on whether they are disabled or not
  const prevButtonStyles =
    selectedDateIndex === 0
      ? { opacity: 0.5, cursor: "not-allowed" } // Fade and disable cursor for the previous button
      : {};

  const nextButtonStyles =
    selectedDateIndex >= length - 1
      ? { opacity: 0.5, cursor: "not-allowed" } // Fade and disable cursor for the next button
      : {};

  return (
    <HStack spacing={4}>
      <MotionButton
        onClick={handlePreviousDay}
        disabled={selectedDateIndex === 0}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="shake" // Apply shake class for vibration effect
        style={prevButtonStyles} // Apply styles based on button state
      >
        Previous Day
      </MotionButton>
      <MotionButton
        onClick={handleNextDay}
        disabled={selectedDateIndex >= length - 1}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="shake" // Apply shake class for vibration effect
        style={nextButtonStyles} // Apply styles based on button state
      >
        Next Day
      </MotionButton>
    </HStack>
  );
};

export default WeatherNavigation;
