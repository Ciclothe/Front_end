import Avatar from "@mui/material/Avatar";
import { useTheme } from "@/context/ThemeContext";

// TODO: Create a custom hook to manage the user data
const userData = {
  name: "Alejandro Ospina Rojas",
  profilePicture:
    "https://i.pinimg.com/736x/2e/95/1a/2e951a077192834ecc59d4024a6f9ce4.jpg",
  username: "alejospinaro",
};

const UserProfile: React.FC = () => {
  const { themeMode } = useTheme();

  return (
    <div
      className={`${
        themeMode === "light"
          ? "border-black/5 hover:bg-[#F7F7F7]"
          : "border-white/5 hover:bg-[#313131]"
      } border-b flex gap-2 font-semibold items-center p-4 cursor-pointer transition`}
    >
      <Avatar alt={userData.name} src={userData.profilePicture} />
      <div className="w-full truncate text-start">
        <p className="text-[1.1em] font-semibold truncate">{userData.name}</p>
        <p className="opacity-50 mt-[-5px]">@{userData.username}</p>
      </div>
    </div>
  );
};

export default UserProfile;
