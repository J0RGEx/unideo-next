"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/logo-unideo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Main navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              {/* Logo image placeholder */}
              <Image src={logo} alt="UNIDEO" width={220} height={48} />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-xs font-semibold text-gray-700 uppercase tracking-widest hover:text-[#1a3a6e] transition-colors"
              >
                Diplomado en Ortodoncia
              </Link>
              <Link
                href="/contacto"
                className="text-xs font-semibold text-gray-700 uppercase tracking-widest hover:text-[#1a3a6e] transition-colors"
              >
                Contacto
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              <span
                className={`block w-5 h-0.5 bg-gray-700 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-gray-700 transition-opacity ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-gray-700 transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden border-t border-gray-100 py-3 flex flex-col gap-3">
              <Link
                href="/"
                className="text-xs font-semibold text-gray-700 uppercase tracking-widest hover:text-[#1a3a6e] py-1"
                onClick={() => setMenuOpen(false)}
              >
                Diplomado en Ortodoncia
              </Link>
              <Link
                href="/contacto"
                className="text-xs font-semibold text-gray-700 uppercase tracking-widest hover:text-[#1a3a6e] py-1"
                onClick={() => setMenuOpen(false)}
              >
                Contacto
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
