import React, { useState, useEffect, useCallback } from "react";
import { Box, VStack, useToast, Spinner, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import CurrentWeatherCard from "../components/CurrentWeatherCard";
import DailyWeatherCard from "../components/DailyWeatherCard";
import WeatherNavigation from "../components/WeatherNavigation";
import SearchBar from "../components/SearchBar";
import { fetchWeather, fetchCoordinates } from "../utils/api";

const ViewWeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [regionInput, setRegionInput] = useState("");
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debouncedRegionInput, setDebouncedRegionInput] = useState(regionInput);
  const [initialFetchDone, setInitialFetchDone] = useState(false);
  const toast = useToast();
  const location = useLocation();

  const handleSearch = useCallback(
    async (input) => {
      const searchInput = String(input).trim();

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
    },
    [toast]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedRegionInput(regionInput);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [regionInput]);

  useEffect(() => {
    if (!initialFetchDone) {
      const cityFromStorage = JSON.parse(localStorage.getItem("selectedCity"));
      const city = cityFromStorage || location.state?.city;

      if (city) {
        setRegionInput(city);
        handleSearch(city);
        setInitialFetchDone(true);
        if (cityFromStorage) localStorage.removeItem("selectedCity");
      }
    }
  }, [handleSearch, location.state?.city, initialFetchDone]);

  useEffect(() => {
    if (debouncedRegionInput && !initialFetchDone) {
      handleSearch(debouncedRegionInput);
    }
  }, [debouncedRegionInput, handleSearch, initialFetchDone]);

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
      <SearchBar
        regionInput={regionInput}
        setRegionInput={setRegionInput}
        handleSearch={handleSearch}
      />
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
