import React from "react";

import LocationInfo from "./LocationInfo";

import "./Map.css";

const Map = ({ places, handleEdit, clearInput, showPath, mapContainerRef }) => {
  return (
    <div className="grid">
      <div className="places">
        <h4>ALL CO-ORDINATES:</h4>
        <div className="container">
          <ul className="ul">
            {places.length > 0 &&
              places.map((place, index) => {
                const { location, lat, lng } = place;
                return (
                  <LocationInfo
                    cityName={location}
                    lat={lat}
                    lng={lng}
                    index={index + 1}
                    key={index}
                    handleChange={handleEdit}
                  />
                );
              })}
          </ul>
          <hr />
        </div>
        {places.length >= 2 && (
          <button className="btn" onClick={() => showPath()}>
            SHOW ROUTE
          </button>
        )}
        <button className="btn" onClick={() => clearInput()}>
          CLEAR LOCATIONS
        </button>
      </div>

      <div id="maparea" ref={mapContainerRef}></div>
    </div>
  );
};

export default Map;

{
  /* <MapBox>
<div className="map-container">
  <div className="map"></div>
</div>
</MapBox> */
}
