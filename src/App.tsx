import "./styles/App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Nav } from "./components/Nav";
import { Search } from "./pages/Search";
import { MoviePage } from "./pages/MoviePage";
import { Login } from "./pages/Login";
import { Homepage } from "./pages/Homepage";
import { createTheme, ThemeProvider } from "@mui/material";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";

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
          <Route
            path="/"
            element={user ? <Homepage /> : <Navigate to="/login" />}
          ></Route>
          <Route path="/user/:user" element={<Profile />}></Route>
          <Route path="/search/:query" element={<Search />}></Route>
          <Route path="/movie/:id" element={<MoviePage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          ></Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
