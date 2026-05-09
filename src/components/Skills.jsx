import React from "react";
import { Box, Typography, Paper, Grid, Tooltip, useTheme } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaPython,
  FaJava,
  FaBootstrap,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiArduino,
  SiMui,
  SiAndroidstudio,
  SiJupyter,
  SiAutocad,
} from "react-icons/si";
import { BsDatabaseFillCheck } from "react-icons/bs";

const skills = [
  { name: "Python", icon: <FaPython size="3em" />, color: "#3776AB" },
  { name: "Java", icon: <FaJava size="3em" />, color: "#007396" },
  { name: "HTML5", icon: <FaHtml5 size="3em" />, color: "#E34F26" },
  { name: "CSS3", icon: <FaCss3Alt size="3em" />, color: "#1572B6" },
  { name: "JavaScript", icon: <FaJsSquare size="3em" />, color: "#F7DF1E" },
  { name: "ReactJS", icon: <FaReact size="3em" />, color: "#61DAFB" },
  { name: "MongoDB", icon: <SiMongodb size="3em" />, color: "#47A248" },
  { name: "NodeJS", icon: <FaNodeJs size="3em" />, color: "#339933" },
  { name: "Express", icon: <SiExpress size="3em" />, color: "#000000" },
  { name: "MySQL", icon: <SiMysql size="3em" />, color: "#4479A1" },
  { name: "PostgreSQL", icon: <SiPostgresql size="3em" />, color: "#336791" },
  { name: "GitHub", icon: <FaGithub size="3em" />, color: "#181717" },
  { name: "Arduino", icon: <SiArduino size="3em" />, color: "#00979D" },
  { name: "Material UI", icon: <SiMui size="3em" />, color: "#0081CB" },
  { name: "Bootstrap", icon: <FaBootstrap size="3em" />, color: "#7952B3" },
  {
    name: "Android Studio",
    icon: <SiAndroidstudio size="3em" />,
    color: "#3DDC84",
  },
  {
    name: "Jupyter Notebook",
    icon: <SiJupyter size="3em" />,
    color: "#F37626",
  },
  { name: "AutoCAD", icon: <SiAutocad size="3em" />, color: "#DA291C" },
];

const Skills = () => {
  const theme = useTheme();

  return (
    <Paper
      component={motion.section}
      elevation={0}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      sx={{ p: { xs: 2, md: 4 }, my: 2, background: "transparent", border: "none", position: "relative", overflow: "hidden" }}
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Typography variant="h2" component="h2" gutterBottom align="center">
          Technical Skills
        </Typography>
      </motion.div>
      <Grid
        container
        spacing={{ xs: 2, sm: 4 }}
        justifyContent="center"
        sx={{ mt: 2 }}
      >
        {skills.map((skill, idx) => (
          <Grid item key={skill.name} xs={6} sm={4} md={2}>
            <Tooltip title={skill.name} placement="top">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5, delay: idx * 0.07 + 0.2 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.97 }}
                style={{ width: "100%" }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 1.5, sm: 2.5 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    aspectRatio: "1 / 1",
                    width: "100%",
                    maxWidth: { xs: 90, sm: 120 },
                    mx: "auto",
                    color: skill.color,
                    background: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.6)",
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.8)"}`,
                    borderRadius: 4,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
                  }}
                >
                  {skill.icon}
                </Paper>
              </motion.div>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Skills;
