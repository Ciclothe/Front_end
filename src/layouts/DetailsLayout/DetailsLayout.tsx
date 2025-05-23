import { Outlet } from "react-router-dom";
import { LeftSectionComponent } from "@/components/Common/LeftSection/LeftSectionComponent";
import { NavBarMobile } from "@/components/Common/NavBarMobile";
import { SearchBar } from "@/components/Common/SearchBar";
import { AccountSection } from "../MainLayout/Components/RightPanel/AccountSection/AccountSection";
import { useLocation } from "react-router-dom";
import { SearchOverlay } from "@/components/Common/SearchOverlay";
import { useState } from "react";
import { CategoryTabs } from "@/components/Common/CategoryTabs";
import { useCategoryTabs } from "@/context/CategoryTabsContext";
import { HeaderMobile } from "../MainLayout/Components";
import { useMediaQuery } from "react-responsive";

export const DetailsLayout = () => {
  const location = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const hiddeHeader =
    location.pathname.startsWith("/messages") ||
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/swaps") ||
    (isMobile &&
      (location.pathname.startsWith("/eventDetails") ||
        location.pathname.startsWith("/swapDetails")));

  const [isSearchActive, setIsSearchActive] = useState(false);
  const { showTabs } = useCategoryTabs();

  return (
    <div className="flex flex-col h-[100dvh] w-full md:flex-row md:overflow-hidden">
      {/* Header solo en mobile */}
      {!hiddeHeader && (
        <div className="md:hidden">
          <HeaderMobile />
        </div>
      )}

      {/* Izquierda en desktop */}
      <div className="hidden md:block h-screen z-10">
        <LeftSectionComponent />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        {!hiddeHeader && (
          <div className="hidden pt-8 pb-4 shrink-0 md:flex flex-col gap-4">
            <div className="flex items-center">
              <div className="flex-1 px-10 relative">
                <SearchBar
                  ShowLocation={true}
                  onFocus={() => setIsSearchActive(true)}
                />
                {isSearchActive && (
                  <SearchOverlay onClose={() => setIsSearchActive(false)} />
                )}
              </div>
              <div className="mr-10">
                <AccountSection />
              </div>
            </div>
            <div className="px-10">{showTabs && <CategoryTabs />}</div>
          </div>
        )}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>

      {/* Navbar fijo en la parte inferior solo en mobile */}
      <div className="md:hidden pb-safe">
        <NavBarMobile />
      </div>
    </div>
  );
};
