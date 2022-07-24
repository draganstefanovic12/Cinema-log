import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/movie-videos.svg";
import searchSVG from "../assets/search-line.svg";

export const Nav: React.FC = () => {
  const [value, setValue] = useState<string>("");

  return (
    <nav className="nav">
      <img className="logo" alt="logo" src={logo} />
      <div>
        <input
          placeholder="Search..."
          onChange={(e) => setValue(e.target.value)}
        />
        <Link to={`/search/${value}`}>
          <img className="search" src={searchSVG} alt="search" />
        </Link>
        <a href="/">Profile</a>
      </div>
    </nav>
  );
};
