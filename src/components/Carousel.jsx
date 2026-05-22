import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Collapse,
} from "@mui/material";
import MonitorIcon from "@mui/icons-material/Monitor";
import GitHubIcon from "@mui/icons-material/GitHub";

const DRAG_BUFFER = 10;
const VELOCITY_THRESHOLD = 500;
const GAP = 24;
const SPRING_OPTIONS = { type: "spring", stiffness: 400, damping: 40 };

export default function Carousel({
  items,
  baseHeight = 480,
  autoplay = true,
  autoplayDelay = 3000,
  pauseOnHover = true,
  loop = true,
}) {
  const containerRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    const containerNode = containerRef.current;
    if (!containerNode) return;

    const resizeObserver = new ResizeObserver(() => {
      setItemWidth(containerNode.offsetWidth);
    });

    resizeObserver.observe(containerNode);
    return () => resizeObserver.disconnect();
  }, []);

  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [expanded, setExpanded] = useState({});

  const handleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) return prev + 1;
          if (prev === carouselItems.length - 1) return loop ? 0 : prev;
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const MotionBox = motion(Box);
  const MotionCard = motion(Card);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "auto", md: `${baseHeight}px` },
        overflow: "hidden",
        mx: "auto",
        pb: { xs: 6, md: 0 },
      }}
    >
      <MotionBox
        drag="x"
        dragConstraints={{
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        }}
        style={{ x }}
        sx={{
          display: "flex",
          gap: `${GAP}px`,
          height: "100%",
          cursor: "grab",
          "&:active": { cursor: "grabbing" },
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => (
          <MotionCard
            key={`${item.id}-${index}`}
            sx={{
              width: `${itemWidth}px`,
              flexShrink: 0,
              height: { xs: "auto", md: "100%" },
              display: "flex",
              flexDirection: "column",
              p: { xs: 0.5, sm: 1 },
              boxSizing: "border-box",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <MonitorIcon
              sx={{
                position: "absolute",
                right: -20,
                top: -20,
                fontSize: 150,
                opacity: 0.05,
                transform: "rotate(-15deg)",
                zIndex: 0,
              }}
            />
            <CardMedia
              component="img"
              sx={{
                height: { xs: 160, sm: 200, md: "60%" },
                width: "100%",
                objectFit: "contain",
                p: { xs: 0.5, sm: 1 },
                background: "#fff",
                cursor: { xs: "pointer", md: "default" },
              }}
              image={item.image}
              alt={item.title}
              onClick={() => handleExpand(item.id)}
            />
            <CardContent 
              sx={{ flexGrow: 1, overflow: "auto", pb: 0, cursor: { xs: "pointer", md: "default" }, textAlign: "center" }}
              onClick={() => handleExpand(item.id)}
            >
              <Typography gutterBottom variant="h5" component="h3">
                {item.title}
              </Typography>
              
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Box>
            </CardContent>

            <Collapse in={!!expanded[item.id]} timeout="auto" unmountOnExit sx={{ display: { md: "none" } }}>
              <CardContent sx={{ pt: 0, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {item.description}
                </Typography>
                <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                  <Button
                    size="small"
                    href={item.link}
                    target="_blank"
                    startIcon={<GitHubIcon />}
                    variant="outlined"
                    color="primary"
                  >
                    View Project
                  </Button>
                </CardActions>
              </CardContent>
            </Collapse>

            <CardActions sx={{ mt: "auto", pt: 0, display: { xs: "none", md: "flex" }, justifyContent: "flex-start" }}>
              <Button
                size="small"
                href={item.link}
                target="_blank"
                startIcon={<GitHubIcon />}
              >
                View Project
              </Button>
            </CardActions>
          </MotionCard>
        ))}
      </MotionBox>
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
        }}
      >
        {items.map((_, index) => (
          <MotionBox
            key={index}
            onClick={() => setCurrentIndex(index)}
            animate={{ scale: currentIndex % items.length === index ? 1.2 : 1 }}
            transition={{ duration: 0.15 }}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor:
                currentIndex % items.length === index
                  ? "primary.main"
                  : "text.disabled",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
