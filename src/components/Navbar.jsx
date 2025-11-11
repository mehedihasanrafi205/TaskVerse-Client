import React, { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "/logo.png";
import { AuthContext } from "../context/AuthContext";
import {
  BookCheck,
  Briefcase,
  CircleCheckBig,
  CirclePlus,
  House,
  Moon,
  StickyNote,
  Sun,
  TableOfContents,
  UserPen,
} from "lucide-react";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className="nav-link px-3 py-2 font-medium hover:text-secondary transition-colors duration-200"
        >
          <House size={17} />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-jobs"
          className="nav-link px-3 py-2 font-medium hover:text-secondary transition-colors duration-200"
        >
          <TableOfContents size={17} />
          All Jobs
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/add-job"
              className="nav-link px-3 py-2 font-medium hover:text-secondary transition-colors duration-200"
            >
              <CirclePlus size={17} />
              Add a Job
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/added-jobs"
              className="nav-link px-3 py-2 font-medium hover:text-secondary transition-colors duration-200"
            >
              <StickyNote size={17} />
              My Added Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accepted-tasks"
              className="nav-link px-3 py-2 font-medium hover:text-secondary transition-colors duration-200"
            >
              <CircleCheckBig size={17} />
              My Accepted Tasks
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <header className=" z-50 bg-linear-to-r from-primary to-[#053738] text-primary-content shadow-lg border-b border-secondary/50">
      <nav className="navbar container mx-auto py-3">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-primary text-primary-content rounded-box w-56"
            >
              {navItems}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="TaskVerse Logo"
              className="w-10 drop-shadow-md"
            />
            <h1 className="font-extrabold text-2xl tracking-wide hidden md:block logo-font ">
              Task
              <span className="text-secondary">Verse</span>
            </h1>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{navItems}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-secondary/60 transition-all"
              >
                <div className="w-10 h-10 border-2 border-secondary rounded-full overflow-hidden">
                  <img
                    alt="User Avatar"
                    referrerPolicy="no-referrer"
                    src={
                      user?.photoURL ||
                      "https://www.w3schools.com/howto/img_avatar.png"
                    }
                  />
                </div>
              </div>

              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-300 text-base-content rounded-box shadow-lg mt-3 p-3"
              >
                <div className="px-3 py-2 border-b border-gray-300/40 mb-2">
                  <p className="text-lg font-semibold">{user?.displayName}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>

                <li>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 hover:bg-secondary/20 rounded-md px-3 py-2 transition"
                  >
                    <UserPen size={16} /> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/accepted-tasks"
                    className="flex items-center gap-2 hover:bg-secondary/20 rounded-md px-3 py-2 transition"
                  >
                    <BookCheck size={16} /> My Tasks
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-jobs"
                    className="flex items-center gap-2 hover:bg-secondary/20 rounded-md px-3 py-2 transition"
                  >
                    <Briefcase size={16} /> My Jobs
                  </Link>
                </li>

                <li className="mt-2">
                  <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-secondary/20 transition">
                    <span className="flex items-center gap-2 font-medium text-sm">
                      <Sun size={16} />
                      Theme
                    </span>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <Sun
                        size={16}
                        className="text-yellow-400 transition-transform duration-300"
                      />

                      <input
                        onChange={(e) => handleTheme(e.target.checked)}
                        type="checkbox"
                        defaultChecked={
                          localStorage.getItem("theme") === "dark"
                        }
                        className="toggle theme-controller bg-secondary/30 border-secondary/40 scale-90"
                      />

                      <Moon
                        size={16}
                        className="text-green-800 transition-transform duration-300"
                      />
                    </label>
                  </div>
                </li>
                {/* Logout Button */}
                <li className="mt-2">
                  <button
                    onClick={signOutUser}
                    className="btn btn-secondary h-8 w-full text-primary font-semibold hover:opacity-90"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="space-x-2">
              <Link
                to="/auth/login"
                className="btn btn-outline border-secondary text-secondary hover:bg-secondary hover:text-primary transition-all"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="btn bg-secondary border-none text-primary hover:bg-[#e6bb32] transition-all"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
