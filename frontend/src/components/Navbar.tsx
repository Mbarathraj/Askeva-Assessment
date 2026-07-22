import { useState, useRef, useEffect } from "react";
import { FaBell, FaSearch, FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logout } from "../features/auth/authSlice";

export default function Navbar() {
  const { user } = useAppSelector((state) => state.auth) as {
    user: { name?: string; email?: string } | null;
  };
  const dispatch = useAppDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await dispatch(logout());
    window.location.href = "/";
  };

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between sticky top-0 z-30">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800">
        Dashboard
      </h2>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search - hidden on small screens */}
        <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 w-56 lg:w-72">
          <FaSearch size={13} className="text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search employees..."
            className="bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400 w-full"
          />
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          aria-label="Notifications"
        >
          <FaBell size={17} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Profile */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm ring-2 ring-blue-100 shrink-0">
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </div>

            <div className="hidden sm:block text-left">
              <p className="font-semibold text-sm text-slate-800 leading-tight">
                {user?.name ?? "Admin"}
              </p>
              <p className="text-xs text-slate-500 truncate max-w-[140px] leading-tight">
                {user?.email}
              </p>
            </div>

            <FaChevronDown
              size={11}
              className={`hidden sm:block text-slate-400 transition-transform ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-100 py-1.5 z-40">
              <div className="px-4 py-2 border-b border-slate-100 sm:hidden">
                <p className="font-semibold text-sm text-slate-800">
                  {user?.name ?? "Admin"}
                </p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>

              <button className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                <FaUser size={13} />
                My Profile
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <FaSignOutAlt size={13} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}