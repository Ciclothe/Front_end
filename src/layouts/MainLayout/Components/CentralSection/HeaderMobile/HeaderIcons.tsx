import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";
export const HeaderIcons = () => {
  const { themeMode } = useTheme();
  const isExplorePage = location.pathname.startsWith("/explore/events");

  const getIconContainerClass = () => {
    if (!isExplorePage) return "";
    return themeMode === "light" ? "bg-[#0B0B0B]/10" : "bg-white/10";
  };

  return (
    <div className="col-span-2 flex justify-end gap-4">
      {/* Search Icon (Mobile only) */}
      <div
        className={`${getIconContainerClass()} p-2 md:p-0 rounded-full cursor-pointer backdrop-blur-xs`}
      >
        <Icon path={mdiMagnify} size={1} className="md:hidden" />
      </div>
    </div>
  );
};
