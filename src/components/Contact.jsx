import React, { useState, useRef, useCallback, lazy, Suspense } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  IconButton,
  useTheme,
  Skeleton,
  Snackbar,
} from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import RoomIcon from "@mui/icons-material/Room";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const RobotModel = lazy(() => import("./RobotModel"));

const COLORS = [
  { id: "Btn_Red", color: "#FF4B4B" },
  { id: "Btn_Blue", color: "#00D4FF" },
  { id: "Btn_Yellow", color: "#FFD600" },
  { id: "Btn_Green", color: "#32CD32" },
];

// We use high-quality Twemoji vector SVGs instead of native OS emojis 
// so they look beautiful and consistent on Windows, Mac, and mobile.
const getEmojiImg = (hex) => (
  <img 
    src={`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${hex}.svg`} 
    alt="emoji" 
    style={{ width: "65%", height: "65%", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }} 
  />
);

const EMOJIS = [
  { id: "Exp_Smile", emoji: getEmojiImg("1f603") }, // 😃
  { id: "Exp_Angry", emoji: getEmojiImg("1f621") }, // 😡
  { id: "Exp_Sad", emoji: getEmojiImg("1f62d") },   // 😭
  { id: "Exp_Stars", emoji: getEmojiImg("1f929") }, // 🤩
];

const CONTACT_INFO = [
  {
    id: "email",
    label: "Email",
    icon: <AlternateEmailIcon />,
    values: ["subhapreetpatro2004@gmail.com"],
  },
  {
    id: "phone",
    label: "Phone",
    icon: <LocalPhoneIcon />,
    values: ["+91-7569753540"],
  },
  {
    id: "location",
    label: "Location",
    icon: <RoomIcon />,
    values: ["Hyderabad, Telangana, India"],
  },
];

