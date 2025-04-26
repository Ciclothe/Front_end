import { Navigate, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { PrivateGuard } from "@/guard/PrivateGuard";
import { PrivateRouter } from "@/private/PrivateRouter";
import { RoutesWithNotFound } from "@/components/RoutesWithNotFound/RoutesWithNotFound";
import { Login } from "@/public/Login/Login";

export const AppRouter = () => {
  const [token, setToken] = useState(123);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(123);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <RoutesWithNotFound>
      <Route
        path="/"
        element={
          token ? (
            <Navigate to="/feed" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/login"
        element={token ? <Navigate to="/feed" replace /> : <Login />}
      />
      <Route element={<PrivateGuard />}>
        <Route path="/*" element={<PrivateRouter />} />
      </Route>
    </RoutesWithNotFound>
  );
};
