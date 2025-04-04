import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import Icon from "@mdi/react";
import { mdiBellOutline, mdiCog, mdiLogout, mdiMagnify } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";
import { CategoryTabs } from "@/components/Common/CategoryTabs";
import { FloatingMenu } from "@/components/Common/FloatingMenu";
import UserProfile from "@/components/Common/Account/UserProfile";
import ThemeToggle from "@/components/Common/ThemeToggle";

// TODO: Create a custom hook to manage the user data
const userData = {
  name: "Alejandro Ospina Rojas",
  profilePicture:
    "https://i.pinimg.com/736x/2e/95/1a/2e951a077192834ecc59d4024a6f9ce4.jpg",
  username: "alejospinaro",
};

const options = [
  { label: "settings", icon: mdiCog },
  { label: "log_out", icon: mdiLogout },
];

export const HeaderMobile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { themeMode } = useTheme();

  return (
    <div
      className={`${
        themeMode === "light"
          ? "text-black border-black/5 bg-[#F7F7F7]"
          : "text-white border-white/5 bg-[#121212]"
      } md:border-b sticky top-0 xl:hidden md:[direction:rtl] col-span-12 grid grid-cols-12 z-20 items-center px-5 md:px-10 lg:px-20`}
    >
      <div className="col-span-12 grid grid-cols-12 items-center py-5 ">
        <div className="col-span-2 flex justify-start relative">
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="cursor-pointer"
          >
            <Avatar alt={userData?.name} src={userData?.profilePicture} />
          </div>
          <div className="[direction:ltr]">
            {isOpen && (
              <FloatingMenu
                setIsOpen={setIsOpen}
                options={options}
                header={<UserProfile />}
                actions={<ThemeToggle />}
                position="bottom"
                align="right"
              />
            )}
          </div>
        </div>
        <div className="col-span-8 hidden md:flex justify-center">LOGO</div>
        <div className="col-span-8 md:hidden">
          <p className="text-xs opacity-50">Location</p>
          <p className="font-bold">Valencia, Spain</p>
        </div>
        <div className="col-span-2 flex justify-end gap-4">
          <Icon path={mdiMagnify} size={1} className="md:hidden" />
          <Icon path={mdiBellOutline} size={1} />
        </div>
      </div>
      <div className="col-span-12 md:hidden">
        <CategoryTabs />
      </div>
    </div>
  );
};
