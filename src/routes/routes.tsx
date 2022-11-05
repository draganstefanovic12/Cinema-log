import "@/styles/MobileApp.css";
import "@/styles/index.css";
import Nav from "@/features/nav";
import { useAuth } from "@/features/auth/context/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material";
import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Homepage } from "@/pages/Homepage";
import { PageList } from "@/pages/List";
import { MediaPage } from "@/pages/MediaPage";
import { MyAccount } from "@/pages/MyAccount";
import { Profile } from "@/pages/Profile";
import { Register } from "@/pages/Register";
import { Person } from "@/pages/Person";
import { Login } from "@/pages/Login";
import { Search } from "@/pages/Search";

const BrowserRoutes = () => {
  const { user } = useAuth();

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
          <Route path="/" element={user ? <Homepage /> : <Navigate to="/login" />} />
          <Route path="/person/:id/" element={<Person />} />
          <Route path="/user/:user" element={<Profile />} />
          <Route path="/search/:query/:type" element={<Search />} />
          <Route path="/:type/:id/" element={<MediaPage />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/account/" element={<MyAccount />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default BrowserRoutes;
