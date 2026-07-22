import { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({ search, setSearch }: Props) {
  const [value, setValue] = useState(search);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setValue(search);
  }, [search]);

  useEffect(() => {
    if (value === search) {
      setPending(false);
      return;
    }
    setPending(true);
    const timer = setTimeout(() => {
      setSearch(value);
      setPending(false);
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [value, search, setSearch]);
  return (
    <div className="relative mb-4">
      <FaSearch
        size={14}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search employee..."
        className="w-full border border-slate-300 rounded-lg pl-10 pr-9 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {value && (
        <button
          onClick={() => {
            setValue("");
            setSearch("");
          }}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          {pending ? (
            <span className="block h-3.5 w-3.5 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
          ) : (
            <FaTimes size={13} />
          )}
        </button>
      )}
    </div>
  );
}