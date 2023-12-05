import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
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
  Box,
  Grid,
} from "@mui/material";
import styles from "./styles.module.css";
import { addCategory, updateStatusOrder } from "@/pages/api";
import axios from "axios";
import { useEffect } from "react";
import OrderCompleteItem from "../OrderCompleteItem";

interface OrderData {
  address: string;
  cost: number | string; // Depending on how the data is used, the cost can be represented as either a number or a string
  deliveryTime: Date | null;
  note: string;
  orderId: string;
  orderTime: string;
  phone: string;
  status: string;
  userId: string;
  paymentMethod: string;
  paymentDate: string;
}

interface Product {
  productId: string;
  size: string;
  quantity: string;
  price: string;
}

interface Props {
  listProduct: Product[];
  order: OrderData;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const OrderPopup: React.FC<Props> = ({
  listProduct,
  order,
  reload,
  setReload,
}) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string>(order?.status || "");
  const [openNoti, setOpenNoti] = useState(false);
  const [statusAlert, setStatusAlert] = useState<AlertColor>("success");
  const [messageAlert, setMessageAlert] = useState("Cập nhật thành công");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setStatus(event.target.value);
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

  const handleUpdateStatus = async () => {
    if (order) {
      const response = await updateStatusOrder(status, order?.orderId);
      setReload(!reload);
      setOpen(false);
      setOpenNoti(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseNoti(undefined, "timeout");
    }, 3000);
    return () => clearTimeout(timer);
  }, [openNoti, handleCloseNoti]);

  return (
    <div>
      <button onClick={handleOpen} className={styles.button}>
        Chi tiết và cập nhật
      </button>

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle className={styles.wrapForm}>Chi tiết đơn hàng</DialogTitle>
        <DialogContent>
          <Stack>
            <Box>
              <Grid
                container
                borderBottom="0.5px solid #444"
                p="20px"
                justifyContent="center"
                alignItems="center"
              >
                <Grid className={styles.textHeader} xs={6}>
                  Sản phẩm
                </Grid>
                <Grid
                  sx={{ display: { xs: "none", md: "block" } }}
                  className={styles.textHeader}
                  xs={2}
                >
                  Đơn giá
                </Grid>
                <Grid
                  sx={{ display: { xs: "none", md: "block" } }}
                  className={styles.textHeader}
                  xs={2}
                >
                  Số lượng
                </Grid>
                <Grid
                  sx={{ display: { xs: "none", md: "block" } }}
                  className={styles.textHeader}
                  xs={2}
                >
                  Số tiền
                </Grid>
              </Grid>
              {listProduct.length !== 0 &&
                listProduct.map((product: any, index) => (
                  <OrderCompleteItem
                    id={product.productId}
                    size={product.size}
                    quantity={product.quantity}
                    price={product.price}
                  />
                ))}
            </Box>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              m="10px 0"
            >
              <Typography
                sx={{ width: { xs: "50%", md: "30%" } }}
                fontSize="1rem"
                textTransform="uppercase"
                color="#9f1110"
              >
                Tổng Thanh Toán
              </Typography>
              <Typography fontSize="1rem" color="#9f1110">
                {order && parseInt(order.cost.toString()).toLocaleString()} đ
              </Typography>
            </Stack>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              m="10px 0"
            >
              <Typography
                sx={{ width: { xs: "50%", md: "30%" } }}
                fontSize="1rem"
                textTransform="uppercase"
                color="#9f1110"
              >
                Thanh toán
              </Typography>
              <Typography fontSize="1rem">{order?.paymentMethod}</Typography>
            </Stack>

            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              m="10px 0"
            >
              <Typography
                sx={{ width: { xs: "50%", md: "30%" } }}
                fontSize="1rem"
                textTransform="uppercase"
                color="#9f1110"
              >
                Ngày Thanh Toán
              </Typography>
              <Typography fontSize="1rem">
                {order?.paymentDate ? order.paymentDate : "Chưa thanh toán"}
              </Typography>
            </Stack>

            <Stack mt="20px">
              <Typography>Update Status:</Typography>
              <select
                name="status"
                value={status}
                onChange={handleStatusChange}
                className={styles.select}
              >
                <option value="Canceled">Canceled</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Shipping">Shipping</option>
                <option value="Done">Done</option>
              </select>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateStatus} color="primary">
            Cập nhật trạng thái đơn hàng
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

export default OrderPopup;
