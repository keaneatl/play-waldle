import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html {
          height: 100%;
        }

        ul {
          list-style-type: none;
        }
        
        body {
            position: relative;
        }
        
        a {
        text-decoration: none;
        }
      `,
    },
  },
  palette: {
    background: {
      default: "#F5F6F2",
      paper: "#F5F6F2",
    },
    primary: {
      main: "#F5F6F2",
      light: "#F7F7F4",
      dark: "#ABACA9",
      contrastText: "#000000",
    },
    secondary: {
      main: "#000000",
      light: "#333333",
      dark: "#000000",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#000000",
    },
  },
});

export default Theme;
