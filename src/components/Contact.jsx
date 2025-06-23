import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setSendSuccess(false);
    setSendError(false);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          setSendSuccess(true);
          formRef.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          setSendError(true);
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      elevation={0}
      sx={{ p: { xs: 2, sm: 4 }, my: 4, background: "transparent" }}
    >
      <Typography variant="h2" component="h2" gutterBottom align="center">
        Contact Me
      </Typography>
      <Box
        component="form"
        ref={formRef}
        onSubmit={handleSubmit}
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: { xs: 1.5, sm: 2 },
          maxWidth: 600,
          width: "100%",
          mx: "auto",
        }}
      >
        <input type="hidden" name="to_email" value="your@email.com" />
        <TextField
          label="Your Name"
          variant="filled"
          name="from_name"
          required
        />
        <TextField
          label="Your Email"
          variant="filled"
          type="email"
          name="from_email"
          required
        />
        <TextField
          label="Your Message"
          variant="filled"
          name="message"
          required
          multiline
          rows={4}
        />
        <Box sx={{ position: "relative" }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSending}
            sx={{ width: "100%" }}
          >
            Send Message
          </Button>
          {isSending && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
        {sendSuccess && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Thank you for your message! I'll get back to you soon.
          </Alert>
        )}
        {sendError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Something went wrong. Please try again later.
          </Alert>
        )}
      </Box>
    </Paper>
  );
};

export default Contact;
