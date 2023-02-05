import React, {FC} from "react";
import {Button, SxProps} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

interface ILinkRouterButton {
    to: string,
    children: React.ReactNode,
    sx?: SxProps
}
export const LinkRouterButton: FC<ILinkRouterButton> = ({to, children, sx}) => (
    <Button component={RouterLink} to={to} sx={sx}>
        {children}
    </Button>
)