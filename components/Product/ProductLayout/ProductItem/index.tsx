import React, { Dispatch, SetStateAction, useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import styles from "./styles.module.css";
import ProductPopup from "../ProductPopup";
import { deleteSpecificProduct } from "@/pages/api";
import { EnumType } from "typescript";

interface Product {
  sizes: {
    sizeName: string;
    quantity: number;
    productId: string;
    price: number;
  }[];
  productId: string;
  createdAt: string;
  name: string;
  description: string;
  deleted: number;
  images: string[];
}

interface Props {
  product?: Product;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const ProductItem: React.FC<Props> = ({ product, reload, setReload }) => {
  const [isUpdate, setIsUpdate] = useState(true);

  const handleDelete = async () => {
    const response = await deleteSpecificProduct(product?.productId);
    setReload(!reload);
  };

  return (
    <>
      <Grid container padding="25px" borderBottom="0.5px solid #444" p="20px">
        <Grid item xs={6} md={4}>
          <Stack flexDirection="row">
            <div className={styles.wrapImage}>
              <img
                width="100%"
                height="100%"
                src={product && product.images[0]}
              />
            </div>
            <Stack sx={{ marginLeft: { xs: 0, sm: "30px" } }}>
              <Typography
                fontSize="1.25rem"
                fontWeight="100"
                lineHeight="1.75rem"
                color="#444"
              >
                {product && product.name}
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid
          item
          sx={{
            marginLeft: { xs: "37%", md: "0px" },
            display: { xs: "none", md: "block" },
          }}
          xs={12}
          md={4}
        >
          <Typography fontSize="1.1rem" fontWeight="400" textAlign="center">
            {product && product.description}
          </Typography>
          {/* <Typography fontSize="1.1rem" fontWeight="400" textAlign="center">
            Category: {product && product.categories}
          </Typography> */}
          <Typography fontSize="1.1rem" fontWeight="400" textAlign="center">
            MinPrice:{" "}
            {product &&
              Math.min(
                ...product.sizes.map((size) => size.price)
              ).toLocaleString()}
            đ
          </Typography>
          <Typography fontSize="1.1rem" fontWeight="400" textAlign="center">
            MaxPrice:{" "}
            {product &&
              Math.max(
                ...product.sizes.map((size) => size.price)
              ).toLocaleString()}{" "}
            đ
          </Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <Stack flexDirection="row" alignItems="center">
            <ProductPopup
              product={product}
              reload={reload}
              setReload={setReload}
              isUpdate={isUpdate}
              setIsUpdate={setIsUpdate}
            />
            <button onClick={handleDelete} className={styles.button}>
              Xóa
            </button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductItem;
