import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
  Alert,
  Box,
  AlertColor,
} from "@mui/material";
import styles from "./styles.module.css";
import axios from "axios";
import {
  addProduct,
  getCategories,
  getSpecificProduct,
  updateSpecificProduct,
} from "@/pages/api";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
  isUpdate?: boolean;
  setIsUpdate?: Dispatch<SetStateAction<boolean>>;
  product?: Product;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

interface Category {
  categoryId: string;
  name: string;
  description: string;
}

interface Size {
  sizeName: string;
  quantity: number;
  price: number;
}

const ProductPopup: React.FC<Props> = ({
  product,
  isUpdate,
  setIsUpdate,
  reload,
  setReload,
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<FileList>();

  const [sizes, setSizes] = useState<Size[]>([]);

  const [newSizeName, setNewSizeName] = useState("");
  const [newSizeQuantity, setNewSizeQuantity] = useState(0);
  const [newSizePrice, setNewSizePrice] = useState(0);
  const [openNoti, setOpenNoti] = useState(false);
  const [statusAlert, setStatusAlert] = useState<AlertColor>("error");
  const [messageAlert, setMessageAlert] = useState("Thiếu thông tin");

  const resetState = () => {
    setOpen(false);
    setName("");
    setDescription("");
    setImages(undefined);
    // setCategories([]);
    setSizes([]);
    setNewSizeName("");
    setNewSizeQuantity(0);
    setNewSizePrice(0);
    setStatusAlert("error");
    setMessageAlert("Thiếu thông tin!");
  };

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      setImages(file);
    }
  };

  const handleChangeCategories = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
  };

  const handleAddSize = () => {
    const newSize = {
      sizeName: newSizeName,
      quantity: newSizeQuantity,
      price: newSizePrice,
    };
    if (newSizeName === "" || newSizeQuantity === 0 || newSizePrice === 0) {
      setOpenNoti(true);
      return;
    }
    setSizes([...sizes, newSize]);
    setOpenNoti(true);
    setStatusAlert("success");
    setMessageAlert("Thành công!");
    setNewSizeName("");
    setNewSizeQuantity(0);
    setNewSizePrice(0);
  };

  const handleProcessProduct = async () => {
    if (!isUpdate) {
      const formData = new FormData();
      if (name === "" || description === "" || sizes.length === 0 || !images) {
        setOpenNoti(true);
        setStatusAlert("error");
        setMessageAlert("Thiếu thông tin");
        return;
      }
      formData.append("name", name);
      formData.append("description", description);
      formData.append("sizes", JSON.stringify(sizes));

      if (images) {
        for (let i = 0; i < images.length; i++) {
          formData.append("images", images[i]);
        }
      }
      setStatusAlert("success");
      setMessageAlert("Thành công!");
      setOpenNoti(true);
      setOpen(false);
      setName("");
      setDescription("");
      setImages(undefined);
      setSizes([]);
      setNewSizeName("");
      setNewSizeQuantity(0);
      setNewSizePrice(0);
      const res = await addProduct(formData);
      setReload(!reload);
    } else {
      if (product) {
        const updateForm = new FormData();
        updateForm.append("name", name);
        updateForm.append("description", description);
        updateForm.append("sizes", JSON.stringify(sizes));
        if (images) {
          for (let i = 0; i < images.length; i++) {
            updateForm.append("images", images[i]);
          }
        }
        setStatusAlert("success");
        setMessageAlert("Thành công!");
        setOpenNoti(true);
        setOpen(false);
        setName("");
        setDescription("");
        setImages(undefined);
        setSizes([]);
        setNewSizeName("");
        setNewSizeQuantity(0);
        setNewSizePrice(0);
        const response = await updateSpecificProduct(
          product.productId,
          updateForm
        );
        setReload(!reload);
      }
    }
  };

  const handleSizeUpdate = (updatedSize: Size, index: number) => {
    setSizes((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index] = updatedSize;
      return newSizes;
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenNoti(false);
    resetState();
  };

  const fetchSpecificProduct = async () => {
    if (product) {
      const response = await getSpecificProduct(product.productId);
      const { name, description, sizes } = response?.data?.data.product;
      setName(name);
      setDescription(description);
      setSizes(sizes);
      setImages(images);
    }
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleCloseNoti}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseNoti}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  useEffect(() => {
    fetchSpecificProduct();
  }, [open]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseNoti(undefined, "timeout");
    }, 3000);
    return () => clearTimeout(timer);
  }, [openNoti, handleCloseNoti]);

  return (
    <div>
      <button onClick={handleOpen} className={styles.button}>
        {isUpdate ? "Cập nhật sản phẩm" : "+ Thêm mới sản phẩm"}
      </button>

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle className={styles.wrapForm}>
          {isUpdate ? "Cập nhật sản phẩm" : "Thêm mới sản phẩm"}
        </DialogTitle>
        <DialogContent>
          <div>
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
                  name="Name"
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
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeholder="Description"
                  name="description"
                  type="text"
                />
              </Stack>
            </Stack>

            <Stack>
              <Stack>
                <Stack
                  className={styles.wrapInput}
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <label>Size</label>
                  <input
                    className={styles.input}
                    onChange={(e) => setNewSizeName(e.target.value)}
                    value={newSizeName}
                    placeholder="Size name"
                    name="sizename"
                    type="text"
                  />
                </Stack>
                <Stack
                  className={styles.wrapInput}
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <label>Số lượng</label>
                  <input
                    className={styles.input}
                    onChange={(e) =>
                      setNewSizeQuantity(parseInt(e.target.value))
                    }
                    value={newSizeQuantity}
                    placeholder="Size Quantity"
                    name="sizeQuantity"
                    type="number"
                  />
                </Stack>
                <Stack
                  className={styles.wrapInput}
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <label>Giá</label>
                  <input
                    className={styles.input}
                    onChange={(e) => setNewSizePrice(parseInt(e.target.value))}
                    value={newSizePrice}
                    placeholder="Size Price"
                    name="sizePrice"
                    type="number"
                  />
                </Stack>
                <Box m="10px 0" width="100%">
                  <button
                    className={styles.button}
                    style={{ textTransform: "uppercase" }}
                    onClick={handleAddSize}
                  >
                    Add Size
                  </button>
                </Box>

                {sizes?.map((size, index) => (
                  <Stack key={index} mb="20px">
                    <Typography>Type</Typography>
                    <Stack
                      className={styles.wrapInput}
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <label>Size</label>
                      <input
                        className={styles.input}
                        onChange={(e) => {
                          const updatedSize = {
                            ...size,
                            sizeName: e.target.value,
                          };
                          handleSizeUpdate(updatedSize, index);
                        }}
                        value={size.sizeName}
                        placeholder="Size name"
                        name="sizename"
                        type="text"
                      />
                    </Stack>
                    <Stack
                      className={styles.wrapInput}
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <label>Số lượng</label>
                      <input
                        className={styles.input}
                        onChange={(e) => {
                          const updatedSize = {
                            ...size,
                            quantity: parseInt(e.target.value),
                          };
                          handleSizeUpdate(updatedSize, index);
                        }}
                        value={size.quantity}
                        placeholder="Size Quantity"
                        name="sizeQuantity"
                        type="number"
                      />
                    </Stack>
                    <Stack
                      className={styles.wrapInput}
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <label>Giá</label>
                      <input
                        className={styles.input}
                        onChange={(e) => {
                          const updatedSize = {
                            ...size,
                            price: parseInt(e.target.value),
                          };
                          handleSizeUpdate(updatedSize, index);
                        }}
                        value={size.price}
                        placeholder="Size Price"
                        name="sizePrice"
                        type="number"
                      />
                    </Stack>
                  </Stack>
                ))}
              </Stack>

              <Stack
                className={styles.wrapInput}
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  name="images[]"
                  className={styles.input}
                />
              </Stack>
            </Stack>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProcessProduct} color="primary">
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

export default ProductPopup;
