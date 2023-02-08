// third-party modules
import {Link as RouterLink} from "react-router-dom";
import React, {useCallback, useState} from 'react';
import {
  AppBar,
  Button,
  Menu,
  IconButton,
  Toolbar,
  Typography,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Stack
} from "@mui/material";

import {
  AccountCircleOutlined,
  FavoriteBorderOutlined, Logout,
  ManageSearchOutlined,
  Menu as MenuIcon, Settings,
  ShoppingCartOutlined,
  ViewModuleOutlined
} from '@mui/icons-material';

// own components
import Search from "../search/Search";
import Catalog from "../catalog/Catalog";
import {useAppDispatch, useAppSelector} from "../../hooks/store.hook";
import {logoutThunk} from "../../actions/authentication";
import {createPath} from "../../router/createPath";
import {ROUTE} from "../../router";
// types
import {RootState} from "../../store";


function AppHeader() {
  const user: RootState["authentication"]["user"] = useAppSelector(state => state.authentication.user);
  const [profileDropdownAnchorEl, setProfileDropdownAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState<null | HTMLElement>(null);

  const onOpenProfileDropdownMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => setProfileDropdownAnchorEl(event.currentTarget), []);
  const onCloseProfileDropdownMenu = useCallback(() => setProfileDropdownAnchorEl(null), []);
  const onOpenMobileMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => setMobileAnchorEl(event.currentTarget), []);
  const onCloseMobileMenu = useCallback(() => setMobileAnchorEl(null), []);

  const isOpenMobileMenu = Boolean(mobileAnchorEl);
  const isOpenProfileDropdownMenu = Boolean(profileDropdownAnchorEl);

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileAnchorEl}
      open={isOpenMobileMenu}
      onClose={onCloseMobileMenu}
    >
      <MenuItem onClick={onCloseMobileMenu}>
        <Box component={RouterLink} to="/catalog">
          <ListItemIcon>
            <ManageSearchOutlined/>
          </ListItemIcon>
          <ListItemText>Каталог</ListItemText>
        </Box>
      </MenuItem>
      <MenuItem onClick={onCloseMobileMenu}>
        <Box component={RouterLink} to="/wishlist">
          <ListItemIcon>
            <FavoriteBorderOutlined/>
          </ListItemIcon>
          <ListItemText>Избранное</ListItemText>
        </Box>
      </MenuItem>
      <MenuItem onClick={onCloseMobileMenu}>
        <Box component={RouterLink} to="/orders">
          <ListItemIcon>
            <ViewModuleOutlined/>
          </ListItemIcon>
          <ListItemText>Заказы</ListItemText>
        </Box>
      </MenuItem>
      <MenuItem onClick={onCloseMobileMenu}>
        <Box component={RouterLink} to="/cart">
          <ListItemIcon>
            <ShoppingCartOutlined/>
          </ListItemIcon>
          <ListItemText>Корзина</ListItemText>
        </Box>
      </MenuItem>
    </Menu>
  )

  return (
    <>
    <AppBar position="relative" sx={{mb: "1rem", zIndex: "100"}} >
      <Toolbar>
        <IconButton component={RouterLink} to={createPath({path: ROUTE.MAIN})} sx={{display: {xs: "none", sm: "block"}, justifyContent: "flex-start", mr: "1rem"}}>
          <svg width="214" height="34" viewBox="0 0 214 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.142 33.72L25.102 30.44C22.0087 32.68 19.022 33.8 16.142 33.8C13.5287 33.8 11.2487 33.3333 9.30203 32.4C7.35536 31.44 5.74203 30.1867 4.46203 28.64C3.18203 27.0667 2.22203 25.2933 1.58203 23.32C0.968698 21.32 0.662031 19.28 0.662031 17.2C0.662031 15.0933 1.02203 13.04 1.74203 11.04C2.4887 9.01333 3.5687 7.21333 4.98203 5.64C6.42203 4.06667 8.1687 2.8 10.222 1.84C12.2754 0.853332 14.622 0.359998 17.262 0.359998C20.942 0.359998 24.3287 1.16 27.422 2.76V10.44C26.942 10.52 26.5154 10.56 26.142 10.56C25.742 10.56 25.4087 10.52 25.142 10.44L23.862 3.76C22.1554 2.69333 19.7954 2.16 16.782 2.16C15.102 2.16 13.582 2.54667 12.222 3.32C10.862 4.06666 9.6887 5.09333 8.70203 6.4C7.71537 7.68 6.95536 9.2 6.42203 10.96C5.8887 12.6933 5.62203 14.5467 5.62203 16.52C5.62203 18.6267 5.86203 20.5733 6.34203 22.36C6.8487 24.1467 7.55537 25.6933 8.46203 27C9.3687 28.3067 10.462 29.3333 11.742 30.08C13.0487 30.8 14.502 31.16 16.102 31.16C18.6887 31.16 21.2354 30.4533 23.742 29.04V20.52L20.502 20.12C20.4487 19.9867 20.422 19.7733 20.422 19.48C20.422 19.3467 20.422 19.2133 20.422 19.08C20.422 18.9467 20.4487 18.8 20.502 18.64C21.2487 18.6933 22.062 18.7333 22.942 18.76C23.8487 18.7867 24.862 18.8 25.982 18.8C27.9287 18.8 29.7687 18.76 31.502 18.68C31.582 18.92 31.622 19.16 31.622 19.4C31.622 19.64 31.582 19.88 31.502 20.12L28.182 20.6C28.1287 21.1067 28.0887 21.7467 28.062 22.52C28.0354 23.2933 28.022 24.2133 28.022 25.28V29.32L27.622 33.72C27.5154 33.7733 27.4087 33.8 27.302 33.8C27.1954 33.8 27.0754 33.8 26.942 33.8C26.8087 33.8 26.6754 33.8 26.542 33.8C26.4087 33.8 26.2754 33.7733 26.142 33.72ZM34.1302 22.36C34.1302 20.76 34.3568 19.2667 34.8102 17.88C35.2902 16.4667 35.9702 15.24 36.8502 14.2C37.7302 13.16 38.7835 12.3467 40.0102 11.76C41.2635 11.1467 42.6635 10.84 44.2102 10.84C45.7302 10.84 47.1168 11.1467 48.3702 11.76C49.6235 12.3467 50.6902 13.16 51.5702 14.2C52.4768 15.24 53.1702 16.4667 53.6502 17.88C54.1302 19.2667 54.3702 20.76 54.3702 22.36C54.3702 24.0133 54.1168 25.5333 53.6102 26.92C53.1302 28.3067 52.4368 29.52 51.5302 30.56C50.6502 31.5733 49.5835 32.3733 48.3302 32.96C47.0768 33.52 45.7035 33.8 44.2102 33.8C42.6368 33.8 41.2235 33.52 39.9702 32.96C38.7435 32.4 37.6902 31.6133 36.8102 30.6C35.9568 29.5867 35.2902 28.3867 34.8102 27C34.3568 25.5867 34.1302 24.04 34.1302 22.36ZM39.9702 15C38.8235 16.6267 38.2502 19.08 38.2502 22.36C38.2502 23.9867 38.3968 25.4133 38.6902 26.64C39.0102 27.8667 39.4368 28.8933 39.9702 29.72C40.5035 30.52 41.1302 31.12 41.8502 31.52C42.5702 31.92 43.3568 32.12 44.2102 32.12C45.0368 32.12 45.8235 31.92 46.5702 31.52C47.3168 31.12 47.9568 30.52 48.4902 29.72C49.0235 28.8933 49.4502 27.8667 49.7702 26.64C50.0902 25.4133 50.2502 23.9867 50.2502 22.36C50.2502 20.7333 50.0902 19.3067 49.7702 18.08C49.4502 16.8267 49.0102 15.8 48.4502 15C47.9168 14.1733 47.2768 13.56 46.5302 13.16C45.8102 12.7333 45.0368 12.52 44.2102 12.52C42.5568 12.52 41.1435 13.3467 39.9702 15ZM57.802 22.36C57.802 20.76 58.0287 19.2667 58.482 17.88C58.962 16.4667 59.642 15.24 60.522 14.2C61.402 13.16 62.4554 12.3467 63.682 11.76C64.9354 11.1467 66.3354 10.84 67.882 10.84C69.402 10.84 70.7887 11.1467 72.042 11.76C73.2954 12.3467 74.362 13.16 75.242 14.2C76.1487 15.24 76.842 16.4667 77.322 17.88C77.802 19.2667 78.042 20.76 78.042 22.36C78.042 24.0133 77.7887 25.5333 77.282 26.92C76.802 28.3067 76.1087 29.52 75.202 30.56C74.322 31.5733 73.2554 32.3733 72.002 32.96C70.7487 33.52 69.3754 33.8 67.882 33.8C66.3087 33.8 64.8954 33.52 63.642 32.96C62.4154 32.4 61.362 31.6133 60.482 30.6C59.6287 29.5867 58.962 28.3867 58.482 27C58.0287 25.5867 57.802 24.04 57.802 22.36ZM63.642 15C62.4954 16.6267 61.922 19.08 61.922 22.36C61.922 23.9867 62.0687 25.4133 62.362 26.64C62.682 27.8667 63.1087 28.8933 63.642 29.72C64.1754 30.52 64.802 31.12 65.522 31.52C66.242 31.92 67.0287 32.12 67.882 32.12C68.7087 32.12 69.4954 31.92 70.242 31.52C70.9887 31.12 71.6287 30.52 72.162 29.72C72.6954 28.8933 73.122 27.8667 73.442 26.64C73.762 25.4133 73.922 23.9867 73.922 22.36C73.922 20.7333 73.762 19.3067 73.442 18.08C73.122 16.8267 72.682 15.8 72.122 15C71.5887 14.1733 70.9487 13.56 70.202 13.16C69.482 12.7333 68.7087 12.52 67.882 12.52C66.2287 12.52 64.8154 13.3467 63.642 15ZM81.4739 22.36C81.4739 20.76 81.7006 19.2667 82.1539 17.88C82.6339 16.4667 83.3139 15.24 84.1939 14.2C85.0739 13.16 86.1272 12.3467 87.3539 11.76C88.6072 11.1467 90.0072 10.84 91.5539 10.84C93.0739 10.84 94.4606 11.1467 95.7139 11.76C96.9672 12.3467 98.0339 13.16 98.9139 14.2C99.8206 15.24 100.514 16.4667 100.994 17.88C101.474 19.2667 101.714 20.76 101.714 22.36C101.714 24.0133 101.461 25.5333 100.954 26.92C100.474 28.3067 99.7806 29.52 98.8739 30.56C97.9939 31.5733 96.9272 32.3733 95.6739 32.96C94.4206 33.52 93.0472 33.8 91.5539 33.8C89.9806 33.8 88.5672 33.52 87.3139 32.96C86.0872 32.4 85.0339 31.6133 84.1539 30.6C83.3006 29.5867 82.6339 28.3867 82.1539 27C81.7006 25.5867 81.4739 24.04 81.4739 22.36ZM87.3139 15C86.1672 16.6267 85.5939 19.08 85.5939 22.36C85.5939 23.9867 85.7406 25.4133 86.0339 26.64C86.3539 27.8667 86.7806 28.8933 87.3139 29.72C87.8472 30.52 88.4739 31.12 89.1939 31.52C89.9139 31.92 90.7006 32.12 91.5539 32.12C92.3806 32.12 93.1672 31.92 93.9139 31.52C94.6606 31.12 95.3006 30.52 95.8339 29.72C96.3672 28.8933 96.7939 27.8667 97.1139 26.64C97.4339 25.4133 97.5939 23.9867 97.5939 22.36C97.5939 20.7333 97.4339 19.3067 97.1139 18.08C96.7939 16.8267 96.3539 15.8 95.7939 15C95.2606 14.1733 94.6206 13.56 93.8739 13.16C93.1539 12.7333 92.3806 12.52 91.5539 12.52C89.9006 12.52 88.4872 13.3467 87.3139 15ZM118.106 19.2H106.226C105.986 18.4 105.986 17.7333 106.226 17.2H118.106C118.319 17.8133 118.319 18.48 118.106 19.2ZM129.728 32.04C131.168 32.04 132.234 31.7067 132.928 31.04C133.621 30.3733 133.968 29.6 133.968 28.72C133.968 28.2133 133.888 27.7467 133.728 27.32C133.568 26.8933 133.301 26.48 132.928 26.08C132.581 25.68 132.114 25.2933 131.528 24.92C130.941 24.52 130.208 24.0933 129.328 23.64C128.234 23.08 127.288 22.5467 126.488 22.04C125.714 21.5333 125.074 21 124.568 20.44C124.061 19.88 123.674 19.28 123.408 18.64C123.168 18 123.048 17.28 123.048 16.48C123.048 15.52 123.221 14.6933 123.568 14C123.914 13.28 124.394 12.6933 125.008 12.24C125.648 11.76 126.394 11.4133 127.248 11.2C128.101 10.96 129.048 10.84 130.088 10.84C132.168 10.84 134.194 11.3467 136.168 12.36V17.48H134.288L133.408 13.16C132.234 12.6 130.994 12.32 129.688 12.32C127.501 12.32 126.408 13.2133 126.408 15C126.408 15.96 126.768 16.84 127.488 17.64C128.208 18.44 129.368 19.24 130.968 20.04C132.061 20.6 133.021 21.1333 133.848 21.64C134.674 22.1467 135.354 22.68 135.888 23.24C136.448 23.8 136.861 24.4133 137.128 25.08C137.421 25.72 137.568 26.4533 137.568 27.28C137.568 28.2133 137.368 29.08 136.968 29.88C136.568 30.68 136.008 31.3733 135.288 31.96C134.568 32.52 133.701 32.96 132.688 33.28C131.674 33.6267 130.554 33.8 129.328 33.8C126.954 33.8 124.728 33.2933 122.648 32.28V27.16H124.528L125.408 31.12C126.768 31.7333 128.208 32.04 129.728 32.04ZM146.846 6.84V12.56H152.486C152.539 12.88 152.566 13.12 152.566 13.28C152.566 13.52 152.539 13.8 152.486 14.12L146.846 14.96V25.96C146.846 27.9333 147.019 29.3333 147.366 30.16C147.739 30.96 148.313 31.36 149.086 31.36C149.779 31.36 150.859 31.08 152.326 30.52C152.593 30.76 152.779 31.2133 152.886 31.88C152.086 32.36 151.473 32.72 151.046 32.96C150.646 33.1733 150.126 33.36 149.486 33.52C148.873 33.7067 148.219 33.8 147.526 33.8C146.193 33.8 145.099 33.2933 144.246 32.28C143.419 31.24 143.006 29.6667 143.006 27.56V14.48L140.206 14.12C140.153 13.8533 140.126 13.6267 140.126 13.44C140.126 13.2267 140.153 12.9333 140.206 12.56C140.953 12.4267 141.593 12.2 142.126 11.88C142.686 11.5333 143.153 11.0667 143.526 10.48C143.899 9.86667 144.179 9.33333 144.366 8.88C144.579 8.4 144.833 7.72 145.126 6.84C145.366 6.76 145.659 6.72 146.006 6.72C146.326 6.72 146.606 6.76 146.846 6.84ZM155.224 22.36C155.224 20.76 155.451 19.2667 155.904 17.88C156.384 16.4667 157.064 15.24 157.944 14.2C158.824 13.16 159.877 12.3467 161.104 11.76C162.357 11.1467 163.757 10.84 165.304 10.84C166.824 10.84 168.211 11.1467 169.464 11.76C170.717 12.3467 171.784 13.16 172.664 14.2C173.571 15.24 174.264 16.4667 174.744 17.88C175.224 19.2667 175.464 20.76 175.464 22.36C175.464 24.0133 175.211 25.5333 174.704 26.92C174.224 28.3067 173.531 29.52 172.624 30.56C171.744 31.5733 170.677 32.3733 169.424 32.96C168.171 33.52 166.797 33.8 165.304 33.8C163.731 33.8 162.317 33.52 161.064 32.96C159.837 32.4 158.784 31.6133 157.904 30.6C157.051 29.5867 156.384 28.3867 155.904 27C155.451 25.5867 155.224 24.04 155.224 22.36ZM161.064 15C159.917 16.6267 159.344 19.08 159.344 22.36C159.344 23.9867 159.491 25.4133 159.784 26.64C160.104 27.8667 160.531 28.8933 161.064 29.72C161.597 30.52 162.224 31.12 162.944 31.52C163.664 31.92 164.451 32.12 165.304 32.12C166.131 32.12 166.917 31.92 167.664 31.52C168.411 31.12 169.051 30.52 169.584 29.72C170.117 28.8933 170.544 27.8667 170.864 26.64C171.184 25.4133 171.344 23.9867 171.344 22.36C171.344 20.7333 171.184 19.3067 170.864 18.08C170.544 16.8267 170.104 15.8 169.544 15C169.011 14.1733 168.371 13.56 167.624 13.16C166.904 12.7333 166.131 12.52 165.304 12.52C163.651 12.52 162.237 13.3467 161.064 15ZM185.696 11.64L185.616 15.76C186.282 14.5333 187.202 13.4133 188.376 12.4C189.576 11.36 190.709 10.84 191.776 10.84C192.602 10.84 193.336 10.9333 193.976 11.12C194.189 11.4667 194.296 11.92 194.296 12.48C194.296 13.36 194.109 14.24 193.736 15.12C192.776 14.8533 191.856 14.72 190.976 14.72C188.789 14.72 186.989 15.7867 185.576 17.92L185.496 24.92V30.96L189.936 31.56C190.042 31.9867 190.042 32.52 189.936 33.16C188.256 33.08 186.336 33.04 184.176 33.04C182.549 33.04 180.616 33.0667 178.376 33.12C178.216 32.6133 178.216 32.0933 178.376 31.56L181.536 31.12C181.642 29.6533 181.696 27.96 181.696 26.04V15.08C181.696 14.5467 181.656 14.0533 181.576 13.6L178.416 13.2C178.309 12.8 178.309 12.2933 178.416 11.68C180.256 11.5467 182.549 11.2667 185.296 10.84C185.536 11.1067 185.669 11.3733 185.696 11.64ZM212.842 21.72H200.282C200.042 28.52 202.082 31.92 206.402 31.92C208.242 31.92 210.122 31.1067 212.042 29.48C212.442 29.72 212.749 30.1333 212.962 30.72C211.122 32.7733 208.789 33.8 205.962 33.8C199.456 33.8 196.202 29.9733 196.202 22.32C196.202 18.6933 197.162 15.88 199.082 13.88C201.002 11.8533 203.242 10.84 205.802 10.84C208.602 10.84 210.616 11.8133 211.842 13.76C213.069 15.7067 213.682 18.24 213.682 21.36C213.416 21.5733 213.136 21.6933 212.842 21.72ZM205.722 12.44C204.336 12.44 203.149 13.16 202.162 14.6C201.202 16.04 200.616 17.88 200.402 20.12H205.362C207.336 20.12 208.749 20 209.602 19.76C209.602 17.5733 209.269 15.8133 208.602 14.48C207.936 13.12 206.976 12.44 205.722 12.44Z" fill="black"/>
          </svg>
        </IconButton>

        <Catalog/>

        <Search sx={{width: "100%"}} />
        <Box sx={{ flexGrow: 1 }} />
        <Stack component="nav" direction="row" spacing={2}>
          <Button component={RouterLink} to="/favourites" sx={{display: {xs: "none", sm: "flex"}, alignItems: "center", flexDirection: "column", color: "inherit"}}>
            <FavoriteBorderOutlined/>
            <Typography variant="body2" component="span">
              Избранное
            </Typography>
          </Button>
          <Button component={RouterLink} to="/purchases" sx={{display: {xs: "none", sm: "flex"}, alignItems: "center", flexDirection: "column", color: "inherit"}}>
            <ViewModuleOutlined />
            <Typography variant="body2" component="span">
              Заказы
            </Typography>
          </Button>
          <Button component={RouterLink} to="/cart" sx={{display: {xs: "none", sm: "flex"}, alignItems: "center", flexDirection: "column", color: "inherit"}}>
            <ShoppingCartOutlined/>
            <Typography variant="body2" component="span">
              Корзина
            </Typography>
          </Button>

          {AuthenticationView(user, isOpenProfileDropdownMenu, onOpenProfileDropdownMenu, onCloseProfileDropdownMenu, profileDropdownAnchorEl)}

          <IconButton
            sx={{display: {xs: "block", sm: "none"} }}
            onClick={onOpenMobileMenu}
          >
            <MenuIcon/>
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
    {renderMobileMenu}
    </>
  );
}

