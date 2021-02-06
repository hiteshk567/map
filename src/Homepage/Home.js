import React, { useState } from "react";

import Card from "../Shared/Card";
import Button from "../Shared/Button";
import Map from "./Map";
import "./Home.css";

const Home = (props) => {
  const [formData, setFormData] = useState({
    location: "",
    lat: "",
    lng: "",
  });
  const [places, setPlaces] = useState([]);
  const [newPlace, setNewPlace] = useState({
    location: "Pune",
    lat: "18.5245649",
    lng: "73.7228812",
  });
  const [isSubmitMode, setIsSubmitMode] = useState(false);
  const [pathInfo, setPathInfo] = useState({});
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

    if (isSubmitMode) {
      //   const responseData = await fetch(
      //     `https://api.mapbox.com/directions/v5/mapbox/cycling/${places[0].lat},${places[0].lng};${places[1].lat},${places[0].lng}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      //   );
      //   const data = await responseData.json();
      //   setPathInfo(data);
      //   var coords = jsonResponse.routes[0].geometry;
      //   setCoordinates(coords);
      // var url =
      //   `https://api.mapbox.com/directions/v5/mapbox/cycling/${places[0].lat},${places[0].lng};${places[1].lat},${places[1].lng}` +
      //   "?geometries=geojson&steps=true&access_token=" +
      //   process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

      // const responseData = await fetch(url);
      // const data = await responseData.json();

      // //   var req = new XMLHttpRequest();
      // //   req.responseType = "json";
      // //   req.open("GET", url, true);
      // //   req.onload = function () {
      // //     var jsonResponse = req.response;
      // //     // var distance = jsonResponse.routes[0].distance*0.001;
      // //     // var duration = jsonResponse.routes[0].duration/60;
      // //     // var steps = jsonResponse.routes[0].legs[0].steps;
      // var coords = data.routes[0].geometry;
      // //     //  console.log(steps);
      // //     console.log(coords);
      // console.log(coords);
      // setCoordinates(coords);
      //     //   console.log(data);
      //     return;
      //   };
      return;
    }

    setNewPlace(formData);
    setPlaces((prevVal) => {
      return [...prevVal, formData];
    });

    if (places.length == 2) setIsSubmitMode(true);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">Location Name</label>
        <input
          id="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          type="text"
        />
        <label htmlFor="lat">Enter Lattitude</label>
        <input
          id="lat"
          placeholder="Lat"
          value={formData.lat}
          onChange={handleChange}
          type="text"
        />
        <label htmlFor="lng">Enter Longitude</label>
        <input
          id="lng"
          placeholder="Lon"
          value={formData.lng}
          onChange={handleChange}
          type="text"
        />
        <Button type="submit">{places.length >= 2 ? "SUBMIT" : "ADD"}</Button>
      </form>
      <Map
        pathInfo={pathInfo}
        places={places}
        newPlace={newPlace}
        coordinates={coordinates}
      />
    </Card>
  );
};

export default Home;
