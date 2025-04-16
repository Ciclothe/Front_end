import { useModal } from "@/context/ModalContext";
import { SwapOfferSteps } from "@/components/Swap/SwapOfferSteps";
import { OfferBtn } from "../OfferBtn";
import { LikeBtn } from "../LikeBtn";

export const PostActions = ({
  id,
  liked = false,
  offerSent = false,
}: {
  id: number;
  liked?: boolean;
  offerSent?: boolean;
}) => {
  const { openModal } = useModal();

  return (
    <div className="flex items-center gap-2">
      <OfferBtn
        offerSent={offerSent}
        onClick={() => {
          if (offerSent) {
            console.log("Hola Chica");
          } else {
            openModal(<SwapOfferSteps postId={id} />);
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
