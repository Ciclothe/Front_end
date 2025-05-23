import Avatar from "@mui/material/Avatar";
import { useTheme } from "@/context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getCityAndCountry } from "@/components/Utils/format";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const UserProfile: React.FC = () => {
  const { themeMode } = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [locationText, setLocationText] = useState("");
  const { i18n } = useTranslation();

  useEffect(() => {
    const valenciaCoords = { lat: 39.4699, lng: -0.3763 };

    const fetchLocation = async (lat: number, lng: number) => {
      const result = await getCityAndCountry(lat, lng, i18n.language);
      setLocationText(result);
    };

    const fetchIpLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) throw new Error("IP location fetch failed");
        const data = await res.json();
        const lat = data.latitude;
        const lng = data.longitude;
        if (typeof lat === "number" && typeof lng === "number") {
          fetchLocation(lat, lng);
        } else {
          fetchLocation(valenciaCoords.lat, valenciaCoords.lng);
        }
      } catch {
        fetchLocation(valenciaCoords.lat, valenciaCoords.lng);
      }
    };

    if (
      typeof currentUser?.location?.lat === "number" &&
      typeof currentUser?.location?.lng === "number"
    ) {
      fetchLocation(currentUser.location.lat, currentUser.location.lng);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchLocation(position.coords.latitude, position.coords.longitude);
        },
        () => {
          fetchIpLocation();
        }
      );
    } else {
      fetchIpLocation();
    }
  }, [currentUser, i18n.language]);

  if (!currentUser) {
    return null;
  }

  const handleClick = () => {
    navigate(`/profile/${currentUser.userName}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`${
        themeMode === "light"
          ? "border-black/5 hover:bg-[#F7F7F7]"
          : "border-white/5 hover:bg-[#313131]"
      } border-b flex gap-2 font-semibold items-center p-4 cursor-pointer transition`}
    >
      <Avatar alt={currentUser.userName} src={currentUser.profilePicture} />
      <div className="w-full truncate text-start">
        <p className="text-[1.1em] font-semibold truncate">
          @{currentUser.userName}
        </p>
        <p className="opacity-50 truncate">{locationText}</p>
      </div>
    </div>
  );
};

export default UserProfile;
