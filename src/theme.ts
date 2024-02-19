import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      400: "#828FA3",
      700: "#2B2C37",
      750: "#22232E",
      800: "#20212C",
    },
    purple: {
      500: "#A8A4FF",
      800: "#635FC7",
    },
    red: {
      800: "#EA5555",
    },
  },
});

export default theme;
