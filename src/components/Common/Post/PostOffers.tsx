import { AssistantsAvatars } from "@/components/Common/AssistantsAvatars";
import { useTranslation } from "react-i18next";

interface Offer {
  id: number;
  userData: {
    id: number;
    avatar: string;
  };
}

export const PostOffers = ({
  offers,
  totalOffers,
}: {
  offers?: Offer[];
  totalOffers?: number;
}) => {
  const { t } = useTranslation();

  const peopleText =
    offers?.length === 1 ? "mainLayout.person" : "mainLayout.people";
  const willGoText =
    offers?.length === 1
      ? "mainLayout.swap_is_offering"
      : "mainLayout.swap_are_offering";

  return (
    <AssistantsAvatars
      firstAssistants={
        offers?.map((offer) => ({
          id: offer.userData.id,
          avatar: offer.userData.avatar,
        })) ?? []
      }
      total={totalOffers ?? 0}
      peopleLabel={t(peopleText)}
      actionText={t(willGoText)}
    />
  );
};
