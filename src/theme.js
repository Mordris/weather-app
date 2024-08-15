import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#F5D6C6", // Light orange
      200: "#F1B54C", // Orange
      300: "#F57C00", // Dark orange
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "md",
      },
      variants: {
        solid: {
          bg: "brand.300",
          color: "white",
          _hover: {
            bg: "brand.200",
          },
        },
      },
    },
  },
});

export default theme;
