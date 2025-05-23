import { mdiLogout } from "@mdi/js";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { FloatingMenu } from "@/components/Common/FloatingMenu";
import UserProfile from "@/components/Common/Account/UserProfile";
import ThemeToggle from "@/components/Common/ThemeToggle";
import { LanguageSwitch } from "@/components/Common/LanguageSwitch";
import { useAuth } from "@/context/AuthContext";

export const AccountSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const options = [
    // { label: "settings", icon: mdiCog },
    { label: "log_out", icon: mdiLogout, onClick: logout },
  ];

  return (
    <div className="flex items-center gap-4 justify-end">
      <div className="relative">
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="cursor-pointer"
        >
          <Avatar
            alt={currentUser?.userName}
            src={currentUser?.profilePicture}
          />
        </div>
        {isOpen && (
          <FloatingMenu
            setIsOpen={setIsOpen}
            options={options}
            header={<UserProfile />}
            actions={[
              <ThemeToggle key="theme" />,
              <LanguageSwitch key="languague" />,
            ]}
            position="bottom"
            align="right"
          />
        )}
      </div>
    </div>
  );
};
