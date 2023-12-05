import React from "react";
import { Typography, useMediaQuery } from "@mui/material";
import styles from "./styles.module.css";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardImage from "../PromotionSlide/CardImage";
import ImageBanner from "./ImageBanner";

interface Props {
  numberSlideToShow: number;
  numberSlideToScroll: number;
}

const LeftCollection = (): JSX.Element => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const settings: Settings = {
    arrows: true,
    infinite: true,
    autoplay: true,
    accessibility: true,
    dots: true,
    dotsClass: `${styles["slick-dots"]}`,
    className: `${styles.slider}`,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styles.arrowSlickNext}`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styles.arrowSlickBefore}`}
        style={{
          ...style,
          display: "block",
          zIndex: "3",
        }}
        onClick={onClick}
      />
    );
  }

  return (
    <Slider {...settings} className={styles.container}>
      <div className={styles.item}>
        <ImageBanner src="https://cdn.lep.vn/2022/09/images/categories/1662698517716-SILDE-PC-1.jpeg" />
      </div>
      <div className={styles.item}>
        <ImageBanner src="https://cdn.lep.vn/2022/09/images/categories/1662698517716-SILDE-PC-1.jpeg" />
      </div>
      <div className={styles.item}>
        <ImageBanner src="https://cdn.lep.vn/2022/09/images/categories/1662698517716-SILDE-PC-1.jpeg" />
      </div>
      <div className={styles.item}>
        <ImageBanner src="https://cdn.lep.vn/2022/09/images/categories/1662698517716-SILDE-PC-1.jpeg" />
      </div>
      <div className={styles.item}>
        <ImageBanner src="https://cdn.lep.vn/2022/09/images/categories/1662698517716-SILDE-PC-1.jpeg" />
      </div>
      <div className={styles.item}>
        <ImageBanner src="https://cdn.lep.vn/2022/09/images/categories/1662698517716-SILDE-PC-1.jpeg" />
      </div>
      <div className={styles.item}>
        <ImageBanner src="https://cdn.lep.vn/2022/09/images/categories/1662698517716-SILDE-PC-1.jpeg" />
      </div>
    </Slider>
  );
};

export default LeftCollection;
