import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import Icon from "@mdi/react";
import { useCategoryTabs } from "@/context/CategoryTabsContext";

export const CategoryTabs = () => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const { tabs, setTabs } = useCategoryTabs();

  const handleTabClick = (clickedTabName: string) => {
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      selected: tab.name === clickedTabName,
    }));
    setTabs(updatedTabs);
  };

  return (
    <div className="flex gap-4 w-full overflow-x-auto scrollbar-none px-2 md:px-0">
      {tabs.map((tab) => (
        <div
          key={tab.name}
          onClick={() => handleTabClick(tab.name)}
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
          <p className="py-2">{t(`mainLayout.${tab.name}`)}</p>
        </div>
      ))}
    </div>
  );
};
