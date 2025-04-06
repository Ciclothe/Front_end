import { LogoHeader } from "./LogoHeader";
import { NavigationPanel } from "./NavigationPanel";
import { PostCreationModule } from "./PostCreation";
import { useTheme } from "@/context/ThemeContext";

export const LeftSectionComponent = () => {
  const { themeMode } = useTheme();

  const menuItems = [
    { label: "feed", route: "/feed" },
    { label: "swipes", route: "/swipes" },
    { label: "explore", route: "/explore" },
    { label: "events", route: "/events" },
    { label: "chats", route: "/chats" },
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
