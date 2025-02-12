import { BasicHeader } from "@/components";
import { Outlet } from "react-router-dom";
import "./CreateLayout.css";

export const CreateLayout = () => {
  return (
    <div className={"create-layout"}>
      <BasicHeader />
      <main className={"content"}>
        <Outlet />
      </main>
    </div>
  );
};
