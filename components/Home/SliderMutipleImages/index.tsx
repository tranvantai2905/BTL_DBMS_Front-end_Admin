import React from "react";
import { Typography, useMediaQuery } from "@mui/material";
import styles from "./styles.module.css";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardImage from "../PromotionSlide/CardImage";

interface SliderMutipleImagesProps {
  numberSlideToShow: number;
  numberSlideToScroll: number;
}

const SliderMutipleImages = ({
  numberSlideToShow = 2,
  numberSlideToScroll = 2,
}: SliderMutipleImagesProps): JSX.Element => {
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
    slidesToShow: numberSlideToShow,
    slidesToScroll: numberSlideToScroll,
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
        <CardImage
          src="https://cdn.lep.vn/2022/10/images/banners/1669012111241-1667911936656-p1.jpeg"
          name="Váy lụa 2 dây cổ đổ 1VA01740XT"
          price="650.000đ"
        />
      </div>
      <div className={styles.item}>
        <CardImage
          src="https://cdn.lep.vn/2022/10/images/banners/1669012111241-1667911936656-p1.jpeg"
          name="Váy lụa 2 dây cổ đổ 1VA01740XT"
          price="650.000đ"
        />
      </div>
      <div className={styles.item}>
        <CardImage
          src="https://cdn.lep.vn/2022/10/images/banners/1669012111241-1667911936656-p1.jpeg"
          name="Váy lụa 2 dây cổ đổ 1VA01740XT"
          price="650.000đ"
        />
      </div>
      <div className={styles.item}>
        <CardImage
          src="https://cdn.lep.vn/2022/10/images/banners/1669012111241-1667911936656-p1.jpeg"
          name="Váy lụa 2 dây cổ đổ 1VA01740XT"
          price="650.000đ"
        />
      </div>
      <div className={styles.item}>
        <CardImage
          src="https://cdn.lep.vn/2022/10/images/banners/1669012111241-1667911936656-p1.jpeg"
          name="Váy lụa 2 dây cổ đổ 1VA01740XT"
          price="650.000đ"
        />
      </div>
      <div className={styles.item}>
        <CardImage
          src="https://cdn.lep.vn/2022/10/images/banners/1669012111241-1667911936656-p1.jpeg"
          name="Váy lụa 2 dây cổ đổ 1VA01740XT"
          price="650.000đ"
        />
      </div>
      <div className={styles.item}>
        <CardImage
          src="https://cdn.lep.vn/2022/10/images/banners/1669012111241-1667911936656-p1.jpeg"
          name="Váy lụa 2 dây cổ đổ 1VA01740XT"
          price="650.000đ"
        />
      </div>
    </Slider>
  );
};

export default SliderMutipleImages;
