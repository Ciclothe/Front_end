import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

interface RouteChangeHandlerProps {
  onLoad: () => void;
}

export const RouteChangeHandler = ({ onLoad }: RouteChangeHandlerProps) => {
  const location = useLocation();
  const prevBasePathRef = useRef<string | null>(null);

  useEffect(() => {
    const currentBasePath = location.pathname.split("/")[1] || "";

    if (prevBasePathRef.current !== currentBasePath) {
      prevBasePathRef.current = currentBasePath;
      onLoad();
    }
  }, [location.pathname, onLoad]);

  return null;
};
