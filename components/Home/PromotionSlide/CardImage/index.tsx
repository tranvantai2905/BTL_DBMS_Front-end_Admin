import React, { useState } from "react";
import styles from "./styles.module.css";
import { Typography } from "@mui/material";

interface CardImageProps {
  src: string;
  name: string;
  price: string;
}

const CardImage = ({ src, name, price }: CardImageProps): JSX.Element => {
  return (
    <div className={styles.wrapper__item}>
      <img className={styles.image} alt="image" title="image" src={src} />
      <Typography className={styles.name} color="#000">
        {name}
      </Typography>
      <Typography className={styles.price} color="#000">
        {parseInt(price).toLocaleString()} đ
      </Typography>
    </div>
  );
};

export default CardImage;
