import { useModal } from "@/context/ModalContext";
import { OfferBtn } from "../OfferBtn";
import { LikeBtn } from "../LikeBtn";

export const PostActions = ({
  liked = false,
  token,
  offerSent = false,
}: {
  liked?: boolean;
  token: string;
  offerSent?: boolean;
}) => {
  const { openModal } = useModal();

  return (
    <div className="flex items-center gap-2">
      <OfferBtn
        offerSent={offerSent}
        onClick={() => {
          if (offerSent) {
            console.log("Oferta ya enviada");
          } else {
            openModal(token, "offer");
          }
        }}
      />

      <LikeBtn
        liked={liked}
        onClick={() => {
          console.log("Hola");
        }}
      />
    </div>
  );
};
