import { Navigate, Route } from "react-router-dom";
import { UploadGarment } from "./UploadGarment/UploadGarment";
import { RoutesWithNotFound } from "@/components/RoutesWithNotFound/RoutesWithNotFound";
import { CreateLayout } from "@/layouts/CreateLayout/CreateLayout";

export const PrivateRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={"/login"} />} />
      <Route element={<CreateLayout />}>
        <Route path="/garment/upload" element={<UploadGarment />} />
      </Route>
    </RoutesWithNotFound>
  );
};
