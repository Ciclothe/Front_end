import Icon from "@mdi/react";
import { mdiBellBadge, mdiBellOutline, mdiMagnify } from "@mdi/js";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { NotificationBanner } from "@/components/Common/NotificationBanner";

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

export const HeaderIcons = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadNotifications = Notifications.some((n) => !n.readed);
  const { themeMode } = useTheme();

  return (
    <div className="col-span-2 flex justify-end gap-4">
      <Icon path={mdiMagnify} size={1} className="md:hidden" />
      <div className="relative">
        <div
          className="cursor-pointer"
          onClick={() => setShowNotifications((prev) => !prev)}
        >
          <Icon
            path={unreadNotifications ? mdiBellBadge : mdiBellOutline}
            size={1}
            className={`${
              unreadNotifications
                ? "text-[#0dbc73]"
                : themeMode === "light"
                ? "text-black"
                : "text-white"
            }`}
          />
        </div>
        {showNotifications && (
          <NotificationBanner
            setIsOpen={setShowNotifications}
            notifications={Notifications}
          />
        )}
      </div>
    </div>
  );
};
