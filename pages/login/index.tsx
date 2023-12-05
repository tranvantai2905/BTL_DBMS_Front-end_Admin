import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertColor,
  Box,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./styles.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { loginUser } from "../api";
import { useRouter } from "next/router";

const Login = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisibility, setIsVisibility] = useState(false);
  const handleChangeVisibility = () => {
    setIsVisibility(!isVisibility);
  };
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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await loginUser({ email, password });
    if (response?.data.user.role !== "admin") {
      setOpenNoti(true);
      setStatusAlert("error");
      setMessageAlert("Tài khoản của bạn không có quyền để đăng nhập");
    } else {
      if (response?.status === "success") {
        setOpenNoti(true);
        setStatusAlert("success");
        setMessageAlert("Đăng nhập thành công");
        router.push("/order");
        localStorage.setItem("user", JSON.stringify(response));
      } else {
        setStatusAlert("error");
        setMessageAlert("Thiếu hoặc sai thông tin");
        setOpenNoti(true);
      }
    }
  };

  return (
    <div>
      <Box className={styles.wrapperPopup}>
        <Stack flexDirection="row" justifyContent="center" alignItems="center">
          <Typography
            textAlign="center"
            fontSize="2rem"
            textTransform="uppercase"
            color="#ad2526"
            width="100%"
          >
            Tài Khoản Admin
          </Typography>
        </Stack>
        <form className={styles.form} onSubmit={handleLogin}>
          <Stack alignItems="center">
            <Stack
              className={styles.wrapInput}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <input
                className={styles.input}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                name="email"
                type="text"
              />
            </Stack>
          </Stack>
          <Stack alignItems="center">
            <Stack
              className={styles.wrapInput}
              flexDirection="row"
              alignItems="center"
            >
              <input
                className={styles.input}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                name="password"
                type={isVisibility ? "text" : "password"}
              />
              <Box onClick={handleChangeVisibility}>
                {isVisibility ? (
                  <VisibilityOffIcon sx={{ marginTop: "30px" }} />
                ) : (
                  <VisibilityIcon sx={{ marginTop: "30px" }} />
                )}
              </Box>
            </Stack>
            <Typography
              sx={{ "&:hover": { cursor: "pointer", opacity: "0.9" } }}
              color="#ad2526"
              p="20px 0"
            >
              Quên mật khẩu
            </Typography>
            <button className={styles.buttonLogin} type="submit">
              Đăng nhập
            </button>
          </Stack>
        </form>
      </Box>
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

export default Login;
