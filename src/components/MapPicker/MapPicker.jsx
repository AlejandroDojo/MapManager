import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';




const MapPicker = ({ onLocationSelect,customIcon }) => {
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
        icon={customIcon}
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