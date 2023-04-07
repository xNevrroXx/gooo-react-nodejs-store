import {styled, Typography} from "@mui/material";

const LinkTypography = styled(Typography)`
  &:hover {
    color: red;
    cursor: pointer;
  }
` as typeof Typography;

export default LinkTypography;