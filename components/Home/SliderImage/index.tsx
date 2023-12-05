import React from "react";
import { IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import styles from "./styles.module.css";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const SliderBanner: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const settings: Settings = {
    arrows: true,
    infinite: true,
    autoplay: true,
    accessibility: true,
    autoplaySpeed: 3000,
    dots: true,
    dotsClass: `${styles["slick-dots"]}`,
    className: `${styles.slider}`,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // touchMove:true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", right: "22px", scale: "1.5" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          left: "22px",
          zIndex: "3",
          scale: "1.5",
        }}
        onClick={onClick}
      />
    );
  }

  return !isMobile ? (
    <Slider {...settings} className={styles.container}>
      <div className={styles.item}>
        <div className={styles.wrapper__item}>
          <img
            className={styles.image}
            alt="Slider trang chu 1"
            title="Slider trang chu 1"
            src="https://cdn.lep.vn/2022/10/images/banners/1669012145337-cover-pc-(2).jpeg"
          />
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.wrapper__item}>
          <img
            className={styles.image}
            alt="Slider trang chu 2"
            title="Slider trang chu 2"
            src="https://cdn.lep.vn/2022/10/images/banners/1669012126430-1667911961628-COVER---PC-1.jpeg"
          />
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.wrapper__item}>
          <img
            className={styles.image}
            alt="Slider trang chu 3"
            title="Slider trang chu 3"
            src="https://cdn.lep.vn/2022/10/images/banners/1669012120989-1667911924387-pp.jpeg"
          />
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.wrapper__item}>
          <img
            className={styles.image}
            alt="Slider trang chu 4"
            title="Slider trang chu 4"
            src="https://cdn.lep.vn/2022/10/images/banners/1669012108849-1667911933660-p.jpeg"
          />
        </div>
      </div>
    </Slider>
  ) : (
    //ON MOBILE
    <Slider {...settings} className={styles.container}>
      <div className={styles.item}>
        <div className={styles.wrapper__item}>
          <img
            className={styles.image}
            alt="Slider trang chu 1"
            title="Slider trang chu 1"
            src="https://cdn.lep.vn/2022/10/images/banners/1669012148827-COVER-MOBILE-(1).jpeg"
          />
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.wrapper__item}>
          <img
            className={styles.image}
            alt="Slider trang chu 2"
            title="Slider trang chu 2"
            src="https://cdn.lep.vn/2022/10/images/banners/1669012132047-1667911964830-COVER-MOBILE-1.jpeg"
          />
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.wrapper__item}>
          <img
            className={styles.image}
            alt="Slider trang chu 3"
            title="Slider trang chu 3"
            src="https://cdn.lep.vn/2022/10/images/banners/1669012123326-1667911927382-ppp.jpeg"
          />
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.wrapper__item}>
          <img
            className={styles.image}
            alt="Slider trang chu 4"
            title="Slider trang chu 4"
            src="https://cdn.lep.vn/2022/10/images/banners/1669012111241-1667911936656-p1.jpeg"
          />
        </div>
      </div>
    </Slider>
  );
};

export default SliderBanner;
