import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { FloatingMenu } from "@/components/Common/FloatingMenu";
import UserProfile from "@/components/Common/Account/UserProfile";
import ThemeToggle from "@/components/Common/ThemeToggle";
import { mdiCog, mdiLogout } from "@mdi/js";

const userData = {
  name: "Alejandro Ospina Rojas",
  profilePicture:
    "https://i.pinimg.com/736x/2e/95/1a/2e951a077192834ecc59d4024a6f9ce4.jpg",
};

const options = [
  { label: "settings", icon: mdiCog },
  { label: "log_out", icon: mdiLogout },
];

export const UserAvatarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="col-span-2 flex justify-start relative">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer"
      >
        <Avatar alt={userData.name} src={userData.profilePicture} />
      </div>
      <div className="[direction:ltr]">
        {isOpen && (
          <FloatingMenu
            setIsOpen={setIsOpen}
            options={options}
            header={<UserProfile />}
            actions={<ThemeToggle />}
            position="bottom"
            align="left"
          />
        )}
      </div>
    </div>
  );
};
