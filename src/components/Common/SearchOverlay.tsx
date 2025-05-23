import { useEffect, useRef, useState } from "react";
import { SearchBar } from "./SearchBar";
import { mdiHandshake } from "@mdi/js";
import { PiCoatHanger } from "react-icons/pi";
import { BsPersonFill } from "react-icons/bs";
import Icon from "@mdi/react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const mockSearchData = [
  // 🟡 Events
  {
    id: 1,
    type: "event",
    title: "Retro Revival Night: Fashion & Music",
    token: "Wz3Yv9qP0XtLhN2BfK7dSaGeUMRpQ4wZ",
  },
  {
    id: 2,
    type: "event",
    title: "Eco Swap Festival",
    token: "a9X3vB1cD4pE5sQ7mN8wZ6yT2kR0uLf",
  },
  {
    id: 3,
    type: "event",
    title: "Circular Fashion Meetup",
    token: "4NpCAq2Yu0gTFMtLZB7dKX9RxvPJsehW",
  },
  {
    id: 4,
    type: "event",
    title: "Retro Die Night: Fashion & Music",
    token: "Xy7Zq8wP0XtLhN2BfK7dSaGeUMRpQ4wZ",
  },

  // 👗 Garments
  {
    id: 5,
    type: "garment",
    title: "Vintage Leather Jacket",
    token: "U0g3i4HsPz7Wq9Lk6AbYMdNX1R",
  },
  {
    id: 6,
    type: "garment",
    title: "Floral Summer Dress",
    token: "F2k9LsWc0YuJqVzM7AbXEaTd6P",
  },
  {
    id: 7,
    type: "garment",
    title: "Pantalon",
    token: "JmN3aXp0VkR2oLsYz1TwC8HfBQ",
  },
  {
    id: 8,
    type: "garment",
    title: "Gris",
    token: "Tz0RpLkXc2VmN8JWaEfYu13sQb",
  },
  {
    id: 9,
    type: "garment",
    title: "Nike",
    token: "L7k0PaErWcXTfYuQ9mVBJn38HR",
  },
  {
    id: 10,
    type: "garment",
    title: "Pantalon Gris oscuro",
    token: "RkM1ZaTfLp0YWcVN8uJo9X73BA",
  },

  // 🧑 People
  {
    id: 11,
    type: "people",
    userName: "thomasillo",
    profilePicture:
      "https://i.pinimg.com/736x/3f/4f/e9/3f4fe92639ea9d5980ef1760212e7b86.jpg",
    token: "P01uThomRNDxK5qXUb72",
  },
  {
    id: 12,
    type: "people",
    userName: "bombardiniCocodrili",
    profilePicture:
      "https://i.pinimg.com/736x/08/44/5b/08445b767b03d6d0646958556d22ed46.jpg",
    token: "P02uBomb8qLsVYZWx3Jr",
  },
  {
    id: 13,
    type: "people",
    userName: "tungTungTungSahur",
    profilePicture:
      "https://i.pinimg.com/736x/ba/5f/55/ba5f55cbc9f8b113c58bb5823abc5073.jpg",
    token: "P03uTungYaNX9v5kCjQm",
  },
  {
    id: 14,
    type: "people",
    userName: "tralaleroTralala",
    profilePicture:
      "https://i.pinimg.com/736x/d7/07/81/d707817f3e0730e2443b95997426860a.jpg",
    token: "P04uTralEZk1v7pMXCWt",
  },
  {
    id: 15,
    type: "people",
    userName: "chippy_chippy",
    profilePicture: "https://instagram.fvlc2-1.fna.fbcdn.net/...",
    token: "P05uChipYzWqX3aJK0Rd",
  },
];

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

