// src/router/PrivateRouter.tsx
import { Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage/HomePage";
import { SwipePage } from "./Pages/SwipePage/SwipePage";
import { ExplorePage } from "./Pages/ExplorePage/ExplorePage";
import { SwapSummaryPage } from "./Pages/SwipePage/SwapSummaryPage";
import { UploadGarment } from "./UploadGarment/UploadGarment";
import { RoutesWithNotFound } from "@/components/RoutesWithNotFound/RoutesWithNotFound";
import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { CreateLayout } from "@/layouts/CreateLayout/CreateLayout";

export const PrivateRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed/*" element={<HomePage />} />
        <Route path="/swipes/*" element={<SwipePage />} />

        <Route path="/explore/*" element={<ExplorePage />} />
      </Route>

      <Route
        path="/swaps/offer/accepted/:token/summary/*"
        element={<SwapSummaryPage />}
      />

      <Route element={<CreateLayout />}>
        <Route path="/garment/upload" element={<UploadGarment />} />
      </Route>
    </RoutesWithNotFound>
  );
};
