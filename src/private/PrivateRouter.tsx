import { Route } from "react-router-dom";
import { UploadGarment } from "./UploadGarment/UploadGarment";
import { HomePage } from "./Pages/HomePage/HomePage";
import { SwipePage } from "./Pages/SwipePage/SwipePage";
import { SwapSummaryPage } from "./Pages/SwipePage/SwapSummaryPage";
import { RoutesWithNotFound } from "@/components/RoutesWithNotFound/RoutesWithNotFound";
import { CreateLayout } from "@/layouts/CreateLayout/CreateLayout";
import { MainLayout } from "@/layouts/MainLayout/MainLayout";

export const PrivateRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<HomePage />} />
        <Route path="/feed/*" element={<HomePage />} />
        <Route path="/swipes" element={<SwipePage />} />
        <Route path="/swipes/*" element={<SwipePage />} />
      </Route>
      <Route
        path="/swaps/offer/accepted/:token/summary"
        element={<SwapSummaryPage />}
      />
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
