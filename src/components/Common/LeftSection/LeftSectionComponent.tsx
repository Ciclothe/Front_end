import { LogoHeader } from "./LogoHeader";
import { NavigationPanel } from "./NavigationPanel";
import { PostCreationModule } from "./PostCreation";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { MdOutlineExplore, MdExplore } from "react-icons/md";
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
    label: "notifications",
    route: "/notifications",
    iconFill: MdNotifications,
    iconOutline: MdNotificationsNone,
  },
  {
    label: "messages",
    route: "/messages",
    iconFill: HiChat,
    iconOutline: HiOutlineChat,
  },
];

export const LeftSectionComponent = () => {
  const { themeMode } = useTheme();
  const { currentUser } = useAuth();
  const borderColor =
    themeMode === "light" ? "border-black/5" : "border-white/10";

  // Mostrar solo "explore" si no está logueado
  const filteredMenu = currentUser
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.label === "explore");

  return (
    <aside
      className={`relative border-r ${borderColor} p-8 h-full flex flex-col justify-between items-center w-fit`}
    >
      <div className="flex flex-col flex-grow items-center justify-between">
        <div>
          <LogoHeader />
          <NavigationPanel menuItems={filteredMenu} />
        </div>

        {currentUser && <PostCreationModule />}
      </div>

      {/* Puedes agregar aquí elementos flotantes si deseas */}
    </aside>
  );
};
