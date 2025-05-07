import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import Icon from "@mdi/react";
import { useCategoryTabs } from "@/context/CategoryTabsContext";

export const CategoryTabs = () => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const { tabs, setTabs } = useCategoryTabs();
  const isExplorePage = location.pathname.startsWith("/explore/events");

  const handleTabClick = (clickedTabName: string) => {
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      selected: tab.name === clickedTabName,
    }));
    setTabs(updatedTabs);
  };

  const getTabClass = (tab: (typeof tabs)[number]) => {
    const isSelected = tab.selected;
    const isLight = themeMode === "light";

    if (isSelected) {
      if (isExplorePage) {
        return isLight
          ? "bg-[#0DBC73] text-white md:bg-[rgba(13,188,115,0.1)] md:text-[#0DBC73]"
          : "bg-[#0DBC73] text-black md:bg-[rgba(13,188,115,0.1)] md:text-[#0DBC73]";
      }
      return "bg-[rgba(13,188,115,0.1)] text-[#0DBC73]";
    }

    if (isExplorePage) {
      return isLight
        ? "bg-white text-black hover:text-white hover:bg-[#0DBC73] md:hover:bg-[rgba(13,188,115,0.1)] md:hover:text-[#0DBC73]"
        : "bg-[#222423] text-white hover:text-black hover:bg-[#0DBC73] md:hover:bg-[rgba(13,188,115,0.1)] md:hover:text-[#0DBC73]";
    }

    return isLight
      ? "bg-white text-black hover:bg-[rgba(13,188,115,0.1)] hover:text-[#0DBC73]"
      : "bg-[#222423] text-white hover:bg-[rgba(13,188,115,0.1)] hover:text-[#0DBC73]";
  };

  return (
    <div className="flex gap-4 w-full overflow-x-auto scrollbar-none px-2 md:px-0">
      {tabs.map((tab) => (
        <div
          key={tab.name}
          onClick={() => handleTabClick(tab.name)}
          className={`px-5 rounded-xl backdrop-blur-xs flex items-center gap-2 font-bold cursor-pointer ${getTabClass(
            tab
          )}`}
          role="tab"
          aria-selected={tab.selected}
        >
          {"isComponent" in tab ? (
            tab.icon
          ) : (
            <Icon path={tab.icon} size={0.8} />
          )}
          <p className="py-2">{t(`mainLayout.${tab.name}`)}</p>
        </div>
      ))}
    </div>
  );
};
