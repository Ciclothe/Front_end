import Avatar from "@mui/material/Avatar";
import Icon from "@mdi/react";
import { mdiAllInclusive } from "@mdi/js";
import { getRelativeTime } from "@/components/Utils/getRelativeTime";
import { useTheme } from "@/context/ThemeContext";

interface UserHeaderProps {
  userData: {
    profilePicture?: string;
    username?: string;
  };
  posData: {
    distance?: string;
    createdAt?: string | Date;
  };
  isMobile: boolean;
}

export const UserHeader: React.FC<UserHeaderProps> = ({
  userData,
  posData,
  isMobile,
}) => {
  const { themeMode } = useTheme();

  const createdAtString =
    posData?.createdAt instanceof Date
      ? posData.createdAt.toISOString()
      : posData?.createdAt;

  return (
    <div
      className={`${
        themeMode === "light" ? "text-black md:text-white" : "text-white"
      } ${isMobile ? "md:hidden" : "hidden md:flex"} mb-4 md:p-3 ${
        !isMobile ? "absolute top-2 left-2 bg-black/80" : ""
      } rounded-xl items-center gap-2 pr-10 flex`}
    >
      <Avatar
        variant="rounded"
        src={userData?.profilePicture}
        className="h-full aspect-square"
      />
      <div>
        <div className="flex gap-2 items-center">
          <p className="font-bold">@{userData?.username}</p>
          <div
            className={`aspect-square p-1 bg-[#0DBC73] rounded-full flex items-center justify-center ${
              themeMode === "light" && isMobile ? "text-white" : "text-black"
            }`}
          >
            <Icon path={mdiAllInclusive} size={0.7} />
          </div>
        </div>
        <div className="flex gap-2 opacity-80 font-semibold text-sm">
          <p>
            {posData?.distance} ·{" "}
            {createdAtString ? getRelativeTime(createdAtString) : ""}
          </p>
        </div>
      </div>
    </div>
  );
};
