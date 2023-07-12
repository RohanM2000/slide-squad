import { useSelector } from "react-redux";
import { useState } from "react";
import "./SearchBar.css";
import { useEffect } from "react";
import { fetchSearchResults } from "../../store/presentations";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";



const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();


  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      history.push(`/search/${encodeURIComponent(searchTerm)}`);
      dispatch(fetchSearchResults(searchTerm));
      setSearchTerm("")
    }
  };

  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search"
      />
     
    </div>
  );
};

export default SearchBar;

