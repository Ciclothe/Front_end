import { mdiMapMarker, mdiDotsVertical } from "@mdi/js";
import Icon from "@mdi/react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PostInfoOverlay } from "@/components/Common/Post/PostInfoOverlay";
import { getCityAndCountry } from "@/components/Utils/format";
import { useTranslation } from "react-i18next";

type Card = {
  userId: number;
  id: number;
  url: string;
  userName: string;
  condition: string;
  size: string;
  brand: string;
  color: string;
  title: string;
  profilePic: string;
  location: {
    lat: number;
    lng: number;
  };
};

const Card = ({
  id,
  url,
  condition,
  size,
  brand,
  color,
  title,
  location: { lat, lng },
  cards,
  setCards,
}: {
  id: number;
  url: string;
  condition: string;
  size: string;
  brand: string;
  color: string;
  title: string;
  profilePic: string;
  location: {
    lat: number;
    lng: number;
  };
  setCards: Dispatch<SetStateAction<Card[]>>;
  cards: Card[];
}) => {
  const [bgColor, setBgColor] = useState<string>("#000000");
  const { i18n } = useTranslation();
  const [cityAndCountry, setCityAndCountry] = useState("");

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateRaw = useTransform(x, [-150, 150], [-18, 18]);

  const isFront = id === cards[cards.length - 1].id;

  const rotate = useTransform(() => {
    return rotateRaw.get();
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const result = await getCityAndCountry(lng, lat, i18n.language);
        setCityAndCountry(result);
      } catch (err) {
        console.error("Failed to get location:", err);
        setCityAndCountry("Unknown");
      }
    };

    fetchLocation();
  }, [lng, lat, i18n.language]);

  const handleDragEnd = () => {
    const directionX = x.get();
    // const directionY = y.get();

    if (Math.abs(directionX) > 50) {
      setCards((pv) => pv.filter((v) => v.id !== id));

      // TODO: #70 Create accept/reject/message functionality for cards based on swipe direction and make API call to update data
      if (directionX > 0) {
        console.log(`Card with id ${id} was accepted (swiped right)`);
      } else {
        console.log(`Card with id ${id} was rejected (swiped left)`);
      }
    } else {
      setBgColor("#000000");
    }

    // if (directionY > 50) {
    //   setCards((pv) => pv.filter((v) => v.id !== id));
    //   console.log(`Send Message to post with id ${id}`);
    // }
  };

  // TODO: #66 Create and implement report modal for cards
  const showReportModal = () => {
    console.log(`Show report modal for card with id ${id}`);
  };

  const backgroundColor = () => {
    const directionX = x.get();
    // const directionY = y.get();
    if (Math.abs(directionX) > 10) {
      if (directionX > 0) {
        setBgColor("#0DBC73");
      } else {
        setBgColor("#C20000");
      }
    } else {
      setBgColor("#000000");
    }

    // if (directionY > 50) {
    //   setBgColor("#5D9FF6");
    // }
  };

  return (
    <motion.div
      className={`z-1 h-full max-w-full aspect-[4/5] grid origin-bottom rounded-2xl overflow-hidden relative hover:cursor-grab active:cursor-grabbing`}
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        y,
        rotate,
        transition: "0.125s transform",
        boxShadow: isFront
          ? "0 0px 10px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)"
          : undefined,
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      drag
      dragDirectionLock={false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDrag={backgroundColor}
      onDragEnd={handleDragEnd}
    >
      <div
        className={`absolute z-[100] top-0 h-full left-0 w-full p-4 flex flex-col justify-between bg-gradient-to-t from-[${bgColor}] to-transparent`}
        style={{
          background: `linear-gradient(to top, ${bgColor}, rgba(0,0,0, 0))`,
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            <Icon path={mdiMapMarker} size={1} className={"text-[#DF1E32]"} />
            <p className="font-semibold text-white">{cityAndCountry}</p>
          </div>
          <button
            className={`rounded-full p-1 aspect-square bg-black/40`}
            onClick={() => showReportModal()}
          >
            <Icon path={mdiDotsVertical} size={0.8} className={"text-white"} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <PostInfoOverlay
            condition={condition}
            title={title}
            color={color}
            size={size}
            brand={brand}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
