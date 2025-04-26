import { SearchBar } from "@/components/Common/SearchBar";
import { LeftSectionComponent } from "./Components";
import { RightPanel } from "./Components";
import { HeaderMobile } from "./Components";
import { NavBarMobile } from "./Components";
import { Outlet } from "react-router-dom";
import { CategoryTabs } from "@/components/Common/CategoryTabs";
import { useTheme } from "@/context/ThemeContext";
import { useCategoryTabs } from "@/context/CategoryTabsContext";
import "./MainLayout.css";

export const MainLayout = () => {
  const { themeMode } = useTheme();
  const { showTabs } = useCategoryTabs();

  return (
    <div className="min-h-screen md:h-screen w-full flex flex-col md:overflow-hidden">
      {/* Header Mobile */}
      <HeaderMobile />

      {/* Principal Content */}
      <div className="flex flex-grow overflow-hidden w-full">
        {/* Lateral Navbar Desktop */}
        <div className="md:w-[30%] lg:w-[25%] xl:w-[25%] h-full hidden md:block">
          <LeftSectionComponent />
        </div>

        {/* Central Content */}
        <div className="flex-grow flex flex-col w-[100%] md:w-[70%] lg:w-[75%] xl:w-[50%] px-2 md:px-10">
          {/* Search & Category Tabs */}
          <div
            className={`${
              themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#121212]"
            } hidden md:flex flex-col gap-4 py-5 xl:pt-10 z-10 w-full`}
          >
            <SearchBar />
            {showTabs && <CategoryTabs />}
          </div>

          {/* Scroll Content */}
          <div className="w-full flex-grow overflow-y-auto">
            <Outlet />
          </div>
        </div>

        {/* Account Section */}
        <div className="w-[25%] h-full hidden xl:block">
          <RightPanel />
        </div>
      </div>

      {/* Navbar Mobile */}
      <NavBarMobile />
    </div>
  );
};
