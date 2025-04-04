import { AccountSection } from "./AccountSection/AccountSection";
import { EventList } from "./EventList";

export const RightPanel = () => {
  return (
    <div className="hidden xl:flex col-span-3 h-[100vh] sticky top-0 pr-10 2xl:pr-30 text-start gap-10 flex-col py-10">
      <AccountSection />
      <EventList />
    </div>
  );
};
