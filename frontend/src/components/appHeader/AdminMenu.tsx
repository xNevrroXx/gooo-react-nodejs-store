import {IUserDto} from "../../models/IUser";
import React, {FC, MouseEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, ButtonPropsVariantOverrides, Menu, MenuItem, SxProps} from "@mui/material";
import {createPath} from "../../router/createPath";
import {ROUTE} from "../../router";

interface IAdminRouteLinksView {
    isAdmin: IUserDto["isAdmin"],
    sx?: SxProps,
    variant?: "text" | "outlined" | "contained" | undefined
}

const AdminMenu: FC<IAdminRouteLinksView> = ({isAdmin, sx, variant = "contained"}) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);
    const onOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const onClose = () => {
        setAnchorEl(null);
    }

    if (isAdmin) {
        return (
            <>
                <Button
                    id="admin-routes-button"
                    variant={variant}
                    onClick={onOpen}
                    aria-controls={isOpen ? 'admin-routes-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={isOpen ? 'true' : undefined}
                    sx={{display: {xs: "none", sm: "flex"}, width: "max-content", padding: ".5rem 1.5rem", ...sx}}
                >
                    Admin routes
                </Button>
                <Menu
                    id="admin-routes-menu"
                    anchorEl={anchorEl}
                    open={isOpen}
                    onClose={onClose}
                    MenuListProps={{
                        'aria-labelledby': 'admin-routes-button',
                    }}
                >
                    <MenuItem onClick={() => {
                        onClose();
                        navigate(createPath({path: ROUTE.ADMIN_CATEGORY_CREATE}))
                    }}>
                        Создание категорий товаров
                    </MenuItem>
                    <MenuItem onClick={() => {
                        onClose();
                        navigate(createPath({path: ROUTE.ADMIN_PRODUCT_CREATE}))
                    }}>
                        Создание товаров
                    </MenuItem>
                </Menu>
            </>
        )
    } else {
        return <></>
    }
}

export default AdminMenu;