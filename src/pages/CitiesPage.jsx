import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Text,
  Input,
  Button,
  FormControl,
  HStack,
  IconButton,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionButton = motion(Button);
const MotionIconButton = motion(IconButton);

const CitiesPage = () => {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState("");
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem("cities")) || [];
    setCities(savedCities);
  }, []);

  const handleAddCity = () => {
    if (newCity.trim() === "") return;
    const updatedCities = [...cities, newCity.trim()];
    setCities(updatedCities);
    localStorage.setItem("cities", JSON.stringify(updatedCities));
    setNewCity("");
    toast({
      title: "City Added",
      description: `"${newCity.trim()}" has been added to your saved cities.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleRemoveCity = (cityToRemove) => {
    const updatedCities = cities.filter((city) => city !== cityToRemove);
    setCities(updatedCities);
    localStorage.setItem("cities", JSON.stringify(updatedCities));
    toast({
      title: "City Removed",
      description: `"${cityToRemove}" has been removed from your saved cities.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleCityClick = (city) => {
    navigate("/", {
      state: { city },
      replace: true,
    });
  };

  return (
    <Box p={6} bg="brand.100" minHeight="100vh">
      <VStack spacing={6} align="center">
        <Text fontSize="3xl" mb={6} fontWeight="bold">
          Saved Cities
        </Text>
        <HStack spacing={6}>
          <FormControl>
            <Input
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              placeholder="Add a new city"
              fontSize="lg"
              p={4}
              borderColor="orange.500"
              _focus={{ borderColor: "orange.600" }}
            />
          </FormControl>
          <MotionButton
            size={buttonSize}
            colorScheme="teal"
            onClick={handleAddCity}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            fontSize="lg"
          >
            Add City
          </MotionButton>
        </HStack>
        <VStack spacing={4} align="start" mt={6}>
          {cities.map((city, index) => (
            <Box
              key={index}
              bg="white"
              p={4}
              borderRadius="md"
              boxShadow="md"
              w="full"
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              onClick={() => handleCityClick(city)}
              fontSize="lg"
            >
              <HStack justify="space-between">
                <Text fontSize="xl" fontWeight="medium">
                  {city}
                </Text>
                <MotionIconButton
                  icon={<CloseIcon />}
                  colorScheme="red"
                  size={buttonSize}
                  onClick={() => handleRemoveCity(city)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default CitiesPage;
