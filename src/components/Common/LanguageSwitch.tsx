import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Icon from "@mdi/react";
import { mdiEarth } from "@mdi/js";

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
  showPlanetIcon?: boolean;
  showLanguageName?: boolean;
  showFlag?: boolean;
  showTitle?: boolean;
  backgroundColor?: string;
  hoverColor?: string;
  selectedColor?: string;
}

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  showPlanetIcon = true,
  showLanguageName = true,
  showFlag = true,
  showTitle = true,
  backgroundColor,
  hoverColor,
  selectedColor,
}) => {
  const { i18n, t } = useTranslation();
  const { themeMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const normalizeLangCode = (code: string) => code.split("-")[0];

  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    languages.find((lang) => lang.code === normalizeLangCode(i18n.language)) ||
      languages[0]
  );

  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    const normalizeLangCode = (code: string) => code.split("-")[0];

    if (storedLanguage) {
      try {
        const parsed = JSON.parse(storedLanguage);
        const code = typeof parsed === "string" ? parsed : parsed.code;
        const normalizedCode = normalizeLangCode(code);
        const currentLang = normalizeLangCode(i18n.language);

        if (normalizedCode !== currentLang) {
          i18n.changeLanguage(code);
        }

        const matchedLang =
          languages.find((l) => l.code === normalizedCode) || languages[0];
        setSelectedLanguage(matchedLang);
      } catch {
        const normalizedStored = normalizeLangCode(storedLanguage);
        if (normalizedStored !== normalizeLangCode(i18n.language)) {
          i18n.changeLanguage(storedLanguage);
        }

        const matchedLang =
          languages.find((l) => l.code === normalizedStored) || languages[0];
        setSelectedLanguage(matchedLang);
      }
    } else {
      const defaultLang = "en";
      if (normalizeLangCode(i18n.language) !== defaultLang) {
        i18n.changeLanguage(defaultLang);
      }
      setSelectedLanguage(
        languages.find((l) => l.code === defaultLang) || languages[0]
      );
    }
  }, [i18n, i18n.language]);

  const updateLanguage = (language: Language) => {
    setIsOpen(false);
    setSelectedLanguage(language);
    localStorage.setItem("selectedLanguage", JSON.stringify(language));
    i18n.changeLanguage(language.code).catch(console.error);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const bgColor =
    backgroundColor || (themeMode === "light" ? "#F7F7F7" : "#121212");
  const defaultHover = themeMode === "light" ? "#E2E2E2" : "#323332";
  const defaultSelected = defaultHover;
  const hoverBg = hoverColor || defaultHover;
  const selectedBg = selectedColor || defaultSelected;

  return (
    <div
      className="flex flex-col items-center justify-between px-4 py-3 cursor-pointer"
      onClick={toggleMenu}
    >
      <div className="flex items-center gap-4 w-full justify-between">
        <div className="flex items-center gap-4">
          {showPlanetIcon && <Icon path={mdiEarth} size={1} />}
          {showTitle && (
            <p className="font-semibold">{t("mainLayout.language")}</p>
          )}
        </div>
        {showFlag && (
          <img
            src={selectedLanguage.icon}
            alt={selectedLanguage.name}
            className="w-[1.2em] aspect-square"
          />
        )}
      </div>

      {isOpen && (
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
          <div
            className="flex flex-col w-full mt-2 rounded-xl overflow-hidden"
            style={{ backgroundColor: bgColor }}
          >
            {languages.map((language) => {
              const isSelected = language.code === selectedLanguage.code;
              return (
                <div
                  key={language.code}
                  onClick={() => updateLanguage(language)}
                  className="flex items-center px-4 py-3 cursor-pointer"
                  style={{
                    backgroundColor: isSelected ? selectedBg : undefined,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = hoverBg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isSelected
                      ? selectedBg
                      : "transparent";
                  }}
                >
                  {showFlag && (
                    <img
                      src={language.icon}
                      alt={language.name}
                      className="w-[1em] aspect-square mr-2"
                    />
                  )}
                  {showLanguageName && (
                    <p className="ml-2 font-bold">{language.name}</p>
                  )}
                </div>
              );
            })}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};