export const SearchOverlay = ({ onClose }: { onClose: () => void }) => {
  const categoryTabs: TabType[] = [
    {
      icon: <PiCoatHanger size={18} />,
      name: "garment",
      type: "garment",
      href: "/garment",
      selected: true,
      isComponent: true,
    },
    {
      icon: mdiHandshake,
      name: "events",
      type: "event",
      href: "/events",
      selected: false,
    },
  ];

  const { t } = useTranslation();
  const { themeMode } = useTheme();
  const [tabs, setTabs] = useState(categoryTabs);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useAuth();

  if (currentUser) {
    categoryTabs.push({
      icon: <BsPersonFill size={18} />,
      name: "people",
      type: "people",
      href: "/people",
      selected: false,
      isComponent: true,
    });
  }

  const [filteredData, setFilteredData] = useState(
    mockSearchData.filter((item) => item.type === "garment")
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleTabClick = (name: string) => {
    setTabs((prev) =>
      prev.map((tab) => ({
        ...tab,
        selected: tab.name === name,
      }))
    );
  };

  const getTabClass = (tab: TabType) => {
    const isSelected = tab.selected;
    const isLight = themeMode === "light";

    if (isSelected) {
      return "bg-[rgba(13,188,115,0.1)] text-[#0DBC73]";
    }

    return isLight
      ? "bg-white text-black hover:bg-[rgba(13,188,115,0.1)] hover:text-[#0DBC73]"
      : "bg-[#222423] text-white hover:bg-[rgba(13,188,115,0.1)] hover:text-[#0DBC73]";
  };

  useEffect(() => {
    const selectedTab = tabs.find((tab) => tab.selected);
    const selectedType = selectedTab?.type;

    if (searchText.trim() === "") {
      setFilteredData([]);
      return;
    }

    const filtered = mockSearchData.filter(
      (item) =>
        item.type === selectedType &&
        (item.title?.toLowerCase().startsWith(searchText.toLowerCase()) ||
          item.userName?.toLowerCase().startsWith(searchText.toLowerCase()))
    );

    setFilteredData(filtered);
  }, [searchText, tabs]);

  const highlightMatch = (text: string, query: string) => {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const startIndex = lowerText.indexOf(lowerQuery);

    if (startIndex === -1 || query.trim() === "") {
      return <span className="font-bold opacity-100">{text}</span>;
    }

    const before = text.slice(0, startIndex);
    const match = text.slice(startIndex, startIndex + query.length);
    const after = text.slice(startIndex + query.length);

    return (
      <>
        <span className="font-bold opacity-100">{before}</span>
        <span className="font-medium opacity-50">{match}</span>
        <span className="font-bold opacity-100">{after}</span>
      </>
    );
  };

  const handleItemClick = (item: {
    id: number;
    type: string;
    title?: string;
    userName?: string;
    profilePicture?: string;
    token: string;
  }) => {
    if (item.type === "garment") {
      navigate(
        `/explore/garment?search_text=${encodeURIComponent(
          item.title ?? ""
        )}&time=${Date.now()}`
      );
    } else if (item.type === "event") {
      navigate(`/explore/events/${item.token}/details`);
    }

    onClose();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
      onClick={() => {
        document.body.style.overflow = "";
        onClose();
      }}
    >
      <div
        className={`${
          themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#121212]"
        } absolute top-0 h-full md:h-auto w-full md:w-auto md:left-[7.55em] md:right-[5.35em] md:rounded-b-3xl shadow-xl z-50 overflow-hidden`}
        onClick={(e) => {
          document.body.style.overflow = "";
          e.stopPropagation();
        }}
      >
        <div className="h-full flex flex-col">
          {/* Header con barra de búsqueda y tabs */}
          <div
            className={`${
              themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#121212]"
            } sticky top-0 z-10`}
          >
            <div className="px-4 md:px-10 flex flex-col">
              <div className="py-4 flex items-center w-full gap-2">
                <SearchBar
                  ShowLocation={false}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  ref={inputRef}
                />
                <p
                  className="font-semibold md:hidden px-4 py-2 cursor-pointer"
                  onClick={onClose}
                >
                  {t("mainLayout.cancel")}
                </p>
              </div>
              <div className="flex gap-4 w-full overflow-x-auto scrollbar-none">
                {tabs.map((tab) => (
                  <div
                    key={tab.name}
                    onClick={() => handleTabClick(tab.name)}
                    className={`px-5 rounded-xl backdrop-blur-xs flex items-center gap-2 font-bold cursor-pointer ${getTabClass(
                      tab
                    )}`}
                    role="tab"
                    aria-selected={tab.selected}
                  >
                    {"isComponent" in tab ? (
                      tab.icon
                    ) : (
                      <Icon path={tab.icon} size={0.8} />
                    )}
                    <p className="py-2">{t(`mainLayout.${tab.name}`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contenido scrollable */}
          <div className="flex-1 overflow-y-auto mt-4 md:mt-6 px-4">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className={`md:px-10 ${
                  themeMode === "light"
                    ? "hover:bg-[#EDEDED]"
                    : "hover:bg-[#222423]"
                } px-2 py-4 md:p-4 flex items-center justify-between transition cursor-pointer text-[1.1em]`}
                onClick={() => handleItemClick(item)}
              >
                {item.type === "event" && (
                  <p className="font-semibold">
                    {highlightMatch(item.title ?? "", searchText)}
                  </p>
                )}
                {item.type === "garment" && (
                  <p className="font-semibold">
                    {highlightMatch(item.title ?? "", searchText)}
                  </p>
                )}
                {item.type === "people" && (
                  <div className="flex items-center gap-2">
                    <Avatar
                      alt={item.userName}
                      src={item.profilePicture}
                      sx={{ width: 35, height: 35 }}
                      className="object-cover"
                    />
                    <p className="text-lg font-semibold">
                      @{highlightMatch(item.userName ?? "", searchText)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
