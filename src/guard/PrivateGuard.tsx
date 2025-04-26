import { Navigate, Outlet } from "react-router-dom";

export const PrivateGuard = () => {
  const token = 1234; //localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
