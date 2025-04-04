import Avatar from "@mui/material/Avatar";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";

interface Assistant {
  id: number;
  name: string;
  avatar: string;
}

interface AssistantsAvatarsProps {
  firstAssistents: Assistant[];
  total: number;
}

export const AssistantsAvatars: React.FC<AssistantsAvatarsProps> = ({
  firstAssistents,
  total,
}) => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();

  const peopleText = total === 1 ? "person" : "people";
  const willGoText = total === 1 ? "will_go_singular" : "will_go_plural";

  return (
    <div className="w-full flex items-center">
      <div className="flex justify-center">
        {firstAssistents.map((assistent, index) => (
          <div
            key={assistent.id}
            className="overflow-hidden"
            style={{
              marginLeft: index === 0 ? 0 : -14,
              marginTop: index === 1 ? 7 : 0,
              zIndex: index,
            }}
          >
            <Avatar
              alt={assistent.name}
              src={assistent.avatar}
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

      <p className="ml-2">
        <span className="font-bold">
          {total} {t(`mainLayout.${peopleText}`)}
        </span>{" "}
        <span className="opacity-50">{t(`mainLayout.${willGoText}`)}</span>
      </p>
    </div>
  );
};
