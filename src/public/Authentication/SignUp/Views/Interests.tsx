import { useTheme } from "@/context/ThemeContext";

const allInterests = [
  "Nike",
  "Adidas",
  "Zara",
  "Urban",
  "Vintage",
  "Minimalista",
  "Streetwear",
  "Bohemio",
  "Casual",
  "Deportivo",
  "Sostenible",
  "High Fashion",
  "Clásico",
  "Tendencia 2025",
  "Ecológico",
];

export const Interests = ({
  interests,
  setInterests,
}: {
  interests: string[];
  setInterests: (interests: string[]) => void;
}) => {
  const { themeMode } = useTheme();

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      const filtered = interests.filter((i) => i !== interest);
      setInterests(filtered);
      setInterests(filtered);
    } else {
      if (interests.length < 8) {
        const updated = [...interests, interest];
        setInterests(updated);
        setInterests(updated);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col py-2 text-start">
        <p className="text-[1.4em] font-bold">Tú Estilo Tus Reglas</p>
        <p className="opacity-50">
          Esto nos ayuda a mostrarte contenido que realmente te gusta. Puedes
          cambiarlos después, no te preocupes.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {allInterests.map((interest) => {
          const isSelected = interests.includes(interest);
          const canSelectMore = interests.length < 8;

          return (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              disabled={!isSelected && !canSelectMore}
              className={`px-4 py-2 rounded-full font-semibold transition-colors
                ${
                  isSelected
                    ? "bg-[rgba(13,188,115,0.1)] border-2 text-[#0DBC73] border-[#0DBC73]"
                    : themeMode === "light"
                    ? "bg-[#F7F7F7] text-black"
                    : "bg-[#323332] text-white"
                }
                ${
                  !isSelected && !canSelectMore
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
              `}
            >
              {interest}
            </button>
          );
        })}
      </div>
    </div>
  );
};
