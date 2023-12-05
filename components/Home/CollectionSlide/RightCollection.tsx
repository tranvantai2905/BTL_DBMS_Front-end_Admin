import { Stack, Typography } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";

interface Props {
  title: string;
}

const RightCollection = ({ title }: Props): JSX.Element => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      sx={{
        backgroundColor: "#000",
        padding: { xs: "30px 0" },
        marginTop: { xs: "-4px", sm: 0 },
      }}
    >
      <Typography className={styles.right__title}>{title}</Typography>
      <Typography className={styles.right__name__collection}>
        New Collection 2023
      </Typography>
      <button className={styles.right__button}>View All</button>
    </Stack>
  );
};

export default RightCollection;
