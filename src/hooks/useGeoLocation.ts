import { useState } from "react";

interface Position {
  latitude: number;
  longitude: number;
}

interface Props {
  defaultPosition: Position;
}
export default function useGeoLocation({ defaultPosition }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    setIsLoading(true);
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition({ latitude, longitude });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
