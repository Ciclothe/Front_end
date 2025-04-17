import Avatar from "@mui/material/Avatar";
import Icon from "@mdi/react";
import { mdiHandshake } from "@mdi/js";
import { getRelativeTime } from "@/components/Utils/format";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { PiSwapFill } from "react-icons/pi";

interface UserHeaderProps {
  postType: string;
  userData: {
    username: string;
    profilePicture: string;
  };
  postData: {
    createdAt?: string | Date;
    distance?: string;
    eventTitle?: string;
  };
  isAbsolute?: boolean;
}

export const UserHeader: React.FC<UserHeaderProps> = ({
  postData,
  postType,
  userData,
  isAbsolute = true,
}) => {
  const { themeMode } = useTheme();
  const { i18n, t } = useTranslation();

  const createdAtString =
    postData?.createdAt instanceof Date
      ? postData?.createdAt.toISOString()
      : postData?.createdAt;

  const renderIcon = () => {
    if (postType === "swap") {
      return <PiSwapFill size={16} />;
    } else {
      return <Icon path={mdiHandshake} size={0.7} />;
    }
  };

  return (
    <div
      className={`${
        postType === "swap" && isAbsolute
          ? "md:absolute md:top-2 md:left-2 md:bg-black/80 md:text-white md:p-3 md:rounded-xl md:pr-10"
          : ""
      }
       flex items-center gap-2 z-5`}
    >
      <Avatar
        variant="rounded"
        src={userData?.profilePicture}
        className="h-full aspect-square"
      />
      <div>
        <div className="flex gap-2 items-center">
          <p className="font-bold">
            {postType === "swap"
              ? `@${userData?.username}`
              : `${postData?.eventTitle}`}
          </p>

          <div
            className={`${
              postType === "swap" ? "bg-[#0DBC73]" : "bg-[#8846F2]"
            } aspect-square p-1 rounded-full flex items-center justify-center ${
              themeMode === "light" ? "text-white" : "text-black"
            }`}
          >
            {renderIcon()}
          </div>
        </div>
        <div className="flex gap-2 font-semibold text-sm">
          <p>
            {postType === "swap" ? (
              <span className="opacity-50">
                {postData?.distance} {t("mainLayout.away")}
              </span>
            ) : (
              <>
                <span className="opacity-50">
                  {t("mainLayout.created_by")}{" "}
                </span>
                <span className="font-bold opacity-100">
                  @{userData?.username}
                </span>
              </>
            )}{" "}
            <span className="opacity-50">
              ·{" "}
              {createdAtString
                ? getRelativeTime(createdAtString, i18n.language)
                : ""}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
