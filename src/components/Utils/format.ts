const apiKey = import.meta.env.VITE_MAPBOX_API_KEY;

export const formatDate = (dateString: string, language: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString(language, options).replace(/ de /g, " ");
};

export const formatTime = (timeString: string): string => {
  const [hour, minute] = timeString.split(":");
  const formattedHour = parseInt(hour);
  const suffix = formattedHour >= 12 ? "P.M." : "A.M.";
  const formattedTime = `${formattedHour % 12 || 12}:${minute} ${suffix}`;
  return formattedTime;
};

export const getRelativeTime = (
  dateString: string,
  language: string
): string => {
  if (!dateString) return "";
  const now = new Date();
  const postDate = new Date(dateString);
  const diff = now.getTime() - postDate.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const rtf = new Intl.RelativeTimeFormat(language, { numeric: "auto" });

  if (seconds < 60) return rtf.format(-seconds, "second");
  if (minutes < 60) return rtf.format(-minutes, "minute");
  if (hours < 24) return rtf.format(-hours, "hour");
  if (days < 7) return rtf.format(-days, "day");
  if (weeks < 4) return rtf.format(-weeks, "week");
  if (months < 12) return rtf.format(-months, "month");
  return rtf.format(-years, "year");
};

export const getCityAndCountry = async (
  lat: number,
  lng: number,
  language: string
): Promise<string> => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${apiKey}&language=${language}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const context: { id: string; text: string }[] =
      data.features[0]?.context || [];

    const city = context.find((c) => c.id.includes("place"))?.text || "";
    const country = context.find((c) => c.id.includes("country"))?.text || "";

    if (city && country) {
      return `${city}, ${country}`;
    } else {
      return "Desconocido";
    }
  } catch (error) {
    console.error("Error al obtener ubicación:", error);
    return "Desconocido";
  }
};

export const getFullAddress = async (
  lat: number,
  lng: number,
  language: string
): Promise<string> => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${apiKey}&language=${language}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const fullPlaceName =
      data.features[0]?.place_name || "Dirección desconocida";

    const match = fullPlaceName.match(/^([^,]*\d*),?\s*(\d{5})/);

    if (match) {
      return `${match[1]}, ${match[2]}`;
    }

    return "Dirección desconocida";
  } catch (error) {
    console.error("Error al obtener dirección:", error);
    return "Dirección desconocida";
  }
};

export const conditionColors: Record<string, string> = {
  as_new: "#FFA809",
  used: "#C665F2",
  new: "#0CA867",
  very_used: "#FD436A",
};
