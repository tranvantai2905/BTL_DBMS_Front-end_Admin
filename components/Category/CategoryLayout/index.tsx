import { getCategories } from "@/pages/api";
import { Grid, Stack, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import CategoryItem from "./CategoryItem";
import styles from "./styles.module.css";
import Pagination from "@mui/material/Pagination";
import CategoryPopup from "./CategoryPopup";

interface Category {
  categoryId: string;
  name: string;
  description: string;
}

interface Props {
  limit: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  categories?: Category[];
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const CategoryLayout: React.FC<Props> = ({
  limit,
  page,
  setPage,
  total,
  categories,
  reload,
  setReload,
}) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setPage(value);
    setReload(!reload);
  };

  return (
    <>
      <CategoryPopup reload={reload} setReload={setReload} />
      <Grid
        container
        borderBottom="0.5px solid #444"
        p="20px"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item className={styles.textHeader} xs={6} sm={4}>
          Danh mục
        </Grid>
        <Grid
          item
          sx={{ display: { xs: "none", sm: "block" } }}
          className={styles.textHeader}
          xs={4}
        >
          Mô tả
        </Grid>
        <Grid item className={styles.textHeader} xs={6} sm={4}>
          Thao tác
        </Grid>
      </Grid>
      {categories?.map((category, index) => (
        <CategoryItem
          key={index}
          category={category}
          reload={reload}
          setReload={setReload}
        />
      ))}
      <Stack m="20px 0" width="100%" alignItems="center">
        <Pagination
          count={Math.ceil(total / limit)}
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
};

export default CategoryLayout;
