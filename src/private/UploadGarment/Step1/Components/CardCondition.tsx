import { useState } from "react";
import { BatteryIcon } from "../../../../../public/Icons/BatteryIcon";

interface Props {
  conditions: { id: number; name: string; label: string }[];
}

export const CardCondition = ({ conditions }: Props) => {
  const [activeCondition, setActiveCondition] = useState<number | null>(null);

  const toggleActive = (id: number) => {
    setActiveCondition((prev) => (prev === id ? null : id));
  };

  return (
    <div className="grid grid-cols-15 gap-4 mt-4">
      {conditions.map((condition) => (
        <div
          key={condition.id}
          className={`card cursor-pointer ${
            activeCondition === condition.id ? "active" : ""
          }`}
          onClick={() => toggleActive(condition.id)}
        >
          <BatteryIcon
            conditionGarment={condition.id}
            active={activeCondition === condition.id}
          />
          <p className="font-bold whitespace-nowrap">{condition.label}</p>
        </div>
      ))}
    </div>
  );
};
