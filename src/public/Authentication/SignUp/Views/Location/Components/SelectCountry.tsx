import { useTheme } from "@/context/ThemeContext";
import { useEffect, useMemo, useState, useCallback } from "react";
import { mdiChevronUp, mdiChevronDown } from "@mdi/js";
import Icon from "@mdi/react";

type Country = { value: string; label: string; iso: string };

const baseStyles = {
  light: {
    container: "bg-[#F7F7F7] text-black border-black/5",
    input: "bg-[#F7F7F7] text-black border-black/10 placeholder-black/40",
    dropdownHover: "hover:bg-[#E2E2E2]",
  },
  dark: {
    container: "bg-[#323332] text-white border-white/5",
    input: "bg-[#323332] text-white border-white/10 placeholder-white/40",
    dropdownHover: "hover:bg-white/10",
  },
};

interface SelectCountryProps {
  country: string;
  setCountry: (countryIso: string) => void | Promise<void>;
}

export const SelectCountry: React.FC<SelectCountryProps> = ({
  country,
  setCountry,
}) => {
  const { themeMode } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);

  const toggleDropdown = useCallback(
    () => setDropdownOpen((prev) => !prev),
    []
  );

  const fetchCountries = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/iso"
      );
      const data = await res.json();

      if (!data.data || !Array.isArray(data.data)) throw new Error();

      const countryList: Country[] = data.data.map(
        (item: { name: string; Iso2: string }) => ({
          value: item.name,
          label: item.name,
          iso: item.Iso2,
        })
      );

      setCountries(countryList.sort((a, b) => a.label.localeCompare(b.label)));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const filteredCountries = useMemo(() => {
    if (!search.trim()) return countries;
    return countries.filter((c) =>
      c.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, countries]);

  const selectedLabel: string =
    countries.find((c) => c.iso === country)?.label || "Selecciona un país";

  const handleKeyDownToggle = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleDropdown();
      }
    },
    [toggleDropdown]
  );

  const handleKeyDownSelect = useCallback(
    (
      e: React.KeyboardEvent<HTMLLIElement>,
      country: Country,
      closeDropdown: () => void
    ) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setCountry(country.iso);
        closeDropdown();
        setSearch("");
      }
    },
    [setCountry]
  );

  return (
    <div className="relative">
      {/* Selector principal */}
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={dropdownOpen}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDownToggle}
        className={`cursor-pointer flex justify-between items-center rounded-xl border px-4 py-3 w-full text-[16px] md:text-[1em] ${baseStyles[themeMode].container}`}
      >
        {loading ? (
          <span className="opacity-60">Cargando países...</span>
        ) : error ? (
          <span className="text-red-500">Error al cargar</span>
        ) : (
          <span className="font-semibold">{selectedLabel}</span>
        )}
        <Icon path={dropdownOpen ? mdiChevronUp : mdiChevronDown} size={1} />
      </div>

      {/* Dropdown */}
      {dropdownOpen && !loading && !error && (
        <div
          role="listbox"
          tabIndex={-1}
          className={`absolute mt-2 z-10 w-full max-h-72 rounded-xl border shadow-md overflow-hidden ${baseStyles[themeMode].container}`}
        >
          <input
            type="text"
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar país..."
            aria-label="Buscar país"
            className={`text-[16px] w-full px-4 py-2 border-b outline-none ${baseStyles[themeMode].input}`}
          />
          <ul className="max-h-56 overflow-y-auto">
            {filteredCountries.length === 0 ? (
              <li className="px-4 py-3 opacity-60">No se encontró país</li>
            ) : (
              filteredCountries.map((c) => (
                <li
                  key={c.value}
                  role="option"
                  aria-selected={country === c.value}
                  tabIndex={0}
                  onClick={() => {
                    setCountry(c.iso);
                    setDropdownOpen(false);
                    setSearch("");
                  }}
                  onKeyDown={(e) =>
                    handleKeyDownSelect(e, c, () => setDropdownOpen(false))
                  }
                  className={`px-4 py-3 cursor-pointer text-start flex items-center gap-2 ${baseStyles[themeMode].dropdownHover}`}
                >
                  <img
                    src={`https://flagcdn.com/24x18/${c.iso.toLowerCase()}.png`}
                    alt={`Bandera de ${c.label}`}
                    className="inline-block"
                    width={24}
                    height={18}
                  />
                  {c.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
