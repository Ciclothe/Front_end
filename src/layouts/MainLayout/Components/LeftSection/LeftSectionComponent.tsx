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
      } p-4 flex flex-col justify-between h-full pl-10 xl:pl-20 xl:py-10`}
    >
      <div className="flex flex-col flex-grow justify-between items-start">
        <div>
          <LogoHeader />
          <NavigationPanel menuItems={menuItems} />
        </div>
        <PostCreationModule />
      </div>
    </div>
  );
};
