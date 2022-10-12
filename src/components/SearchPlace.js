// SearchPlace.js

import React, { useState } from "react";
import MapContainer from "./MapContainer";
import "../styles/SearchPlace.css";

const SearchPlace = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input
          className="inputspace"
          placeholder="검색어를 입력하세요"
          onChange={onChange}
          value={inputText}
        />
        <button type="submit" className="inputbt">
          검색
        </button>
      </form>
      <MapContainer searchPlace={place} />
    </>
  );
};

export default SearchPlace;
