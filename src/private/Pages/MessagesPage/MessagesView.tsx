import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { IsotipoSad } from "../../../../public/Logos/IsotipoSad";
import clsx from "clsx";
import { getRelativeTime } from "@/components/Utils/format";
import { useTranslation } from "react-i18next";
import { SearchBar } from "@/components/Common/SearchBar";
import { ChatConversation } from "./Components/ChatConversation";
import { useNavigate, useParams } from "react-router-dom";

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

export const MessagesView = () => {
  const { i18n, t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { chatId } = useParams();

  const { themeMode } = useTheme();
  const backgroundClass =
    themeMode === "light"
      ? "bg-[#F7F7F7] text-black border-black/5"
      : "bg-[#121212] text-white border-white/1";
  const hoverBg =
    themeMode === "light" ? "hover:bg-[#EDEDED]" : "hover:bg-[#222423]";

  const filteredChats = chats.filter((chat) => {
    const otherUser = chat.participants.find(
      (p) => p.userId !== chat.currentUserId
    );
    return otherUser?.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className={clsx("relative h-full w-full flex", backgroundClass)}>
      <div
        className={`flex px-4 flex-col md:px-0 items-center justify-start w-full md:w-[25em] lg:w-[30vw] h-full shadow-sm md:sticky top-0 md:z-1`}
      >
        <div className="md:flex items-center h-fit gap-4 md:p-4 bg-inherit sticky top-0 z-10 w-full shadow-xs md:shadow-none">
          <div className="flex items-center w-full gap-4 py-4 md:py-0">
            <div className="text-start flex flex-col gap-4 w-full">
              <p className="text-[1.4em] font-semibold truncate">
                {t("mainLayout.messages")}
              </p>
              <div className="w-full hidden md:block">
                <SearchBar
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:hidden">
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
                    navigate(`/messages/${chat.chatId}`);
                  }}
                  className={`${
                    chatId === chat.chatId
                      ? themeMode === "light"
                        ? "bg-[#EDEDED]"
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
                      <p className="font-semibold">@{otherUser?.username}</p>
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
                      {getRelativeTime(lastMessage?.timestamp, i18n.language)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-4 w-full md:w-[30vw]">
            <IsotipoSad
              color={themeMode === "light" ? "#ededed" : "#323332"}
              height="8em"
            />
            <p className="text-center text-[1.2em] font-semibold py-4">
              {t("mainLayout.no_conversations_yet")}
            </p>
          </div>
        )}
      </div>
      {/* Chat conversation */}
      {chatId && (
        <ChatConversation
          key={chatId}
          chatToken={chatId}
          closeChat={() => navigate("/messages")}
        />
      )}
    </div>
  );
};
