import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useCategoryTabs } from "@/context/CategoryTabsContext";

interface RouteChangeHandlerProps {
  onLoad: () => void;
}

export const RouteChangeHandler = ({ onLoad }: RouteChangeHandlerProps) => {
  const location = useLocation();
  const { setShowTabs, setTabs } = useCategoryTabs();
  const prevBasePathRef = useRef<string | null>(null);

  useEffect(() => {
    const currentBasePath = location.pathname.split("/")[1] || "";

    if (prevBasePathRef.current !== currentBasePath) {
      console.log("Base path changed:", currentBasePath);
      setShowTabs(false);
      setTabs([]);
      prevBasePathRef.current = currentBasePath;
    }

    onLoad();
  }, [location.pathname, setShowTabs, setTabs, onLoad]);

  return null;
};
