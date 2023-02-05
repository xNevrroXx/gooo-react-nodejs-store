import React, {FC, ReactNode} from 'react';
import {Button, SxProps} from "@mui/material";

interface IMainStyledButtonProps {
    children: ReactNode,
    onClick?: (...args: any) => void,
    sx?: SxProps
}

const MainStyledButton: FC<IMainStyledButtonProps> = ({children, sx, onClick}) => {
    return (
        <Button onClick={onClick} variant="contained" sx={{width: "8rem", height: "2rem", ...sx}}>{children}</Button>
    );
};

export default MainStyledButton;