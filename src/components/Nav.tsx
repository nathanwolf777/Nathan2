"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import FrameEnterButton from "@/components/FrameEnterButton";
import { useCart } from "@/lib/cart";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-lg font-semibold tracking-tight">
            Trophy<span className="gold-text">Frames</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-mist hover:text-pearl transition-colors duration-300"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/panier"
            className="relative text-mist hover:text-pearl transition-colors"
            aria-label="Panier"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-ink text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <FrameEnterButton
            href="/configurateur"
            className="text-sm px-5 py-2 rounded-full bg-pearl text-ink font-medium hover:bg-white transition-all duration-300 hover:scale-105"
          >
            Créer mon cadre
          </FrameEnterButton>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <Link
            href="/panier"
            className="relative text-pearl"
            aria-label="Panier"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-ink text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            aria-label="Menu"
          >
            <span
              className={`w-5 h-px bg-pearl transition-all ${
                open ? "rotate-45 translate-y-[3px]" : ""
              }`}
            />
            <span
              className={`w-5 h-px bg-pearl transition-all ${
                open ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <div className="px-5 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-mist hover:text-pearl"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/panier"
                onClick={() => setOpen(false)}
                className="text-sm text-mist hover:text-pearl flex items-center gap-2"
              >
                Panier{count > 0 ? ` (${count})` : ""}
              </Link>
              <FrameEnterButton
                href="/configurateur"
                className="text-sm px-5 py-2.5 rounded-full bg-pearl text-ink font-medium text-center w-full"
              >
                Créer mon cadre
              </FrameEnterButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
