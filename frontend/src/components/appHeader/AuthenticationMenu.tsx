import {RootState} from "../../store";
import React, {FC, useCallback, useState} from "react";
import {Button, ListItemIcon, Menu, MenuItem, Typography} from "@mui/material";
import {AccountCircleOutlined, Logout, Settings} from "@mui/icons-material";
// own modules
import {useAppDispatch} from "../../hooks/store.hook";
import {Link as RouterLink} from "react-router-dom";
import {createPath} from "../../router/createPath";
import {ROUTE} from "../../router";
// actions & thunks
import {logout} from "../../store/thunks/authentication";

interface IAuthenticationView {
    user: RootState["authentication"]["user"]
}

const AuthenticationMenu: FC<IAuthenticationView> = ({user}) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);

    const onOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget), []);
    const onClose = useCallback(() => setAnchorEl(null), []);

    if (user) {
        return (
            <>
                <Button
                    id="profile-menu-button"
                    aria-controls={isOpen ? "profile-dropdown-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={isOpen ? 'true' : undefined}
                    onClick={onOpen}
                    sx={{
                        display: {xs: "none", sm: "flex"},
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        color: "inherit",
                        textDecoration: "none"
                    }}
                >
                    <AccountCircleOutlined/>
                    <Typography variant="body2" component="span">
                        {user.username}
                    </Typography>
                </Button>
                <Menu
                    id="profile-dropdown-menu"
                    anchorEl={anchorEl}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    transformOrigin={{vertical: 'top', horizontal: 'center'}}
                    open={isOpen}
                    onClose={onClose}
                    MenuListProps={{
                        'aria-labelledby': 'profile-menu-button',
                    }}
                >
                    <MenuItem onClick={onClose}>
                        <ListItemIcon>
                            <Settings fontSize="small"/>
                        </ListItemIcon>
                        Настройки(Fake route)
                    </MenuItem>

                    <MenuItem onClick={() => {
                        onClose();
                        dispatch(logout());
                    }}>
                        <ListItemIcon>
                            <Logout fontSize="small"/>
                        </ListItemIcon>
                        Выйти
                    </MenuItem>
                </Menu>
            </>
        )
    } else {
        return (
            <Button
                component={RouterLink}
                to={createPath({path: ROUTE.USER_LOGIN})}
                sx={{
                    display: {xs: "none", sm: "flex"},
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    color: "inherit",
                    textDecoration: "none"
                }}
            >
                <AccountCircleOutlined/>
                <Typography variant="body2" component="span">
                    Войти
                </Typography>
            </Button>
        )
    }
}

export default AuthenticationMenu;