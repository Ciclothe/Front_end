import { LanguageSwitch } from "@/components/Common/LanguageSwitch";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { Imagotipo } from "../../../../public/Logos/Imagotipo";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useState } from "react";
import { Register } from "./Views/Register";
import { SelectGender } from "./Views/SelectGender";
import { Location } from "./Views/Location/Location";
import { Interests } from "./Views/Interests";
import { useAuth } from "@/context/AuthContext";

export const SignUp = () => {
  const { t } = useTranslation();
  const { themeMode } = useTheme();
  const navigate = useNavigate();
  const { login, setLoading } = useAuth();

  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState<{
    name: string;
    latitude: number;
    longitude: number;
  }>({ name: "Valencia", latitude: 39.47391, longitude: -0.376288 });
  const [interests, setInterests] = useState<string[]>([]);

  const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (password: string): boolean =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

  const isStep1Complete =
    userName.trim() !== "" && isValidEmail(email) && isValidPassword(password);

  const isStep4Complete = interests.length === 8;
  const isCurrentStepComplete =
    (step === 1 && isStep1Complete) ||
    (step === 2 && gender) ||
    (step === 3 && location !== null) ||
    (step === 4 && isStep4Complete);

  const handleContinue = () => {
    if (step === 1) {
      if (!userName.trim()) {
        alert("El nombre de usuario es obligatorio.");
        return;
      }
      if (!isValidEmail(email)) {
        alert("El correo electrónico no es válido.");
        return;
      }
      if (!isValidPassword(password)) {
        alert("La contraseña no cumple con los requisitos.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (gender) {
        setStep(3);
      } else {
        alert("Por favor selecciona un género.");
      }
    } else if (step === 3) {
      if (location) {
        setStep(4);
      } else {
        alert("Por favor selecciona una ubicación.");
      }
    } else if (step === 4) {
      if (isStep4Complete) {
        const registroCompleto = {
          userName,
          email,
          password,
          gender,
          location,
          interests,
        };
        console.log("Registro completo:", registroCompleto);
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
        alert("Registro completo con intereses seleccionados");
      } else {
        alert(
          `Selecciona ${8 - interests.length} intereses más para continuar.`
        );
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
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
        } md:rounded-3xl flex justify-center flex-col gap-4 h-full md:h-fit py-5 md:py-15 px-4 md:px-30 relative w-full ${
          step === 4
            ? "md:w-[90%] lg:w-[70%] xl:w-[60%] "
            : "md:w-[70%] lg:w-[50%] xl:w-[40%] "
        } shadow-lg`}
      >
        <div className="relative flex items-center justify-start">
          <Imagotipo height={"3em"} color={"#0DBC73"} />
        </div>

        {step === 1 && (
          <Register
            userName={userName}
            setUserName={setUserName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        )}

        {step === 2 && <SelectGender selected={gender} onSelect={setGender} />}
        {step === 3 && (
          <Location
            location={location}
            onSelectLocation={(name, lat, lon) => {
              setLocation({ name: name, latitude: lat, longitude: lon });
            }}
          />
        )}
        {step === 4 && (
          <Interests interests={interests} setInterests={setInterests} />
        )}

        <div
          className={`${
            isCurrentStepComplete
              ? "text-white cursor-pointer"
              : "opacity-50 cursor-not-allowed"
          } bg-[#0DBC73] font-semibold px-5 py-3 w-full rounded-xl text-center`}
          onClick={handleContinue}
        >
          {step === 4 ? `Continuar (${interests.length}/8)` : "Continue"}
        </div>

        {step !== 1 && (
          <div
            className={`${
              themeMode === "light" ? "text-black" : "text-white"
            } font-semibold px-5 py-3 w-full text-center cursor-pointer`}
            onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
          >
            {t("mainLayout.back")}
          </div>
        )}

        {step === 1 && (
          <>
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
                Already have an account?
              </p>
              <a
                className="text-[#0DBC73] font-semibold cursor-pointer"
                onClick={() => navigate("/signIn")}
              >
                Sign in
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
