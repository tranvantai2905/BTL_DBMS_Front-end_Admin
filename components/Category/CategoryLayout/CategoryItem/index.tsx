import React, { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import styles from "./styles.module.css";
import CategoryPopup from "../CategoryPopup";
import { deleteCategory } from "@/pages/api";

interface Category {
  categoryId: string;
  name: string;
  description: string;
}

interface Props {
  category: Category;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const CategoryItem: React.FC<Props> = ({ category, reload, setReload }) => {
  const [isUpdate, setIsUpdate] = useState(true);

  const handleDeleteCategory = async () => {
    const response = await deleteCategory(category.categoryId);
    setReload(!reload);
  };

  return (
    <>
      <Grid container padding="25px" borderBottom="0.5px solid #444" p="20px">
        <Grid item xs={6} sm={4}>
          <Stack flexDirection="row">
            <Typography
              fontSize="1.25rem"
              fontWeight="100"
              lineHeight="1.75rem"
              color="#444"
            >
              {category.name}
            </Typography>
          </Stack>
        </Grid>

        <Grid
          item
          sx={{
            marginLeft: { xs: "37%", sm: "0px" },
            display: { xs: "none", sm: "block" },
          }}
          xs={12}
          sm={4}
        >
          <Typography fontSize="1.1rem" fontWeight="400">
            {category.description}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Stack flexDirection="row" alignItems="center">
            <CategoryPopup
              isUpdate={isUpdate}
              reload={reload}
              setReload={setReload}
              category={category}
            />
            <button onClick={handleDeleteCategory} className={styles.button}>
              Xóa
            </button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default CategoryItem;
