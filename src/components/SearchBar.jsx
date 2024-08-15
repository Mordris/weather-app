import React from "react";
import {
  Input,
  Button,
  FormControl,
  HStack,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";

const SearchBar = ({ regionInput, setRegionInput, handleSearch }) => {
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <FormControl mb={6} textAlign="center">
      <HStack spacing={4} justify="center">
        <Box width={{ base: "80%", sm: "60%", md: "40%", lg: "30%" }}>
          <Input
            id="region-search"
            value={regionInput}
            onChange={(e) => setRegionInput(e.target.value)}
            placeholder="Enter city name"
            variant="outline"
            size="lg"
            borderColor="orange.500" // Set the border color to orange
            _focus={{ borderColor: "orange.600" }} // Change border color on focus
          />
        </Box>
        <Button colorScheme="teal" size={buttonSize} onClick={handleSearch}>
          Search
        </Button>
      </HStack>
    </FormControl>
  );
};

export default SearchBar;
