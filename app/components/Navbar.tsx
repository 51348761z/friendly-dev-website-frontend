import { useState } from "react";
import { FaBars, FaLaptopCode, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router";

const navLinks: Record<string, string> = {
  home: "/",
  about: "/about",
  projects: "/projects",
  blog: "/blog",
  contact: "/contact",
};

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinkBase = "transition-colors duration-200 hover:text-blue-400";
  const navLinkActive = "text-blue-400 font-semibold";

  return (
    <header className="sticky z-50 border-b border-gray-700 bg-gray-800 shadow-md">
      {/* Logo */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink
          to={"/"}
          className={"flex items-center gap-4 text-xl font-bold text-blue-400"}
        >
          <FaLaptopCode />
          <span className="capitalize">friendly dev website</span>
        </NavLink>

        {/* Desktop Nav */}
        <nav
          aria-label="Main navigation"
          className="hidden space-x-6 text-base text-gray-300 capitalize md:flex"
        >
          {Object.entries(navLinks).map(([label, to]) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                isActive ? navLinkActive : navLinkBase
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Nav Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            aria-label="Open menu"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="cursor-pointer text-xl text-blue-400"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="flex justify-center space-x-6 border-t border-gray-700 bg-gray-800 px-6 py-4 text-gray-300 capitalize md:hidden"
        >
          {Object.entries(navLinks).map(([label, to]) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                isActive ? navLinkActive : navLinkBase
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};
