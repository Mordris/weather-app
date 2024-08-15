import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import theme from "./theme"; // Import the custom theme

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
