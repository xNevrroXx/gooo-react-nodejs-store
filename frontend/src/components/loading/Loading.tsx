import React from 'react';
import {Box, CircularProgress, SxProps} from "@mui/material";

interface IProps {
  sx: SxProps
}

function Loading(props: IProps) {
  return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", ...props.sx}}>
      <CircularProgress/>
    </Box>
  );
}

export default Loading;