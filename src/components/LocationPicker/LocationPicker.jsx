import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./LocationPicker.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapClickHandler = ({ setPosition, onLocationSelect }) => {
  useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;
    console.log("Map clicked at:", lat, lng);
    setPosition([lat, lng]);
    onLocationSelect(lat, lng);
  });
  return null;
};

const LocationPicker = ({ onLocationChange, initialPosition = [28.6139, 77.2090] }) => {
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    onLocationChange(position[0], position[1]); 
  }, [position, onLocationChange]);

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      <MapClickHandler setPosition={setPosition} onLocationSelect={onLocationChange} />
      
      <Marker
        position={position}
        icon={defaultIcon}
        draggable
        eventHandlers={{
          dragend: (e) => {
            const { lat, lng } = e.target.getLatLng();
            console.log("Marker dragged to:", lat, lng);
            setPosition([lat, lng]);
            onLocationChange(lat, lng);
          },
        }}
      >
        <Popup>Selected Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationPicker;
