"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Topbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Refs for outside-click logic
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]); // close on route change

  // close on outside click or Escape
  useEffect(() => {
    if (!open) return;

    const onDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      const clickedInsideMenu = !!(menuRef.current && target && menuRef.current.contains(target));
      const clickedTrigger = !!(triggerRef.current && target && triggerRef.current.contains(target));
      // Ignore clicks on the trigger so the button can toggle state without being "canceled" by outside-click
      if (!clickedInsideMenu && !clickedTrigger) setOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const hideName = pathname === "/";

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Experience", path: "/experience" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <nav className="relative z-50 flex items-center justify-between p-1">
      {/* Desktop */}
      <div className="w-full flex items-center justify-between max-[1000px]:hidden">
        <div className="flex-1 flex">
          {!hideName && (
            <h1 className="text-2xl p-2 pl-6 font-extrabold">Johnny Stouffer</h1>
          )}
        </div>

        <ul className="flex gap-6 text-lg">
          {navItems.map((item) => {
            const active = pathname === item.path;
            return (
              <li key={item.name}>
                <Link href={item.path} className="relative group p-2">
                  <span className={active ? "font-semibold" : ""}>{item.name}</span>
                  <span
                    className={`absolute left-0 bottom-1 h-[2px] bg-current transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    aria-hidden
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex-1 flex justify-end items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full"
            aria-label="Toggle theme"
          >
            {!mounted ? null : resolvedTheme === "dark" ? (
              <i className="las la-sun text-3xl" />
            ) : (
              <i className="las la-moon text-3xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile <1000px */}
      <div className="w-full items-center justify-between min-[1000px]:hidden flex">
        <button
          ref={triggerRef}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="p-3"
        >
          <i className={open ? "las la-times text-3xl" : "las la-bars text-3xl"} />
        </button>

        <div className="text-lg font-semibold">Johnny Stouffer</div>

        <button
          onClick={toggleTheme}
          className="p-3 rounded-full"
          aria-label="Toggle theme"
        >
          {!mounted ? null : resolvedTheme === "dark" ? (
            <i className="las la-sun text-3xl" />
          ) : (
            <i className="las la-moon text-3xl" />
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`min-[1000px]:hidden absolute left-0 right-0 top-full origin-top supports-[backdrop-filter]:bg-background/70 bg-background/95 backdrop-blur-md border-b shadow-lg transition-transform duration-200 overflow-hidden ${
          open ? "scale-y-100 pointer-events-auto" : "scale-y-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <ul className="flex flex-col py-2">
          {navItems.map((item) => {
            const active = pathname === item.path;
            return (
              <li key={item.name}>
                <Link href={item.path} className="block px-4 py-3 relative">
                  <span className={active ? "font-semibold" : ""}>{item.name}</span>
                  <span
                    className={`absolute left-4 right-4 bottom-2 h-px bg-current transition-opacity ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
