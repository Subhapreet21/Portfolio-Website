import React from "react";
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  useTheme,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { motion } from "framer-motion";

// Certificate images
import spokenEnglishImg from "../assets/certificates/Spoken English.jpg";
import smartEnglishImg from "../assets/certificates/Smart English Basics for Professionals.jpg";
import pythonEssentialsImg from "../assets/certificates/Python Programming Essentials.jpg";
import pythonBasicImg from "../assets/certificates/Python Basic Structures.jpg";
import introPythonImg from "../assets/certificates/Introduction to Python Programming.jpg";
import introJavaImg from "../assets/certificates/Introduction to Java.jpg";
import introGenAIImg from "../assets/certificates/Introduction to Generative AI.jpg";
import foundationsDataImg from "../assets/certificates/Foundations of data analytics.jpg";
import deepLearningImg from "../assets/certificates/Deep Learning.jpg";
import deloitteImg from "../assets/certificates/Deloitte Australia - Data Analytics Job Simulation.jpg";
import accentureImg from "../assets/certificates/Accenture Nordics - Software Engineering Job Simulation.jpg";
import githubFoundations from "../assets/certificates/Github_Foundations_Part1of2.png";
import githubFundamentals from "../assets/certificates/GitHub fundamentals-Administration_basics_and_product_features_Part1of2.png";
import edunetImg from "../assets/certificates/Edunet-Artificial Intelligence.png";
import edunetInternshipImg from "../assets/certificates/AICTE B4 PD Completion-1040.png";
import agentforceCertificateImg from "../assets/certificates/Salesforce Certified Agentforce Specialist.jpg";
// Certificate PDFs
import spokenEnglishPdf from "../assets/certificates/Spoken English.pdf";
import smartEnglishPdf from "../assets/certificates/Smart English Basics for Professionals.pdf";
import pythonEssentialsPdf from "../assets/certificates/Python Programming Essentials.pdf";
import pythonBasicPdf from "../assets/certificates/Python Basic Structures.pdf";
import introPythonPdf from "../assets/certificates/Introduction to Python Programming.pdf";
import introJavaPdf from "../assets/certificates/Introduction to Java.pdf";
import introGenAIPdf from "../assets/certificates/Introduction to Generative AI.pdf";
import foundationsDataPdf from "../assets/certificates/Foundations of data analytics.pdf";
import deepLearningPdf from "../assets/certificates/Deep Learning.pdf";
import deloittePdf from "../assets/certificates/Deloitte Australia - Data Analytics Job Simulation.pdf";
import accenturePdf from "../assets/certificates/Accenture Nordics - Software Engineering Job Simulation.pdf";
import githubFoundationsPdf from "../assets/certificates/GitHub Foundations Part 1 of 2.pdf";
import githubFundamentalsPdf from "../assets/certificates/GitHub fundamentals - Administration basics and product features Part 1 of 2.pdf";
import edunetPdf from "../assets/certificates/Edunet-Artificial Intelligence.pdf";
import edunetInternshipPdf from "../assets/certificates/AICTE B4 PD Completion-1040.pdf";
import agentforceCertificatePdf from "../assets/certificates/Salesforce Certified Agentforce Specialist.pdf";

const certifications = [
  {
    title: "Salesforce Certified Agentforce Specialist",
    organization: "Salesforce",
    issue_date: "December 2025",
    image: agentforceCertificateImg,
    file: agentforceCertificatePdf,
  },
  {
    title: "Deloitte Australia - Data Analytics Job Simulation",
    organization: "Forage",
    issue_date: "May 2025",
    image: deloitteImg,
    file: deloittePdf,
  },
  {
    title: "Accenture Nordics - Software Engineering Job Simulation",
    organization: "Forage",
    issue_date: "May 2025",
    image: accentureImg,
    file: accenturePdf,
  },
  {
    title: "Spoken English",
    organization: "Great Learning",
    issue_date: "April 2024",
    image: spokenEnglishImg,
    file: spokenEnglishPdf,
  },
  {
    title: "AI For Everyone",
    organization: "DeepLearning.AI via Coursera",
    issue_date: "November 2023",
    image: deepLearningImg,
    file: deepLearningPdf,
  },
  {
    title: "Foundations: Data, Data, Everywhere",
    organization: "Google via Coursera",
    issue_date: "June 2023",
    image: foundationsDataImg,
    file: foundationsDataPdf,
  },
  {
    title: "Introduction to Generative AI - Art of the Possible",
    organization: "AWS Training & Certification",
    issue_date: "June 2025",
    image: introGenAIImg,
    file: introGenAIPdf,
  },
  {
    title: "Introduction to Java",
    organization: "LearnQuest via Coursera",
    issue_date: "November 2023",
    image: introJavaImg,
    file: introJavaPdf,
  },
  {
    title: "Introduction to Python Programming",
    organization: "University of Pennsylvania via Coursera",
    issue_date: "June 2023",
    image: introPythonImg,
    file: introPythonPdf,
  },
  {
    title: "Python Basic Structures: Lists, Strings, and Files",
    organization: "Codio via Coursera",
    issue_date: "June 2023",
    image: pythonBasicImg,
    file: pythonBasicPdf,
  },
  {
    title: "Python Programming Essentials",
    organization: "Rice University via Coursera",
    issue_date: "June 2023",
    image: pythonEssentialsImg,
    file: pythonEssentialsPdf,
  },
  {
    title: "Smart English Basics for Professionals",
    organization: "Great Learning",
    issue_date: "April 2024",
    image: smartEnglishImg,
    file: smartEnglishPdf,
  },
  {
    title: "GitHub Foundations Part 1 of 2",
    organization: "Microsoft",
    issue_date: "August 2025",
    image: githubFoundations,
    file: githubFoundationsPdf,
  },
  {
    title:
      "GitHub fundamentals - Administration basics and product features Part 1 of 2",
    organization: "Microsoft",
    issue_date: "August 2025",
    image: githubFundamentals,
    file: githubFundamentalsPdf,
  },
  {
    title: "Edunet-Artificial Intelligence",
    organization: "IBM Skillsbuild",
    issue_date: "September 2025",
    image: edunetImg,
    file: edunetPdf,
  },
  {
    title: "Edunet-Internship on Artificial Intelligence & Cloud Technology",
    organization: "Edunet Foundation",
    issue_date: "November 2025",
    image: edunetInternshipImg,
    file: edunetInternshipPdf,
  },
];

