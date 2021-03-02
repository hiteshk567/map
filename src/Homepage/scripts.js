// export const mapScript = () => {
//   mapboxgl.accessToken =
//     "pk.eyJ1IjoiZmFraHIiLCJhIjoiY2pseXc0djE0MHBibzN2b2h4MzVoZjk4aSJ9.ImbyLtfsfSsR_yyBluR8yQ";
//   var instructions = document.getElementById("instructions");
//   var map = new mapboxgl.Map({
//     container: "map", // container id
//     style: "mapbox://styles/mapbox/streets-v9", //hosted style id
//     center: [-122.675246, 45.529431], // starting position
//     zoom: 13, // starting zoom
//     minZoom: 11, // keep it local
//   });
//   //  geocoder here
//   var geocoder = new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     // limit results to Australia
//     //country: 'IN',
//   });

//   // After the map style has loaded on the page, add a source layer and default
//   // styling for a single point.
//   map.on("load", function () {
//     // Listen for the `result` event from the MapboxGeocoder that is triggered when a user
//     // makes a selection and add a symbol that matches the result.
//     geocoder.on("result", function (ev) {
//       console.log(ev.result.center);
//     });
//   });

//   // use the coordinates you just drew to make your directions request
//   function updateRoute() {
//     removeRoute(); // overwrite any existing layers
//     var data = draw.getAll();
//     var lastFeature = data.features.length - 1;
//     var coords = data.features[lastFeature].geometry.coordinates;
//     var newCoords = coords.join(";");
//     console.log(typeof newCoords);
//     getMatch(newCoords);
//   }

//   // make a directions request
//   function getMatch(e) {
//     var url =
//       "https://api.mapbox.com/directions/v5/mapbox/cycling/" +
//       e +
//       "?geometries=geojson&steps=true&access_token=" +
//       mapboxgl.accessToken;
//     var req = new XMLHttpRequest();
//     req.responseType = "json";
//     req.open("GET", url, true);
//     req.onload = function () {
//       var jsonResponse = req.response;
//       var distance = jsonResponse.routes[0].distance * 0.001;
//       var duration = jsonResponse.routes[0].duration / 60;
//       var steps = jsonResponse.routes[0].legs[0].steps;
//       var coords = jsonResponse.routes[0].geometry;
//       //  console.log(steps);
//       console.log(coords);
//       //  console.log(distance);
//       // console.log(duration);

//       // get route directions on load map
//       steps.forEach(function (step) {
//         instructions.insertAdjacentHTML(
//           "beforeend",
//           "<p>" + step.maneuver.instruction + "</p>"
//         );
//       });
//       // get distance and duration
//       instructions.insertAdjacentHTML(
//         "beforeend",
//         "<p>" +
//           "Distance: " +
//           distance.toFixed(2) +
//           " km<br>Duration: " +
//           duration.toFixed(2) +
//           " minutes" +
//           "</p>"
//       );

//       // add the route to the map
//       addRoute(coords);
//       //  console.log(coordinates);
//     };
//     req.send();
//   }

//   // adds the route as a layer on the map
//   function addRoute(coords) {
//     // check if the route is already loaded
//     if (map.getSource("route")) {
//       map.removeLayer("route");
//       map.removeSource("route");
//     } else {
//       map.addLayer({
//         id: "route",
//         type: "line",
//         source: {
//           type: "geojson",
//           data: {
//             type: "Feature",
//             properties: {},
//             geometry: coords,
//           },
//         },
//         layout: {
//           "line-join": "round",
//           "line-cap": "round",
//         },
//         paint: {
//           "line-color": "#1db7dd",
//           "line-width": 8,
//           "line-opacity": 0.8,
//         },
//       });
//     }
//   }

//   // remove the layer if it exists
//   function removeRoute() {
//     if (map.getSource("route")) {
//       map.removeLayer("route");
//       map.removeSource("route");
//       instructions.innerHTML = "";
//     } else {
//       return;
//     }
//   }
//   document.getElementById("geocoder").appendChild(geocoder.onAdd(map));
// };
