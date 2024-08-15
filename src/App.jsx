import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme";
import MainLayout from "./components/MainLayout";
import ViewWeatherPage from "./pages/ViewWeatherPage";
import CitiesPage from "./pages/CitiesPage";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<ViewWeatherPage />} />
            <Route path="/cities" element={<CitiesPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
