import { useEffect } from "react";
import { ClickAwayListener } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";
import { NotificationHeader } from "@/layouts/MainLayout/Components/RightPanel/NotificationBanner/NotificationHeader";
import clsx from "clsx";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import { useModal } from "@/context/ModalContext";
import { getRelativeTime } from "@/components/Utils/format";
import { useTranslation } from "react-i18next";

//TODO: Fetch notifications from the server
const Notifications = [
  {
    id: 1,
    readed: false,
    token: "cGe2aa0fMjM=",
    type: "post",
    profilePicture:
      "https://i.pinimg.com/736x/8c/f7/35/8cf735ceabc9ec5671b0ade7845aa478.jpg",
    created_by: "alejospinaro",
    user_id: 1,
    title: "created a new post!",
    createdAt: "2025-04-20T15:00:00Z",
  },
  {
    id: 2,
    type: "swap",
    token: "cGe2aa0fMjM=",
    readed: false,
    created_by: "lielcita1230",
    profilePicture:
      "https://i.pinimg.com/736x/3f/4f/e9/3f4fe92639ea9d5980ef1760212e7b86.jpg",
    user_id: 2,
    title: "sent you a swap offer!",
    createdAt: "2025-04-20T15:30:00Z",
  },
  {
    id: 3,
    readed: true,
    token: "cGe2aa0fMjM=",
    type: "event",
    profilePicture:
      "https://i.pinimg.com/736x/be/e6/2e/bee62e121c4fdb1c841e97e459fa7f11.jpg",
    created_by: "marcAnthony",
    user_id: 3,
    title: "sent you a request to your event!",
    createdAt: "2025-04-20T16:00:00Z",
  },
  {
    id: 4,
    readed: true,
    token: "cGe2aa0fMjM=",
    type: "event",
    profilePicture:
      "https://i.pinimg.com/736x/5b/1c/df/5b1cdfeaa4d9367e9913836cae7ba94b.jpg",
    created_by: "elayuwoki",
    user_id: 4,
    title: "sent you a request to your event!",
    createdAt: "2025-04-20T16:00:00Z",
  },
];

interface NotificationBannerProps {
  isOpen: (isOpen: boolean) => void;
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({
  isOpen,
}) => {
  const { openModal } = useModal();
  const { i18n } = useTranslation();

  const { themeMode } = useTheme();
  const backgroundClass =
    themeMode === "light"
      ? "bg-[#F7F7F7] text-black border-black/5"
      : "bg-[#121212] text-white border-white/1";
  const hoverBg =
    themeMode === "light" ? "hover:bg-[#EDEDED]" : "hover:bg-[#222423]";
  const shadowStyle = {
    boxShadow:
      themeMode === "light"
        ? "-5px 5px 20px rgba(0,0,0,0.1)"
        : "-5px 5px 20px rgba(255,255,255,0.08)",
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <ClickAwayListener
      onClickAway={() => {
        isOpen(false);
        document.body.style.overflow = "";
      }}
    >
      <div className="absolute z-100 h-screen w-full md:w-fit md:py-8 md:pl-4 md:left-full top-0">
        <div
          className={clsx(
            "h-full w-full md:w-[35vw] xl:w-[25vw] overflow-y-auto border",
            backgroundClass,
            "md:rounded-2xl"
          )}
          style={shadowStyle}
        >
          <div
            className={clsx(
              themeMode === "light" ? "border-black/5" : "border-white/5",
              "border-b flex items-center p-2 md:p-4 gap-4 bg-inherit sticky top-0 z-10"
            )}
          >
            <div
              className={`${
                themeMode === "light" ? "bg-[#EDEDED]" : "bg-[#222423]"
              } p-1 rounded-full cursor-pointer h-full w-fit z-20 md:hidden`}
              onClick={() => {
                isOpen(false);
                document.body.style.overflow = "";
              }}
            >
              <Icon path={mdiClose} size={1} />
            </div>

            <NotificationHeader
              unreadCount={Notifications.filter((n) => !n.readed).length}
            />
          </div>
          {Notifications.length > 0 && (
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {Notifications.map((notification, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 transition ${hoverBg} justify-between ${
                    notification?.readed ? "opacity-50 hover:opacity-100" : ""
                  }`}
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden">
                      <img
                        src={notification.profilePicture}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-start">
                        <span className="font-semibold">
                          @{notification.created_by}{" "}
                        </span>
                        <span className="opacity-50">{notification.title}</span>
                      </p>
                      {notification.type === "swap" && (
                        <div className="flex gap-2 mt-2">
                          <div
                            className={`${
                              themeMode === "light"
                                ? "hover:text-white"
                                : "hover:text-black"
                            } bg-[rgba(13,188,115,0.1)] text-[#0DBC73] hover:bg-[#0DBC73] cursor-pointer flex whitespace-nowrap items-center justify-center w-fit px-6 font-semibold py-2 rounded-lg text-sm`}
                            onClick={() => {
                              openModal(notification?.token, "offerReceived");
                            }}
                          >
                            View Offer
                          </div>
                          <div
                            className={`${
                              themeMode === "light"
                                ? "hover:text-white"
                                : "hover:text-black"
                            } cursor-pointer hover:bg-[#bc0d0d] text-[#bc0d0d] flex items-center justify-center w-fit px-6 font-semibold py-2 rounded-lg text-sm`}
                          >
                            Decline
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {!notification?.readed && (
                      <div className="w-2 h-2 bg-[#0dbc73] rounded-full"></div>
                    )}
                    <div className="text-xs opacity-50 text-nowrap text-end overflow-hidden">
                      {getRelativeTime(notification.createdAt, i18n.language)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
};
