import React from "react";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";

const SearchBar = ({ regionInput, setRegionInput, handleSearch }) => {
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <FormControl mb={6}>
      <FormLabel htmlFor="region-search">Search Region</FormLabel>
      <HStack spacing={4}>
        <Input
          id="region-search"
          value={regionInput}
          onChange={(e) => setRegionInput(e.target.value)}
          placeholder="Enter city name"
          variant="outline"
          size="lg"
        />
        <Button colorScheme="teal" size={buttonSize} onClick={handleSearch}>
          Search
        </Button>
      </HStack>
    </FormControl>
  );
};

export default SearchBar;
