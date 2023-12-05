import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import styles from "./styles.module.css";

const LocationBanner = (): JSX.Element => {
  return (
    <Stack className={styles.background}>
      <div className={styles.image}>
        {/* <img src="https://lep.vn/images/preview-store.png" /> */}
      </div>
      <Stack
        p="30px 0"
        sx={{ flexDirection: { xs: "column", md: "row" } }}
        justifyContent="space-around"
      >
        <Stack>
          <Typography className={styles.title}>Lép Hà nội</Typography>
          <Typography className={styles.address}>
            - 244 Bà Triệu | 0398 841 816
          </Typography>
          <Typography className={styles.address}>
            - 244 Bà Triệu | 0398 841 816
          </Typography>
          <Typography className={styles.address}>
            - 244 Bà Triệu | 0398 841 816
          </Typography>
          <Typography className={styles.address}>
            - 244 Bà Triệu | 0398 841 816
          </Typography>
          <Typography className={styles.address}>
            - 244 Bà Triệu | 0398 841 816
          </Typography>
        </Stack>
        <Stack>
          <Typography className={styles.title}>Lép Hồ Chí Minh</Typography>
          <Typography className={styles.address}>
            - 244 Bà Triệu | 0398 841 816
          </Typography>
          <Typography className={styles.address}>
            - 244 Bà Triệu | 0398 841 816
          </Typography>
          <Typography className={styles.address}>
            - 244 Bà Triệu | 0398 841 816
          </Typography>
          <Typography className={styles.address}>
            - 244 Bà Triệu | 0398 841 816
          </Typography>
          <Typography className={styles.address}>
            - 244 Bà Triệu | 0398 841 816
          </Typography>
        </Stack>
        <Stack>
          <Typography className={styles.title}>
            Lép Các tỉnh thành khác
          </Typography>
          <Typography className={styles.address}>
            - 244 Bà Triệu | 0398 841 816
          </Typography>
          <Typography className={styles.address}>
            - 244 Bà Triệu | 0398 841 816
          </Typography>
          <Typography className={styles.address}>
            - 244 Bà Triệu | 0398 841 816
          </Typography>
          <Typography className={styles.address}>
            - 244 Bà Triệu | 0398 841 816
          </Typography>
          <Typography className={styles.address}>
            - 244 Bà Triệu | 0398 841 816
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LocationBanner;
