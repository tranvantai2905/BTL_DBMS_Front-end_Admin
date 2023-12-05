import React, { useState } from "react";
import styles from "./styles.module.css";
import { Typography } from "@mui/material";

interface Props {
  src: string;
}

const ImageBanner = ({ src }: Props): JSX.Element => {
  return (
    <div className={styles.wrapper__item}>
      <img className={styles.image} alt="image" title="image" src={src} />
    </div>
  );
};

export default ImageBanner;
