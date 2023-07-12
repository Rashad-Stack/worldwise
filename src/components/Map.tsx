import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useState } from "react";
import { useCities } from "@/hooks/useCities";
import type { City } from "@/types";
import useGeoLocation from "@/hooks/useGeoLocation";
import Button from "./Button";
import useUrlPosition from "@/hooks/useUrlPosition";

export default function Map() {
  const { cities } = useCities();
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const {
    isLoading,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation({
    defaultPosition: { latitude: position[0], longitude: position[0] },
  });
  const { lat, lng } = useUrlPosition();

  useEffect(() => {
    if (lat && lng) {
      setPosition([Number(lat), Number(lng)]);
    }
  }, [lat, lng]);

  useEffect(
    function () {
      if (geoLocationPosition) {
        setPosition([
          geoLocationPosition.latitude,
          geoLocationPosition.longitude,
        ]);
      }
    },
    [geoLocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      <Button onClick={getPosition} type="position">
        {isLoading ? "Loading..." : "Get Current Location"}
      </Button>

      <MapContainer
        center={position}
        zoom={6}
        scrollWheelZoom={false}
        className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city: City) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
        <CenteredMap position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

interface Props {
  position: [number, number];
}

function CenteredMap({ position }: Props) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent("click", (e) => {
    navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
  });

  return null;
}
