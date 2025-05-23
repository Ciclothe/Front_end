import Avatar from "@mui/material/Avatar";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { Participant } from "@/types/index";

interface AssistantsAvatarsProps {
  firstAssistants: Participant[];
  total: number;
  peopleLabel?: string;
  actionText?: string;
}

export const AssistantsAvatars: React.FC<AssistantsAvatarsProps> = ({
  firstAssistants,
  total,
  actionText = "",
}) => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const peopleText = total === 1 ? "mainLayout.person" : "mainLayout.people";

  return (
    <div className="w-full flex items-center">
      <div className="flex justify-center">
        {firstAssistants.map((assistent, index) => (
          <div
            key={assistent.userId}
            className="overflow-hidden"
            style={{
              marginLeft: index === 0 ? 0 : -14,
              marginTop: index === 1 ? 7 : 0,
              zIndex: index,
            }}
          >
            <Avatar
              alt={assistent.userName}
              src={assistent.profilePicture}
              variant="rounded"
              sx={{
                border: `${
                  themeMode === "light" ? "#F7F7F7" : "#222423"
                } 2px solid`,
                width: 24,
                height: 24,
              }}
            />
          </div>
        ))}
      </div>

      <p className="ml-2 truncate">
        <span className="font-bold">
          {total} {t(peopleText)}
        </span>{" "}
        <span className="opacity-50">{t(actionText)}</span>
      </p>
    </div>
  );
};
