import Layout from "../../components/Layout";
import { Box, Stack, Typography } from "@mui/material";
import styles from "./styles.module.css";
import CategoryLayout from "@/components/Category/CategoryLayout";
import { getCategories } from "../api";
import { useEffect, useState } from "react";

const Category: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [reload, setReload] = useState(false);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const res = await getCategories(limit, page);
      setCategories(res?.data.categories);
      setTotal(res?.data.count);
    }

    fetchData();
  }, [reload]);
  return (
    <>
      <Layout>
        <Box className="container">
          <Typography
            sx={{ paddingBottom: { xs: "1rem", md: "2rem" } }}
            className={styles.title}
          >
            DANH MỤC
          </Typography>
          <CategoryLayout
            limit={limit}
            page={page}
            setPage={setPage}
            total={total}
            categories={categories}
            reload={reload}
            setReload={setReload}
          />
        </Box>
      </Layout>
    </>
  );
};

export default Category;
