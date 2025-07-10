import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  useTheme,
} from "@mui/material";
import { GitHub, LinkedIn } from "@mui/icons-material";
import { MdDownload } from "react-icons/md";
import { LuMessageSquareText } from "react-icons/lu";
import profileImage from "../assets/profile.png";
import resumePdf from "../assets/Resume(1).pdf";
import { motion } from "framer-motion";

const Hero = () => {
  const theme = useTheme();

  const handleContactClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: { xs: "center", md: "space-between" },
        px: { xs: 1, sm: 2, md: 8 },
        py: { xs: 3, sm: 6, md: 0 },
        background: theme.palette.background.default,
        borderRadius: { xs: 0, md: 6 },
        gap: { xs: 4, md: 0 },
      }}
    >
      {/* Profile Image on top for mobile */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "center",
          alignItems: "center",
          mb: { xs: 0.1, sm: 0.5 },
        }}
      >
        <Box
          sx={{
            width: { xs: 200, sm: 230, md: 320, lg: 380 },
            height: { xs: 200, sm: 230, md: 320, lg: 380 },
            borderRadius: "50%",
            background: theme.palette.primary.main,
            p: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={profileImage}
            alt="Profile"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
              background: theme.palette.background.paper,
              display: "block",
            }}
          />
        </Box>
      </Box>
      {/* Left: Text */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-start" },
          textAlign: { xs: "center", md: "left" },
          zIndex: 2,
          mb: { xs: 2, md: 0 },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: theme.palette.text.secondary,
            letterSpacing: 2,
            fontWeight: 500,
            mb: 2,
            textTransform: "uppercase",
            opacity: 0.7,
            fontSize: { xs: 12, sm: 14, md: 16 },
          }}
        >
          Hello there, welcome to my site
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.4rem", sm: "2rem", md: "3.5rem" },
            color: theme.palette.text.primary,
            mb: 1,
            lineHeight: 1.1,
          }}
        >
          I'm{" "}
          <span
            style={{
              color: theme.palette.text.primary,
              fontWeight: 700,
              marginLeft: 8,
            }}
          >
            Subhapreet Patro
          </span>
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1rem", sm: "1.3rem", md: "2.5rem" },
            color: theme.palette.primary.main,
            mb: 1,
            lineHeight: 1.1,
          }}
        >
          A Computer Science Student
        </Typography>
        {/* Buttons and Socials stacked for mobile */}
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={{ xs: 2, sm: 2, md: 2 }}
          sx={{
            mb: { xs: 2, md: 3 },
            mt: { xs: 2, md: 2 },
            width: { xs: "100%", md: "auto" },
            alignItems: "center",
          }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="contained"
              color="primary"
              href={resumePdf}
              download
              endIcon={
                <MdDownload size={22} style={{ verticalAlign: "middle" }} />
              }
              sx={{
                fontWeight: 700,
                borderRadius: 6,
                px: 2,
                py: 1,
                fontSize: { xs: 15, sm: 16 },
                minWidth: 150,
                minHeight: 44,
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.10)",
                justifyContent: "center",
                background: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                textAlign: "center",
                alignItems: "center",
                whiteSpace: "nowrap",
                width: { xs: "100%", sm: "100%", md: "auto" },
                "&:hover": {
                  background: theme.palette.primary.dark,
                  color: theme.palette.primary.contrastText,
                },
              }}
            >
              Download Resume
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleContactClick}
              endIcon={
                <LuMessageSquareText
                  size={22}
                  style={{ verticalAlign: "middle" }}
                />
              }
              sx={{
                fontWeight: 700,
                borderRadius: 6,
                px: 2,
                py: 1,
                fontSize: { xs: 15, sm: 16 },
                minWidth: 150,
                minHeight: 44,
                background: theme.palette.background.default,
                color: theme.palette.primary.main,
                border: `2px solid ${theme.palette.primary.main}`,
                textAlign: "center",
                alignItems: "center",
                whiteSpace: "nowrap",
                width: { xs: "100%", sm: "100%", md: "auto" },
                "&:hover": {
                  background: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  border: `2px solid ${theme.palette.primary.main}`,
                },
              }}
            >
              Contact Me
            </Button>
          </motion.div>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            mt: { xs: 2, md: 2 },
            justifyContent: "center",
            width: { xs: "100%", md: "auto" },
          }}
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: -6 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconButton
              component="a"
              href="https://github.com/Subhapreet21"
              target="_blank"
              aria-label="github"
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? "#181717"
                    : theme.palette.text.primary,
                background: theme.palette.mode === "dark" ? "#fff" : "#fff",
                border:
                  theme.palette.mode === "dark"
                    ? "2px solid #222"
                    : "2px solid #e5e7eb",
                borderRadius: "50%",
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
                width: 56,
                height: 56,
                transition: "background 0.2s, color 0.2s, border 0.2s",
                "&:hover": {
                  background: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  border: `2px solid ${theme.palette.primary.main}`,
                },
              }}
            >
              <GitHub fontSize="large" />
            </IconButton>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: -6 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/subhapreet-patro-444a02277"
              target="_blank"
              aria-label="linkedin"
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? "#0A66C2"
                    : theme.palette.text.primary,
                background: theme.palette.mode === "dark" ? "#fff" : "#fff",
                border:
                  theme.palette.mode === "dark"
                    ? "2px solid #222"
                    : "2px solid #e5e7eb",
                borderRadius: "50%",
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
                width: 56,
                height: 56,
                transition: "background 0.2s, color 0.2s, border 0.2s",
                "&:hover": {
                  background: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  border: `2px solid ${theme.palette.primary.main}`,
                },
              }}
            >
              <LinkedIn fontSize="large" />
            </IconButton>
          </motion.div>
        </Stack>
      </Box>
      {/* Right: Image for desktop */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          justifyContent: { md: "flex-end" },
          alignItems: "center",
          mt: { xs: 4, md: 0 },
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          sx={{
            width: { md: 320, lg: 380 },
            height: { md: 320, lg: 380 },
            borderRadius: "50%",
            background: theme.palette.primary.main,
            p: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={profileImage}
            alt="Profile"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
              background: theme.palette.background.paper,
              display: "block",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
