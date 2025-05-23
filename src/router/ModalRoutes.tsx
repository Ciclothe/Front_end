import { SwapOfferSteps } from "@/components/Swap/SwapOfferSteps";
import { SwapOfferReceived } from "@/components/Swap/SwapOfferReceived";

export const modalRoutes = [
  {
    path: "/swaps/:token/offer",
    component: SwapOfferSteps,
  },
  {
    path: "/swaps/offer/received/:token",
    component: SwapOfferReceived,
  },
];
