import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  VStack,
  useToast,
  Spinner,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import CurrentWeatherCard from "../components/CurrentWeatherCard";
import DailyWeatherCard from "../components/DailyWeatherCard";
import WeatherNavigation from "../components/WeatherNavigation";
import { fetchWeather, fetchCoordinates } from "../utils/api";

const ViewWeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [regionInput, setRegionInput] = useState("");
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debouncedRegionInput, setDebouncedRegionInput] = useState(regionInput);
  const toast = useToast();
  const location = useLocation();

  const handleSearch = useCallback(async () => {
    const searchInput = String(regionInput).trim();

    if (searchInput) {
      setLoading(true);
      setError(null);
      try {
        const coords = await fetchCoordinates(searchInput);
        if (coords) {
          const { lat, lon } = coords;
          const weatherData = await fetchWeather(lat, lon);
          if (weatherData) {
            setWeather(weatherData);
            setSelectedDateIndex(0);
          }
        }
      } catch (error) {
        setError(error.message);
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        title: "Input Error",
        description: "Please enter a city name.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [regionInput, toast]);

  useEffect(() => {
    const cityFromStorage = JSON.parse(localStorage.getItem("selectedCity"));
    if (cityFromStorage) {
      setRegionInput(cityFromStorage);
      localStorage.removeItem("selectedCity");
    } else if (location.state?.city) {
      setRegionInput(location.state.city);
    }
  }, [location.state?.city]);

  useEffect(() => {
    if (regionInput) {
      handleSearch();
    }
  }, [regionInput, handleSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedRegionInput(regionInput);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [regionInput]);

  const handleDayChange = (increment) => {
    setSelectedDateIndex((prevIndex) =>
      Math.max(
        0,
        Math.min(weather?.daily.time.length - 1, prevIndex + increment)
      )
    );
  };

  return (
    <Box p={4} bg="brand.100" minHeight="100vh">
      <Box textAlign="center" mb={6}>
        <Input
          value={regionInput}
          onChange={(e) => setRegionInput(e.target.value)}
          placeholder="Enter city name"
          mb={2}
        />
        <Button onClick={handleSearch}>Search</Button>
      </Box>
      {loading ? (
        <VStack spacing={4} align="center">
          <Spinner size="xl" />
          <Text>Loading weather data...</Text>
        </VStack>
      ) : error ? (
        <Text color="red.500" fontSize="lg">
          {error}
        </Text>
      ) : weather ? (
        <VStack spacing={4} align="center">
          <CurrentWeatherCard weather={weather} />
          <DailyWeatherCard
            weather={weather}
            selectedDateIndex={selectedDateIndex}
          />
          <WeatherNavigation
            handlePreviousDay={() => handleDayChange(-1)}
            handleNextDay={() => handleDayChange(1)}
            selectedDateIndex={selectedDateIndex}
            length={weather.daily.time.length}
          />
        </VStack>
      ) : (
        <Text>No weather data available. Please search for a city.</Text>
      )}
    </Box>
  );
};

export default ViewWeatherPage;
