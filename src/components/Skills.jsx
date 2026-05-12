import React, { useRef, useState } from "react";
import { Box, Typography, Paper, Tooltip, useTheme } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import { motion } from "framer-motion";
import { SkillCoinView, SkillsGlobalCanvas } from "./SkillChip";

// Bulk-import SVG files as resolved URLs at build time
const svgModules = import.meta.glob("../assets/Tech Stack Assets/*.svg", {
  eager: true,
  query: "?url",
  import: "default",
});
const getSvgUrl = (filename) =>
  svgModules[`../assets/Tech Stack Assets/${filename}`];

const skills = [
  { name: "Python", svg: "python-programming-language-icon.svg" },
  { name: "Java", svg: "java-programming-language-icon.svg" },
  { name: "HTML5", svg: "html-icon.svg" },
  { name: "CSS3", svg: "css-icon.svg" },
  { name: "JavaScript", svg: "javascript-programming-language-icon.svg" },
  { name: "ReactJS", svg: "react-js-icon.svg" },
  { name: "MongoDB", svg: "mongodb-icon.svg" },
  { name: "NodeJS", svg: "node-js-icon.svg" },
  { name: "Express", svg: "express-js-icon.svg" },
  { name: "MySQL", svg: "mysql-icon.svg" },
  { name: "PostgreSQL", svg: "postgresql-icon.svg" },
  { name: "GitHub", svg: "github-icon.svg" },
  { name: "Git", svg: "git-icon.svg" },
  { name: "Arduino", svg: "arduino-icon.svg" },
  { name: "Material UI", svg: "material-ui-icon.svg" },
  { name: "Bootstrap", svg: "bootstrap-5-logo-icon.svg" },
  { name: "Android Studio", svg: "android-studio-icon.svg" },
  { name: "Jupyter", svg: "Jupyter.svg" },
  { name: "AutoCAD", svg: "autocad-icon.svg" },
  { name: "Salesforce", svg: "Salesforce.svg" },
];

const CoinTile = ({ skill, idx, isDark }) => {
  const trackRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const svgUrl = getSvgUrl(skill.svg);

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    setPointer({ x, y });
  };

  return (
    <Tooltip title={skill.name} placement="top" arrow>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: idx * 0.05 }}
        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Box
          ref={trackRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setPointer({ x: 0, y: 0 });
          }}
          onMouseMove={handleMove}
          sx={{
            width: { xs: 90, sm: 120 },
            height: { xs: 90, sm: 120 },
            borderRadius: "50%", // Circular for coins
            background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
            position: "relative",
            cursor: "pointer",
          }}
        >
          {svgUrl && (
            <SkillCoinView
              trackRef={trackRef}
              svgUrl={svgUrl}
              interactive={isHovered}
              pointer={pointer}
            />
          )}
        </Box>
      </motion.div>
    </Tooltip>
  );
};

const Skills = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Paper
      component={motion.create("section")}
      elevation={0}
      sx={{
        p: { xs: 2, md: 4 },
        my: 4,
        background: "transparent",
        border: "none",
        position: "relative",
        overflow: "visible",
      }}
    >
      <CodeIcon
        sx={{
          position: "absolute",
          right: -40,
          top: -40,
          fontSize: 250,
          opacity: 0.03,
          transform: "rotate(-15deg)",
          zIndex: 0,
        }}
      />

      <Typography
        variant="h2"
        component="h2"
        gutterBottom
        align="center"
        sx={{ mb: 8, fontWeight: "bold" }}
      >
        Technical Skills
      </Typography>

      {/* ONE global Canvas shared by all chips */}
      <SkillsGlobalCanvas />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 2, sm: 4 },
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {skills.map((skill, idx) => (
          <Box
            key={skill.name}
            sx={{
              width: {
                xs: `calc(100% / 3 - 16px)`,
                sm: `calc(100% / 4 - 20px)`,
                md: `calc(100% / 6 - 24px)`,
              },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CoinTile skill={skill} idx={idx} isDark={isDark} />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default Skills;