const AuthenticationView = (user: RootState["authentication"]["user"], isOpen: boolean, onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void, onClose: () => void, anchorEl: null | HTMLElement) => {
  const dispatch = useAppDispatch();

  if(user) {
    return (
      <>
        <Button
            id="profile-menu-button"
            aria-controls={isOpen ? "profile-dropdown-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isOpen ? 'true' : undefined}
            onClick={onOpen}
            sx={{display: {xs: "none", sm: "flex"}, alignItems: "center", justifyContent: "center", flexDirection: "column", color: "inherit", textDecoration: "none"}}
        >
          <AccountCircleOutlined/>
          <Typography variant="body2" component="span">
            {user.username}
          </Typography>
        </Button>
        <Menu
            id="profile-dropdown-menu"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={isOpen}
            onClose={onClose}
            MenuListProps={{
              'aria-labelledby': 'profile-menu-button',
            }}
        >
          <MenuItem onClick={onClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Настройки
          </MenuItem>
          <MenuItem onClick={() => {
            onClose();
            dispatch(logoutThunk());
          }}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Выйти
          </MenuItem>
        </Menu>
      </>
    )
  }
  else {
    return (
        <Button component={RouterLink} to={createPath({path: ROUTE.USER_LOGIN})} sx={{display: {xs: "none", sm: "flex"}, alignItems: "center", justifyContent: "center", flexDirection: "column", color: "inherit", textDecoration: "none"}}>
          <AccountCircleOutlined/>
          <Typography variant="body2" component="span">
            Войти
          </Typography>
        </Button>
    )
  }
}

export default AppHeader;