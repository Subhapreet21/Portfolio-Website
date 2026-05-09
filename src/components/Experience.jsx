import React from "react";
import {
  Typography,
  Paper,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import hclLogo from "../assets/Company Logos/HCLTech_logo.svg";

const experienceData = [
  {
    id: 1,
    role: "ACADEMIC TRAINEE",
    company: "HCL TECH",
    duration: "Apr 16, 2026 - Present",
    location: "Bengaluru, India",
    description:
      "Currently undergoing internship training at HCLTech with a focus on building expertise in enterprise technologies, software development practices, and corporate workflows within a professional learning environment.",
    skills: ["Enterprise Tech", "Software Dev", "Workflows", "Corporate Culture"],
    logo: hclLogo,
  },
];

const Experience = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Paper
      elevation={0}
      component={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      sx={{
        p: { xs: 2, sm: 3, md: 6 },
        my: 2,
        background: "transparent",
        border: "none",
        position: "relative",
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
          sx={{ fontSize: { xs: "1.6rem", sm: "2rem", md: "2.5rem" } }}
        >
          Professional Journey
        </Typography>
      </motion.div>

      <Box sx={{ maxWidth: 900, mx: "auto", position: "relative" }}>
        {/* Timeline Line */}
        <Box
          sx={{
            position: "absolute",
            left: { xs: "20px", md: "calc(50% - 2px)" },
            width: "4px",
            height: "100%",
            background: `linear-gradient(to bottom, ${theme.palette.primary.main}, transparent)`,
            borderRadius: "4px",
            opacity: 0.3,
          }}
        />

        {experienceData.map((exp, idx) => (
          <Box
            key={exp.id}
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "center" },
              alignItems: "center",
              width: "100%",
              mb: { xs: 2, md: 4 },
              position: "relative",
            }}
          >
            {/* Timeline Dot */}
            <Box
              component={motion.div}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              sx={{
                position: "absolute",
                top: "calc(50% - 10px)",
                left: { xs: "10px", md: "calc(50% - 10px)" },
                width: 20,
                height: 20,
                borderRadius: "50%",
                bgcolor: theme.palette.primary.main,
                border: `4px solid ${isDark ? "#0a1929" : "#cefcff"}`,
                boxShadow: `0 0 15px ${theme.palette.primary.main}`,
                zIndex: 2,
              }}
            />

            {/* Desktop-only: Logo on opposite side of timeline */}
            {exp.logo && isDesktop && (
              <Box
                component={motion.img}
                src={exp.logo}
                alt={`${exp.company} logo`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                sx={{
                  position: "absolute",
                  top: "calc(50% - 50px)",
                  left: idx % 2 !== 0 ? "calc(50% + 40px)" : "auto",
                  right: idx % 2 === 0 ? "calc(50% + 40px)" : "auto",
                  maxWidth: 220,
                  maxHeight: 100,
                  objectFit: "contain",
                  borderRadius: 3,
                  overflow: "hidden",
                  p: "6px",
                  bgcolor: isDark ? "rgba(255,255,255,0.06)" : "#fff",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)"}`,
                  boxShadow: isDark
                    ? "0 4px 20px rgba(0,0,0,0.3)"
                    : "0 4px 20px rgba(0,0,0,0.08)",
                }}
              />
            )}

            {/* Experience Card */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: isDesktop ? (idx % 2 === 0 ? 50 : -50) : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{
                width: { xs: "calc(100% - 60px)", sm: "calc(100% - 80px)", md: "45%" },
                ml: { xs: "60px", sm: "80px", md: idx % 2 === 0 ? "55%" : "0" },
                mr: { md: idx % 2 === 0 ? "0" : "55%" },
                p: 0.5,
                borderRadius: 6,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22)`,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  borderRadius: 5.5,
                  background: isDark
                    ? "rgba(19, 32, 64, 0.8)"
                    : "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative Icon Background */}
                <WorkIcon
                  sx={{
                    position: "absolute",
                    right: -20,
                    top: -20,
                    fontSize: { xs: 80, md: 120 },
                    opacity: 0.05,
                    transform: "rotate(-15deg)",
                  }}
                />

                <Box sx={{ position: "relative", zIndex: 1 }}>
                  <Typography
                    variant="h5"
                    fontWeight={800}
                    color="primary.main"
                    gutterBottom
                    sx={{ fontSize: { xs: "1rem", sm: "1.15rem", md: "1.5rem" } }}
                  >
                    {exp.role}
                  </Typography>

                  {/* Company name row — logo inline on mobile/tablet */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 2,
                    }}
                  >
                    {exp.logo && !isDesktop && (
                      <Box
                        component={motion.img}
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        sx={{
                          width: { xs: 36, sm: 44 },
                          height: { xs: 36, sm: 44 },
                          objectFit: "contain",
                          borderRadius: 1.5,
                          border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"}`,
                          p: "4px",
                          bgcolor: isDark ? "rgba(255,255,255,0.05)" : "#fff",
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{
                        opacity: 0.9,
                        fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
                      }}
                    >
                      {exp.company}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: { xs: 1, sm: 2 },
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <CalendarMonthIcon fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        {exp.duration}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <LocationOnIcon fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        {exp.location}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 1.5, opacity: 0.5 }} />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.8, mb: 2, fontSize: { xs: "0.78rem", sm: "0.85rem", md: "0.875rem" } }}
                  >
                    {exp.description}
                  </Typography>

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {exp.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          borderRadius: 1.5,
                          fontWeight: 600,
                          fontSize: "0.65rem",
                          bgcolor: isDark ? "rgba(0,188,212,0.1)" : "rgba(0,188,212,0.05)",
                          color: "primary.main",
                          border: `1px solid ${theme.palette.primary.main}33`,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default Experience;
