import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const Popup = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton style={{ marginRight: "20px" }} onClick={handleClickOpen}>
        <PersonIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tài Khoản</DialogTitle>
        <DialogContent>
          <DialogContentText>Popup content goes here.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Popup;
