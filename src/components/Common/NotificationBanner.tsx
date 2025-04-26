import { useEffect } from "react";
import { ClickAwayListener } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";
import { NotificationHeader } from "@/layouts/MainLayout/Components/RightPanel/NotificationBanner/NotificationHeader";
import clsx from "clsx";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import { useModal } from "@/context/ModalContext";

interface NotificationBannerProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: {
    profilePicture: string;
    token: string;
    type: string;
    created_by: string;
    title: string;
    readed: boolean;
  }[];
  position?: "top" | "bottom";
  align?: "left" | "right";
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({
  setIsOpen,
  notifications,
  position = "bottom",
  align = "right",
}) => {
  const { openModal } = useModal();

  const { themeMode } = useTheme();
  const backgroundClass =
    themeMode === "light"
      ? "bg-white text-black"
      : "bg-[#121212] md:bg-[#222423] text-white";
  const hoverBg =
    themeMode === "light" ? "hover:bg-[#F7F7F7]" : "hover:bg-[#313131]";
  const shadowStyle = { boxShadow: "0px 4px 10px rgba(0,0,0,0.07)" };

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
        document.body.style.overflow = "";
        setIsOpen(false);
      }}
    >
      <div
        className={clsx(
          "fixed md:absolute z-20 h-full md:h-auto w-[100vw] md:w-90 transition-all pb-4 pt-0 duration-100 overflow-hidden md:rounded-2xl",
          backgroundClass,
          "left-0 top-0 md:left-auto md:top-auto",
          align === "right" ? "md:right-0" : "md:left-0",
          position === "top" ? "md:bottom-full md:mb-3" : "md:top-full md:mt-3"
        )}
        style={shadowStyle}
      >
        <div
          className={`${
            themeMode === "light" ? "border-black/5" : "border-white/5"
          } border-b flex items-center gap-4 mx-2 py-4`}
        >
          <div
            className={`${
              themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#222423]"
            } p-1 rounded-full cursor-pointer h-fit w-fit z-20 md:hidden`}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <Icon path={mdiClose} size={1} />
          </div>
          <NotificationHeader
            unreadCount={notifications.filter((n) => !n.readed).length}
          />
        </div>
        {notifications.length > 0 && (
          <div className="flex-1 md:max-h-64 overflow-y-auto custom-scrollbar h-[calc(100%-56px)]">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 cursor-pointer transition ${hoverBg} justify-between`}
                onClick={() => {
                  setIsOpen(false);
                  if (notification.type === "swap") {
                    openModal(notification?.token, "swap", "offerReceived");
                  }
                }}
              >
                <div className="flex items-center gap-4 w-full overflow-hidden">
                  <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden">
                    <img
                      src={notification.profilePicture}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-start">
                      <span className="font-semibold">
                        @{notification.created_by}{" "}
                      </span>
                      <span className="opacity-50">{notification.title}</span>
                    </p>
                  </div>
                </div>
                {!notification?.readed && (
                  <div className="w-2 aspect-square bg-[#0dbc73] rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};
