import mapboxgl from "mapbox-gl";

import "./MapBox.css";

export const loadInitialMap = () => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  let map = new mapboxgl.Map({
    container: "maparea",
    style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
    center: [73.85800431423223, 18.536033374699272], // starting position [lng, lat]
    zoom: 5, // starting zoom
  });
};

export const showRouteMap = (coordinates, mapContainerRef) => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  if (coordinates.length >= 2) {
    mapContainerRef.current.innerHTML = "";
    const tempArr = coordinates[0].split(",");
    let map = new mapboxgl.Map({
      container: "maparea",
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      // center: [73.85800431423223, 18.536033374699272], // starting position [lng, lat]
      center: tempArr,
      zoom: 7, // starting zoom
    });

    let marker = new mapboxgl.Marker().setLngLat(tempArr).addTo(map);

    function updateRoute(newCoords) {
      // removeRoute(); // overwrite any existing layers

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
        if (jsonResponse.code === "NoRoute") {
          console.log("No route found");
          return;
        }
        var coords = jsonResponse.routes[0].geometry;
        addRoute(coords);
      };
      req.send();
    }

    // adds the route as a layer on the map
    function addRoute(coords) {
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
          "line-color": "#222224",
          "line-width": 8,
          "line-opacity": 0.8,
        },
      });
    }

    const newCoord = coordinates.join(";");
    updateRoute(newCoord);
  }
};
