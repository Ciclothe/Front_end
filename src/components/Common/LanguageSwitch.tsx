import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import ClickAwayListener from "@mui/material/ClickAwayListener";

interface Language {
  code: string;
  name: string;
  icon: string;
  ISO6392: string;
}

const languages = [
  {
    code: "en",
    name: "English",
    icon: "https://res.cloudinary.com/dzyhvxuts/image/upload/v1739370636/images/icons/countries_flags/en.png",
    ISO6392: "Eng",
  },
  {
    code: "es",
    name: "Español",
    icon: "https://res.cloudinary.com/dzyhvxuts/image/upload/v1739370636/images/icons/countries_flags/es.png",
    ISO6392: "Esp",
  },
  {
    code: "fr",
    name: "Français",
    icon: "https://res.cloudinary.com/dzyhvxuts/image/upload/v1739370636/images/icons/countries_flags/fr.png",
    ISO6392: "Fra",
  },
  {
    code: "de",
    name: "Deutsch",
    icon: "https://res.cloudinary.com/dzyhvxuts/image/upload/v1739370636/images/icons/countries_flags/de.png",
    ISO6392: "Deu",
  },
  {
    code: "he",
    name: "עברית",
    icon: "https://res.cloudinary.com/dzyhvxuts/image/upload/v1739370636/images/icons/countries_flags/he.png",
    ISO6392: "Heb",
  },
];

interface LanguageSwitchProps {
  onlyFlag?: boolean;
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ onlyFlag }) => {
  const { i18n } = useTranslation();
  const { themeMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    languages.find((lang) => lang.code === i18n.language) || languages[0]
  );

  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage) {
      const parsedLanguage = JSON.parse(storedLanguage);
      setSelectedLanguage(parsedLanguage);
      i18n.changeLanguage(parsedLanguage.code);
    }
  }, [i18n]);

  const updateLanguage = (language: Language) => {
    setIsOpen(false);
    setSelectedLanguage(language);
    localStorage.setItem("selectedLanguage", JSON.stringify(language));

    i18n
      .changeLanguage(language.code)
      .then(() => {
        console.log("Idioma cambiado a:", language.code);
      })
      .catch((error) => {
        console.error("Error al cambiar el idioma:", error);
      });
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div
      className={`dropdown relative flex flex-col items-end ${
        themeMode === "dark" ? "night-mode" : "day-mode"
      }`}
    >
      <button
        onClick={toggleMenu}
        className="dropdown-toggle flex items-center py-1 px-2 font-bold w-fit rounded-full"
        aria-label="Select language"
        aria-haspopup="true"
      >
        <img
          src={selectedLanguage.icon}
          alt={selectedLanguage.name}
          className="w-[1em] aspect-aquare"
        />
        {!onlyFlag && <p className="ml-2">{selectedLanguage.ISO6392}</p>}
      </button>

      {isOpen && (
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
          <div
            className={`dropdown-menu min-w-auto mt-2 rounded-xl ${
              themeMode === "dark"
                ? "bg-[#121212] text-white"
                : "bg-[#FFFFFF] text-black"
            }`}
            style={{ zIndex: 100 }}
          >
            {languages.map((language, index) => {
              const isSelected = language.code === selectedLanguage.code;
              const isFirst = index === 0;
              const isLast = index === languages.length - 1;

              return (
                <div
                  key={language.code}
                  onClick={() => updateLanguage(language)}
                  className={`flex items-center px-4 py-3 cursor-pointer 
                    ${
                      themeMode === "dark"
                        ? "hover:bg-[#2C2C2C]"
                        : "hover:bg-[#F1F2F4]"
                    }
                    ${
                      isSelected
                        ? themeMode === "dark"
                          ? "bg-[#2C2C2C]"
                          : "bg-[#F1F2F4]"
                        : ""
                    }
                    ${isFirst ? "rounded-t-xl" : ""}
                    ${isLast ? "rounded-b-xl" : ""}`}
                >
                  <img
                    src={language.icon}
                    alt={language.name}
                    className="w-[1em] aspect-square mr-2"
                  />
                  <p className="ml-2 font-bold">{language.name}</p>
                </div>
              );
            })}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};
