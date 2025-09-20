"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Topbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav className="flex items-center justify-between p-1">
        <div className="flex-1 flex">
            <h1 className="text-4xl font-extrabold">John Stouffer</h1>
        </div>

        <ul className="flex gap-4 text-lg">
            <li className="p-2 cursor-pointer hover:underline">Home</li>
            <li className="p-2 cursor-pointer hover:underline">Experience</li>
            <li className="p-2 cursor-pointer hover:underline">Projects</li>
            <li className="p-2 cursor-pointer hover:underline">Other</li>
            <li className="p-2 cursor-pointer hover:underline">Contact</li>
        </ul>

        <div className="flex-1 flex justify-end items-center gap-4">
            <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-3 rounded-full cursor-pointer"
            aria-label="Toggle theme"
            >
            {!mounted ? null : resolvedTheme === "dark"
                ? <i className="las la-sun text-3xl" />
                : <i className="las la-moon text-3xl" />}
            </button>
        </div>
    </nav>
  );
}
