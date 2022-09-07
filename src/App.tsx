import "./styles/App.css";
import "./styles/MobileApp.css";
import { Nav } from "./components/Nav/Nav";
import { Login } from "./pages/Login/Login";
import { Person } from "./pages/Person/Person";
import { Search } from "./pages/Search/Search";
import { Profile } from "./pages/Profile/Profile";
import { useAuth } from "./context/AuthContext";
import { Register } from "./pages/Register/Register";
import { Homepage } from "./pages/Homepage/Homepage";
import { PageList } from "./pages/List/List";
import { MyAccount } from "./pages/MyAccount/MyAccount";
import { MediaPage } from "./pages/MediaPage/MediaPage";
import { createTheme, ThemeProvider } from "@mui/material";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  const { user } = useAuth();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <HashRouter basename="/">
      <ThemeProvider theme={darkTheme}>
        <Nav />
        <Routes>
          <Route path="/list/:name" element={<PageList />}></Route>
          <Route
            path="/"
            element={user ? <Homepage /> : <Navigate to="/login" />}
          ></Route>
          <Route path="/person/:id/" element={<Person />}></Route>
          <Route path="/user/:user" element={<Profile />}></Route>
          <Route path="/search/:query/:type" element={<Search />}></Route>
          <Route path="/:type/:id/" element={<MediaPage />}></Route>
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          ></Route>
          <Route path="/account/" element={<MyAccount />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
