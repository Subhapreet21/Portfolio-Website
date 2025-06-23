import React, { useState } from "react";
import {
  Typography,
  Paper,
  Box,
  useTheme,
  useMediaQuery,
  Collapse,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import Carousel from "./Carousel";
import adminDashboardImg from "../assets/projects/Admin_Dashboard.png";
import cropAdvisorImg from "../assets/projects/Crop_Advisor.png";
import heartDiseaseImg from "../assets/projects/Heart_Disease_Prediction.png";
import studentManagementImg from "../assets/projects/Student_Mangement_System.png";
import { FaGithub } from "react-icons/fa";

const projectsData = [
  {
    id: 1,
    title: "Admin Dashboard",
    description:
      "Developed a responsive MERN-based admin panel with modular UI components, secure authentication, and role-based access. Integrated Nivo and Chart.js for interactive financial dashboards, along with dynamic theming and a smart navigation system. ",
    image: adminDashboardImg,
    link: "https://github.com/Subhapreet21/CLEVER-DASH",
  },
  {
    id: 2,
    title: "Crop Advisor",
    description:
      "Built an ML-powered agriculture assistant using a Random Forest model to recommend crops based on soil and climate data. Integrated image-based plant disease detection and real-time data visualizations to help farmers make informed decisions through an intuitive Streamlit interface. ",
    image: cropAdvisorImg,
    link: "https://github.com/Subhapreet21/Agri-Smart",
  },
  {
    id: 3,
    title: "Heart Disease Prediction",
    description:
      "Built a GUI-based medical app using Logistic Regression to predict heart disease risk. Enabled real-time health data input, visualized key metrics using Matplotlib, and ensured secure patient data storage with MySQL through a user-friendly Tkinter interface. ",
    image: heartDiseaseImg,
    link: "https://github.com/Subhapreet21/CardioSmart-360",
  },
  {
    id: 4,
    title: "Student Information Management System",
    description:
      "Developed a GUI-based student record system with login authentication, data management, and image storage. Integrated search and password reset features, and visualized academic performance using Matplotlib for effective progress tracking.",
    image: studentManagementImg,
    link: "https://github.com/Subhapreet21/Students-Atlas",
  },
];

const Projects = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [expanded, setExpanded] = useState({});

  const handleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  let carouselHeight;

  if (isMdUp) {
    carouselHeight = 670;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 4 },
        my: 4,
        background: "transparent",
        border: "none",
      }}
    >
      <Typography variant="h2" component="h2" gutterBottom align="center">
        My Projects
      </Typography>
      {isMdUp ? (
        <Box
          sx={{
            mt: 4,
            maxWidth: { md: 800 },
            mx: "auto",
          }}
        >
          <Carousel items={projectsData} baseHeight={carouselHeight} />
        </Box>
      ) : (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 500,
            mx: "auto",
          }}
        >
          {projectsData.map((project) => (
            <Card
              key={project.id}
              sx={{
                borderRadius: 4,
                boxShadow: 3,
                background:
                  theme.palette.mode === "dark" ? "#232b3b" : "#f8fafc",
                border: (theme) =>
                  `1.5px solid ${
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.main
                      : "#e0e7ef"
                  }`,
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                image={project.image}
                alt={project.title}
                sx={{
                  width: "100%",
                  height: 140,
                  objectFit: "contain",
                  background: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => handleExpand(project.id)}
              />
              <CardContent
                sx={{ pb: 1, pt: 2, textAlign: "center", cursor: "pointer" }}
                onClick={() => handleExpand(project.id)}
              >
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {project.title}
                </Typography>
              </CardContent>
              <Collapse
                in={!!expanded[project.id]}
                timeout="auto"
                unmountOnExit
              >
                <CardContent sx={{ pt: 0, textAlign: "center" }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {project.description}
                  </Typography>
                  <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                    <Button
                      size="small"
                      href={project.link}
                      target="_blank"
                      startIcon={<FaGithub />}
                      variant="outlined"
                      color="primary"
                    >
                      View Project
                    </Button>
                  </CardActions>
                </CardContent>
              </Collapse>
            </Card>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default Projects;
