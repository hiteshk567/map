import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import MapBox from "./MapBox";

const Map = ({ places, newPlace, pathInfo }) => {
  useEffect(() => {
    // const map = new window.google.maps.Map(mapRef.current, {
    //   center: center,
    //   zoom: zoom
    // });

    // new window.google.maps.Marker({ position: center, map: map });
    const center = [newPlace.lng, newPlace.lat];
    const zoom = 10;
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    console.log(newPlace);
    // console.log(props);
    let map = new mapboxgl.Map({
      container: "mapbox",
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      center: center, // starting position [lng, lat]
      zoom: zoom, // starting zoom
    });

    let marker = new mapboxgl.Marker().setLngLat(center).addTo(map);

    // if (coordinates) {
    //   setTimeout(() => {
    //     map.addLayer({
    //       id: "route",
    //       type: "line",
    //       source: {
    //         type: "geojson",
    //         data: {
    //           type: "Feature",
    //           properties: {},
    //           geometry: coordinates,
    //         },
    //       },
    //       layout: {
    //         "line-join": "round",
    //         "line-cap": "round",
    //       },
    //       paint: {
    //         "line-color": "#1db7dd",
    //         "line-width": 8,
    //         "line-opacity": 0.8,
    //       },
    //     });
    //   }, 4000);
    // }
  }, [newPlace]);

  return (
    <div className="grid">
      <div className="places">
        <ul>
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
      </div>
      <MapBox>
        <div className="map-container">
          <div className="map"></div>
        </div>
      </MapBox>
    </div>
  );
};

export default Map;
