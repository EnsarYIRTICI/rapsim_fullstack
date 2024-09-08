import React from "react";

import { Button } from "primereact/button";

import { Marker, Popup } from "react-leaflet";

export default function MapMarker({ item, icon, onClick }) {
  return (
    <Marker icon={icon} position={[item.location.lat, item.location.lng]}>
      <Popup>
        <div className="mb-3">{item.name}</div>
        <div className="mb-3">{item.capacity}</div>
        <Button className="w-10rem" onClick={onClick} label="Git" />
      </Popup>
    </Marker>
  );
}
