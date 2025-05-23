import { LanguageSwitch } from "@/components/Common/LanguageSwitch";
import { useTranslation } from "react-i18next";
import { Imagotipo } from "../../../../public/Logos/Imagotipo";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const { t } = useTranslation();
  const { login, setLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { themeMode } = useTheme();
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);

    const fakeUser = {
      id: "1",
      userName: "aphrodite",
      profilePicture:
        "https://i.pinimg.com/736x/1f/b8/27/1fb827f37413d778e56aa404692a3b30.jpg",
      location: {
        lat: 6.2442,
        lng: -75.5812,
      },
    };

    const token = "1234567890";

    localStorage.setItem("token", token);

    login(fakeUser, token);

    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="absolute right-2 top-2 z-20">
        <LanguageSwitch
          showPlanetIcon={false}
          showTitle={false}
          backgroundColor={themeMode === "light" ? "#FFFFFF" : "#121212"}
          hoverColor={themeMode === "light" ? "#E2E2E2" : "#323332"}
          selectedColor={themeMode === "light" ? "#E2E2E2" : "#323332"}
        />
      </div>

      <div
        className={`${
          themeMode === "light" ? "bg-white" : "bg-[#222423]"
        } md:rounded-3xl flex justify-center flex-col gap-4 h-full md:h-fit py-5 md:py-15 px-4 md:px-30 relative w-full md:w-[70%] lg:w-[50%] xl:w-[40%] shadow-lg`}
      >
        <div className="relative flex items-center justify-start">
          <Imagotipo height={"3em"} color={"#0DBC73"} />
        </div>
        <p className="text-[1.4em] font-bold py-2 text-start">
          {t("login.sign_in")}
        </p>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("mainLayout.email")}
            className={`${
              themeMode === "light"
                ? "bg-[#F7F7F7] text-black border-black/5 "
                : "bg-[#323332] text-white border-white/5 "
            } text-[16px] md:text-[1em] p-3 rounded-xl w-full focus:outline-none border`}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("mainLayout.password")}
            className={`${
              themeMode === "light"
                ? "bg-[#F7F7F7] text-black border-black/5 "
                : "bg-[#323332] text-white border-white/5 "
            } text-[16px] md:text-[1em] p-3 rounded-xl w-full focus:outline-none border`}
          />
          <a
            className="text-[#0DBC73] text-end text-sm cursor-pointer"
            onClick={() => {
              navigate("/resetPassword");
            }}
          >
            {t("mainLayout.forgot_password")}
          </a>
        </div>

        <div
          className={`${
            themeMode === "light" ? "text-white" : "text-black"
          } bg-[#0DBC73] font-semibold px-5 py-3 w-full rounded-xl text-center cursor-pointer`}
          onClick={() => {
            if (!email || !password) {
              alert("Please fill all fields");
              return;
            }
            handleLogin();
          }}
        >
          {t("login.sign_in")}
        </div>

        <div className="flex items-center gap-2 px-4">
          <hr className="w-full text-black/5" />
          <p className="font-semibold text-[#0DBC73] text-xs">
            {t("mainLayout.or")}
          </p>
          <hr className="w-full text-black/5" />
        </div>

        <div className="flex flex-col w-full gap-4 items-center">
          <div
            className={`${
              themeMode === "light"
                ? "bg-[#F7F7F7] text-black"
                : "bg-[#323332] text-white"
            } font-semibold px-5 py-3 w-full rounded-xl flex items-center gap-2 justify-center cursor-pointer`}
          >
            <FcGoogle />
            {t("mainLayout.log_in_with_google")}
          </div>
          <div
            className={`${
              themeMode === "light"
                ? "bg-[#F7F7F7] text-black"
                : "bg-[#323332] text-white"
            } font-semibold px-5 py-3 w-full rounded-xl flex items-center gap-2 justify-center cursor-pointer`}
          >
            <FaFacebook className="text-[#0266FF]" />
            {t("mainLayout.log_in_with_facebook")}
          </div>
        </div>

        <div className="flex items-center justify-center gap-1 mt-4">
          <p
            className={`${
              themeMode === "light" ? "text-black/50" : "text-white/50"
            }`}
          >
            {t("mainLayout.no_account")}
          </p>
          <a
            className="text-[#0DBC73] font-semibold cursor-pointer"
            onClick={() => {
              navigate("/signUp");
            }}
          >
            {t("mainLayout.sign_up")}
          </a>
        </div>
      </div>
    </div>
  );
};
