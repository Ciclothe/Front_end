import { SearchBar } from "@/components/Common/SearchBar";
import { LeftSectionComponent } from "./Components";
import { RightPanel } from "./Components";
import { HeaderMobile } from "./Components";
import { Outlet } from "react-router-dom";
import { CategoryTabs } from "@/components/Common/CategoryTabs";

export const MainLayout = () => {
  return (
    <div className="grid grid-cols-12 text-black">
      <HeaderMobile />
      {/** LEFT SECTION */}
      <LeftSectionComponent />
      {/** CENTRAL SECTION */}
      <main className="col-span-12 md:col-span-8 xl:col-span-6 pl-5 pr-5 md:pr-10 lg:pr-20 xl:pl-10 xl:pr-10">
        <div className="hidden md:flex flex-col gap-4 pt-5 xl:pt-10 sticky top-20 xl:top-0 z-10 w-full">
          <SearchBar />
          <CategoryTabs />
        </div>

        {/** MAIN CONTENT AREA */}
        <div className="pt-5">
          <Outlet />
        </div>
      </main>
      {/** RIGHT SECTION */}
      <RightPanel />
    </div>
  );
};
