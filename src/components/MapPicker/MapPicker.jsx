import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapPicker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);
  const [redirected, setRedirected] = useState(false);

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        if (!redirected) {
          map.locate();
        } else {
          setPosition(e.latlng);
          onLocationSelect(e.latlng);
        }
      },
      locationfound(e) {
        if (!redirected) {
          setPosition(e.latlng);
          map.flyTo(e.latlng, map.getZoom());
          setRedirected(true);
        }
      },
    });

    const handleDragEnd = (e) => {
      const newPosition = e.target.getLatLng();
      setPosition(newPosition);
      onLocationSelect(newPosition);
    };

    return position === null ? null : (
      <Marker
        position={position}
        draggable={true}
        eventHandlers={{
          dragend: handleDragEnd,
        }}
      />
    );
  };

  return (
    <MapContainer center={[-27.298, -55.858]} zoom={13} style={{ height: '500px', width: '500px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapPicker;