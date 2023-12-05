import React, { useState } from "react";
import { Stack, Box, Typography, Button, useMediaQuery } from "@mui/material";
import styles from "./styles.module.css";
import Link from "next/link";
import SliderMutipleImages from "../SliderMutipleImages";

interface Props {
  title: string;
}

const PromotionSlide = ({ title = "No name" }: Props): JSX.Element => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 1200px)");
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt="4rem"
      mb="4rem"
    >
      <Typography className={styles.title}>{title}</Typography>
      <Link href="new-arrival">
        <button className={styles.button}>Shop Now</button>
      </Link>
      <Box sx={{ marginTop: "20px", width: { sm: "950px", xs: "375px" } }}>
        <SliderMutipleImages
          numberSlideToShow={isTablet ? (isMobile ? 2 : 3) : 4}
          numberSlideToScroll={isTablet ? 1 : 2}
        />
      </Box>
    </Box>
  );
};

export default PromotionSlide;
