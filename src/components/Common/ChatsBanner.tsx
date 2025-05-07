import { useEffect, useState } from "react";
import { ClickAwayListener } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";
import { IsotipoSad } from "../../../public/Logos/IsotipoSad";
import clsx from "clsx";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import { getRelativeTime } from "@/components/Utils/format";
import { useTranslation } from "react-i18next";
import { SearchBar } from "./SearchBar";
import { ChatConversation } from "./ChatConversation";
import { motion, AnimatePresence } from "framer-motion";

// TODO: Fetch notifications from the server
const chats = [
  {
    chatId: "1",
    currentUserId: "u002",
    participants: [
      {
        userId: "u001",
        username: "alice",
        profilePicture:
          "https://i.pinimg.com/736x/35/eb/1e/35eb1e3a11fc326749fa499d841f4102.jpg",
      },
      {
        userId: "u002",
        username: "bob",
        profilePicture:
          "https://i.pinimg.com/736x/e2/19/bb/e219bbe8452b44c2f2ed3de58aa575ed.jpg",
      },
    ],
    lastMessage: [
      {
        messageId: "m003",
        senderId: "u001",
        receiverId: "u002",
        content: "Todo bien, gracias. ¿Donde te queda bien para vernos?",
        timestamp: "2025-05-06T09:17:00Z",
        status: "delivered",
      },
    ],
  },
  {
    chatId: "2",
    currentUserId: "u002",
    participants: [
      {
        userId: "u003",
        username: "openSea",
        profilePicture:
          "https://i.pinimg.com/736x/38/c2/2a/38c22ae8df11bd86fc57824947ab4c62.jpg",
      },
      {
        userId: "u002",
        username: "bob",
        profilePicture:
          "https://i.pinimg.com/736x/e2/19/bb/e219bbe8452b44c2f2ed3de58aa575ed.jpg",
      },
    ],
    lastMessage: [
      {
        messageId: "m002",
        senderId: "u002",
        receiverId: "u003",
        content: "¡Hola openSea! Estoy bien, ¿y tú?",
        timestamp: "2025-05-05T09:16:00Z",
        status: "read",
      },
    ],
  },
  {
    chatId: "3",
    currentUserId: "u002",
    participants: [
      {
        userId: "u004",
        username: "akidcalle",
        profilePicture:
          "https://i.pinimg.com/736x/46/98/6a/46986aa20ef73f8be9ee952be9735daf.jpg",
      },
      {
        userId: "u002",
        username: "bob",
        profilePicture:
          "https://i.pinimg.com/736x/e2/19/bb/e219bbe8452b44c2f2ed3de58aa575ed.jpg",
      },
    ],
    lastMessage: [
      {
        messageId: "m001",
        senderId: "u004",
        receiverId: "u002",
        content: "Hermano, nos vemos en el corte inglés a las 5",
        timestamp: "2025-05-01T08:15:00Z",
        status: "read",
      },
    ],
  },
];

interface ChatsBannerProps {
  isOpen: (isOpen: boolean) => void;
}

