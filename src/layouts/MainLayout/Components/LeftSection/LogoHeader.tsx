import { useTheme } from "@/context/ThemeContext";
import { Imagotipo } from "../../../../../public/Logos/Imagotipo";
import { useNavigate } from "react-router-dom";

export const LogoHeader = () => {
  const { themeMode } = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/feed", { replace: true });
  };

  return (
    <div className="hidden xl:flex cursor-pointer" onClick={handleClick}>
      <Imagotipo
        color={themeMode === "light" ? "black" : "white"}
        height="3em"
      />
    </div>
  );
};
