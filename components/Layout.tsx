import { AuthProvider } from "./contexts/AuthContext";
import { Box } from "@mui/material";
import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Theme from "../styles/theme";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Box sx={{ height: "100vh" }}>
        <AuthProvider>
          <Header />
          <main style={{ paddingBottom: 70 }}>{children}</main>
          <Footer />
        </AuthProvider>
      </Box>
    </ThemeProvider>
  );
}
