import { SearchBar } from "@/components/Common/SearchBar";
import { LeftSectionComponent } from "./Components";
import { RightPanel } from "./Components";
import { HeaderMobile } from "./Components";
import { NavBarMobile } from "./Components";
import { Outlet, useLocation } from "react-router-dom";
import { CategoryTabs } from "@/components/Common/CategoryTabs";
import { useCategoryTabs } from "@/context/CategoryTabsContext";
import { AccountSection } from "./Components/RightPanel/AccountSection/AccountSection";
import { RouteChangeHandler } from "@/components/RouteChangeHandler";

import "./MainLayout.css";
import { useState } from "react";

export const MainLayout = () => {
  const { showTabs } = useCategoryTabs();
  const location = useLocation();
  const isEventView = location.pathname.startsWith("/explore/events");

  const [routeReady, setRouteReady] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full md:flex-row md:overflow-hidden">
      {/* Header solo en mobile */}
      <div className="md:hidden">
        <HeaderMobile />
      </div>

      {/* Izquierda en desktop */}
      <div className="hidden md:block h-screen z-10">
        <LeftSectionComponent />
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col flex-1 md:overflow-hidden">
        {/* Parte superior solo visible en desktop */}
        <div className="hidden pt-8 pb-4 px-10 shrink-0 md:flex flex-col gap-4">
          <div className="flex items-center gap-10">
            <SearchBar ShowLocation={true} />
            <AccountSection />
          </div>
          {showTabs && <CategoryTabs />}
        </div>

        {/* Contenido dinámico */}
        <div className="flex-1 flex overflow-hidden">
          <div
            className={`${
              isEventView ? "" : "px-2"
            } flex flex-col flex-1 md:overflow-y-auto md:px-10 scrollbar-hidden w-full`}
          >
            <div className="flex-1 w-full">
              <RouteChangeHandler onLoad={() => setRouteReady(true)} />
              {routeReady && <Outlet />}
            </div>
          </div>

          {/* Panel derecho solo en desktop */}
          <div className="shrink-0 hidden xl:block xl:w-[25%]">
            <RightPanel />
          </div>
        </div>
      </div>

      {/* Navbar fijo en la parte inferior solo en mobile */}
      <NavBarMobile />
    </div>
  );
};
