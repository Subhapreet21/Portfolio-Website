import React from "react";
import { Box } from "@mui/material";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      width: "100%",
      textAlign: "center",
      padding: "1.5rem 0",
      marginTop: "4rem",
      background: (theme) => theme.palette.mode === "dark" ? "rgba(19, 32, 64, 0.4)" : "rgba(255, 255, 255, 0.4)",
      backdropFilter: "blur(10px)",
      borderRadius: 4,
      border: (theme) => `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
      fontSize: "0.95rem",
      color: "text.secondary",
    }}
  >
    &copy; {new Date().getFullYear()} Subhapreet Patro. All rights reserved.
  </Box>
);

export default Footer;