// Helper to sort by date descending (YYYY/MM or Month YYYY)
const parseDate = (dateStr) => {
  // Try to parse as 'Month YYYY'
  const [month, year] = dateStr.split(" ");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIdx = months.findIndex((m) => m === month);
  return year
    ? new Date(parseInt(year), monthIdx === -1 ? 0 : monthIdx)
    : new Date(dateStr);
};

const sortedCerts = certifications
  .slice()
  .sort((a, b) => parseDate(b.issue_date) - parseDate(a.issue_date));

const Certifications = () => {
  const theme = useTheme();

  const CertificationCard = ({ cert, idx }) => (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(idx * 0.1, 0.5) }}
      sx={{ width: '100%', display: 'flex' }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "stretch",
          width: "100%",
          p: { xs: 0.5, sm: 1.5 },
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          background: theme.palette.mode === "dark" ? "rgba(19, 32, 64, 0.8)" : "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.8)"}`,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": { transform: "translateY(-3px)", boxShadow: theme.palette.mode === "dark" ? "0 12px 40px rgba(0,0,0,0.5)" : "0 12px 40px rgba(0,0,0,0.15)" },
          gap: { xs: 0, sm: 2 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <EmojiEventsIcon
          sx={{
            position: "absolute",
            right: -15,
            top: -15,
            fontSize: 100,
            opacity: 0.04,
            transform: "rotate(-10deg)",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            flex: { xs: "unset", sm: "0 0 280px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.02)" : "#fff",
            borderRadius: { xs: 3, sm: 3 },
            border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
            minHeight: { xs: 160, sm: "auto" }
          }}
        >
          <Box
            component="img"
            src={cert.image}
            alt={cert.title}
            sx={{
              width: "100%",
              height: { xs: 140, sm: 160 },
              objectFit: "contain",
              filter: theme.palette.mode === "light" ? "drop-shadow(0 4px 12px rgba(0,0,0,0.08))" : "none"
            }}
          />
        </Box>
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", sm: "flex-start" },
            p: { xs: 2, sm: 3 },
            "&:last-child": { pb: { xs: 2, sm: 3 } }
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            gutterBottom
            sx={{ textAlign: { xs: "center", sm: "left" }, fontSize: { xs: '1.1rem', sm: '1.3rem' } }}
          >
            {cert.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="primary.main"
            fontWeight={600}
            sx={{ textAlign: { xs: "center", sm: "left" }, mb: 1 }}
          >
            {cert.organization}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: { xs: "center", sm: "left" }, mb: 3 }}
          >
            Issued: {cert.issue_date}
          </Typography>
          <Box sx={{ mt: 'auto', alignSelf: { xs: "center", sm: "flex-start" } }}>
            <Button
              variant="outlined"
              size="small"
              href={cert.file}
              target="_blank"
              startIcon={<PictureAsPdfIcon />}
              sx={{ borderRadius: 2, px: 3, borderWidth: 1.5, "&:hover": { borderWidth: 1.5 } }}
            >
              View PDF
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, my: 4, background: "transparent", border: "none" }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h2" fontWeight={800} gutterBottom>
            Certifications
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            A collection of my professional achievements and skill validations.
          </Typography>
        </motion.div>
      </Box>

      <Box
        sx={{
          maxWidth: 960,
          mx: "auto",
          maxHeight: 750,
          overflowY: "auto",
          overflowX: "hidden",
          pr: { xs: 1, sm: 2 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
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
        {sortedCerts.map((cert, idx) => (
          <CertificationCard key={idx} cert={cert} idx={idx} />
        ))}
      </Box>
    </Paper>
  );
};

export default Certifications;
