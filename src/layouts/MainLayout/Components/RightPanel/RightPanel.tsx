import { AccountSection } from "./AccountSection/AccountSection";
import { EventList } from "./EventList";

export const RightPanel = () => {
  return (
    <div className="hidden xl:flex w-[25%] h-[100vh] fixed top-0 right-0 pr-10 2xl:pr-30 text-start gap-10 flex-col py-10">
      <AccountSection />
      <EventList />
    </div>
  );
};
