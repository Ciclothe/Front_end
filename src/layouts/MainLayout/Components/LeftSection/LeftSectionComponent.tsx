import { LogoHeader } from "./LogoHeader";
import { NavigationPanel } from "./NavigationPanel";
import { PostCreationModule } from "./PostCreation";
import { useTheme } from "@/context/ThemeContext";
import {
  MdHandshake,
  MdOutlineHandshake,
  MdOutlineExplore,
  MdExplore,
} from "react-icons/md";
import { RiHomeSmile2Fill, RiHomeSmile2Line } from "react-icons/ri";
import { BiCarousel, BiSolidCarousel } from "react-icons/bi";
import { MdNotificationsNone, MdNotifications } from "react-icons/md";
import { HiOutlineChat, HiChat } from "react-icons/hi";

const MENU_ITEMS = [
  {
    label: "feed",
    route: "/feed",
    iconFill: RiHomeSmile2Fill,
    iconOutline: RiHomeSmile2Line,
  },
  {
    label: "swipes",
    route: "/swipes",
    iconFill: BiSolidCarousel,
    iconOutline: BiCarousel,
  },
  {
    label: "explore",
    route: "/explore",
    iconFill: MdExplore,
    iconOutline: MdOutlineExplore,
  },
  {
    label: "events",
    route: "/events",
    iconFill: MdHandshake,
    iconOutline: MdOutlineHandshake,
  },
  {
    label: "notifications",
    route: "/notifications",
    iconFill: MdNotifications,
    iconOutline: MdNotificationsNone,
  },
  {
    label: "chats",
    route: "/chats",
    iconFill: HiChat,
    iconOutline: HiOutlineChat,
  },
];

export const LeftSectionComponent = () => {
  const { themeMode } = useTheme();
  const borderColor =
    themeMode === "light" ? "border-black/5" : "border-white/10";

  return (
    <aside
      className={`relative border-r ${borderColor} p-8 h-full flex flex-col justify-between items-center w-fit`}
    >
      <div className="flex flex-col flex-grow items-center justify-between">
        <div>
          <LogoHeader />
          <NavigationPanel menuItems={MENU_ITEMS} />
        </div>
        <PostCreationModule />
      </div>

      {/* Botón o panel flotante a un lado */}
      {/* <NotificationBanner /> */}
    </aside>
  );
};