const Contact = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const formRef = useRef();
  const robotRef = useRef(null);
  const typingTimerRef = useRef(null);

  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [isRobotHovered, setIsRobotHovered] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Track active Spline controls in React to override Spline's native toggle bugs
  const [activeColor, setActiveColor] = useState(null);
  const [activeEmoji, setActiveEmoji] = useState(null);

  const robotMood = sendSuccess
    ? "success"
    : sendError
      ? "error"
      : isSending
        ? "sending"
        : isTyping
          ? "typing"
          : isRobotHovered
            ? "hover"
            : "idle";

  const handleTyping = useCallback(() => {
    setIsTyping(true);
    clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => setIsTyping(false), 2000);
  }, []);

  const handleColorClick = (id) => {
    if (!robotRef.current) return;
    if (activeColor === id) {
      // Toggle off
      robotRef.current.triggerClick(id, true);
      setActiveColor(null);
    } else {
      // Turn off previous, turn on new
      if (activeColor) robotRef.current.triggerClick(activeColor, true);
      robotRef.current.triggerClick(id, false);
      setActiveColor(id);
    }
  };

  const handleEmojiClick = (id) => {
    if (!robotRef.current) return;
    if (activeEmoji === id) {
      // Toggle off
      robotRef.current.triggerClick(id, true);
      setActiveEmoji(null);
    } else {
      // Turn off previous, turn on new
      if (activeEmoji) robotRef.current.triggerClick(activeEmoji, true);
      robotRef.current.triggerClick(id, false);
      setActiveEmoji(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setSendSuccess(false);
    setSendError(false);
    setIsTyping(false);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          setSendSuccess(true);
          formRef.current.reset();
        },
        (error) => {
          console.log("FAILED…", error.text);
          setSendError(true);
        },
      )
      .finally(() => setIsSending(false));
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.45)",
      borderRadius: 2,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "& fieldset": {
        borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(0,188,212,0.4) !important",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#00bcd4 !important",
        borderWidth: "1.5px",
      },
      "&.Mui-focused": {
        boxShadow: "0 0 15px rgba(0,188,212,0.15)",
        background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.75)",
      },
    },
    "& .MuiInputBase-input": {
      fontSize: "0.95rem",
      color: isDark ? "#fff" : "#0f172a",
    },
  };

  return (
    <Paper
      component={motion.section}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      elevation={0}
      sx={{ p: { xs: 2, sm: 4 }, my: 4, background: "transparent" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Typography variant="h2" component="h2" gutterBottom align="center">
          Contact Me
        </Typography>
      </motion.div>

      <Box
        sx={{
          mt: 2,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1.15fr 0.85fr" },
          gridTemplateRows: { xs: "auto auto auto", md: "1fr auto" },
          gap: { xs: 2, md: 2.5 },
          minHeight: { xs: "auto", md: 540 },
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          sx={{
            gridRow: { xs: "1", md: "1 / 3" },
            height: "100%",
            minWidth: 0,
          }}
        >
          <Box
            onMouseEnter={() => setIsRobotHovered(true)}
            onMouseLeave={() => setIsRobotHovered(false)}
            sx={{
              width: "100%",
              height: { xs: 320, md: "100%" },
              borderRadius: 4,
              overflow: "hidden",
              backdropFilter: "blur(12px)",
              background: isDark
                ? "linear-gradient(160deg, rgba(17,25,40,0.75) 0%, rgba(10,15,25,0.85) 100%)"
                : "linear-gradient(160deg, rgba(255,255,255,0.85) 0%, rgba(240,250,255,0.75) 100%)",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,188,212,0.2)"}`,
              boxShadow: isDark
                ? "0 12px 40px rgba(0,0,0,0.4)"
                : "0 12px 40px rgba(0,188,212,0.08)",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "radial-gradient(circle at 50% 80%, rgba(0,188,212,0.1) 0%, transparent 70%)",
                pointerEvents: "none",
              },
            }}
          >
            <Suspense
              fallback={
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  animation="wave"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    bgcolor: isDark
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.04)",
                  }}
                />
              }
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  // Hack to hide the free "Built with Spline" watermark
                  "& a": {
                    display: "none !important",
                  },
                }}
              >
                <RobotModel ref={robotRef} mood={robotMood} style={{ minHeight: "100%" }} />
              </Box>

              {/* React UI Overlays for Controls */}
              <Box
                sx={{
                  position: "absolute",
                  top: 24,
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "center",
                  gap: { xs: 2, md: 3 },
                  zIndex: 10,
                }}
              >
                {COLORS.map((c) => (
                  <Box
                    key={c.id}
                    onClick={() => handleColorClick(c.id)}
                    sx={{
                      width: { xs: 40, md: 48 },
                      height: { xs: 40, md: 48 },
                      borderRadius: "50%",
                      bgcolor: c.color,
                      cursor: "pointer",
                      boxShadow: activeColor === c.id 
                         ? `0 0 0 3px ${isDark ? "#111" : "#fff"}, 0 0 0 6px ${c.color}` 
                         : "0 4px 12px rgba(0,0,0,0.15)",
                      transform: activeColor === c.id ? "scale(1.15)" : "scale(1)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "scale(1.15)",
                        boxShadow: activeColor === c.id 
                           ? `0 0 0 3px ${isDark ? "#111" : "#fff"}, 0 0 0 6px ${c.color}` 
                           : "0 8px 16px rgba(0,0,0,0.25)",
                      },
                      "&:active": {
                        transform: "scale(0.95)",
                      },
                    }}
                  />
                ))}
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  bottom: 24,
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "center",
                  gap: { xs: 2, md: 3 },
                  zIndex: 10,
                }}
              >
                {EMOJIS.map((e) => (
                  <Box
                    key={e.id}
                    onClick={() => handleEmojiClick(e.id)}
                    sx={{
                      width: { xs: 44, md: 52 },
                      height: { xs: 44, md: 52 },
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: { xs: "1.4rem", md: "1.8rem" },
                      cursor: "pointer",
                      background: activeEmoji === e.id
                        ? (isDark ? "rgba(0,188,212,0.3)" : "rgba(0,188,212,0.2)")
                        : (isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.4)"),
                      backdropFilter: "blur(12px)",
                      border: activeEmoji === e.id
                        ? "1px solid rgba(0,188,212,0.8)"
                        : `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.8)"}`,
                      boxShadow: activeEmoji === e.id
                        ? "0 8px 24px rgba(0,188,212,0.25)"
                        : "0 4px 16px rgba(0,0,0,0.1)",
                      transform: activeEmoji === e.id ? "scale(1.15)" : "scale(1)",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "scale(1.15)",
                        background: activeEmoji === e.id
                          ? (isDark ? "rgba(0,188,212,0.4)" : "rgba(0,188,212,0.3)")
                          : (isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.6)"),
                      },
                      "&:active": {
                        transform: "scale(0.95)",
                      },
                    }}
                  >
                    {e.emoji}
                  </Box>
                ))}
              </Box>
            </Suspense>
          </Box>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.28 }}
          sx={{
            gridRow: { xs: "2", md: "1" },
            height: "100%",
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              p: { xs: 1.5, sm: 2, md: 2 },
              borderRadius: 4,
              backdropFilter: "blur(12px)",
              background: isDark
                ? "linear-gradient(160deg, rgba(17,25,40,0.75) 0%, rgba(10,15,25,0.85) 100%)"
                : "linear-gradient(160deg, rgba(255,255,255,0.85) 0%, rgba(240,250,255,0.75) 100%)",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,188,212,0.2)"}`,
              boxShadow: isDark
                ? "0 12px 40px rgba(0,0,0,0.4)"
                : "0 12px 40px rgba(0,188,212,0.08)",
            }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                height: "100%",
                justifyContent: "center",
              }}
            >
              <input
                type="hidden"
                name="year"
                value={new Date().getFullYear()}
              />
              <input type="hidden" name="to_email" value="your@email.com" />

              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    ml: 0.5,
                  }}
                >
                  Full Name
                </Typography>
                <TextField
                  placeholder="e.g. John Doe"
                  variant="outlined"
                  name="from_name"
                  required
                  onChange={handleTyping}
                  sx={fieldSx}
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    ml: 0.5,
                  }}
                >
                  Email Address
                </Typography>
                <TextField
                  placeholder="e.g. john@example.com"
                  variant="outlined"
                  type="email"
                  name="from_email"
                  required
                  onChange={handleTyping}
                  sx={fieldSx}
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    ml: 0.5,
                  }}
                >
                  Your Message
                </Typography>
                <TextField
                  placeholder="How can I help you?"
                  variant="outlined"
                  name="message"
                  required
                  multiline
                  rows={3}
                  onChange={handleTyping}
                  sx={fieldSx}
                />
              </Box>

              <Box sx={{ position: "relative", mt: 1 }}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSending}
                    sx={{
                      width: "100%",
                      py: 1,
                      fontWeight: 800,
                      fontSize: "1rem",
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      background: "linear-gradient(90deg, #00bcd4, #0097a7)",
                      boxShadow: "0 8px 25px rgba(0,188,212,0.25)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "linear-gradient(90deg, #00d4ff, #00bcd4)",
                        boxShadow: "0 10px 30px rgba(0,188,212,0.45)",
                        transform: "translateY(-1px)",
                      },
                      "&.Mui-disabled": {
                        background: "rgba(255,255,255,0.05)",
                        color: "rgba(255,255,255,0.3)",
                      },
                    }}
                  >
                    {isSending ? "Sending..." : "Send Message"}
                  </Button>
                </motion.div>
                {isSending && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      mt: "-12px",
                      ml: "-12px",
                      color: "#00bcd4",
                    }}
                  />
                )}
              </Box>

            </form>
          </Box>
        </Box>

        <Snackbar
          open={sendSuccess}
          autoHideDuration={5000}
          onClose={(event, reason) => {
            if (reason === "clickaway") return;
            setSendSuccess(false);
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSendSuccess(false)}
            severity="success"
            sx={{
              width: "100%",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              backdropFilter: "blur(10px)",
              background: "linear-gradient(90deg, rgba(0, 188, 212, 0.9), rgba(0, 151, 167, 0.95))",
              color: "#fff",
              fontWeight: 600,
              letterSpacing: 0.5,
              "& .MuiAlert-icon": { color: "#fff" },
              "& .MuiAlert-action": { color: "#fff" },
            }}
          >
            Message sent successfully! I'll get back to you soon.
          </Alert>
        </Snackbar>

        <Snackbar
          open={sendError}
          autoHideDuration={5000}
          onClose={(event, reason) => {
            if (reason === "clickaway") return;
            setSendError(false);
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSendError(false)}
            severity="error"
            sx={{
              width: "100%",
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              backdropFilter: "blur(10px)",
              background: "linear-gradient(90deg, rgba(211, 47, 47, 0.9), rgba(198, 40, 40, 0.95))",
              color: "#fff",
              fontWeight: 600,
              letterSpacing: 0.5,
              "& .MuiAlert-icon": { color: "#fff" },
              "& .MuiAlert-action": { color: "#fff" },
            }}
          >
            Something went wrong. Please try again later.
          </Alert>
        </Snackbar>

        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.35 }}
          sx={{
            gridRow: { xs: "3", md: "2" },
            height: "100%",
            minWidth: 0,
          }}
        >

          <Box
            sx={{
              width: "100%",
              height: "100%",
              p: { xs: 1.5, sm: 2, md: 2 },
              borderRadius: 4,
              backdropFilter: "blur(12px)",
              background: isDark
                ? "linear-gradient(160deg, rgba(17,25,40,0.75) 0%, rgba(10,15,25,0.85) 100%)"
                : "linear-gradient(160deg, rgba(255,255,255,0.85) 0%, rgba(240,250,255,0.75) 100%)",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,188,212,0.2)"}`,
              boxShadow: isDark
                ? "0 12px 40px rgba(0,0,0,0.4)"
                : "0 12px 40px rgba(0,188,212,0.08)",
              mt: { xs: 1.5, md: 0 }, // Gap handled by space-between on desktop
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1.8fr 1fr" },
                gap: { xs: 2, sm: 2 },
                height: "100%",
                alignContent: "center",
              }}
            >
              {CONTACT_INFO.map((item, idx) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    gridColumn: item.id === "location" ? { xs: "span 1", sm: "span 2" } : "span 1",
                    pt: item.id === "location" ? { xs: 2, sm: 2 } : 0,
                    borderTop: item.id === "location" ? `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}` : "none",
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "12px",
                      background: isDark
                        ? "rgba(0,188,212,0.08)"
                        : "rgba(0,188,212,0.1)",
                      border: `1px solid ${isDark ? "rgba(0,188,212,0.25)" : "rgba(0,188,212,0.3)"}`,
                      color: "#00bcd4",
                    }}
                  >
                    {React.cloneElement(item.icon, { sx: { fontSize: 22 } })}
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        fontSize: "0.68rem",
                        letterSpacing: 1,
                        display: "block",
                        mb: 0.35,
                      }}
                    >
                      {item.label}
                    </Typography>
                    {item.values.map((val, vIdx) => (
                      <Typography
                        key={vIdx}
                        sx={{
                          color: isDark ? "#fff" : "#0f172a",
                          fontWeight: 600,
                          fontSize: { xs: "0.85rem", md: "0.9rem" },
                          lineHeight: 1.2,
                          wordBreak: "break-word",
                        }}
                      >
                        {val}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Contact;
