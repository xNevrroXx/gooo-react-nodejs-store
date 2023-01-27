// third-party modules
import React, {lazy, Suspense, useEffect} from 'react';
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
import {checkAuthentication} from "../actions/authentication";
import {useAppDispatch} from "../hooks/store.hook";

// pages
const Main = lazy(() => import("../pages/Main"));
const UserLogin = lazy(() => import("../pages/UserLogin"));
const AdministrationLogin = lazy(() => import("../pages/Administration/AdministrationLogin"));
const Filtered = lazy(() => import("../pages/Filtered"));
const UserRegistration = lazy(() => import("../pages/UserRegistration"));
const NotFound = lazy(() => import("../pages/NotFound"));
const AdministrationCreateProduct = lazy(() => import("../pages/Administration/AdministrationCreateProduct"));
const AdministrationCreateCategory = lazy(() => import("../pages/Administration/AdministrationCreateCategory"));


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
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuthentication());
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
              <Route path="categories/:title" element={<Filtered/>} />

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
