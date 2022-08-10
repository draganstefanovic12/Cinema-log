import "./styles/App.css";
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Nav } from "./components/Nav";
import { Search } from "./pages/Search";
import { MediaPage } from "./pages/MediaPage";
import { Login } from "./pages/Login";
import { Homepage } from "./pages/Homepage";
import { createTheme, ThemeProvider } from "@mui/material";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { PageList } from "./pages/List";
import { MyAccount } from "./pages/MyAccount";
import { Person } from "@mui/icons-material";

const App = () => {
  const { user } = useAuth();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <Nav />
        <Routes>
          <Route path="/list/:name" element={<PageList />}></Route>
          <Route
            path="/"
            element={user ? <Homepage /> : <Navigate to="/login" />}
          ></Route>
          <Route path="/person/:person" element={<Person />}></Route>
          <Route path="/user/:user" element={<Profile />}></Route>
          <Route path="/search/:query/:type" element={<Search />}></Route>
          <Route path="/:type/:id/" element={<MediaPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          ></Route>
          <Route path="/account/" element={<MyAccount />}></Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
