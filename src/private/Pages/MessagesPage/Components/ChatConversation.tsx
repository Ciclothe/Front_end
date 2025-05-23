import { useTheme } from "@/context/ThemeContext";
import Icon from "@mdi/react";
import {
  mdiArrowLeft,
  mdiMapMarkerOutline,
  mdiImageOutline,
  mdiClose,
} from "@mdi/js";
import { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { SendLocation } from "../../../../components/Common/SendLocation";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Message = {
  messageId: string;
  senderId: string;
  receiverId: string;
  content: {
    type: "text" | "pic" | "location";
    text?: string;
    url?: string;
    name?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  timestamp: string;
  status: "read" | "delivered";
};

//TODO: Fetch chats from the server
const chats: {
  token: string;
  currentUserId: string;
  participants: {
    userId: string;
    username: string;
    profilePicture: string;
  }[];
  messages: Message[];
}[] = [
  {
    token: "1",
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
        username: "lucas_dev",
        profilePicture:
          "https://i.pinimg.com/736x/e2/19/bb/e219bbe8452b44c2f2ed3de58aa575ed.jpg",
      },
    ],
    messages: [
      {
        messageId: "m001",
        senderId: "u001",
        receiverId: "u002",
        content: {
          type: "text",
          text: "Hola, vi que aceptaste el intercambio. ¿Sigue en pie?",
        },
        timestamp: "2025-05-06T08:10:00Z",
        status: "read",
      },
      {
        messageId: "m002",
        senderId: "u002",
        receiverId: "u001",
        content: {
          type: "text",
          text: "Sí, claro. Solo quiero asegurarme de que realmente tengas el hoodie en buen estado.",
        },
        timestamp: "2025-05-06T08:12:00Z",
        status: "read",
      },
      {
        messageId: "m003",
        senderId: "u001",
        receiverId: "u002",
        content: {
          type: "text",
          text: "Lo tengo, y está prácticamente nuevo. Te puedo enviar una foto si quieres.",
        },
        timestamp: "2025-05-06T08:15:00Z",
        status: "read",
      },
      {
        messageId: "m004",
        senderId: "u002",
        receiverId: "u001",
        content: {
          type: "text",
          text: "Vale, me daría más tranquilidad. He tenido malas experiencias antes.",
        },
        timestamp: "2025-05-06T08:18:00Z",
        status: "read",
      },
      {
        messageId: "m005",
        senderId: "u001",
        receiverId: "u002",
        content: {
          type: "text",
          text: "Entiendo. Aquí te va una foto 📸",
        },
        timestamp: "2025-05-06T08:20:00Z",
        status: "read",
      },
      {
        messageId: "m006",
        senderId: "u001",
        receiverId: "u002",
        content: {
          type: "pic",
          url: "https://images1.vinted.net/t/04_022d2_wc4NuuJbrqgxfhJBFbfHhdVH/f800/1746270785.jpeg?s=3b7c18daefa3a32235a309372c1b44d181a9bd6e",
        },
        timestamp: "2025-05-06T08:40:00Z",
        status: "read",
      },
      {
        messageId: "m007",
        senderId: "u002",
        receiverId: "u001",
        content: {
          type: "text",
          text: "Se ve genial. Gracias por tomarte el tiempo.",
        },
        timestamp: "2025-05-06T09:02:00Z",
        status: "read",
      },
      {
        messageId: "m008",
        senderId: "u002",
        receiverId: "u001",
        content: {
          type: "text",
          text: "¿Dónde podríamos vernos en Valencia?",
        },
        timestamp: "2025-05-06T09:03:00Z",
        status: "read",
      },
      {
        messageId: "m009",
        senderId: "u001",
        receiverId: "u002",
        content: {
          type: "text",
          text: "¿Te viene bien en la estación de Colón? Hay bastante gente, así es más seguro.",
        },
        timestamp: "2025-05-06T09:15:00Z",
        status: "read",
      },
      {
        messageId: "m010",
        senderId: "u001",
        receiverId: "u002",
        content: {
          type: "location",
          name: "estacion colon",
          coordinates: {
            lat: 39.4701462,
            lng: -0.3735027,
          },
        },
        timestamp: "2025-05-06T09:15:00Z",
        status: "read",
      },
      {
        messageId: "m011",
        senderId: "u002",
        receiverId: "u001",
        content: {
          type: "text",
          text: "Sí, Colón me queda bien. ¿Sobre las 18:30?",
        },
        timestamp: "2025-05-06T09:40:00Z",
        status: "read",
      },
      {
        messageId: "m012",
        senderId: "u001",
        receiverId: "u002",
        content: {
          type: "text",
          text: "Perfecto, nos vemos en Colón a las 18:30 entonces :)",
        },
        timestamp: "2025-05-06T09:45:00Z",
        status: "delivered",
      },
    ],
  },
  {
    token: "R7LX92DBVQMTYA3KJZNEUCW4",
    currentUserId: "u002",
    participants: [
      {
        userId: "u001",
        username: "poseidon",
        profilePicture:
          "https://i.pinimg.com/736x/6a/3b/01/6a3b01b467a751122986da4cb9764033.jpg",
      },
      {
        userId: "u002",
        username: "lucas_dev",
        profilePicture:
          "https://i.pinimg.com/736x/e2/19/bb/e219bbe8452b44c2f2ed3de58aa575ed.jpg",
      },
    ],
    messages: [],
  },
];

