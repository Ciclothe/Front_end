import Icon from "@mdi/react";
import { mdiBellOutline, mdiMagnify } from "@mdi/js";

export const HeaderIcons = () => (
  <div className="col-span-2 flex justify-end gap-4">
    <Icon path={mdiMagnify} size={1} className="md:hidden" />
    <Icon path={mdiBellOutline} size={1} />
  </div>
);
