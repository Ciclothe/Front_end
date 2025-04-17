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
import { GoHomeFill, GoHome } from "react-icons/go";
import { BiCarousel, BiSolidCarousel } from "react-icons/bi";
import {
  IoChatbubbleEllipsesSharp,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";

export const LeftSectionComponent = () => {
  const { themeMode } = useTheme();

  const menuItems = [
    {
      label: "feed",
      route: "/feed",
      iconFill: GoHomeFill,
      iconOutline: GoHome,
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
      label: "chats",
      route: "/chats",
      iconFill: IoChatbubbleEllipsesSharp,
      iconOutline: IoChatbubbleEllipsesOutline,
    },
  ];

  return (
    <div
      className={`${
        themeMode === "light" ? "border-black/5" : "border-white/5"
      } border-r min-h-fit xl:min-h-auto xl:border-none hidden overflow-y-auto col-span-4 xl:col-span-3 h-[90vh] xl:h-[100vh] sticky top-[10vh] xl:top-0 pl-10 xl:pl-10 2xl:pl-30 text-start md:flex flex-col justify-between py-10`}
    >
      <div>
        <LogoHeader />
        <NavigationPanel menuItems={menuItems} />
      </div>
      <PostCreationModule />
    </div>
  );
};