export const ChatsBanner: React.FC<ChatsBannerProps> = ({ isOpen }) => {
  const { i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [chatToken, setChatToken] = useState<string | null>(null);

  const { themeMode } = useTheme();
  const backgroundClass =
    themeMode === "light"
      ? "bg-[#F7F7F7] text-black border-black/5"
      : "bg-[#121212] text-white border-white/1";
  const hoverBg =
    themeMode === "light" ? "hover:bg-[#EDEDED]" : "hover:bg-[#222423]";
  const shadowStyle = {
    boxShadow:
      themeMode === "light"
        ? "-5px 5px 20px rgba(0,0,0,0.1)"
        : "-5px 5px 20px rgba(255,255,255,0.08)",
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
  }, [isOpen]);

  const filteredChats = chats.filter((chat) => {
    const otherUser = chat.participants.find(
      (p) => p.userId !== chat.currentUserId
    );
    return otherUser?.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <ClickAwayListener
      onClickAway={() => {
        isOpen(false);
        document.body.style.overflow = "";
      }}
    >
      <div className="fixed md:absolute z-100 h-screen w-full md:w-fit md:py-8 md:pl-4 md:left-full top-0">
        <div
          className={clsx(
            "h-full w-full flex border overflow-hidden",
            backgroundClass,
            "md:rounded-2xl"
          )}
          style={shadowStyle}
        >
          <div
            className={`${
              themeMode === "light" ? "border-black/5" : "border-white/5"
            } flex flex-col items-center justify-start w-full md:w-[35vw] xl:w-[25vw] h-full overflow-y-auto border-r`}
          >
            <div
              className={clsx(
                themeMode === "light" ? "border-black/5" : "border-white/5",
                "border-b md:flex items-center h-fit gap-4 p-2 md:p-4 bg-inherit sticky top-0 z-10 w-full"
              )}
            >
              <div className="flex items-center w-full gap-4">
                <div
                  className={`${
                    themeMode === "light" ? "bg-[#EDEDED]" : "bg-[#222423]"
                  } p-1 rounded-full cursor-pointer h-fit w-fit z-20 md:hidden`}
                  onClick={() => {
                    isOpen(false);
                    document.body.style.overflow = "";
                  }}
                >
                  <Icon path={mdiClose} size={1} />
                </div>
                <div className="text-start flex flex-col gap-4 w-full">
                  <p className="text-[1.4em] font-semibold truncate">
                    Mensajes
                  </p>
                  <div className="w-full hidden md:block">
                    <SearchBar
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full mt-4 md:hidden">
                <SearchBar
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {filteredChats.length > 0 ? (
              <div className="w-full overflow-y-auto">
                {filteredChats.map((chat, index) => {
                  const otherUser = chat.participants.find(
                    (p) => p.userId !== chat.currentUserId
                  );
                  const lastMessage = chat.lastMessage[0];
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setChatToken(chat.chatId);
                      }}
                      className={`${
                        chatToken === chat.chatId
                          ? themeMode === "light"
                            ? "bg-[#F7F7F7]"
                            : "bg-[#222423]"
                          : ""
                      } flex cursor-pointer items-center gap-4 p-4 transition ${hoverBg} justify-between`}
                    >
                      <div className="flex items-center gap-4 w-full overflow-hidden">
                        <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden">
                          <img
                            src={otherUser?.profilePicture}
                            className="w-full h-full object-cover"
                            alt={otherUser?.username}
                          />
                        </div>
                        <div className="flex-1 overflow-hidden text-start">
                          <p className="font-semibold">
                            @{otherUser?.username}
                          </p>
                          <p className="truncate">
                            {lastMessage?.senderId === chat.currentUserId
                              ? `Tú: ${lastMessage.content}`
                              : lastMessage.content}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {lastMessage?.status !== "read" &&
                          lastMessage?.senderId !== chat.currentUserId && (
                            <div className="w-2 h-2 bg-[#0dbc73] rounded-full"></div>
                          )}
                        <span className="text-xs opacity-50 text-nowrap">
                          {getRelativeTime(
                            lastMessage?.timestamp,
                            i18n.language
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4 w-80">
                <IsotipoSad
                  color={themeMode === "light" ? "#ededed" : "#323332"}
                  height="8em"
                />
                <p className="text-center text-[1.2em] font-semibold py-4">
                  Todavía no tienes ninguna conversacion
                </p>
              </div>
            )}
          </div>
          <AnimatePresence mode="wait">
            {chatToken && (
              <motion.div
                key={chatToken}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute top-0 left-0 z-10 md:relative w-full md:w-[40vw] xl:w-[50vw] h-full"
              >
                <ChatConversation
                  chatToken={chatToken}
                  closeChat={() => setChatToken(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ClickAwayListener>
  );
};
