"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import BrandMark from "./BrandMark";
import ThemeToggle from "./ThemeToggle";

const motionEase = [0.22, 1, 0.36, 1] as const;

const navLinks = [
  { label: "适合谁", href: "#fit" },
  { label: "公开证据", href: "#proof" },
  { label: "创始班", href: "#commons" },
  {
    label: "Frontier Signals",
    href: "https://signals.frontierworld.ai/",
    external: true,
  },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    const syncFrame = window.requestAnimationFrame(handleScroll);
    const syncTimer = window.setTimeout(handleScroll, 250);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleScroll);
    window.addEventListener("pageshow", handleScroll);
    return () => {
      window.cancelAnimationFrame(syncFrame);
      window.clearTimeout(syncTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleScroll);
      window.removeEventListener("pageshow", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    desktopQuery.addEventListener("change", handleDesktop);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      desktopQuery.removeEventListener("change", handleDesktop);
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header
      data-site-header
      className={
        "fixed inset-x-0 top-0 z-50 " +
        (scrolled ? "is-scrolled " : "") +
        (mobileMenuOpen ? "is-menu-open" : "")
      }
    >
      <div className="site-header-bar flex items-center justify-between">
        <a
          href="#top"
          aria-label="Frontier World 首页"
          className="group flex min-h-10 min-w-0 items-center gap-3 rounded-full"
        >
          <BrandMark className="h-8 w-8 transition-transform duration-300 group-hover:scale-105" />
          <span className="truncate text-sm font-semibold text-white">Frontier World</span>
          <span className="hidden text-xs text-white/58 sm:inline">前沿之境</span>
        </a>

        <nav
          className="hidden items-center gap-6 text-[13px] text-white/68 lg:flex"
          aria-label="主导航"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group flex min-h-10 items-center gap-1.5 rounded-full px-3 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
            >
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href="#apply"
            className="header-cta group hidden h-10 items-center rounded-full px-3 text-[13px] font-medium lg:inline-flex"
          >
            <span>申请创始席位</span>
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="header-menu-button flex h-10 w-10 items-center justify-center rounded-full border-0 bg-transparent text-white transition-[background,transform] duration-200 hover:bg-white/[0.1] active:scale-[0.94] lg:hidden"
            aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {mobileMenuOpen ? (
          <motion.div
            id="mobile-navigation"
            className="mobile-sheet p-3 lg:hidden"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.985 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.22,
              ease: motionEase,
            }}
          >
            <nav className="grid" aria-label="移动端主导航">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={closeMenu}
                  className="flex min-h-12 items-center justify-between rounded-full px-4 text-sm text-white/74 transition-colors hover:bg-white/[0.07] hover:text-white"
                >
                  <span>{link.label}</span>
                </a>
              ))}
              <a
                href="#apply"
                onClick={closeMenu}
                className="mt-2 flex min-h-12 items-center justify-between rounded-full bg-white px-4 text-sm font-semibold text-black transition-colors hover:bg-white/90 active:scale-[0.98]"
              >
                <span>申请创始席位</span>
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
