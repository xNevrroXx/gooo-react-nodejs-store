// third-party modules
import {lazy, Suspense} from 'react';
import {Container, createTheme, ThemeProvider} from "@mui/material";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

// components
import AppHeader from "../components/appHeader/AppHeader";
import Loading from "../components/loading/Loading";
import AdministrationLogin from "../pages/Administration/AdministrationLogin";
import UserLogin from "../pages/UserLogin";

// pages
const Main = lazy(() => import("../pages/Main"));
const Filtered = lazy(() => import("../pages/Filtered"));
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
        <Container>
          <Suspense fallback={<Loading sx={{position: "absolute", top: "0", left: "0", height: "100vh", width: "100%"}}/>} >
            <Routes>
              <Route path="/" element={<Navigate to="/main"/>}/>

              <Route path="/login" element={<UserLogin/>} />
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
