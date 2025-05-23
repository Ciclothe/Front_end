// src/context/CategoryTabsContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { PiCoatHanger, PiSwapFill } from "react-icons/pi";
import { mdiCards, mdiHandshake } from "@mdi/js";
import { useLocation } from "react-router-dom";

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

type CategoryTabsContextType = {
  showTabs: boolean;
  setShowTabs: (value: boolean) => void;
  tabs: TabType[];
  setTabs: (tabs: TabType[]) => void;
};

const CategoryTabsContext = createContext<CategoryTabsContextType | undefined>(
  undefined
);

export const CategoryTabsProvider = ({
  children,
  initialTabs = [],
}: {
  children: React.ReactNode;
  initialTabs?: TabType[];
}) => {
  const [showTabs, setShowTabs] = useState(false);
  const [tabs, setTabs] = useState<TabType[]>(initialTabs);
  const location = useLocation();

  useEffect(() => {
    console.log(
      "Location changed------------------------------------:",
      location.pathname
    );
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const base = pathSegments[0];
    const sub = pathSegments[1] ?? "";

    let newTabs: TabType[] = [];

    if (base === "explore") {
      newTabs = [
        {
          icon: mdiHandshake,
          name: "events",
          type: "events",
          href: "/explore/events",
          selected: sub === "events",
        },
        {
          icon: <PiCoatHanger size={18} />,
          name: "garment",
          type: "garment",
          href: "/explore/garment",
          selected: sub === "garment",
          isComponent: true,
        },
      ];

      setShowTabs(true);
    } else if (base === "feed") {
      newTabs = [
        {
          icon: mdiCards,
          name: "all",
          type: "all",
          href: "/feed",
          selected: sub === "",
        },
        {
          icon: <PiSwapFill size={18} />,
          name: "swaps",
          type: "swap",
          href: "/feed/swaps",
          selected: sub === "swaps",
          isComponent: true,
        },
        {
          icon: mdiHandshake,
          name: "events",
          type: "event",
          href: "/feed/events",
          selected: sub === "events",
        },
      ];

      setShowTabs(true);
    } else if (base === "activities") {
      newTabs = [
        {
          icon: mdiHandshake,
          name: "created_events",
          type: "created",
          href: "/activities/createdEvents",
          selected: sub === "createdEvents",
        },
        {
          icon: mdiHandshake,
          name: "joined_events",
          type: "joined",
          href: "/activities/joinedEvents",
          selected: sub === "joinedEvents",
        },
        {
          icon: <PiSwapFill size={18} />,
          name: "swaps",
          type: "swap",
          href: "/activities/swaps",
          selected: sub === "swaps",
          isComponent: true,
        },
      ];

      setShowTabs(true);
    } else {
      console.log("No se encontraron tabs para esta ruta");
      setShowTabs(false);
    }

    setTabs(newTabs);
  }, [location.pathname]);

  return (
    <CategoryTabsContext.Provider
      value={{ showTabs, setShowTabs, tabs, setTabs }}
    >
      {children}
    </CategoryTabsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCategoryTabs = () => {
  const context = useContext(CategoryTabsContext);
  if (!context) {
    throw new Error(
      "useCategoryTabs debe usarse dentro de un CategoryTabsProvider"
    );
  }
  return context;
};
