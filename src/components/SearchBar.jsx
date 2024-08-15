import React from "react";
import { Input, Button, FormControl, HStack, Box } from "@chakra-ui/react";

const SearchBar = ({ regionInput, setRegionInput, handleSearch }) => {
  return (
    <FormControl mb={6} textAlign="center">
      <HStack spacing={4} justify="center">
        <Box width={{ base: "90%", sm: "70%", md: "50%" }}>
          {" "}
          <Input
            id="region-search"
            value={regionInput}
            onChange={(e) => setRegionInput(e.target.value)}
            placeholder="Enter city name"
            variant="outline"
            size="md"
            borderColor="orange.500"
            _focus={{ borderColor: "orange.600" }}
            _placeholder={{ color: "gray.500" }}
          />
        </Box>
        <Button
          colorScheme="teal"
          size="md"
          onClick={() => handleSearch(regionInput)}
        >
          Search
        </Button>
      </HStack>
    </FormControl>
  );
};

export default SearchBar;
