"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    const checkLogin = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error reading user from localStorage:", err);
        setUser(null);
      }
    };

    // Check when Navbar loads
    checkLogin();

    // Check when login/logout happens
const loggedIn = localStorage.getItem("isLoggedIn");

  setIsLoggedIn(loggedIn === "true");
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    if (profileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    window.dispatchEvent(new Event("logout"));
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Templates", href: "/template" },
    { name: "Features", href: "#features" },
    
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-md shadow-sm border-b border-zinc-200/90"
          : "bg-white/75 backdrop-blur-md border-b border-zinc-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
            >
              {/* Modern Logo Mark */}
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                  <line x1="4" y1="22" x2="4" y2="15" />
                </svg>
              </div>

              {/* Brand Typography */}
              <span className="text-xl font-bold tracking-tight text-zinc-900">
                Prep
                <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  X
                </span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 ${
                      active
                        ? "text-indigo-600 bg-indigo-50/80 font-semibold"
                        : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Desktop Actions & CTA */}
          <div className="hidden md:flex items-center gap-3">
  {!isLoggedIn ? (
    <>
      <Link
        href="/login"
        className="text-sm font-medium text-zinc-700 hover:text-zinc-950 px-3.5 py-2 rounded-lg hover:bg-zinc-100/80 transition-colors"
      >
        Log in
      </Link>

      <Link
        href="/register"
        className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-sm shadow-indigo-500/20 hover:shadow-md hover:shadow-indigo-500/30 active:scale-[0.98] transition-all duration-200"
      >
        <span>Get Started Free</span>

        <svg
          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </Link>
    </>
  ) : (
    <div className="relative" ref={profileDropdownRef}>
      <button
        type="button"
        onClick={() => setProfileDropdownOpen((prev) => !prev)}
        aria-expanded={profileDropdownOpen}
        aria-haspopup="true"
        aria-label="User profile menu"
        className="flex items-center gap-2 p-1 pr-2.5 rounded-full border border-zinc-200/90 hover:border-indigo-300 bg-zinc-50/70 hover:bg-zinc-100/70 transition-all duration-200 shadow-xs hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
      >
        {/* Profile Avatar Icon */}
        <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm ring-2 ring-white">
          {user?.name ? (
            <span>{user.name.trim().charAt(0).toUpperCase()}</span>
          ) : (
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
          {/* Active online dot */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
        </div>

        {/* User name or label */}
        <span className="text-sm font-medium text-zinc-800 max-w-[110px] truncate">
          {user?.name || "Profile"}
        </span>

        {/* Dropdown Chevron */}
        <svg
          className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${
            profileDropdownOpen ? "rotate-180 text-indigo-600" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {/* Profile Dropdown Menu */}
      {profileDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200/90 shadow-xl shadow-zinc-950/10 py-2 z-50 transition-all">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-zinc-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
              {user?.name ? (
                user.name.trim().charAt(0).toUpperCase()
              ) : (
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-zinc-900 truncate">
                {user?.name || "PrepX User"}
              </p>
              <p className="text-xs text-zinc-500 truncate">
                {user?.email || "user@prepx.com"}
              </p>
            </div>
          </div>

          {/* Quick Menu Links */}
          <div className="py-1">
            <Link
              href="/dashboard"
              onClick={() => setProfileDropdownOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 transition-colors"
            >
              <svg
                className="w-4 h-4 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
              </svg>
              Dashboard
            </Link>

            <Link
              href="/template"
              onClick={() => setProfileDropdownOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 transition-colors"
            >
              <svg
                className="w-4 h-4 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              Templates
            </Link>
          </div>

          {/* Logout Action */}
          <div className="pt-1 border-t border-zinc-100">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50/80 transition-colors text-left cursor-pointer"
            >
              <svg
                className="w-4 h-4 text-rose-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  )}
</div>
          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200/80 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 text-base font-medium rounded-lg transition-colors ${
                    active
                      ? "text-indigo-600 bg-indigo-50/80 font-semibold"
                      : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

      <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2">
  {!isLoggedIn ? (
    <>
      {/* Login */}
      <Link
        href="/login"
        onClick={() => setMobileMenuOpen(false)}
        className="w-full text-center py-2.5 text-sm font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-xl transition-colors"
      >
        Log in
      </Link>

      {/* Get Started Free */}
      <Link
        href="/register"
        onClick={() => setMobileMenuOpen(false)}
        className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-sm active:scale-[0.98] transition-all"
      >
        <span>Get Started Free</span>

        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </Link>
    </>
  ) : (
    <>
      {/* Dashboard */}
      <Link
        href="/dashboard"
        onClick={() => setMobileMenuOpen(false)}
        className="w-full text-center py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600"
      >
        Dashboard
      </Link>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="w-full text-center py-2.5 text-sm font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer"
      >
        Log out
      </button>
    </>
  )}
</div>
        </div>
      )}
    </header>
  );
};

export default Navbar;