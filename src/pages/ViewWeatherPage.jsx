import React, { useState, useEffect, useCallback } from "react";
import { Box, VStack, useToast, Spinner, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CurrentWeatherCard from "../components/CurrentWeatherCard";
import DailyWeatherCard from "../components/DailyWeatherCard";
import WeatherNavigation from "../components/WeatherNavigation";
import { fetchWeather, fetchCoordinates } from "../utils/api";

const ViewWeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [regionInput, setRegionInput] = useState("");
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const location = useLocation();

  const handleSearch = useCallback(
    async (input = regionInput) => {
      if (input.trim()) {
        setLoading(true);
        try {
          const coords = await fetchCoordinates(input);
          if (coords) {
            const { lat, lon } = coords;
            const weatherData = await fetchWeather(lat, lon);
            if (weatherData) {
              setWeather(weatherData);
              setSelectedDateIndex(0); // Reset to today's data
            } else {
              toast({
                title: "Error",
                description: "Failed to fetch weather data.",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          } else {
            toast({
              title: "Error",
              description: "City not found.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to fetch city coordinates.",
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
    [regionInput, toast]
  );

  useEffect(() => {
    const cityFromStorage = JSON.parse(localStorage.getItem("selectedCity"));
    if (cityFromStorage) {
      setRegionInput(cityFromStorage);
      handleSearch(cityFromStorage);
      localStorage.removeItem("selectedCity"); // Clear the selected city after using it
    } else if (location.state?.city) {
      setRegionInput(location.state.city);
      handleSearch(location.state.city);
    }
  }, [handleSearch, location.state?.city]);

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
