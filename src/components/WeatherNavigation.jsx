import React from "react";
import { HStack, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const WeatherNavigation = ({
  handlePreviousDay,
  handleNextDay,
  selectedDateIndex,
  length,
}) => {
  return (
    <HStack spacing={4} mt={4}>
      <IconButton
        aria-label="Previous Day"
        icon={<ChevronLeftIcon />}
        onClick={handlePreviousDay}
        isDisabled={selectedDateIndex === 0}
      />
      <IconButton
        aria-label="Next Day"
        icon={<ChevronRightIcon />}
        onClick={handleNextDay}
        isDisabled={selectedDateIndex === length - 1}
      />
    </HStack>
  );
};

export default WeatherNavigation;
