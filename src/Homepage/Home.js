import React, { useState } from "react";

import Card from "../Shared/Card";
import Button from "../Shared/Button";
import Map from "./Map";
import Input from "../Shared/Input";
import "./Home.css";

import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

const initialValue = {
  location: "",
  lat: "",
  lng: "",
};

const Home = (props) => {
  const [formData, setFormData] = useState(initialValue);
  const [places, setPlaces] = useState([]);
  // const [newPlace, setNewPlace] = useState({
  //   location: "Pune",
  //   lat: "18.5245649",
  //   lng: "73.7228812",
  // });
  const [showRoute, setShowRoute] = useState(false);
  // const [pathInfo, setPathInfo] = useState({});
  const [coordinates, setCoordinates] = useState([]);

  const handleChange = (event) => {
    setFormData((prevVal) => {
      return {
        ...prevVal,
        [event.target.id]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (isSubmitMode) {
    //   //   setNewPlace(formData);
    //   console.log(formData);
    //   //   setCoordinates((prevVal) => {
    //   //     return [...prevVal, `${(formData.lng, formData.lat)}`];
    //   //   });
    // }
    setPlaces((prevVal) => {
      return [...prevVal, formData];
    });
    setFormData(initialValue);
  };

  const showPath = (event) => {
    const arr = [];

    for (let i = 0; i < 2; i++) {
      const temp = "" + places[i].lng + "," + places[i].lat;
      arr.push(temp);
    }

    setCoordinates(arr);
    setShowRoute(true);
  };

  const clearInput = (props) => {
    setFormData(initialValue);
    setPlaces([]);
    setCoordinates([]);
    setShowRoute(false);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="location">Location Name</label>
        <input
          id="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          type="text"
        /> */}
        <Input
          id="location"
          labelText="Location Name"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        {/* <label htmlFor="lat">Enter Lattitude</label>
        <input
          id="lat"
          placeholder="Lat"
          value={formData.lat}
          onChange={handleChange}
          type="text"
        /> */}
        <Input
          id="lat"
          labelText="Enter Lattitude"
          placeholder="Lat"
          value={formData.lat}
          onChange={handleChange}
        />
        {/* <label htmlFor="lng">Enter Longitude</label>
        <input
          id="lng"
          placeholder="Lon"
          value={formData.lng}
          onChange={handleChange}
          type="text"
        /> */}
        <Input
          id="lng"
          labelText="Enter Longitude"
          placeholder="Lon"
          value={formData.lng}
          onChange={handleChange}
        />
        {places.length < 2 && (
          <Button className="btn" type="submit">
            ADD
          </Button>
        )}
      </form>

      <Map
        // pathInfo={pathInfo}
        places={places}
        // newPlace={newPlace}
        coordinates={coordinates}
        showRoute={showRoute}
        showPath={showPath}
        clearInput={clearInput}
      />
    </Card>
  );
};

export default Home;
