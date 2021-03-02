import React, { useState, useEffect, useRef } from "react";

import Card from "../Shared/Card";
import Button from "../Shared/Button";
import Map from "./Map";
import Input from "../Shared/Input";
import "./Home.css";
import { loadInitialMap, showRouteMap } from "./MapBox";

const initialValue = {
  location: "",
  lat: "",
  lng: "",
};

const Home = (props) => {
  const [formData, setFormData] = useState(initialValue);
  const [places, setPlaces] = useState([]);
  const mapContainerRef = useRef();
  const [showRoute, setShowRoute] = useState(false);
  // const [coordinates, setCoordinates] = useState([]);

  const handleChange = (event) => {
    setFormData((prevVal) => {
      return {
        ...prevVal,
        [event.target.id]: event.target.value,
      };
    });
  };

  const editPlaces = (event, index, elem) => {
    const newPlace = [...places];
    newPlace[index][elem] = event.target.value;

    setPlaces(newPlace);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.location || !formData.lat || !formData.lng) {
      return;
    }

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

    setShowRoute(true);

    showRouteMap(arr, mapContainerRef);
  };

  const clearInput = (props) => {
    setFormData(initialValue);
    setPlaces([]);
    setShowRoute(false);
  };

  useEffect(() => {
    console.log("initial map");
    loadInitialMap();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Input
          id="location"
          labelText="Location Name"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <Input
          id="lat"
          labelText="Enter Lattitude"
          placeholder="Lat"
          value={formData.lat}
          onChange={handleChange}
        />
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
        showRoute={showRoute}
        clearInput={clearInput}
        places={places}
        showPath={showPath}
        mapContainerRef={mapContainerRef}
        handleEdit={editPlaces}
      />
    </Card>
  );
};

export default Home;
