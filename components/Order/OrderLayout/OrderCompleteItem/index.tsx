import { getSpecificProduct } from "@/pages/api";
import { Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface Props {
  id: any;
  size: string;
  quantity: string;
  price: string;
}

const OrderCompleteItem: React.FC<Props> = ({ id, size, quantity, price }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const fetchData = async () => {
    const response = await getSpecificProduct(id);
    setName(response?.data.name);
    setImage(response?.data.images[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Grid container padding="25px" borderBottom="0.5px solid #444" p="20px">
        <Grid item md={6} xs={12}>
          <Stack flexDirection="row">
            <div className={styles.wrapImage}>
              <img
                width="80px"
                height="120px"
                style={{ objectFit: "cover", objectPosition: "center" }}
                // src="https://cdn.lep.vn/2022/09/images/products/1663057005975-1VA01940HO-compressed.jpeg"
                src={image}
              />
            </div>
            <Stack ml="30px">
              <Typography
                fontSize="1.1rem"
                fontWeight="100"
                lineHeight="1.75rem"
                color="#444"
                marginBottom="12px"
              >
                {name}
              </Typography>
              <Typography fontSize="1.1rem" fontWeight="400">
                Size {size}
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid item sx={{ marginLeft: { xs: "45%", md: "0px" } }} xs={12} md={2}>
          <Typography fontSize="1.1rem" fontWeight="400">
            {parseInt(price).toLocaleString()} đ
          </Typography>
        </Grid>
        <Grid item sx={{ marginLeft: { xs: "37%", md: "0px" } }} xs={12} md={2}>
          <Stack flexDirection="row" alignItems="center">
            <Typography fontSize="1.1rem" fontWeight="400">
              {quantity} x
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          sx={{
            marginLeft: { xs: "37%", md: "0px" },
            display: { xs: "none", md: "block" },
          }}
          xs={12}
          md={2}
        >
          <Stack flexDirection="row" alignItems="center">
            <Typography fontSize="1.1rem" fontWeight="400" color="#9f1110">
              {(+quantity * +price).toLocaleString()} đ
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderCompleteItem;
