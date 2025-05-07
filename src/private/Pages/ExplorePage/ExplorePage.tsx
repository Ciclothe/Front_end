import { useCategoryTabs } from "@/context/CategoryTabsContext";
import { useEffect } from "react";
import { PiCoatHanger } from "react-icons/pi";
import { mdiHandshake } from "@mdi/js";
import { EventsView } from "./Pages/EventsView";
import { GarmentsView } from "./Pages/GarmentsView";
import { useLocation, useNavigate } from "react-router-dom";

type TabType =
  | {
      icon: string;
      name: string;
      type: string;
      href: string;
      selected: boolean;
      isComponent?: false;
    }
  | {
      icon: JSX.Element;
      name: string;
      type: string;
      href: string;
      selected: boolean;
      isComponent: true;
    };

const initialTabs: TabType[] = [
  {
    icon: mdiHandshake,
    name: "events",
    type: "events",
    href: "/events",
    selected: true,
  },
  {
    icon: <PiCoatHanger size={18} />,
    name: "garment",
    type: "garment",
    href: "/garment",
    selected: false,
    isComponent: true,
  },
];

export const ExplorePage = () => {
  const { setShowTabs, setTabs, tabs } = useCategoryTabs();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setShowTabs(true);

    const pathSegments = location.pathname.split("/").filter(Boolean);
    const selectedFromPath = pathSegments[1];

    const updatedTabs = initialTabs.map((tab) => ({
      ...tab,
      selected: tab.name === (selectedFromPath || "events"),
    }));

    setTabs(updatedTabs);

    if (pathSegments.length === 1 && pathSegments[0] === "explore") {
      navigate("/explore/events", { replace: true });
    }
  }, [location.pathname, setShowTabs, setTabs, navigate]);

  const selectedTab = tabs.find((tab) => tab.selected);

  useEffect(() => {
    if (selectedTab) {
      const pathSegments = location.pathname.split("/").filter(Boolean);

      let newPath = "";

      if (pathSegments.length === 1 && pathSegments[0] === "explore") {
        newPath = `/explore/${selectedTab.name}`;
      } else if (pathSegments.length >= 2 && pathSegments[0] === "explore") {
        pathSegments[pathSegments.length - 1] = selectedTab.name;
        newPath = `/${pathSegments.join("/")}`;
      } else {
        return;
      }

      if (location.pathname !== newPath) {
        navigate(newPath, { replace: true });
      }
    }
  }, [selectedTab, location.pathname, navigate]);

  return (
    <div className="h-full w-full">
      {selectedTab?.name === "events" && <EventsView />}
      {selectedTab?.name === "garment" && <GarmentsView />}
    </div>
  );
};
