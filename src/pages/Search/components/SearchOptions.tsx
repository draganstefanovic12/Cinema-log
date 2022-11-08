import { SearchSelection } from "../types";

interface SearchOptionsProps {
  setSearchSelection: React.Dispatch<React.SetStateAction<SearchSelection>>;
}

const SearchOptions = ({ setSearchSelection }: SearchOptionsProps) => {
  const handleSearchMedia = () => {
    setSearchSelection("media");
  };

  const handleSearchUsers = () => {
    setSearchSelection("users");
  };

  const handleSearchActors = () => {
    setSearchSelection("actors");
  };

  return (
    <ul className="search-options">
      <li onClick={handleSearchMedia}>Media</li>
      <li onClick={handleSearchUsers}>Users</li>
      <li onClick={handleSearchActors}>Actors</li>
    </ul>
  );
};

export default SearchOptions;
