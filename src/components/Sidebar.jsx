import React from "react";
import { Box, Drawer, IconButton, Tooltip, Divider } from "@mui/material";
import {
  Home,
  Code,
  BusinessCenter,
  Star,
  Mail,
  Brightness4,
  Brightness7,
  Work,
  Monitor,
} from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 96;

const sections = [
  { id: "hero", text: "Home", icon: <Home /> },
  { id: "skills", text: "Skills", icon: <Code /> },
  { id: "experience", text: "Experience", icon: <Work /> },
  { id: "projects", text: "Projects", icon: <Monitor /> },
  { id: "certifications", text: "Certifications", icon: <Star /> },
  { id: "contact", text: "Contact", icon: <Mail /> },
];

const Sidebar = ({ toggleTheme, mode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const drawerContent = (
    <Box
      sx={{
        height: { xs: "100%", sm: "auto" },
        display: "flex",
        flexDirection: { xs: "row", sm: "column" },
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        width: "100%",
      }}
    >
      {sections.map((section) => (
        <Tooltip
          title={section.text}
          placement={isMobile ? "top" : "right"}
          key={section.id}
        >
          <IconButton
            onClick={() => handleScroll(section.id)}
            sx={{
              width: 56,
              height: 56,
              bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "#ffffff",
              boxShadow: theme.palette.mode === "dark" ? "none" : "0 4px 20px rgba(0,0,0,0.05)",
              color: theme.palette.mode === "dark" ? "#e2e8f0" : "#475569",
              "&:hover": {
                bgcolor: "primary.main",
                color: "primary.contrastText",
                transform: "scale(1.1)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {section.icon}
          </IconButton>
        </Tooltip>
      ))}
      <Divider
        sx={{
          width: isMobile ? "1px" : "40%",
          height: isMobile ? 32 : "1px",
          my: 1,
          borderColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        }}
      />
      <Tooltip
        title={mode === "dark" ? "Light mode" : "Dark mode"}
        placement={isMobile ? "top" : "right"}
      >
        <IconButton
          onClick={toggleTheme}
          sx={{
            width: 56,
            height: 56,
            bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "#ffffff",
            boxShadow: theme.palette.mode === "dark" ? "none" : "0 4px 20px rgba(0,0,0,0.05)",
            color: theme.palette.mode === "dark" ? "#e2e8f0" : "#475569",
            "&:hover": {
              bgcolor: "primary.main",
              color: "primary.contrastText",
              transform: "scale(1.1)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>
    </Box>
  );

  if (isMobile) {
    return (
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={(theme) => ({
          top: 0,
          left: 0,
          right: 0,
          bottom: "unset",
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(10, 25, 41, 0.7)"
              : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(16px)",
          borderRadius: "0 0 18px 18px",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 8px 32px 0 rgba(31, 38, 135, 0.25)"
              : "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          border:
            theme.palette.mode === "dark"
              ? `1.5px solid ${theme.palette.background.paper}`
              : "1.5px solid rgba(255,255,255,0.18)",
          zIndex: 1200,
        })}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            minHeight: { xs: 54, sm: 60 },
            px: { xs: 0.5, sm: 1 },
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100%",
              gap: 0,
            }}
          >
            {sections.map((section) => (
              <Tooltip title={section.text} placement="bottom" key={section.id}>
                <IconButton
                  onClick={() => handleScroll(section.id)}
                  sx={{
                    width: { xs: 36, sm: 44 },
                    height: { xs: 36, sm: 44 },
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark"
                        ? theme.palette.background.paper
                        : "rgba(255,255,255,0.6)",
                    color: (theme) =>
                      theme.palette.mode === "dark"
                        ? theme.palette.primary.main
                        : "primary.main",
                    border: "1.5px solid #e0e7ef",
                    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.07)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 2.5,
                    transition: "all 0.25s cubic-bezier(.4,2,.6,1)",
                    "&:hover": {
                      bgcolor: (theme) => theme.palette.primary.main,
                      color: "#fff",
                      transform: "scale(1.13) rotate(-6deg)",
                      boxShadow: "0 4px 16px 0 rgba(79,70,229,0.18)",
                      border: "1.5px solid #6366f1",
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: { xs: "1.1rem", sm: "1.35rem" },
                    },
                  }}
                >
                  {section.icon}
                </IconButton>
              </Tooltip>
            ))}

            {/* Theme toggle inline with nav items */}
            <Tooltip
              title={mode === "dark" ? "Light mode" : "Dark mode"}
              placement="bottom"
            >
              <IconButton
                onClick={toggleTheme}
                sx={{
                  width: { xs: 36, sm: 44 },
                  height: { xs: 36, sm: 44 },
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.background.paper
                      : "rgba(255,255,255,0.6)",
                  color: (theme) =>
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.main
                      : "primary.main",
                  border: "1.5px solid #e0e7ef",
                  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.07)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 2.5,
                  transition: "all 0.25s cubic-bezier(.4,2,.6,1)",
                  "&:hover": {
                    bgcolor: (theme) => theme.palette.primary.main,
                    color: "#fff",
                    transform: "scale(1.13) rotate(-6deg)",
                    boxShadow: "0 4px 16px 0 rgba(79,70,229,0.18)",
                    border: "1.5px solid #6366f1",
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: { xs: "1.1rem", sm: "1.35rem" },
                  },
                }}
              >
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="sidebar"
    >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "transparent",
            border: "none",
            display: "flex",
            justifyContent: "center",
          },
        }}
        open
      >
        <Box
          sx={{
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(19, 32, 64, 0.6)"
                : "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.8)"
              }`,
            borderRadius: "50px",
            p: 0.5,
            m: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
          }}
        >
          {drawerContent}
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
