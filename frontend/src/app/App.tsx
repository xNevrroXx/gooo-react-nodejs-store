// third-party modules
import React, {lazy, Suspense, useEffect, useRef} from 'react';
import {Container, createTheme, ThemeProvider} from "@mui/material";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes
} from "react-router-dom";

// components
import AppHeader from "../components/appHeader/AppHeader";
import Loading from "../components/loading/Loading";
import NotificationList from "../components/notifier/NotificationList";
import {checkAuthenticationThunk} from "../actions/authentication";
import {useAppDispatch} from "../hooks/store.hook";
import {loadingCategoriesServer} from "../actions/category";

// pages
const Main = lazy(() => import("../pages/Main"));
const UserLogin = lazy(() => import("../pages/UserLogin"));
const Filtered = lazy(() => import("../pages/Filtered"));
const UserRegistration = lazy(() => import("../pages/UserRegistration"));
const Product = lazy(() => import("../pages/Product"));
const AdministrationLogin = lazy(() => import("../pages/Administration/AdministrationLogin"));
const AdministrationCreateProduct = lazy(() => import("../pages/Administration/AdministrationCreateProduct"));
const AdministrationCreateCategory = lazy(() => import("../pages/Administration/AdministrationCreateCategory"));
const NotFound = lazy(() => import("../pages/NotFound"));


const theme = createTheme({
  typography: {
    button: {
      textTransform: "none"
    },
    body2: {
      fontSize: ".7rem"
    }
  }
})

function App() {
  const dataFetchedRef = useRef<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    dispatch(loadingCategoriesServer());

    if (localStorage.getItem("token")) {
      dispatch(checkAuthenticationThunk());
    }
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppHeader/>
        <NotificationList/>
        <Container maxWidth="xl">
          <Suspense fallback={<Loading sx={{position: "absolute", top: "0", left: "0", height: "100vh", width: "100%"}}/>} >
            <Routes>
              <Route path="/" element={<Navigate to="main"/>}/>

              <Route path="login" element={<UserLogin/>} />
              <Route path="registration" element={<UserRegistration/>} />
              <Route path="main" element={<Main/>} />
              <Route path="catalog/:title" element={<Filtered/>} />
              <Route path="product/:id" element={<Product/>} />

              {/* Admin urls */}
              <Route path="administration" element={<Outlet/>}>
                <Route index element={<Navigate to="login"/>}/>

                <Route path="login" element={<AdministrationLogin/> }/>
                <Route path="product/create" element={<AdministrationCreateProduct/> }/>
                <Route path="category/create" element={<AdministrationCreateCategory/> }/>
              </Route>

              <Route path="*" element={<NotFound/>} />
            </Routes>
          </Suspense>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
