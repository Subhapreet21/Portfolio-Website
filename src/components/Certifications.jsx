import {
  Box,
  Typography,
  Paper,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
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

const certifications = [
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
  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, my: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Typography variant="h2" component="h2" gutterBottom align="center">
          Certifications
        </Typography>
      </motion.div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, sm: 3 },
          mt: 4,
        }}
      >
        {sortedCerts.map((cert, idx) => (
          <motion.div
            key={cert.title + idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: idx * 0.1 + 0.2 }}
            style={{ width: "100%" }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "stretch",
                p: { xs: 0.5, sm: 1.5 },
                boxShadow: 4,
                mb: { xs: 2, sm: 0 },
                minWidth: 0,
                width: { xs: "100%", sm: "96%", md: "92%", lg: "88%" },
                maxWidth: { xs: "100%", sm: "100%", md: 1100, lg: 1300 },
                mx: "auto",
                background: (theme) =>
                  theme.palette.mode === "dark" ? "#232b3b" : "#f8fafc",
                borderRadius: 8,
                border: (theme) =>
                  `1.5px solid ${
                    theme.palette.mode === "dark"
                      ? theme.palette.primary.main
                      : "#e0e7ef"
                  }`,
                gap: { xs: 0, sm: 0 },
              }}
            >
              {/* Image on the left or top */}
              <Box
                sx={{
                  flex: { xs: "unset", sm: "0 0 340px" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 0,
                  p: { xs: 1, sm: 2 },
                  background: "#fff",
                  borderRadius: { xs: 6, sm: "8px 0 0 8px" },
                  borderRight: {
                    xs: "none",
                    sm: (theme) =>
                      `1.5px solid ${
                        theme.palette.mode === "dark"
                          ? theme.palette.primary.main
                          : "#e0e7ef"
                      }`,
                  },
                  mb: { xs: 0, sm: 0 },
                }}
              >
                <Box
                  component="img"
                  src={cert.image}
                  alt={cert.title}
                  sx={{
                    width: { xs: "100%", sm: 300, md: 320 },
                    height: { xs: 120, sm: 180, md: 220 },
                    objectFit: "contain",
                    borderRadius: 4,
                    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.06)",
                    background: "#fff",
                  }}
                />
              </Box>
              {/* Text and button on the right or below */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: { xs: "center", sm: "flex-start" },
                  px: { xs: 1, sm: 3 },
                  py: { xs: 1.5, sm: 2 },
                  gap: 1.5,
                  minWidth: 0,
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={600}
                  gutterBottom
                  sx={{ textAlign: { xs: "center", sm: "left" } }}
                >
                  {cert.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ textAlign: { xs: "center", sm: "left" } }}
                >
                  {cert.organization}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, textAlign: { xs: "center", sm: "left" } }}
                >
                  Issued: {cert.issue_date}
                </Typography>
                <Box
                  sx={{ mt: 2, alignSelf: { xs: "center", sm: "flex-start" } }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    href={cert.file}
                    target="_blank"
                    startIcon={<PictureAsPdfIcon />}
                    sx={{ mb: 1, minWidth: 120 }}
                  >
                    View PDF
                  </Button>
                </Box>
              </Box>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Paper>
  );
};

export default Certifications;
