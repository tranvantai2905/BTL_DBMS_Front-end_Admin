import React, { Dispatch, SetStateAction, useState } from "react";
import { GetStaticProps, NextPage } from "next";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import styles from "./styles.module.css";
import { addCategory, getCategoryById, updateCategory } from "@/pages/api";
import axios from "axios";
import { useEffect } from "react";

interface Category {
  categoryId: string;
  name: string;
  description: string;
}

interface Props {
  category?: Category;
  isUpdate?: boolean;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const CategoryPopup: React.FC<Props> = ({
  category,
  isUpdate = false,
  reload,
  setReload,
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [openNoti, setOpenNoti] = useState(false);
  const [statusAlert, setStatusAlert] = useState<AlertColor>("error");
  const [messageAlert, setMessageAlert] = useState("Thiếu thông tin");

  const hanldOpenNoti = () => {
    setOpenNoti(true);
  };

  const handleCloseNoti = (
    event: React.SyntheticEvent | Event | undefined = undefined,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNoti(false);
  };

  const fetchCategory = async () => {
    if (category) {
      const response = await getCategoryById(category.categoryId);
      setName(response?.data.data.name);
      setDesc(response?.data.data.description);
    }
  };

  const handleOpen = () => {
    fetchCategory();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProcessCategory = async () => {
    if (!isUpdate) {
      if (name === "") {
        setOpenNoti(true);
        setStatusAlert("error");
        setMessageAlert("Thiếu thông tin!");
        return;
      }
      const respone = await addCategory({ name, description: desc });
      setOpenNoti(true);
      setStatusAlert("success");
      setMessageAlert("Thành công");
      setReload(!reload);
    } else {
      const response = await updateCategory(category?.categoryId, name, desc);
      setOpenNoti(true);
      setStatusAlert("success");
      setMessageAlert("Thành công");
      setReload(!reload);
    }
    setName((name) => "");
    setDesc((desc) => "");
    setOpen(false);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseNoti(undefined, "timeout");
    }, 3000);
    return () => clearTimeout(timer);
  }, [openNoti, handleCloseNoti]);

  return (
    <div>
      <button onClick={handleOpen} className={styles.button}>
        {isUpdate ? "Cập nhật danh mục" : "+ Thêm mới danh mục"}
      </button>

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle className={styles.wrapForm}>
          {isUpdate ? "Cập nhật danh mục" : "Thêm mới danh mục"}
        </DialogTitle>
        <DialogContent>
          <form className={styles.form}>
            <Stack alignItems="center">
              <Stack
                className={styles.wrapInput}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <input
                  className={styles.input}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Name"
                  name="name"
                  type="text"
                />
              </Stack>
            </Stack>
            <Stack alignItems="center">
              <Stack
                className={styles.wrapInput}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <input
                  className={styles.input}
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                  placeholder="Description"
                  name="description"
                  type="text"
                />
              </Stack>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProcessCategory} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openNoti}
        autoHideDuration={null}
        onClose={handleCloseNoti}
      >
        <Alert
          onClose={handleCloseNoti}
          severity={statusAlert}
          sx={{ width: "100%" }}
        >
          {messageAlert}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CategoryPopup;
