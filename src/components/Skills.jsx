import React from "react";
import { Box, Typography, Paper, Grid, Tooltip, useTheme } from "@mui/material";
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

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Skills = () => {
  const theme = useTheme();

  return (
    <Paper
      component={motion.section}
      elevation={0}
      sx={{ p: 4, my: 4, background: "transparent", border: "none" }}
    >
      <Typography variant="h2" component="h2" gutterBottom align="center">
        Technical Skills
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, sm: 4 }}
        justifyContent="center"
        sx={{ mt: 2 }}
      >
        {skills.map((skill) => (
          <Grid item key={skill.name} xs={6} sm={4} md={2}>
            <Tooltip title={skill.name} placement="top">
              <motion.div
                variants={cardVariants}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    p: { xs: 1, sm: 3 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { xs: 80, sm: 120 },
                    height: { xs: 80, sm: 120 },
                    color: skill.color,
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "#f8fafc"
                        : "background.paper",
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
