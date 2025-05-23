import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { FloatingMenu } from "@/components/Common/FloatingMenu";
import UserProfile from "@/components/Common/Account/UserProfile";
import ThemeToggle from "@/components/Common/ThemeToggle";
import { mdiLogout } from "@mdi/js";
import { LanguageSwitch } from "@/components/Common/LanguageSwitch";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";

export const UserAvatarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { themeMode } = useTheme();
  const { t } = useTranslation();

  const options = currentUser
    ? [{ label: "log_out", icon: mdiLogout, onClick: logout }]
    : [];

  return (
    <div className="col-span-2 flex justify-start relative">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer"
      >
        {currentUser ? (
          <Avatar
            alt={currentUser?.userName}
            src={currentUser?.profilePicture}
          />
        ) : (
          <Avatar />
        )}
      </div>

      {isOpen && (
        <div className="[direction:ltr]">
          <FloatingMenu
            setIsOpen={setIsOpen}
            options={options}
            header={currentUser ? <UserProfile /> : null}
            actions={
              currentUser ? (
                [<ThemeToggle key="theme" />, <LanguageSwitch key="language" />]
              ) : (
                <div className="flex flex-col space-y-2 p-4">
                  <button
                    className="animated-gradient-button"
                    onClick={() => {
                      navigate("/signIn");
                      setIsOpen(false);
                    }}
                  >
                    Iniciar sesión
                  </button>
                  <button
                    className={`${
                      themeMode === "light" ? "text-black" : "text-white"
                    } border rounded-lg px-4 py-2 font-semibold`}
                    onClick={() => {
                      navigate("/signUp");
                      setIsOpen(false);
                    }}
                  >
                    {t("mainLayout.register")}
                  </button>
                </div>
              )
            }
            position="bottom"
            align="left"
          />
        </div>
      )}
    </div>
  );
};
