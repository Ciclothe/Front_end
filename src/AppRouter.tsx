import { Navigate, Route } from "react-router-dom";
import { PrivateGuard } from "@/guard/PrivateGuard";
import { PrivateRouter } from "@/private/PrivateRouter";
import { RoutesWithNotFound } from "@/components/RoutesWithNotFound/RoutesWithNotFound";
import { SignIn } from "@/public/Authentication/SignIn/SignIn";
import { GarmentsView } from "@/public/ExplorePage/Pages/GarmentsView";
import { EventsView } from "@/public/ExplorePage/Pages/EventsView";
import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { RecoveryPassword } from "@/public/Authentication/RecoveryPassword/RecoveryPassword";
import { SignUp } from "@/public/Authentication/SignUp/SignUp";

export const AppRouter = () => {
  const { token } = useAuth();

  console.log("AppRouter token", token);

  return (
    <RoutesWithNotFound>
      <Route
        path="/"
        element={
          token ? (
            <Navigate to="/feed" replace />
          ) : (
            <Navigate to="/signIn" replace />
          )
        }
      />
      <Route element={<MainLayout />}>
        <Route
          path="/explore"
          element={<Navigate to="/explore/events" replace />}
        />
        <Route path="/explore/events/*" element={<EventsView />} />
        <Route path="/explore/events/:tokenEvent?" element={<EventsView />} />
        <Route path="/explore/garment/*" element={<GarmentsView />} />
        <Route path="/explore/garment/:category?" element={<GarmentsView />} />
      </Route>
      <Route
        path="/signIn"
        element={token ? <Navigate to="/feed" replace /> : <SignIn />}
      />
      <Route
        path="/signUp"
        element={token ? <Navigate to="/feed" replace /> : <SignUp />}
      />
      <Route path="/resetPassword" element={<RecoveryPassword />} />
      <Route element={<PrivateGuard />}>
        <Route path="/*" element={<PrivateRouter />} />
      </Route>
    </RoutesWithNotFound>
  );
};
