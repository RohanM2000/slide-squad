import React from 'react';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import StaticPresentation from '../StaticPresentation/StaticPresentation';
import "./SearchBar.css";


const SearchResults = () => {
  const searchResults = useSelector((state) => Object.values(state.presentations));
  const scrollChecker = useRef();
  return (
    <>
        <div className='results-container'>
            <h1 className='search-heading'> Search Results</h1>
            <div className='search-results' ref={scrollChecker}>
            {searchResults.map((presentation, idx) => (
                <StaticPresentation presentation={presentation} idx={idx} scrollChecker={scrollChecker} presentationSize={46/52}/>
            ))}
            </div>
        </div>
    </>
  );
};

export default SearchResults;