import { useState, useMemo, useEffect } from "react";
import {
  Typography,
  Paper,
  Box,
  useTheme,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MonitorIcon from "@mui/icons-material/Monitor";
import FilterListIcon from "@mui/icons-material/FilterList";
import GitHubIcon from "@mui/icons-material/GitHub";
import { motion, AnimatePresence } from "framer-motion";

// Project image assets
import adminDashboardImg from "../assets/projects/Admin_Dashboard.webp";
import cropAdvisorImg from "../assets/projects/Crop_Advisor.webp";
import heartDiseaseImg from "../assets/projects/Heart_Disease_Prediction2.webp";
import studentManagementImg from "../assets/projects/Student_Mangement_System.webp";
import aiChatbotImg from "../assets/projects/AI_Chatbot.webp";
import cargoTrackingImg from "../assets/projects/Cargo_Scanner.webp";
import lmsConversoImg from "../assets/projects/LMS_Converso.webp";
import voice2textImg from "../assets/projects/Lecture_Voice_to_Notes_Generator.webp";
import apexAssistant from "../assets/projects/Voice_Assistant.webp";
import currencyConvertor from "../assets/projects/Currency_Convertor.webp";
import campusAssistant from "../assets/projects/Proactive_Multimodal_Academic_Support_System.webp";

const projectsData = [
  {
    id: 1,
    title: "Admin Dashboard",
    description:
      "Developed a responsive MERN-based admin panel with modular UI components, secure authentication, and role-based access. Integrated Nivo and Chart.js for interactive financial dashboards, along with dynamic theming and a smart navigation system.",
    image: adminDashboardImg,
    link: "https://github.com/Subhapreet21/CLEVER-DASH",
    category: "Web Development",
    tags: ["React", "Node.js", "MongoDB", "Express", "Chart.js", "MERN"],
    features: [
      "Modular, reusable UI components built on Material UI.",
      "Secure JWT-based authentication and role-based route access controls.",
      "Interactive data visualizations with Nivo and Chart.js dashboards.",
      "Dynamic system-wide dark/light theme switching with instant state persistence."
    ]
  },
  {
    id: 2,
    title: "Crop Advisor",
    description:
      "Built an ML-powered agriculture assistant using a Random Forest model to recommend crops based on soil and climate data. Integrated image-based plant disease detection and real-time data visualizations to help farmers make informed decisions through an intuitive Streamlit interface.",
    image: cropAdvisorImg,
    link: "https://github.com/Subhapreet21/Agri-Smart",
    category: "Data Science & AI",
    tags: ["Machine Learning", "Random Forest", "Python", "Streamlit", "Matplotlib"],
    features: [
      "Predictive model with 95%+ recommendation accuracy based on NPK, pH, and climate data.",
      "Integrated CNN model for instant leaf disease classification from uploaded images.",
      "Real-time crop yield forecasts and interactive soil data plots using Matplotlib.",
      "Fast, responsive layout optimized for mobile farm devices."
    ]
  },
  {
    id: 3,
    title: "Heart Disease Prediction",
    description:
      "Built a GUI-based medical app using Logistic Regression to predict heart disease risk. Enabled real-time health data input, visualized key metrics using Matplotlib, and ensured secure patient data storage with MySQL through a user-friendly Tkinter interface.",
    image: heartDiseaseImg,
    link: "https://github.com/Subhapreet21/CardioSmart-360",
    category: "Data Science & AI",
    tags: ["Python", "Logistic Regression", "Tkinter", "MySQL", "Matplotlib"],
    features: [
      "Trained Logistic Regression model on cardiovascular health benchmarks for precise risk index.",
      "Seamless local database storage for patient profiles and predictive histories.",
      "Matplotlib reports visualizing vital trends (heart rate, cholesterol, blood pressure).",
      "Intuitive graphical user interface with validation-aware inputs."
    ]
  },
  {
    id: 4,
    title: "Student Information Management System",
    description:
      "Developed a GUI-based student record system with login authentication, data management, and image storage. Integrated search and password reset features, and visualized academic performance using Matplotlib for effective progress tracking.",
    image: studentManagementImg,
    link: "https://github.com/Subhapreet21/Students-Atlas",
    category: "Software Development",
    tags: ["Python", "Tkinter", "MySQL", "Matplotlib", "GUI"],
    features: [
      "Secure login system with robust password recovery questions.",
      "CRUD operations managing hundreds of student files with embedded photo storage.",
      "Academic grade performance analysis maps generated dynamically.",
      "Fast-indexing search system for retrieving records in under 0.1 seconds."
    ]
  },
  {
    id: 5,
    title: "AI Chatbot",
    description:
      "Built a real-time chat application that leverages the Gemini API to provide AI-powered responses, integrates voice input for hands-free communication, and offers customizable themes, delivering a seamless and interactive user experience for dynamic conversations.",
    image: aiChatbotImg,
    link: "https://github.com/Subhapreet21/Chat-Mate",
    category: "Data Science & AI",
    tags: ["React", "Gemini API", "Speech Recognition", "TailwindCSS", "Node.js"],
    features: [
      "Real-time streaming chat utilizing Google's Gemini models.",
      "Web Speech API integration supporting seamless voice-to-text input.",
      "Animated dynamic themes including Cyberpunk, Glassmorphism, and Stealth Dark.",
      "Responsive, clean UI featuring message caching for offline persistence."
    ]
  },
  {
    id: 6,
    title: "Cargo Tracking System",
    description:
      "Designed a web app for efficient product management and analysis in cargo and inventory systems. It features secure authentication, product registration, and QR code generation, built with React, Node.js/Express, and MongoDB Atlas.",
    image: cargoTrackingImg,
    link: "https://github.com/Subhapreet21/Cargo-Scanner",
    category: "Web Development",
    tags: ["React", "Node.js", "Express", "MongoDB", "QR Codes"],
    features: [
      "Instant, client-side QR code generator for package tracking and rapid scanning.",
      "Comprehensive product inventory dashboard showing stock levels and delivery statuses.",
      "Express REST API featuring strict pagination and search query processing.",
      "MongoDB Atlas cluster integration with secure Mongoose schema validation."
    ]
  },
  {
    id: 7,
    title: "AI-Powered Learning Platform",
    description:
      "Built an AI-driven learning platform with subject-specific companions, real-time voice interactions, secure authentication, and subscription-aware limits—delivering personalized study assistance, smart discovery, and clear progress tracking.",
    image: lmsConversoImg,
    link: "https://github.com/Subhapreet21/LMS-SaaS-App",
    category: "Data Science & AI",
    tags: ["React", "OpenAI API", "Node.js", "Express", "TailwindCSS"],
    features: [
      "Custom learning companions mapped to specific sciences and humanities subjects.",
      "Subscription validation framework managing operational API-call caps per user tier.",
      "Integrated audio feedback loops generating conversational explanations.",
      "Course progress tracking charts showing visual growth indicators."
    ]
  },
  {
    id: 8,
    title: "Lecture Voice-to-Notes Generator",
    description:
      "An AI-powered study tool built with Streamlit that transforms audio lectures into accurate transcriptions, concise summaries, and automated Q&A flashcards using OpenAI Whisper and Hugging Face Transformers.",
    image: voice2textImg,
    link: "https://github.com/Subhapreet21/Edunet_Voice2Text",
    category: "Data Science & AI",
    tags: ["Streamlit", "OpenAI Whisper", "Hugging Face", "Python", "NLP"],
    features: [
      "Converts audio lecture formats (mp3, wav) into readable text using Whisper.",
      "Extracts bulleted cheat-sheets and summaries using Hugging Face language pipelines.",
      "Generates interactive flashcards automatically to test student comprehension.",
      "One-click PDF notes export with clean, legible formatting."
    ]
  },
  {
    id: 9,
    title: "Apex Assistant",
    description:
      "A privacy-first, offline voice assistant built with Java and Vosk that enables secure system control, intelligent app launching, and real-time dashboard monitoring without sending data to the cloud.",
    image: apexAssistant,
    link: "https://github.com/Subhapreet21/apex-voice-assistant",
    category: "Software Development",
    tags: ["Java", "Vosk AI", "Voice Control", "Offline Speech"],
    features: [
      "100% offline speech recognition using the lightweight Vosk voice model.",
      "Intelligent desktop commands for launching system tools, web browsers, and files.",
      "Real-time Java Swing monitor displaying CPU utilization and RAM health.",
      "Low latency, zero external data transmissions, maximizing personal privacy."
    ]
  },
  {
    id: 10,
    title: "Currency Convertor",
    description:
      "A native Android currency converter application built in Java that provides real-time exchange rate conversions with a clean, user-friendly interface.",
    image: currencyConvertor,
    link: "https://github.com/Subhapreet21/Currency_Converter-Android-",
    category: "Mobile Development",
    tags: ["Android Studio", "Java", "XML", "REST API", "Retrofit"],
    features: [
      "Fetches accurate, hourly exchange rates from standard foreign-exchange APIs.",
      "Clean Material Design UI with instant swap-currency features.",
      "Offline caching enabling recent rates lookup when connection is lost.",
      "Supports dark mode and adjusts layouts smoothly for various phone sizes."
    ]
  },
  {
    id: 11,
    title: "Proactive Multimodal Academic Support System",
    description:
      "An intelligent, AI-driven campus ecosystem built with Flutter and Node.js that centralizes university services through predictive analytics, dynamic scheduling, and a GenAI-embedded interactive 3D tour.",
    image: campusAssistant,
    link: "https://github.com/Subhapreet21/Proactive-Multimodal-Academic-Support-System",
    category: "Mobile Development",
    tags: ["Flutter", "Node.js", "Predictive Analytics", "GenAI", "3D WebGL"],
    features: [
      "Centralized services dashboard providing localized, smart schedule notifications.",
      "WebGL interactive 3D model of the university campus with contextual hotspots.",
      "Node.js backend predicting optimal student slots and resource allocations.",
      "Cross-platform Flutter build ensuring fluid 60fps animations on iOS & Android."
    ]
  }
];

const categories = ["All", "Web Development", "Data Science & AI", "Mobile Development", "Software Development"];


const Projects = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCardId, setExpandedCardId] = useState(null);

  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const isFilterMenuOpen = Boolean(filterAnchorEl);

  useEffect(() => {
    setExpandedCardId(null);
  }, [selectedCategory, searchQuery]);

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    handleFilterClose();
  };

  // Filter projects by category and search keyword
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Count items per category dynamically
  const categoryCounts = useMemo(() => {
    const counts = { All: projectsData.length };
    projectsData.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <Paper
      elevation={0}
      component={motion.div}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      sx={{
        p: { xs: 2, md: 4 },
        my: 4,
        background: "transparent",
        border: "none",
      }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          align="center"
          sx={{ fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" }, mb: 4 }}
        >
          Projects
        </Typography>
      </motion.div>

      {/* Controls Container (Search + Filter Tabs) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mb: 6,
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 1, sm: 2 },
        }}
      >
        {/* Search Input & Mobile Filter Trigger */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            width: "100%",
            maxWidth: 700,
            mx: "auto",
          }}
        >
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 50,
                borderRadius: "50px",
                background: isDark ? "rgba(19, 32, 64, 0.8)" : "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease-in-out",
                border: "1px solid",
                borderColor: isDark ? "rgba(0, 188, 212, 0.2)" : "rgba(165, 243, 252, 0.5)",
                boxShadow: isDark
                  ? "0 4px 20px 0 rgba(0,0,0,0.15)"
                  : "0 4px 15px 0 rgba(0, 151, 167, 0.05)",
                "&:hover": {
                  borderColor: "#00bcd4",
                },
                "&.Mui-focused": {
                  boxShadow: isDark
                    ? "0 0 15px 2px rgba(0, 188, 212, 0.2)"
                    : "0 0 15px 2px rgba(0, 188, 212, 0.15)",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#00bcd4", ml: 1 }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchQuery("")} edge="end" size="small">
                    <CloseIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Filter IconButton (Mobile Only) */}
          <IconButton
            onClick={handleFilterClick}
            sx={{
              display: { xs: "flex", md: "none" },
              width: 50,
              height: 50,
              borderRadius: "50%",
              background: isDark ? "rgba(19, 32, 64, 0.8)" : "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid",
              borderColor: selectedCategory !== "All"
                ? "#00bcd4"
                : isDark ? "rgba(0, 188, 212, 0.2)" : "rgba(165, 243, 252, 0.5)",
              color: selectedCategory !== "All"
                ? "#00bcd4"
                : isDark ? "text.secondary" : "text.primary",
              boxShadow: isDark
                ? "0 4px 20px 0 rgba(0,0,0,0.15)"
                : "0 4px 15px 0 rgba(0, 151, 167, 0.05)",
              "&:hover": {
                borderColor: "#00bcd4",
                color: "#00bcd4",
                transform: "scale(1.05)",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <FilterListIcon />
          </IconButton>
        </Box>

        {/* Mobile Filter Menu */}
        <Menu
          anchorEl={filterAnchorEl}
          open={isFilterMenuOpen}
          onClose={handleFilterClose}
          elevation={0}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          slotProps={{
            paper: {
              sx: {
                mt: 1.5,
                borderRadius: "16px",
                background: isDark ? "rgba(19, 32, 64, 0.95)" : "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(15px)",
                border: "1px solid",
                borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 151, 167, 0.15)",
                boxShadow: isDark
                  ? "0 10px 30px rgba(0,0,0,0.4)"
                  : "0 10px 25px rgba(0, 151, 167, 0.1)",
                p: 1,
                minWidth: 240,
              }
            }
          }}
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            const count = categoryCounts[category] || 0;
            return (
              <MenuItem
                key={category}
                onClick={() => handleCategorySelect(category)}
                sx={{
                  borderRadius: "10px",
                  py: 1.2,
                  px: 2,
                  my: 0.5,
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  fontFamily: '"Outfit", sans-serif',
                  color: isActive
                    ? "#00bcd4"
                    : isDark ? "text.secondary" : "text.primary",
                  background: isActive
                    ? isDark ? "rgba(0, 188, 212, 0.12)" : "rgba(0, 151, 167, 0.08)"
                    : "transparent",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    background: isDark
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 151, 167, 0.04)",
                    color: "#00bcd4",
                  },
                }}
              >
                <span>{category}</span>
                <Chip
                  label={count}
                  size="small"
                  sx={{
                    ml: 2,
                    height: 20,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    fontFamily: '"Outfit", sans-serif',
                    background: isActive
                      ? "#00bcd4"
                      : isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                    color: isActive ? "#fff" : "text.secondary",
                  }}
                />
              </MenuItem>
            );
          })}
        </Menu>

        {/* Category Pills (Desktop viewports only) */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 1.5,
            py: 1,
          }}
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            const count = categoryCounts[category] || 0;
            return (
              <Chip
                key={category}
                label={`${category} (${count})`}
                onClick={() => setSelectedCategory(category)}
                sx={{
                  py: 2.2,
                  px: 1.5,
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  fontWeight: 600,
                  fontFamily: '"Outfit", sans-serif',
                  cursor: "pointer",
                  borderRadius: "20px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  background: isActive
                    ? "linear-gradient(90deg, #00bcd4, #0097a7)"
                    : isDark
                      ? "rgba(19, 32, 64, 0.8)"
                      : "rgba(255, 255, 255, 0.85)",
                  color: isActive
                    ? "#fff"
                    : isDark
                      ? "text.secondary"
                      : "text.primary",
                  border: "1px solid",
                  borderColor: isActive
                    ? "transparent"
                    : isDark
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 151, 167, 0.2)",
                  boxShadow: isActive
                    ? "0 8px 25px rgba(0,188,212,0.25)"
                    : "none",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    background: isActive
                      ? "linear-gradient(90deg, #00d4ff, #00bcd4)"
                      : isDark
                        ? "rgba(19, 32, 64, 0.95)"
                        : "rgba(255, 255, 255, 1)",
                    borderColor: isActive ? "transparent" : "#00bcd4",
                    boxShadow: isActive ? "0 10px 30px rgba(0,188,212,0.45)" : "none",
                  },
                  "&:active": {
                    transform: "translateY(0)",
                  },
                }}
              />
            );
          })}
        </Box>
      </Box>

      {/* Grid Container */}
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 1, sm: 2 } }}>
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <Box
              component={motion.div}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              sx={{
                textAlign: "center",
                py: 10,
                background: isDark ? "rgba(19, 32, 64, 0.2)" : "rgba(255, 255, 255, 0.4)",
                borderRadius: "16px",
                border: "1px dashed",
                borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                No projects matched your search criteria.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try searching for other terms or selecting a different category.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                maxHeight: { xs: "580px", sm: "680px", md: "none" },
                overflowY: { xs: "auto", sm: "auto", md: "visible" },
                overflowX: "hidden",
                pr: { xs: 1, sm: 2, md: 0 },
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Box
                component={motion.div}
                layout
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  },
                  gap: 4,
                  pt: 1,
                  pb: 2,
                }}
              >
              {filteredProjects.map((project) => {
                const isCardExpanded = !isMobile || expandedCardId === project.id;
                return (
                  <Box
                    key={project.id}
                    component={motion.div}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    whileHover={{ y: -6 }}
                  >
                    <Card
                      onClick={() => {
                        if (isMobile) {
                          setExpandedCardId(expandedCardId === project.id ? null : project.id);
                        }
                      }}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        cursor: isMobile ? "pointer" : "default",
                        background: isDark ? "rgba(19, 32, 64, 0.8)" : "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "16px",
                        overflow: "hidden",
                        border: "1px solid",
                        borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 151, 167, 0.2)",
                        boxShadow: isDark
                          ? "0 4px 30px rgba(0, 0, 0, 0.2)"
                          : "0 4px 20px rgba(0, 151, 167, 0.05)",
                        transition: "box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease",
                        "&:hover": {
                          borderColor: "#00bcd4",
                          boxShadow: isDark
                            ? `0 10px 30px rgba(0, 188, 212, 0.15)`
                            : `0 10px 25px rgba(0, 151, 167, 0.1)`,
                          "& .project-card-img": {
                            transform: "scale(1.05)",
                          },
                        },
                      }}
                    >
                    {/* Media Container with Overlay */}
                    <Box
                      sx={{
                        position: "relative",
                        overflow: "hidden",
                        height: 200,
                        background: isDark ? "rgba(10, 25, 41, 0.2)" : "rgba(0, 0, 0, 0.01)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 2,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={project.image}
                        alt={project.title}
                        className="project-card-img"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          transition: "transform 0.4s ease, box-shadow 0.4s ease",
                          borderRadius: "8px",
                          boxShadow: isDark
                            ? "0 8px 24px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.2)"
                            : "0 8px 20px rgba(0,151,167,0.1), 0 2px 6px rgba(0,0,0,0.05)",
                          border: "1px solid",
                          borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,151,167,0.15)",
                        }}
                      />

                      {/* Category Badge */}
                      <Chip
                        label={project.category}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          fontWeight: 700,
                          fontSize: "0.7rem",
                          fontFamily: '"Outfit", sans-serif',
                          background: "linear-gradient(90deg, #00bcd4, #0097a7)",
                          color: "#fff",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}
                      />
                    </Box>

                    {/* Card Details */}
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* Decorative Icon Background */}
                      <MonitorIcon
                        sx={{
                          position: "absolute",
                          right: -15,
                          top: -15,
                          fontSize: { xs: 80, md: 100 },
                          opacity: 0.05,
                          transform: "rotate(-15deg)",
                          color: "text.primary",
                          pointerEvents: "none",
                          zIndex: 0,
                        }}
                      />

                      <Box sx={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <Typography
                            variant="h5"
                            component="h3"
                            sx={{
                              fontWeight: 700,
                              fontFamily: '"Outfit", sans-serif',
                              fontSize: "1.25rem",
                              lineHeight: 1.3,
                            }}
                          >
                            {project.title}
                          </Typography>
                          {isMobile && (
                            <Box
                              component={motion.div}
                              animate={{ rotate: isCardExpanded ? 90 : 0 }}
                              transition={{ duration: 0.3 }}
                              sx={{ display: "flex", color: "#00bcd4" }}
                            >
                              <ArrowForwardIcon sx={{ fontSize: 18 }} />
                            </Box>
                          )}
                        </Box>

                        <AnimatePresence initial={false}>
                          {isCardExpanded && (
                            <Box
                              component={motion.div}
                              initial={isMobile ? { height: 0, opacity: 0 } : false}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={isMobile ? { height: 0, opacity: 0 } : false}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              style={{
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                flexGrow: 1,
                              }}
                            >
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  mt: 2,
                                  mb: 3,
                                  lineHeight: 1.6,
                                }}
                              >
                                {project.description}
                              </Typography>

                              {/* Tech Chips */}
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.8,
                                  mt: "auto",
                                  mb: 2,
                                }}
                              >
                                {project.tags.map((tag) => (
                                  <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                    sx={{
                                      height: 22,
                                      fontSize: "0.65rem",
                                      fontWeight: 600,
                                      background: isDark
                                        ? "rgba(0, 188, 212, 0.08)"
                                        : "rgba(0, 151, 167, 0.05)",
                                      color: "#00bcd4",
                                      border: "1px solid rgba(0, 188, 212, 0.18)",
                                      borderRadius: "4px",
                                      transition: "all 0.2s ease",
                                      "&:hover": {
                                        background: isDark
                                          ? "rgba(0, 188, 212, 0.15)"
                                          : "rgba(0, 151, 167, 0.1)",
                                      },
                                    }}
                                  />
                                ))}
                              </Box>

                              {/* Card Actions */}
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  pt: 1,
                                  pb: 0,
                                }}
                              >
                                <IconButton
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`View ${project.title} on GitHub`}
                                  onClick={(e) => e.stopPropagation()}
                                  size="small"
                                  sx={{
                                    color: "text.secondary",
                                    background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                                    border: "1px solid",
                                    borderColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0,0,0,0.05)",
                                    "&:hover": {
                                      background: "#00bcd4",
                                      color: "#fff",
                                      borderColor: "#00bcd4",
                                    },
                                    transition: "all 0.2s ease",
                                  }}
                                >
                                  <GitHubIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                              </Box>
                            </Box>
                          )}
                        </AnimatePresence>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
            </Box>
          </Box>
        )}
        </AnimatePresence>
      </Box>
    </Paper>
  );
};

export default Projects;
