import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaUsers,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logout } from "../features/auth/authSlice";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    window.location.href = "/";
  };

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors relative ${
      isActive
        ? "bg-blue-600/15 text-blue-400"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 text-white flex items-center justify-between px-4 z-50 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <FaUsers size={14} />
          </div>
          <span className="text-lg font-bold tracking-tight">Employee MS</span>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="p-2 -mr-2 text-slate-300 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-[1px] z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64 bg-slate-900 text-white
          flex flex-col
          border-r border-slate-800
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Mobile Close */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={() => setOpen(false)}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Logo */}
        <div className="hidden lg:flex items-center gap-2.5 px-6 pt-7 pb-8">
          <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center">
            <FaUsers size={16} />
          </div>
          <span className="text-xl font-bold tracking-tight">Employee MS</span>
        </div>

        {/* Nav */}
        <nav className="px-4 space-y-1 flex-1">
          <p className="px-4 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Menu
          </p>

          <NavLink to="/dashboard" className={linkStyle} onClick={() => setOpen(false)}>
            {({ isActive }) => (
              <>
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r bg-blue-500 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                <FaChartPie size={16} />
                Dashboard
              </>
            )}
          </NavLink>

          <NavLink to="/employees" className={linkStyle} onClick={() => setOpen(false)}>
            {({ isActive }) => (
              <>
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r bg-blue-500 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                <FaUsers size={16} />
                Employees
              </>
            )}
          </NavLink>
        </nav>

        {/* Logout, pinned to bottom */}
        <div className="px-4 pb-6 pt-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-red-500/10 hover:text-red-400 w-full transition-colors"
          >
            <FaSignOutAlt size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}