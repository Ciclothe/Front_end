import { SearchBar } from "@/components/Common/SearchBar";
import { LeftSectionComponent } from "./Components";
import { RightPanel } from "./Components";
import { HeaderMobile } from "./Components";
import { Outlet } from "react-router-dom";
import { CategoryTabs } from "@/components/Common/CategoryTabs";
import { useTheme } from "@/context/ThemeContext";

export const MainLayout = () => {
  const { themeMode } = useTheme();

  return (
    <div className="grid grid-cols-12 text-black">
      <HeaderMobile />
      {/** LEFT SECTION */}
      <LeftSectionComponent />
      {/** CENTRAL SECTION */}
      <main className="col-span-12 md:col-span-8 xl:col-span-6 px-2 md:pl-5 md:pr-10 lg:pl-5 lg:pr-10 xl:pl-10 xl:pr-10">
        <div
          className={`${
            themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#121212]"
          } hidden md:flex flex-col gap-4 py-5 xl:pt-10 sticky top-20 xl:top-0 z-10 w-full`}
        >
          <SearchBar />
          <CategoryTabs />
        </div>

        {/** MAIN CONTENT AREA */}
        <div>
          <Outlet />
        </div>
      </main>
      {/** RIGHT SECTION */}
      <div className="z-10 col-span-3">
        <RightPanel />
      </div>
    </div>
  );
};
