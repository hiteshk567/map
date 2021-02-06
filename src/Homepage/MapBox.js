import { MapboxEvent } from "mapbox-gl";
import React from "react";
import ReactDOM from "react-dom";

import "./MapBox.css";

const MapBox = (props) => {
  const content = (
    <div className="modal">
      <div id="mapbox" className={`modal__content ${props.contentClass}`}>
        {props.children}
      </div>
    </div>
  );
  {
    /* <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer> */
  }

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

export default MapBox;
