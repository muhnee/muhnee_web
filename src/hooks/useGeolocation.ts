import { useState, useEffect } from "react";

type GeoPositon = {
  latitude: number;
  longitude: number;
};
export const useGeolocation = () => {
  const [position, setPosition] = useState<GeoPositon | null>(null);
  const [error, setError] = useState<String | null>(null);

  const onChange: PositionCallback = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  };

  const onError: PositionErrorCallback = error => {
    setError(error.message);
  };

  // callbacks will go here...
  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }
    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);

  return { position, error };
};

export default useGeolocation;
