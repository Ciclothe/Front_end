import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { mdiChevronUp, mdiChevronDown } from "@mdi/js";
import Icon from "@mdi/react";

type CityType = {
  value: string;
  label: string;
  lat: number;
  lng: number;
};

interface SelectCityProps {
  country: string;
  city:
    | string
    | {
        name: string;
        lat: number;
        lng: number;
      };
  setCity: (city: {
    name: string;
    lat: number;
    lng: number;
  }) => void | Promise<void>;
}

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

const normalizeCityName = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export const SelectCity: React.FC<SelectCityProps> = ({
  country,
  city,
  setCity,
}) => {
  const { themeMode } = useTheme();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState<CityType[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cityCache = useRef<Map<string, CityType[]>>(new Map());

  const toggleDropdown = useCallback(
    () => setDropdownOpen((prev) => !prev),
    []
  );

  useEffect(() => {
    if (dropdownOpen && inputRef.current) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [dropdownOpen]);

  useEffect(() => {
    if (!country) {
      setCities([]);
      setCity({ name: "", lat: 0, lng: 0 });
      return;
    }

    const cached = cityCache.current.get(country);
    if (cached) {
      setCities(cached);
      return;
    }

    const fetchCities = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch(
          `http://api.geonames.org/searchJSON?country=${encodeURIComponent(
            country
          )}&featureClass=P&maxRows=1000&username=ciclothe`
        );
        const data = await response.json();
        if (!data.geonames || !Array.isArray(data.geonames)) throw new Error();

        const cityList: CityType[] = data.geonames.map(
          (c: { name: string; lat: string; lng: string }) => ({
            value: c.name,
            label: c.name,
            lat: parseFloat(c.lat),
            lng: parseFloat(c.lng),
          })
        );

        const sortedList = cityList.sort((a, b) =>
          a.label.localeCompare(b.label)
        );

        cityCache.current.set(country, sortedList);
        setCities(sortedList);
      } catch {
        setError(true);
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [country, setCity]);

  const filteredCities = useMemo(() => {
    if (!search.trim()) return cities.slice(0, 100);
    const normalizedSearch = normalizeCityName(search);
    return cities
      .filter((c) => normalizeCityName(c.label).includes(normalizedSearch))
      .slice(0, 100);
  }, [search, cities]);

  const selectedLabel =
    cities.find(
      (c) =>
        normalizeCityName(c.value) ===
        normalizeCityName(typeof city === "string" ? city : city.name)
    )?.label || "Selecciona una ciudad";

  const handleKeyDownToggle = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleDropdown();
      }
    },
    [toggleDropdown]
  );

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div ref={containerRef} className="relative">
      <div
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={dropdownOpen}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDownToggle}
        className={`cursor-pointer flex justify-between items-center rounded-xl border px-4 py-3 w-full text-[16px] md:text-[1em] transition-all duration-200 ease-in-out ${baseStyles[themeMode].container}`}
      >
        {loading ? (
          <span className="opacity-60">Cargando ciudades...</span>
        ) : error ? (
          <span className="text-red-500">Error al cargar</span>
        ) : (
          <span className="font-semibold">{selectedLabel}</span>
        )}
        <Icon path={dropdownOpen ? mdiChevronUp : mdiChevronDown} size={1} />
      </div>

      {dropdownOpen && !loading && !error && (
        <div
          role="listbox"
          tabIndex={-1}
          className={`absolute mt-2 z-10 w-full max-h-72 rounded-xl border shadow-md overflow-hidden transition-all duration-200 ease-in-out ${baseStyles[themeMode].container}`}
        >
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar ciudad..."
            aria-label="Buscar ciudad"
            className={`text-[16px] w-full px-4 py-2 border-b outline-none ${baseStyles[themeMode].input}`}
          />
          <ul className="max-h-56 overflow-y-auto">
            {filteredCities.length === 0 ? (
              <li className="px-4 py-3 opacity-60">No se encontró ciudad</li>
            ) : (
              filteredCities.map(({ value, label, lat, lng }, index) => (
                <li
                  key={`${value}-${index}`}
                  role="option"
                  aria-selected={city === value}
                  tabIndex={0}
                  onClick={() => {
                    setCity({ name: value, lat, lng });
                    setDropdownOpen(false);
                    setSearch("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setCity({ name: value, lat, lng });
                      setDropdownOpen(false);
                      setSearch("");
                    }
                  }}
                  className={`px-4 py-3 cursor-pointer text-start ${baseStyles[themeMode].dropdownHover}`}
                >
                  {label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
