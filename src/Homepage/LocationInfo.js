import React, { useState } from "react";

import "./Locationinfo.css";

const LocationInfo = ({ index, cityName, lat, lng, handleChange }) => {
  const [editSelected, setEditSelected] = useState(false);

  const handleClick = (id) => {
    setEditSelected(true);
  };

  const handleEdit = (event, id, elem) => {
    handleChange(event, id, elem);
  };

  const handleSubmit = (event) => {
    setEditSelected(false);
  };

  return (
    <li key={index} className="single_location">
      <div className="location">
        {index}) {cityName}
      </div>
      {editSelected ? (
        <input
          type="text"
          value={lat}
          onChange={(event) => handleEdit(event, index - 1, "lat")}
          id={`${cityName}-${index}-lat`}
          className="editInput"
        />
      ) : (
        <div className="lat">{lat}</div>
      )}
      {editSelected ? (
        <input
          type="text"
          value={lng}
          onChange={(event) => handleEdit(event, index - 1, "lng")}
          id={`${cityName}-${index}-lng`}
          className="editInput"
        />
      ) : (
        <div className="lng">{lng}</div>
      )}
      {editSelected ? (
        <button onClick={() => handleSubmit(index - 1)}>
          <i className="fas fa-check">DONE</i>
        </button>
      ) : (
        <button onClick={() => handleClick(index - 1)}>
          <i className="fas fa-edit">EDIT</i>
        </button>
      )}
    </li>
  );
};

export default LocationInfo;
