import React, { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import styles from "./styles.module.css";
import OrderPopup from "../OrderPopup";
import { getOrderById } from "@/pages/api";

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

interface Props {
  order: OrderData;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const OrderItem: React.FC<Props> = ({ order, reload, setReload }) => {
  const [isUpdate, setIsUpdate] = useState(true);
  const [listProduct, setListProduct] = useState([]);

  const fetchData = async () => {
    const response = await getOrderById(order?.orderId);
    setListProduct(response?.data.data.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Grid container padding="25px" borderBottom="0.5px solid #444" p="20px">
        <Grid item sx={{ display: { xs: "none", sm: "block" } }} sm={2}>
          <Stack flexDirection="row">
            <Typography
              fontSize="1.1rem"
              fontWeight="100"
              lineHeight="1.75rem"
              color="#444"
            >
              {order?.orderId}
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={6} sm={2}>
          <Typography fontSize="1.1rem" fontWeight="400">
            {order?.status}
          </Typography>
        </Grid>

        <Grid item sx={{ display: { xs: "none", sm: "block" } }} sm={2}>
          <Stack flexDirection="row">
            <Typography
              fontSize="1.1rem"
              fontWeight="100"
              lineHeight="1.75rem"
              color="#444"
            >
              {order?.paymentMethod}
            </Typography>
          </Stack>
        </Grid>
        <Grid item sx={{ display: { xs: "none", sm: "block" } }} sm={2}>
          <Stack flexDirection="row">
            <Typography
              fontSize="1.1rem"
              fontWeight="100"
              lineHeight="1.75rem"
              color="#444"
            >
              {order?.paymentDate ? order.paymentDate : "Chưa thanh toán"}
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={6} sm={4}>
          <Stack flexDirection="row" alignItems="center">
            <OrderPopup
              listProduct={listProduct}
              reload={reload}
              setReload={setReload}
              order={order}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderItem;
