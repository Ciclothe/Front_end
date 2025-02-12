import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { PrivateGuard } from "@/guard/PrivateGuard";
import { PrivateRouter } from "@/private/PrivateRouter";
import { RoutesWithNotFound } from "@/components/RoutesWithNotFound/RoutesWithNotFound";
import { Login } from "@/public/Login/Login";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <RoutesWithNotFound>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateGuard />}>
          <Route path="/*" element={<PrivateRouter />} />
        </Route>
      </RoutesWithNotFound>
    </BrowserRouter>
  );
};
