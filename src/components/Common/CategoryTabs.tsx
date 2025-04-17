import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { mdiCards, mdiHandshake } from "@mdi/js";
import Icon from "@mdi/react";
import { PiSwapFill } from "react-icons/pi";

export const CategoryTabs = () => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();

  type TabType =
    | {
        icon: string;
        name: string;
        href: string;
        selected: boolean;
        isComponent?: false;
      }
    | {
        icon: JSX.Element;
        name: string;
        href: string;
        selected: boolean;
        isComponent: true;
      };

  const categoryTabs: TabType[] = [
    {
      icon: mdiCards,
      name: "all",
      href: "/",
      selected: true,
    },
    {
      icon: <PiSwapFill size={18} />,
      name: "swaps",
      href: "/swaps",
      selected: false,
      isComponent: true,
    },
    {
      icon: mdiHandshake,
      name: "events",
      href: "/events",
      selected: false,
    },
    // {
    //   icon: mdiAccountSupervisor,
    //   name: "communities",
    //   href: "/communities",
    //   selected: false,
    // },
  ];

  return (
    <div className="flex gap-4 w-full overflow-x-auto scrollbar-none px-2 md:px-0">
      {categoryTabs.map((tab) => (
        <div
          key={tab.name}
          className={`px-5 rounded-full flex items-center gap-2 font-bold cursor-pointer hover:bg-[rgba(13,188,115,0.1)] hover:text-[#0DBC73] ${
            tab.selected
              ? "bg-[rgba(13,188,115,0.1)] text-[#0DBC73]"
              : themeMode === "light"
              ? "bg-white text-black"
              : "bg-[#222423] text-white"
          }`}
        >
          {"isComponent" in tab ? (
            tab.icon
          ) : (
            <Icon path={tab.icon} size={0.8} />
          )}
          <p className="py-2 cursor-pointer">{t(`mainLayout.${tab.name}`)}</p>
        </div>
      ))}
    </div>
  );
};
