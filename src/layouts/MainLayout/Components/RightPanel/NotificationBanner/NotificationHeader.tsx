import React from "react";
import { useTranslation } from "react-i18next";

interface NotificationHeaderProps {
  unreadCount: number;
}

export const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  unreadCount,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`text-start`}>
      <p className="text-[1.1em] font-semibold truncate">
        {t("mainLayout.notifications")}
      </p>
      {unreadCount > 0 ? (
        <p className="text-sm">
          <span className="opacity-50">{t("mainLayout.you_have")}</span>
          <span className="text-[#0dbc73] font-bold">
            {" "}
            {t(
              unreadCount === 1
                ? "mainLayout.notifications_count"
                : "mainLayout.notifications_count_plural",
              { count: unreadCount }
            )}
          </span>
        </p>
      ) : (
        <p className="text-sm opacity-50">
          {t("mainLayout.no_new_notifications")}
        </p>
      )}
    </div>
  );
};
