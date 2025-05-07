import { Isotipo } from "../../../../../public/Logos/Isotipo";
import { useNavigate } from "react-router-dom";

export const LogoHeader = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/feed", { replace: true });
  };

  return (
    <div className="flex cursor-pointer justify-center" onClick={handleClick}>
      <Isotipo color={"#0DBC73"} height="3em" />
    </div>
  );
};
