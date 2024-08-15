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
  const prevButtonStyles =
    selectedDateIndex === 0
      ? { opacity: 0.5, cursor: "not-allowed" }
      : {};

  const nextButtonStyles =
    selectedDateIndex >= length - 1
      ? { opacity: 0.5, cursor: "not-allowed" }
      : {};

  return (
    <HStack spacing={4}>
      <MotionButton
        onClick={handlePreviousDay}
        disabled={selectedDateIndex === 0}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="shake"
        style={prevButtonStyles}
      >
        Previous Day
      </MotionButton>
      <MotionButton
        onClick={handleNextDay}
        disabled={selectedDateIndex >= length - 1}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="shake"
        style={nextButtonStyles}
      >
        Next Day
      </MotionButton>
    </HStack>
  );
};

export default WeatherNavigation;
