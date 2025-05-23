import { useEffect, useState } from "react";
import { Categories } from "../Components/Categories";
import { ProductSection } from "../Components/ProductSection";
import { useTheme } from "@/context/ThemeContext";
import { useNavigate, useParams } from "react-router-dom";

export const GarmentsView = () => {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { themeMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
  }, [category]);

  const handleSelectCategory = (cat: string | null) => {
    setSelectedCategory(cat);
    navigate(cat ? `/explore/garment/${cat}` : "/explore/garment");
  };

  return (
    <div className="text-start flex flex-col">
      <div
        className={`${
          themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#121212]"
        } gap-4 flex flex-col pb-4 w-full`}
      >
        <p className="text-[1.2em] font-bold">Categories</p>
        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      </div>

      <p className="text-[1.2em] font-bold pb-2 w-full">Discover Your Style</p>
      <ProductSection selectedCategory={selectedCategory} />
    </div>
  );
};
