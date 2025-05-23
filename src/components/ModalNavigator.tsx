import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { debounce } from "lodash";

export const ModalNavigator = ({
  token,
  type,
  step,
}: {
  token: string;
  type: string;
  step: string;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = debounce(() => {
      const modalRoute = `/swaps/${token}/${step}`;
      const route = type === "swap" ? modalRoute : `/events/${step}`;
      navigate(route);
    }, 300);

    handleNavigation();

    return () => {
      handleNavigation.cancel();
    };
  }, [navigate, token, type, step]);

  return null;
};
