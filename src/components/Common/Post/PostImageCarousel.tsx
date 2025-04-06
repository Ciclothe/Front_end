import { useTheme } from "@/context/ThemeContext";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useRef, useState, useCallback } from "react";

type Image = {
  id: number;
  url: string;
};

const getAspectRatio = (orientation: string) => {
  if (orientation === "vertical") return "aspect-[4/5]";
  if (orientation === "horizontal") return "aspect-[6/5]";
  return "aspect-[1/1]";
};

export const PostImageCarousel = ({
  images,
  orientation,
}: {
  images: Image[];
  orientation: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { themeMode } = useTheme();

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }
    if (touchEndX.current - touchStartX.current > 50) {
      prevSlide();
    }
  };

  const getTranslateX = () => {
    if (!containerRef.current) return 0;
    const containerWidth = containerRef.current.offsetWidth;
    const imageWidth =
      windowWidth <= 768
        ? containerWidth * 0.9 + 15
        : containerWidth * 0.7 + 15;
    return -(currentIndex * imageWidth);
  };

  return (
    <div className="relative w-full overflow-hidden" ref={containerRef}>
      <div
        className="flex transition-transform duration-500 ease-in-out gap-4"
        style={{
          transform: `translateX(${getTranslateX()}px)`, // Use exact pixel value
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Post Image ${index + 1}`}
            className={`w-[90%] md:w-[70%] shrink-0 object-cover rounded-xl ${getAspectRatio(
              orientation
            )}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <div
        onClick={prevSlide}
        className={`${
          themeMode === "light"
            ? "bg-white/20 hover:bg-[#F7F7F7]"
            : "bg-black/20 hover:bg-[#121212]"
        } absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 cursor-pointer`}
      >
        <Icon path={mdiChevronLeft} size={1} />
      </div>
      <div
        onClick={nextSlide}
        className={`${
          themeMode === "light"
            ? "bg-white/20 hover:bg-[#F7F7F7]"
            : "bg-black/20 hover:bg-[#121212]"
        } absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 cursor-pointer`}
      >
        <Icon path={mdiChevronRight} size={1} />
      </div>
    </div>
  );
};
