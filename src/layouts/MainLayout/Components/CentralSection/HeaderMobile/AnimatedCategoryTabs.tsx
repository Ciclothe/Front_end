import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CategoryTabs } from "@/components/Common/CategoryTabs";
import { useTheme } from "@/context/ThemeContext";

export const AnimatedCategoryTabs = () => {
  const { themeMode } = useTheme();
  const [showFloatingTabs, setShowFloatingTabs] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setAtTop(true);
        setShowFloatingTabs(false);
      } else {
        setAtTop(false);
        setShowFloatingTabs(currentScrollY < lastScrollY);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="left-0 col-span-12 md:hidden relative w-full">
      <AnimatePresence>
        {!atTop && showFloatingTabs && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 py-2 z-50 ${
              themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#121212]"
            }`}
          >
            <CategoryTabs />
          </motion.div>
        )}
      </AnimatePresence>

      {atTop && <CategoryTabs />}
    </div>
  );
};
