import React from "react";

const Footer = () => (
  <footer
    style={{
      width: "100%",
      textAlign: "center",
      padding: "1rem 0",
      background: "rgba(0,0,0,0.03)",
      fontSize: "0.95rem",
      color: "#888",
    }}
  >
    &copy; {new Date().getFullYear()} Subhapreet Patro. All rights reserved.
  </footer>
);

export default Footer;
