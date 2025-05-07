import { EventList } from "./EventList";

export const RightPanel = () => {
  return (
    <div className="hidden xl:flex w-full h-full text-start gap-10 flex-col pr-8 ">
      <EventList />
    </div>
  );
};
