import React from "react";
import { Box } from "@chakra-ui/react";
import AppBar from "./AppBar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar />
      <Box flex="1" p={4}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
