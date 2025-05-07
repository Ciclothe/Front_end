import { AssistantsAvatars } from "@/components/Common/AssistantsAvatars";

interface Offer {
  id: number;
  userData: {
    userId: number;
    profilePic: string;
  };
}

export const PostOffers = ({
  offers,
  totalOffers,
}: {
  offers?: Offer[];
  totalOffers?: number;
}) => {
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
          userId: offer.userData.userId,
          profilePic: offer.userData.profilePic,
        })) ?? []
      }
      total={totalOffers ?? 0}
      peopleLabel={peopleText}
      actionText={willGoText}
    />
  );
};
