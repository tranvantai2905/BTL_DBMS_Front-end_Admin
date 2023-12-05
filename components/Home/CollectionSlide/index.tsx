import { Box, Stack, Grid } from "@mui/material";
import React, { useState } from "react";
import LeftCollection from "./LeftCollection";
import RightCollection from "./RightCollection";

const CollectionSlide: React.FC = () => {
  return (
    <Grid container flexDirection="row" width="100vw" minHeight="740px">
      <Grid item xs={12} md={8} height="100%">
        <LeftCollection />
      </Grid>
      <Grid item xs={12} md={4}>
        <RightCollection title="ấy" />
      </Grid>
    </Grid>
  );
};

export default CollectionSlide;
