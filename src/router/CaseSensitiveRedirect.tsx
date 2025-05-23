// src/router/CaseSensitiveRedirect.tsx
import { useLocation, Navigate } from "react-router-dom";

// Lista de rutas válidas (añade aquí todas las que importan)
const validPaths = [
  "/swapDetails",
  "/swaps/offer/accepted",
  "/messages",
  "/garment/upload",
  "/feed",
  "/home",
  "/explore",
  "/signIn",
  "/explore/events",
  "/explore/garment",
  "/swipes",
];

export const CaseSensitiveRedirect = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Encuentra si alguna ruta válida es parte del pathname actual
  const matchedValidPath = validPaths.find((path) =>
    pathname.toLowerCase().startsWith(path.toLowerCase())
  );

  // Si existe una coincidencia pero con diferente casing
  if (matchedValidPath && !pathname.startsWith(matchedValidPath)) {
    const correctedPath =
      matchedValidPath +
      pathname.slice(matchedValidPath.length) +
      location.search;
    return <Navigate to={correctedPath} replace />;
  }

  return null;
};
