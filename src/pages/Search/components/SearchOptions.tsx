import { SearchSelection } from "../types";

interface SearchOptionsProps {
  searchSelection: SearchSelection;
  setSearchSelection: React.Dispatch<React.SetStateAction<SearchSelection>>;
}

const SearchOptions = ({ searchSelection, setSearchSelection }: SearchOptionsProps) => {
  const handleSearchMedia = () => {
    setSearchSelection("media");
  };

  const handleSearchUsers = () => {
    setSearchSelection("users");
  };

  const handleSearchActors = () => {
    setSearchSelection("actors");
  };

  const SEARCH_TYPES = [
    { name: "Media", fn: handleSearchMedia },
    { name: "Users", fn: handleSearchUsers },
    { name: "Actors", fn: handleSearchActors },
  ];

  return (
    <ul className="search-options">
      {SEARCH_TYPES.map((type, i) => (
        <li
          onClick={type.fn}
          key={i}
          style={{ color: type.name.toLowerCase() === searchSelection ? "#fff" : "#cccccc" }}
        >
          {type.name}
        </li>
      ))}
    </ul>
  );
};

export default SearchOptions;
