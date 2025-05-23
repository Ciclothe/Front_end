import { useTheme } from "@/context/ThemeContext";

type SelectGenderProps = {
  selected: string;
  onSelect: (value: string) => void;
};

export const SelectGender = ({ selected, onSelect }: SelectGenderProps) => {
  const { themeMode } = useTheme();

  const options = [
    { label: "Femenino", value: "female" },
    { label: "Masculino", value: "male" },
    { label: "Prefiero no decirlo", value: "unspecified" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col py-2 text-start">
        <p className="text-[1.4em] font-bold">
          ¿Con Qué Género Te Identificas?
        </p>
        <p className="opacity-50">
          Esto ayuda a mostrarte contenido más acorde contigo
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`${
              themeMode === "light"
                ? "bg-[#F7F7F7] text-black"
                : "bg-[#323332] text-white"
            } flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
              selected === option.value
                ? "ring-2 ring-[#0DBC73] bg-[rgba(13,188,115,0.1)]"
                : ""
            }`}
          >
            <input
              type="radio"
              name="gender"
              value={option.value}
              checked={selected === option.value}
              onChange={() => onSelect(option.value)}
              className="appearance-none w-4 h-4 rounded-full border-2 border-gray-400 checked:border-[5px] checked:border-[#0DBC73] focus:outline-none transition duration-200 ease-in-out"
            />
            <span className="font-medium">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
