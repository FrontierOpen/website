"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "为什么", href: "#why" },
  { label: "三大动作", href: "#actions" },
  { label: "工作方法", href: "#method" },
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const handleDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileMenuOpen(false);
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
      data-transparent-at-top="true"
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
          className="group flex min-w-0 items-center gap-3 rounded-lg"
        >
          <img
            src="/passage-mark-white.svg"
            alt=""
            width="28"
            height="28"
            className="h-7 w-7 shrink-0 opacity-95 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="truncate text-sm font-semibold text-white">
            Frontier World
          </span>
          <span className="hidden text-xs text-white/84 sm:inline">前沿之境</span>
        </a>

        <nav
          className="hidden items-center gap-7 text-[13px] text-white/84 md:flex"
          aria-label="主导航"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-1.5 rounded-md py-2 transition-colors duration-200 hover:text-white"
            >
              <span>{link.label}</span>
              {link.external ? (
                <ArrowUpRight className="h-3.5 w-3.5 opacity-55 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              ) : null}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href="#contact"
            className="header-cta group hidden h-10 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium sm:inline-flex"
          >
            <span>发起实践</span>
            <ArrowRight className="h-3.5 w-3.5 opacity-60 transition-[opacity,transform] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border-0 bg-transparent text-white transition-[background,transform] duration-200 hover:bg-white/[0.1] active:scale-[0.94] md:hidden"
            aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        hidden={!mobileMenuOpen}
        className="mobile-sheet p-3 md:hidden"
      >
        <nav className="grid" aria-label="移动端主导航">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              onClick={closeMenu}
              className="flex min-h-12 items-center justify-between rounded-md px-3 text-sm text-white/72 transition-colors hover:bg-white/[0.07] hover:text-white"
            >
              <span>{link.label}</span>
              {link.external ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4 opacity-45" />
              )}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="mt-2 flex min-h-12 items-center justify-between rounded-md bg-white px-3 text-sm font-semibold text-black active:scale-[0.98]"
          >
            <span>带着问题来</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}
