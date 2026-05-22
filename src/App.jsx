import React, { useState, useMemo, useEffect, useTransition, lazy, Suspense } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import "./App.css";

// Lazily load heavy, below-the-fold components to shrink the critical initial bundle
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Certifications = lazy(() => import("./components/Certifications"));
const Contact = lazy(() => import("./components/Contact"));

// Clean skeleton placeholder matching your premium themed design card shapes
const SectionSkeleton = () => (
  <Box sx={{ p: { xs: 2, md: 4 }, my: { xs: 2, md: 4 } }}>
    <Skeleton variant="text" width="30%" height={50} sx={{ mb: 3, bgcolor: "rgba(0, 188, 212, 0.08)" }} />
    <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 4, bgcolor: "rgba(0, 188, 212, 0.04)" }} />
  </Box>
);

// Native intersection-observer-driven wrapper that defers mounting of heavy chunks
// until the user actually scrolls near the viewport, preventing startup execution overhead.
const LazySection = ({ children, placeholderHeight = 350 }) => {
  const [ref, setRef] = useState(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "150px 0px", // Starts loading 150px before entering viewport for a seamless transition
      }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return (
    <div ref={setRef} style={{ minHeight: inView ? "auto" : placeholderHeight }}>
      {inView ? children : <SectionSkeleton />}
    </div>
  );
};


const getDesignTokens = (mode) => ({
  palette: {
    mode,
        ...(mode === "light"
      ? {
          primary: { main: "#006d77" }, // Deep premium cyan-teal for optimal contrast (>4.5:1)
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
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Start fading out after 600ms (fast, snappy splash experience)
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 600);

    // Completely remove from DOM after the 500ms fade-out transition finishes
    const removeTimer = setTimeout(() => {
      setShowLoader(false);
    }, 1100);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {showLoader && (
        <div
          className="initial-loader-container"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: mode === "light" ? "#e0f7fa" : "#0a1929",
            transition: "opacity 0.5s ease, visibility 0.5s ease",
            opacity: isFadingOut ? 0 : 1,
            visibility: isFadingOut ? "hidden" : "visible",
            pointerEvents: isFadingOut ? "none" : "auto",
          }}
        >
          <span className="loader"></span>
        </div>
      )}
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
            <LazySection placeholderHeight={400}>
              <Suspense fallback={<SectionSkeleton />}>
                <Skills />
              </Suspense>
            </LazySection>
          </div>
          <div id="experience">
            <LazySection placeholderHeight={450}>
              <Suspense fallback={<SectionSkeleton />}>
                <Experience />
              </Suspense>
            </LazySection>
          </div>
          <div id="projects">
            <LazySection placeholderHeight={500}>
              <Suspense fallback={<SectionSkeleton />}>
                <Projects />
              </Suspense>
            </LazySection>
          </div>
          <div id="certifications">
            <LazySection placeholderHeight={450}>
              <Suspense fallback={<SectionSkeleton />}>
                <Certifications />
              </Suspense>
            </LazySection>
          </div>
          <div id="contact">
            <LazySection placeholderHeight={500}>
              <Suspense fallback={<SectionSkeleton />}>
                <Contact />
              </Suspense>
            </LazySection>
          </div>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
