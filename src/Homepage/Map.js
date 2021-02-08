import React, { useEffect } from "react";

// import mapboxgl from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import MapBox from "./MapBox";

import "./Map.css";

// import "mapbox-gl/dist/mapbox-gl.css";

const Map = ({ places, coordinates, showRoute, clearInput, showPath }) => {
  //   useEffect(() => {
  //     // const map = new window.google.maps.Map(mapRef.current, {
  //     //   center: center,
  //     //   zoom: zoom
  //     // });

  //     // new window.google.maps.Marker({ position: center, map: map });
  //     // const center = [newPlace.lng, newPlace.lat];
  //     // const zoom = 10;
  //     mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  //     // console.log(newPlace);
  //     // console.log(props);
  //     let map = new mapboxgl.Map({
  //       container: "mapbox",
  //       style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
  //       center: [73.85800431423223, 18.536033374699272], // starting position [lng, lat]
  //       zoom: 13, // starting zoom
  //     });

  //     // let marker = new mapboxgl.Marker()
  //     //   .setLngLat([73.85800431423223, 18.536033374699272])
  //     //   .addTo(map);
  //   }, []);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

    if (coordinates && coordinates.length === 2) {
      let map = new mapboxgl.Map({
        container: "mapbox",
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [73.85800431423223, 18.536033374699272], // starting position [lng, lat]
        zoom: 13, // starting zoom
      });

      // var geocoder = new MapboxGeocoder({
      //   accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
      //   marker: false,
      // });

      function updateRoute(newCoords) {
        // removeRoute(); // overwrite any existing layers

        console.log(newCoords);
        getMatch(newCoords);
      }

      // make a directions request
      function getMatch(e) {
        var url =
          "https://api.mapbox.com/directions/v5/mapbox/cycling/" +
          e +
          "?geometries=geojson&steps=true&access_token=" +
          mapboxgl.accessToken;
        var req = new XMLHttpRequest();
        req.responseType = "json";
        req.open("GET", url, true);
        req.onload = function () {
          var jsonResponse = req.response;
          var coords = jsonResponse.routes[0].geometry;

          console.log(coords);

          addRoute(coords);
        };
        req.send();
      }

      // adds the route as a layer on the map
      function addRoute(coords) {
        // check if the route is already loaded
        // if (map.getSource("route")) {
        //   map.removeLayer("route");
        //   map.removeSource("route");
        // } else {
        console.log(coords);
        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: coords,
            },
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#1db7dd",
            "line-width": 8,
            "line-opacity": 0.8,
          },
        });
        // }
      }

      // remove the layer if it exists
      // function removeRoute() {
      //   if (map.getSource("route")) {
      //     map.removeLayer("route");
      //     map.removeSource("route");
      //     // instructions.innerHTML = "";
      //   } else {
      //     return;
      //   }
      // }
      console.log(coordinates);
      const newCoord = coordinates.join(";");
      updateRoute(newCoord);
      //   const mapbox = document.querySelector("#mapbox");
      //   console.log(mapbox);
      //   mapbox.innerHTML = "";
      //   mapbox.appendChild(geocoder.onAdd(map));
      //   document.getElementById("geocoder").appendChild(geocoder.onAdd(map));
    }
  }, [coordinates]);

  console.log(places);

  return (
    <div className="grid">
      <div className="places">
        <div className="container">
          <ul className="ul">
            {places.length > 0 &&
              places.map((place, index) => {
                const { location, lat, lng } = place;
                return (
                  <li key={index}>
                    {index + 1}. {location} {lat}, {lng}
                  </li>
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

      {showRoute && <div id="mapbox"></div>}
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
