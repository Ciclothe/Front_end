import { useTheme } from "@/context/ThemeContext";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { PostInfoOverlay } from "@/components/Common/Post/PostInfoOverlay";
import { Post } from "@/types";
interface UserHeaderProps {
  post: Post;
  widthPercentage?: string;
}
const getAspectRatio = (orientation: string) => {
  if (orientation === "vertical") return "aspect-[4/5]";
  if (orientation === "horizontal") return "aspect-[6/5]";
  return "aspect-[1/1]";
};

export const PostImageCarousel: React.FC<UserHeaderProps> = ({
  post,
  widthPercentage,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { themeMode } = useTheme();
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (post?.postType === "swap") {
      setLength(post?.postData?.images?.length || 0);
    } else {
      setLength(post?.newPostsData?.length || 0);
    }
  }, [post]);

  const nextSlide = useCallback(() => {
    if (length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
  }, [length]);

  const prevSlide = useCallback(() => {
    if (length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? length - 1 : prevIndex - 1
    );
  }, [length]);

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

    let decimal;
    if (widthPercentage) {
      decimal = parseFloat(widthPercentage.replace("%", "")) / 100;
    }

    let baseWidthPercentage;
    if (windowWidth <= 768) {
      baseWidthPercentage =
        decimal !== undefined ? decimal : post?.postType === "swap" ? 0.9 : 0.6;
    } else {
      baseWidthPercentage =
        decimal !== undefined ? decimal : post?.postType === "swap" ? 0.7 : 0.4;
    }

    const imageWidth = containerWidth * baseWidthPercentage + 15;

    return -(currentIndex * imageWidth);
  };

  return (
    <div className="relative w-full overflow-hidden" ref={containerRef}>
      <div
        className="flex transition-transform duration-500 ease-in-out gap-4"
        style={{
          transform: `translateX(${getTranslateX()}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {post?.postType === "swap" && post?.postData?.images?.length
          ? post.postData.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Post Image ${index + 1}`}
                className={`${
                  widthPercentage ? widthPercentage : "w-[90%] md:w-[70%]"
                } shrink-0 object-cover rounded-2xl ${getAspectRatio(
                  post?.postData?.imagesOrientation ?? ""
                )}`}
              />
            ))
          : post?.newPostsData?.map((newPost, index) => (
              <div key={index} className="w-[60%] md:w-[40%] shrink-0 relative">
                <img
                  src={newPost?.mainImages?.url}
                  alt={`Post Image ${index + 1}`}
                  className={`w-full h-full object-cover rounded-xl ${getAspectRatio(
                    newPost?.imagesOrientation ?? ""
                  )}`}
                />
                <PostInfoOverlay
                  condition={newPost?.condition}
                  title={newPost?.title}
                  color={newPost?.color}
                  size={newPost?.size}
                  brand={newPost?.brand}
                />
              </div>
            ))}
      </div>

      {/* Arrows */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className={`${
          themeMode === "light"
            ? "bg-white/20 hover:bg-[#F7F7F7]"
            : "bg-black/20 hover:bg-[#121212]"
        } absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 cursor-pointer`}
      >
        <Icon path={mdiChevronLeft} size={1} />
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
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
