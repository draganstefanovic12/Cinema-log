import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import App from "./pages/App";
import "./styles/App.css";
import { Search } from "./pages/Search";
import { MoviePage } from "./pages/MoviePage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/search/:query" element={<Search />}></Route>
        <Route path="/movie/:id" element={<MoviePage />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
