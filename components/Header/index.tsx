import React, { useContext, useState } from "react";
import { Stack, Typography, Drawer, Menu, Icon, Popover } from "@mui/material";
import styles from "./styles.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SidebarDrawer from "../Home/SidebarDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery, IconButton } from "@mui/material";
import Link from "next/link";
import { Box } from "@mui/system";
import ReloadContext from "@/context/ReloadContext";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Header: React.FC = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const { reload, setReload } = useContext(ReloadContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setReload(!reload);
  };

  const open = Boolean(anchorEl);
  const id = open ? "my-popover" : undefined;

  return (
    <Stack
      className={styles.headerContainer}
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      {isMobile ? (
        <IconButton onClick={() => setOpenMobile((pre) => !pre)}>
          <MenuIcon />
        </IconButton>
      ) : (
        <Stack
          display="flex"
          flexDirection="row"
          alignItems="center"
          width="50%"
          justifyContent="space-around"
        >
          <Link className={styles.headerLeft__link__item} href="/order">
            <Typography
              sx={{ fontSize: { sm: "1rem", md: "1.5rem" } }}
              className={styles.headerLeft__item}
            >
              Đơn hàng
            </Typography>
          </Link>
          <Link className={styles.headerLeft__link__item} href="/product">
            <Typography
              sx={{ fontSize: { sm: "1rem", md: "1.5rem" } }}
              className={styles.headerLeft__item}
            >
              Sản phẩm
            </Typography>
          </Link>
        </Stack>
      )}

      <Typography onMouseOver={handleClick}>
        <PersonIcon />
      </Typography>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onMouseLeave={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={handleLogout}
          display="flex"
          alignItems="center"
          p="0 10px"
        >
          <ExitToAppIcon />
          <Typography sx={{ p: 2 }}>Logout</Typography>
        </Box>
      </Popover>
      <Drawer
        variant="temporary"
        anchor="left"
        open={openMobile}
        onClose={() => setOpenMobile((pre) => !pre)}
        ModalProps={{ keepMounted: true }}
      >
        <SidebarDrawer openMobile={openMobile} setOpenMobile={setOpenMobile} />
      </Drawer>
    </Stack>
  );
};

export default Header;
