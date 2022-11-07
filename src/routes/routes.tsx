import "@/styles/MobileApp.css";
import "@/styles/index.css";
import { Login } from "@/pages/Login";
import { Search } from "@/pages/Search";
import { Person } from "@/pages/Person";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Profile } from "@/pages/Profile";
import { Register } from "@/pages/Register";
import { Homepage } from "@/pages/Homepage";
import { PageList } from "@/pages/List";
import { MediaPage } from "@/pages/MediaPage";
import { MyAccount } from "@/pages/MyAccount";
import { createTheme, ThemeProvider } from "@mui/material";
import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Nav from "@/features/nav";
import Footer from "@/components/Footer";

const BrowserRoutes = () => {
  const { auth } = useAuth();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <Router basename="/">
      <ThemeProvider theme={darkTheme}>
        <Nav />
        <Routes>
          <Route path="/list/:name" element={<PageList />} />
          <Route path="/" element={auth ? <Homepage /> : <Navigate to="/login" />} />
          <Route path="/person/:id/" element={<Person />} />
          <Route path="/user/:user" element={<Profile />} />
          <Route path="/search/:query/:type" element={<Search />} />
          <Route path="/:type/:id/" element={<MediaPage />} />
          <Route path="/register" element={!auth ? <Register /> : <Navigate to="/" />} />
          <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />} />
          <Route path="/account/" element={<MyAccount />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </Router>
  );
};

export default BrowserRoutes;
