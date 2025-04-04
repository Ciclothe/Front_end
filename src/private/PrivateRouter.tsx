import { Route } from "react-router-dom";
import { UploadGarment } from "./UploadGarment/UploadGarment";
import { HomePage } from "./HomePage/HomePage";
import { RoutesWithNotFound } from "@/components/RoutesWithNotFound/RoutesWithNotFound";
import { CreateLayout } from "@/layouts/CreateLayout/CreateLayout";
import { MainLayout } from "@/layouts/MainLayout/MainLayout";

export const PrivateRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
      </Route>
      <Route element={<CreateLayout />}>
        <Route path="/garment/upload" element={<UploadGarment />} />
      </Route>
    </RoutesWithNotFound>
  );
};
