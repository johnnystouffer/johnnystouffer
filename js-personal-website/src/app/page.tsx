"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const roles = [
    "CS Senior @ MSU",
    "SWE @ RTX",
    "Prev @ Tesla",
  ];
  const [currentText, setCurrentText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < roles[roleIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + roles[roleIndex][charIndex]);
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentText("");
        setCharIndex(0);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, roleIndex]);

  return (
    <div className="flex items-start justify-center p-10">
      <div className="animate-fadeIn text-left align-center">
        <h1 className="text-3xl font-bold">Hello! I'm Johnny Stouffer</h1>
        <h2
          className="text-xl italic h-8 font-semibold"
          aria-live="polite"
          aria-atomic="true"
        >
          {currentText}
        </h2>
        <p className="mt-4 max-w-lg">
          CS senior at Michigan State graduating in 2026. I build projects usually
          with React + Spring Boot, and ship C++ tools and applications in
          industry. Recent work:{" "}
          <a
            href="https://focus-youtube.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            FocusTube
          </a>{" "}
          (distraction and algorithm free YouTube) and{" "}
          <a
            href="https://odysseymaps.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            OdysseyMaps
          </a>{" "}
          (video game progress tracking); both live. I’m looking for 2026 new-grad SWE
          roles—reach out!
        </p>
      </div>
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
