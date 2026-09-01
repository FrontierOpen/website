"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

type Theme = "dark" | "light";
type ThemeMode = Theme | "system";

const storageKey = "frontier-theme:v1";
const themeChangeEvent = "frontier-theme-change";
const themeModes = ["system", "light", "dark"] as const;
const motionEase = [0.22, 1, 0.36, 1] as const;

const themeOptions: ReadonlyArray<{
  mode: ThemeMode;
  label: string;
  Icon: typeof Monitor;
}> = [
  { mode: "system", label: "跟随设备", Icon: Monitor },
  { mode: "light", label: "浅色", Icon: Sun },
  { mode: "dark", label: "深色", Icon: Moon },
];

function isThemeMode(value: string | null): value is ThemeMode {
  return value === "system" || value === "light" || value === "dark";
}

function getThemeModeSnapshot(): ThemeMode {
  if (typeof document === "undefined") {
    return "system";
  }
  const mode = document.documentElement.dataset.themeMode ?? null;
  return isThemeMode(mode) ? mode : "system";
}

function resolveTheme(mode: ThemeMode): Theme {
  if (mode !== "system") {
    return mode;
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyThemeMode(mode: ThemeMode, persist: boolean) {
  const theme = resolveTheme(mode);
  document.documentElement.dataset.themeMode = mode;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  const themeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]'
  );
  if (themeColor) {
    themeColor.content = theme === "light" ? "#ffffff" : "#050608";
  }

  if (persist) {
    try {
      window.localStorage.setItem(storageKey, mode);
    } catch {
      // The selected mode still applies for this page when storage is unavailable.
    }
  }

  window.dispatchEvent(new Event(themeChangeEvent));
}

function subscribeTheme(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: light)");

  const handleSystemTheme = () => {
    if (getThemeModeSnapshot() === "system") {
      applyThemeMode("system", false);
    }
  };

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== storageKey) {
      return;
    }
    applyThemeMode(isThemeMode(event.newValue) ? event.newValue : "system", false);
  };

  window.addEventListener(themeChangeEvent, onStoreChange);
  window.addEventListener("storage", handleStorage);
  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", handleSystemTheme);
  } else {
    media.addListener(handleSystemTheme);
  }

  return () => {
    window.removeEventListener(themeChangeEvent, onStoreChange);
    window.removeEventListener("storage", handleStorage);
    if (typeof media.removeEventListener === "function") {
      media.removeEventListener("change", handleSystemTheme);
    } else {
      media.removeListener(handleSystemTheme);
    }
  };
}

export default function ThemeToggle() {
  const mode: ThemeMode = useSyncExternalStore(
    subscribeTheme,
    getThemeModeSnapshot,
    (): ThemeMode => "system"
  );
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 64, left: 12 });
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Partial<Record<ThemeMode, HTMLButtonElement>>>({});
  const shouldReduceMotion = useReducedMotion();
  const activeOption =
    themeOptions.find((option) => option.mode === mode) ?? themeOptions[0]!;
  const ActiveIcon = activeOption.Icon;

  const updateMenuPosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) {
      return;
    }
    const rect = trigger.getBoundingClientRect();
    const menuWidth = 176;
    const menuHeight = 152;
    const viewportPadding = 12;
    const left = Math.min(
      window.innerWidth - menuWidth - viewportPadding,
      Math.max(viewportPadding, rect.right - menuWidth)
    );
    const top = Math.min(
      window.innerHeight - menuHeight - viewportPadding,
      Math.max(viewportPadding, rect.bottom + 8)
    );
    setMenuPosition((current) =>
      current.top === top && current.left === left ? current : { top, left }
    );
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const focusFrame = window.requestAnimationFrame(() => {
      updateMenuPosition();
      optionRefs.current[mode]?.focus();
    });
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !rootRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, { passive: true });
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition);
    };
  }, [mode, open, updateMenuPosition]);

  const selectMode = (nextMode: ThemeMode) => {
    applyThemeMode(nextMode, true);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const moveFocusFromTrigger = (backward: boolean) => {
    const trigger = triggerRef.current;
    if (!trigger) {
      return;
    }
    const focusable = Array.from(
      document.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(
      (element) =>
        element.getClientRects().length > 0 &&
        (element === trigger ||
          (!rootRef.current?.contains(element) &&
            !menuRef.current?.contains(element)))
    );
    const triggerIndex = focusable.indexOf(trigger);
    const nextIndex = triggerIndex + (backward ? -1 : 1);
    const nextElement = focusable[nextIndex];
    setOpen(false);
    window.requestAnimationFrame(() => (nextElement ?? trigger).focus());
  };

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      event.preventDefault();
      moveFocusFromTrigger(event.shiftKey);
      return;
    }
    if (
      !event.key.startsWith("Arrow") &&
      event.key !== "Home" &&
      event.key !== "End"
    ) {
      return;
    }
    event.preventDefault();
    const focusedIndex = themeModes.findIndex(
      (themeMode) => optionRefs.current[themeMode] === document.activeElement
    );
    const currentIndex =
      focusedIndex >= 0 ? focusedIndex : Math.max(0, themeModes.indexOf(mode));
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? themeModes.length - 1
          : event.key === "ArrowDown" || event.key === "ArrowRight"
            ? (currentIndex + 1) % themeModes.length
            : (currentIndex - 1 + themeModes.length) % themeModes.length;
    optionRefs.current[themeModes[nextIndex]]?.focus();
  };

  const toggleMenu = () => {
    if (!open) {
      updateMenuPosition();
    }
    setOpen((current) => !current);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggleMenu}
        aria-label={`选择主题，当前：${activeOption.label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="theme-mode-menu"
        title={`主题：${activeOption.label}`}
        suppressHydrationWarning
        className="theme-control inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-full border-0 bg-transparent px-3 text-[13px] font-medium text-white transition-[background,color,transform] duration-200 hover:bg-white/[0.12] active:scale-[0.96]"
      >
        <ActiveIcon aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
        <span className="hidden xl:inline">主题</span>
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(
            <motion.div
              ref={menuRef}
              id="theme-mode-menu"
              role="menu"
              aria-label="主题选择"
              onKeyDown={handleMenuKeyDown}
              className="theme-mode-menu fixed z-[60] flex w-44 flex-col gap-1 p-1.5"
              style={{ top: menuPosition.top, left: menuPosition.left }}
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: -6, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.18,
                ease: motionEase,
              }}
            >
              {themeOptions.map(({ mode: optionMode, label, Icon }) => {
                const selected = mode === optionMode;
                return (
                  <button
                    key={optionMode}
                    ref={(element) => {
                      optionRefs.current[optionMode] = element ?? undefined;
                    }}
                    type="button"
                    role="menuitemradio"
                    aria-checked={selected}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => selectMode(optionMode)}
                    className="theme-mode-option flex min-h-11 w-full items-center gap-3 rounded-full px-3 text-left text-sm transition-[background,color]"
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0"
                      strokeWidth={1.8}
                    />
                    <span className="flex-1">{label}</span>
                    <Check
                      aria-hidden="true"
                      className={`h-4 w-4 shrink-0 transition-opacity ${selected ? "opacity-100" : "opacity-0"}`}
                      strokeWidth={2}
                    />
                  </button>
                );
              })}
            </motion.div>,
            document.body
          )
        : null}
    </div>
  );
}
