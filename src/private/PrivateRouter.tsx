// src/router/PrivateRouter.tsx
import { Navigate, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage/HomePage";
import { SwipePage } from "./Pages/SwipePage/SwipePage";
import { SwapSummaryPage } from "./Pages/SwipePage/SwapSummaryPage";
import { UploadGarment } from "./UploadGarment/UploadGarment";
import { RoutesWithNotFound } from "@/components/RoutesWithNotFound/RoutesWithNotFound";
import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { DetailsLayout } from "@/layouts/DetailsLayout/DetailsLayout";
import { CreateLayout } from "@/layouts/CreateLayout/CreateLayout";
import { CreatedEventsView } from "@/private/Pages/ProfilePage/Components/TabsContent/CreatedEventsView";
import { JoinedEventsView } from "@/private/Pages/ProfilePage/Components/TabsContent/JoinedEventsView";
import { SwapsView } from "@/private/Pages/ProfilePage/Components/TabsContent/SwapsView";
import { MessagesView } from "./Pages/MessagesPage/MessagesView";
import { ProfileView } from "./Pages/ProfilePage/ProfileView";
import { SwapDetails } from "./Pages/Details/SwapDetails";
import { EventDetails } from "./Pages/Details/EventDetails";
import { CaseSensitiveRedirect } from "@/router/CaseSensitiveRedirect";

export const PrivateRouter = () => {
  return (
    <>
      <CaseSensitiveRedirect />
      <RoutesWithNotFound>
        <Route element={<MainLayout />}>
          // SwipesPage
          <Route path="/swipes/*" element={<SwipePage />} />
          // FeedPage || HomePage
          <Route path="/" element={<Navigate to="/feed" replace />} />
          <Route path="/home" element={<Navigate to="/feed" replace />} />
          <Route path="/feed/*" element={<HomePage />} />
        </Route>

        <Route element={<DetailsLayout />}>
          // MessagesPage
          <Route path="/messages/:chatId?/*" element={<MessagesView />} />
          // SwapAcceptedDetailsPage
          <Route
            path="/swaps/offer/accepted/:token/summary/*"
            element={<SwapSummaryPage />}
          />
          // SwapDetailsPage
          <Route path="/swapDetails/:token/*" element={<SwapDetails />} /> // //
          // ActivitiesPage
          <Route
            path="/activities"
            element={<Navigate to="/activities/createdEvents" replace />}
          />
          <Route
            path="/activities/createdEvents/*"
            element={<CreatedEventsView />}
          />
          <Route
            path="/activities/joinedEvents/*"
            element={<JoinedEventsView />}
          />
          <Route path="/activities/swaps/*" element={<SwapsView />} />
          // GarmentDetailsPage
          <Route path="/eventDetails/:token/*" element={<EventDetails />} />
          // ProfilePage
          <Route path="/profile/:userName" element={<ProfileView />} />
        </Route>

        <Route element={<CreateLayout />}>
          <Route path="/garment/upload" element={<UploadGarment />} />
        </Route>
      </RoutesWithNotFound>
    </>
  );
};
