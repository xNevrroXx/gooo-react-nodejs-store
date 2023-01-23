// third-party modules
import React, {lazy, Suspense, useMemo} from 'react';
import {Container, createTheme, ThemeProvider} from "@mui/material";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ReactDOM from 'react-dom';

// components
import AppHeader from "../components/appHeader/AppHeader";
import Loading from "../components/loading/Loading";
import Notification from "../components/notifier/Notification";
import {useAppSelector} from "../hooks/store.hook";
// types
import {INotification} from "../models/IStore";
import NotificationList from "../components/notifier/NotificationList";

// pages
const Main = lazy(() => import("../pages/Main"));
const UserLogin = lazy(() => import("../pages/UserLogin"));
const AdministrationLogin = lazy(() => import("../pages/Administration/AdministrationLogin"));
const Filtered = lazy(() => import("../pages/Filtered"));
const UserRegistration = lazy(() => import("../pages/UserRegistration"));
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
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppHeader/>
        <NotificationList/>
        <Container maxWidth="xl">
          <Suspense fallback={<Loading sx={{position: "absolute", top: "0", left: "0", height: "100vh", width: "100%"}}/>} >
            <Routes>
              <Route path="/" element={<Navigate to="/main"/>}/>

              <Route path="/login" element={<UserLogin/>} />
              <Route path="/registration" element={<UserRegistration/>} />
              <Route path="/main" element={<Main/>} />
              <Route path="/categories/:title" element={<Filtered/>} />

              {/* Admin urls */}
              <Route path="/administration/login" element={<AdministrationLogin/> }/>

              <Route path="*" element={<NotFound/>} />
            </Routes>
          </Suspense>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
