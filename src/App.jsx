import React, { useState, useMemo, useEffect, useTransition } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
        ...(mode === "light"
      ? {
          primary: { main: "#0097a7" }, // Darker cyan for better contrast
          secondary: { main: "#00bfa5" },
          background: { default: "#e0f7fa", paper: "#ffffff" },
          text: { primary: "#0F172A", secondary: "#475569" },
        }
      : {
          primary: { main: "#00bcd4" },
          secondary: { main: "#ff9800" },
          background: { default: "#0a1929", paper: "#132040" },
          text: { primary: "#f3f6fb", secondary: "#b6c2d1" },
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Outfit", sans-serif', fontSize: "3.5rem", fontWeight: 800, letterSpacing: "-0.02em" },
    h2: { fontFamily: '"Outfit", sans-serif', fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.01em" },
    h3: { fontFamily: '"Outfit", sans-serif', fontSize: "2rem", fontWeight: 700, letterSpacing: "0em" },
    h4: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
    button: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
        },
        body: {
          transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: "1px solid",
          borderColor: mode === "light" ? "#a5f3fc" : "#22304a",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid",
          borderColor: mode === "light" ? "#a5f3fc" : "#22304a",
        },
      },
    },
  },
});

function App() {
  const [mode, setMode] = useState("light");
  const [showLoader, setShowLoader] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // Sync theme-sensitive coin colors as CSS vars so CoinTile
  // never needs to re-render due to isDark prop changes.
  // CSS var updates are handled entirely by the browser's style engine — no React, no WebGL interruption.
  useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.style.setProperty("--coin-bg", "rgba(255,255,255,0.03)");
      root.style.setProperty("--coin-border", "rgba(255,255,255,0.05)");
    } else {
      root.style.setProperty("--coin-bg", "rgba(0,0,0,0.03)");
      root.style.setProperty("--coin-border", "rgba(0,0,0,0.05)");
    }
  }, [mode]);

  // useMemo must be called unconditionally, before any early returns
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggleTheme = () => {
    // startTransition marks this as a non-urgent update.
    // React will defer the expensive 3D re-renders and keep the UI responsive.
    startTransition(() => {
      setMode((prev) => (prev === "light" ? "dark" : "light"));
    });
  };

  if (showLoader) {
    return (
      <div className="initial-loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", overflowX: "hidden", minHeight: "100vh" }}>
        <Sidebar toggleTheme={toggleTheme} mode={mode} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3, md: 4 },
            pl: { sm: "96px" },
            overflowX: "hidden",
            width: "100%",
          }}
        >
          <div id="hero">
            <Hero />
          </div>
          <div id="skills">
            <Skills />
          </div>
          <div id="experience">
            <Experience />
          </div>
          <div id="projects">
            <Projects />
          </div>
          <div id="certifications">
            <Certifications />
          </div>
          <div id="contact">
            <Contact />
          </div>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
