import { SearchBar } from "@/components/Common/SearchBar";
import { LeftSectionComponent } from "@/components/Common/LeftSection/LeftSectionComponent";
import { RightPanel } from "./Components";
import { HeaderMobile } from "./Components";
import { NavBarMobile } from "@/components/Common/NavBarMobile";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CategoryTabs } from "@/components/Common/CategoryTabs";
import { useCategoryTabs } from "@/context/CategoryTabsContext";
import { AccountSection } from "./Components/RightPanel/AccountSection/AccountSection";
import { RouteChangeHandler } from "@/components/RouteChangeHandler";
import { SearchOverlay } from "@/components/Common/SearchOverlay";
import { useAuth } from "@/context/AuthContext";

import "./MainLayout.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const MainLayout = () => {
  const { currentUser } = useAuth();
  const { t } = useTranslation();

  const { showTabs } = useCategoryTabs();
  const location = useLocation();
  const isEventView = location.pathname.startsWith("/explore/events");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();
  const [routeReady, setRouteReady] = useState(false);

  return (
    <div className="flex flex-col h-[100dvh] w-full md:flex-row md:overflow-hidden">
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
              {currentUser ? (
                <AccountSection />
              ) : (
                <div className="flex items-center gap-4">
                  <p className="font-semibold cursor-pointer">Registrate</p>
                  <button
                    className="animated-gradient-button"
                    onClick={() => {
                      navigate("/signIn");
                    }}
                  >
                    {t("login.sign_in")}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="px-10">{showTabs && <CategoryTabs />}</div>
        </div>

        {/* Contenido dinámico */}
        <div className="flex-1 flex overflow-hidden">
          <div
            className={`${
              isEventView ? "" : "px-4"
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
