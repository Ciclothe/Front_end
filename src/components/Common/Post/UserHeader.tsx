import Avatar from "@mui/material/Avatar";
import Icon from "@mdi/react";
import { mdiAllInclusive, mdiHandshake } from "@mdi/js";
import { getRelativeTime } from "@/components/Utils/getRelativeTime";
import { useTheme } from "@/context/ThemeContext";

interface UserHeaderProps {
  postType: string;
  userData: {
    username: string;
    profilePicture: string;
  };
  postData: {
    createdAt: string | Date;
    distance?: string;
  };
  eventTitle?: string;
}

export const UserHeader: React.FC<UserHeaderProps> = ({
  postData,
  postType,
  userData,
  eventTitle,
}) => {
  const { themeMode } = useTheme();

  const createdAtString =
    postData?.createdAt instanceof Date
      ? postData?.createdAt.toISOString()
      : postData?.createdAt;

  return (
    <div
      className={`${
        postType === "swap"
          ? "md:absolute md:top-2 md:left-2 md:bg-black/80 md:text-white md:p-3 md:rounded-xl md:pr-10 "
          : ""
      } flex items-center gap-2 z-5`}
    >
      <Avatar
        variant="rounded"
        src={userData?.profilePicture}
        className="h-full aspect-square"
      />
      <div>
        <div className="flex gap-2 items-center">
          <p className="font-bold">
            {postType === "swap" ? `@${userData?.username}` : `${eventTitle}`}
          </p>

          <div
            className={`${
              postType === "swap" ? "bg-[#0DBC73] " : "bg-[#8846F2] "
            } aspect-square p-1 rounded-full flex items-center justify-center ${
              themeMode === "light" ? "text-white" : "text-black"
            }`}
          >
            <Icon
              path={postType === "swap" ? mdiAllInclusive : mdiHandshake}
              size={0.7}
            />
          </div>
        </div>
        <div className="flex gap-2 font-semibold text-sm">
          <p>
            {postType === "swap" ? (
              <span className="opacity-50">{postData?.distance} away</span>
            ) : (
              <>
                <span className="opacity-50">Created by </span>
                <span className="font-bold opacity-100">
                  @{userData?.username}
                </span>
              </>
            )}{" "}
            <span className="opacity-50">
              · {createdAtString ? getRelativeTime(createdAtString) : ""}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
