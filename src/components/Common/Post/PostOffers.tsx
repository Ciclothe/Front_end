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
  offers: Offer[];
  totalOffers: number;
}) => {
  const { t } = useTranslation();

  const peopleText =
    offers?.length === 1 ? "mainLayout.person" : "mainLayout.people";
  const willGoText =
    offers?.length === 1 ? "is offering a swap" : "are offering a swap";

  return (
    <AssistantsAvatars
      firstAssistents={offers?.map((offer) => ({
        id: offer.userData.id,
        avatar: offer.userData.avatar,
      }))}
      total={totalOffers}
      peopleLabel={t(peopleText)}
      actionText={t(willGoText)}
    />
  );
};
