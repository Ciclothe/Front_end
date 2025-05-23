import Avatar from "@mui/material/Avatar";
import Icon from "@mdi/react";
import { mdiHandshake } from "@mdi/js";
import { getRelativeTime } from "@/components/Utils/format";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { PiSwapFill } from "react-icons/pi";
import { Participant } from "@/types/index";

interface UserHeaderProps {
  postType: string;
  userData: Participant;
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
          ? "absolute top-2 left-2 bg-black/40 backdrop-blur-md text-white p-3 rounded-xl pr-10 max-w-[95%]"
          : ""
      }
       flex items-center gap-2 z-5`}
    >
      <Avatar
        variant="rounded"
        src={userData?.profilePicture}
        className="h-full aspect-square"
      />
      <div className="w-full truncate">
        <div className="flex items-center gap-2 max-w-full">
          <p className="font-bold truncate">
            {postType === "swap"
              ? `@${userData?.userName}`
              : `${postData?.eventTitle}`}
          </p>
          <div
            className={`flex-shrink-0 ${
              postType === "swap" ? "bg-[#0DBC73]" : "bg-[#8846F2]"
            } p-1 rounded-full flex items-center justify-center ${
              themeMode === "light" ? "text-white" : "text-black"
            }`}
          >
            {renderIcon()}
          </div>
        </div>

        <div className="flex gap-2 font-semibold text-md">
          <p className="truncate">
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
                  @{userData?.userName}
                </span>
              </>
            )}{" "}
            <span className="opacity-50 truncate">
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
