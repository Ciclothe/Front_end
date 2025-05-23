import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

type TabsType = {
  setSelectedTab: (tab: string) => void;
};

export const Tabs = ({ setSelectedTab }: TabsType) => {
  const { themeMode } = useTheme();
  const [selectedTab, setSelectedTabLocal] = useState("created");

  return (
    <div
      className={`${
        themeMode === "light" ? "border-black/10" : "border-white/10"
      } w-full md:w-[70%] overflow-x-auto border-t mt-4 scrollbar-none`}
    >
      <div className="flex min-w-max whitespace-nowrap">
        {[
          { label: "Created events", value: "created" },
          { label: "Joined events", value: "joined" },
          { label: "Swaps", value: "swaps" },
          { label: "Closet", value: "closet" },
          { label: "Wishlist", value: "wishlist" },
        ].map((tab) => (
          <div
            key={tab.value}
            onClick={() => {
              setSelectedTabLocal(tab.value);
              setSelectedTab(tab.value);
            }}
            className={`relative w-full text-center py-3 px-4 cursor-pointer font-semibold
            ${
              selectedTab === tab.value
                ? `${themeMode === "light" ? "text-black" : "text-white"}`
                : `${
                    themeMode === "light"
                      ? "text-black/40 hover:text-black"
                      : "text-white/40 hover:text-white"
                  }`
            }`}
          >
            {tab.label}
            {selectedTab === tab.value && (
              <div className="absolute top-0 left-0 w-full border-t border-4 bg-[#121212] dark:bg-[#F7F7F7] transition-all duration-300 ease-in-out" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
