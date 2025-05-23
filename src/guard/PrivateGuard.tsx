import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export const PrivateGuard = () => {
  const { currentUser, loading, login } = useAuth();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !currentUser) {
      const fakeUser = {
        id: "1",
        userName: "aphrodite",
        profilePicture:
          "https://i.pinimg.com/736x/1f/b8/27/1fb827f37413d778e56aa404692a3b30.jpg",
        location: {
          lat: 6.2442,
          lng: -75.5812,
        },
      };
      login(fakeUser, token);
    }
  }, [token, currentUser, login]);

  if (loading || (token && !currentUser)) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p>Loading user session...</p>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/signIn" replace />;
  }

  return <Outlet />;
};
