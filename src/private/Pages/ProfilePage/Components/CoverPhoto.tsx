import { useTheme } from "@/context/ThemeContext";

type CoverPhotoProps = {
  coverPhoto: string;
  userName: string;
  isCoverPhoto: boolean;
};

export const CoverPhoto = ({
  coverPhoto,
  userName,
  isCoverPhoto,
}: CoverPhotoProps) => {
  const { themeMode } = useTheme();

  return (
    <div className="relative w-full h-[15em] md:h-[20em] md:rounded-2xl">
      <img
        src={coverPhoto}
        alt={userName}
        className="w-full h-full object-cover"
      />
      <div
        className={`${
          isCoverPhoto ? "" : "backdrop-blur-xl"
        } absolute inset-0 z-10`}
      />
      <div
        className="absolute inset-0 z-20"
        style={{
          background: `linear-gradient(to top, ${
            themeMode === "light" ? "#F7F7F7" : "#121212"
          } 0%, transparent 100%)`,
        }}
      />
    </div>
  );
};
