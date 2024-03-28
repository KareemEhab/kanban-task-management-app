import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const darkThemeConfig: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  darkThemeConfig,
  colors: {
    white: {
      600: "#E4EBFA",
      700: "#F4F7FD",
      800: "#FFFFFF",
    },
    gray: {
      400: "#828FA3",
      500: "#3E3F4E",
      700: "#2B2C37",
      750: "#22232E",
      800: "#20212C",
      900: "#000112",
    },
    purple: {
      500: "#A8A4FF",
      800: "#635FC7",
    },
    red: {
      500: "#FF9898",
      800: "#EA5555",
    },
  },
  components: {
    Input: {
      baseStyle: {
        light: {
          color: "gray.800",
          placeholderColor: "gray.800",
          placeholderOpacity: "25%",
        },
        dark: {
          color: "white.800",
          placeholderColor: "white.800",
          placeholderOpacity: "25%",
        },
      },
    },
  },
});

export default theme;
