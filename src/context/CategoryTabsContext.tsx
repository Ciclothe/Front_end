// src/context/CategoryTabsContext.tsx
import { createContext, useContext, useState } from "react";

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