type ChatConversationProps = {
  chatToken: string;
  closeChat: () => void;
};

export const ChatConversation = ({
  chatToken,
  closeChat,
}: ChatConversationProps) => {
  const { themeMode } = useTheme();
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [showSelectLocation, setShowSelectLocation] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const chatData = chats.find((chat) => chat.token === chatToken);

  useEffect(() => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [chatData, chatData?.messages]);

  if (!chatData) {
    return (
      <div
        className={`${
          themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#121212]"
        } absolute md:relative left-0 z-10 w-full h-full`}
      >
        <div className={`flex items-center gap-3 p-4`}>
          <button
            className={`${
              themeMode === "light" ? "bg-[#EDEDED]" : "bg-[#222423]"
            } p-2 rounded-full`}
            onClick={() => closeChat()}
          >
            <Icon path={mdiArrowLeft} size={0.8} />
          </button>
        </div>
        <div className="h-full flex justify-center items-center">
          {t("mainLayout.chat_not_found")}
        </div>
      </div>
    );
  }

  const otherParticipant = chatData.participants.find(
    (p) => p.userId !== chatData.currentUserId
  );

  const handleSend = () => {
    if (newMessage.trim()) {
      alert(`Mensaje enviado: ${newMessage}`);
      setNewMessage("");
    }

    if (image) {
      alert(`Imagen enviada: ${image.name}`);
      setImage(null);
      setImagePreview(null);
    }

    if (location) {
      alert(`Ubicación enviada: ${location}`);
      setLocation(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const renderMessageContent = (msg: Message) => {
    if (typeof msg.content === "object" && msg.content.type === "location") {
      const { lat, lng } = msg.content.coordinates || {};
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

      const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCTbsWXB6D6bDewIo5CrjKqReOY61KBDq0&q=${encodeURIComponent(
        msg.content.name || "Unknown Location"
      )}&center=${lat},${lng}&zoom=15`;

      return (
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
          <iframe
            src={embedUrl}
            width="250"
            height="150"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </a>
      );
    }

    if (typeof msg.content === "object" && msg.content.type === "pic") {
      return (
        <img
          src={msg.content.url}
          alt="Imagen enviada"
          className="max-w-xs aspect-[1/1] rounded-xl"
        />
      );
    }

    return <span>{msg.content.text}</span>;
  };

  return (
    <>
      <div
        className={`${
          themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#121212]"
        } absolute md:relative w-full h-full flex flex-col z-10`}
      >
        {/* Header */}
        <div
          className={`${
            themeMode === "light" ? "border-black/3" : "border-white/3"
          } border-b flex items-center gap-3 p-4`}
        >
          <button
            className={`${
              themeMode === "light" ? "bg-[#EDEDED]" : "bg-[#222423]"
            } p-2 rounded-full`}
            onClick={() => closeChat()}
          >
            <Icon path={mdiArrowLeft} size={0.8} />
          </button>

          {otherParticipant && (
            <div className="flex items-center gap-3 w-full justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={otherParticipant.profilePicture}
                  alt={otherParticipant.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-semibold">
                  @{otherParticipant.username}
                </span>
              </div>
              <div
                className={`${
                  themeMode === "light"
                    ? "hover:text-white"
                    : "hover:text-black"
                } px-5 py-3 rounded-xl flex items-center font-bold cursor-pointer bg-[rgba(13,188,115,0.1)] hover:bg-[#0DBC73] text-[#0DBC73] transition`}
                onClick={() => {
                  navigate(`/profile/${otherParticipant.username}`);
                }}
              >
                {t("mainLayout.view_profile")}
              </div>
            </div>
          )}
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="px-4 py-2 text-[#0DBC73] bg-[rgba(13,188,115,0.1)] w-fit mx-auto my-4 rounded-full">
            🔐{t("mainLayout.private_chat_warning")}
          </div>
          {chatData.messages?.map((msg) => {
            const isMine = msg.senderId === chatData.currentUserId;
            const time = new Date(msg.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={msg.messageId}
                className={`flex flex-col ${
                  isMine ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-sm overflow-hidden text-start 
                  ${
                    msg?.content?.type === "location" ||
                    msg?.content?.type === "pic"
                      ? ""
                      : "px-4 py-2"
                  } 
                  ${
                    isMine
                      ? `bg-[#0dbc73] ${
                          themeMode === "light" ? "text-white" : "text-black"
                        } rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl rounded-br-none`
                      : `${
                          themeMode === "light"
                            ? "bg-[#EDEDED] text-black"
                            : "bg-[#222423] text-white"
                        } rounded-tr-2xl rounded-br-2xl rounded-tl-2xl rounded-bl-none`
                  }`}
                >
                  {renderMessageContent(msg)}
                </div>

                <span className="text-xs text-gray-400 mt-1">{time}</span>
              </div>
            );
          })}
          {/* Scroll to the end */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input section */}
        <div
          className={`${
            themeMode === "light" ? "border-black/3" : "border-white/3"
          } p-4 flex items-center gap-2 relative border-t`}
        >
          {/* Image Preview */}
          {imagePreview && (
            <div className="absolute bottom-full">
              <div className="relative w-20 md:w-30 h-20 md:h-30 mb-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-xl border"
                />
                <button
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full"
                >
                  <Icon path={mdiClose} size={0.8} />
                </button>
              </div>
            </div>
          )}

          {/* Botón para enviar ubicación */}
          <button
            onClick={() => setShowSelectLocation(true)}
            className={`${
              themeMode === "light"
                ? "hover:bg-[#EDEDED]"
                : "hover:bg-[#222423]"
            } p-2 rounded-full`}
          >
            <Icon path={mdiMapMarkerOutline} size={1} />
          </button>

          {/* Botón para enviar imagen */}
          <input
            type="file"
            id="image-upload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <button
            onClick={() => document.getElementById("image-upload")?.click()}
            className={`${
              themeMode === "light"
                ? "hover:bg-[#EDEDED]"
                : "hover:bg-[#222423]"
            } p-2 rounded-full`}
          >
            <Icon path={mdiImageOutline} size={1} />
          </button>

          {/* Input Text */}
          <div className="relative w-full">
            <input
              type="text"
              id="message"
              className={`text-[16px] ${
                themeMode === "light" ? "bg-[#EDEDED]" : "bg-[#222423]"
              } peer px-2 py-3 w-full rounded-xl`}
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              placeholder=" "
            />
            {!newMessage && (
              <label
                htmlFor="message"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 
                             text-gray-200 max-w-full overflow-hidden text-ellipsis whitespace-nowrap
                             peer-placeholder-shown:text-base peer-placeholder-shown:text-[#7F7F7F]
                             peer-focus:text-[#0dbc73] peer-focus:text-sm peer-focus:top-0 peer-focus:-translate-y-10 
                             transition-all"
              >
                {t("mainLayout.write_a_message_to")}{" "}
                <span className="font-semibold">
                  @{otherParticipant?.username}
                </span>
              </label>
            )}
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            className={`${
              themeMode === "light" ? "hover:text-white" : "hover:text-black"
            } p-2 bg-[rgba(13,188,115,0.1)] text-[#0dbc73] rounded-full hover:bg-[#0dbc73] transition`}
          >
            <IoIosSend className="text-[1.5em]" />
          </button>
        </div>
      </div>

      {/* Componente para seleccionar ubicación */}
      {showSelectLocation && (
        <SendLocation
          closeChat={() => setShowSelectLocation(false)}
          onLocationSelected={(location) => {
            console.log("Ubicación seleccionada:", location);
            setShowSelectLocation(false);
          }}
        />
      )}
    </>
  );
};
