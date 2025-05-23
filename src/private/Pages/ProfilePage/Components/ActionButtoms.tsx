import Icon from "@mdi/react";
import { mdiAccountPlus, mdiPencil, mdiShare } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";

type ActionButtomsType = {
  isUserData: boolean;
};

export const ActionButtoms = ({ isUserData }: ActionButtomsType) => {
  const { themeMode } = useTheme();

  return (
    <div className="flex justify-center items-center gap-4 w-full px-4">
      {isUserData ? (
        <>
          <div
            className={`${
              themeMode === "light"
                ? "bg-[#121212] text-white"
                : "bg-[#F7F7F7] text-black"
            } px-5 py-3 w-full rounded-xl flex items-center justify-center gap-2 font-bold cursor-pointer md:w-fit`}
          >
            <Icon path={mdiPencil} size={0.8} />
            <p>Edit Profile</p>
          </div>
          <div
            className={`${
              themeMode === "light"
                ? "bg-[#121212] text-white"
                : "bg-[#F7F7F7] text-black"
            } px-5 py-3 w-full rounded-xl flex items-center justify-center gap-2 font-bold cursor-pointer md:w-fit`}
          >
            <Icon path={mdiShare} size={0.8} />
            <p>Share Profile</p>
          </div>
        </>
      ) : (
        <div
          className={`${
            themeMode === "light"
              ? "bg-[#121212] text-white"
              : "bg-[#F7F7F7] text-black"
          } px-5 py-3 w-full rounded-xl flex items-center justify-center gap-2 font-bold cursor-pointer md:w-fit`}
        >
          <Icon path={mdiAccountPlus} size={0.8} />
          <p>Follow</p>
        </div>
      )}
    </div>
  );
};
