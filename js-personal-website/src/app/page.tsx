"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const roles = [
    "CS Senior @ MSU",
    "SWE @ RTX Collins Aerospace",
    "Prev @ Tesla",
  ];
  const [currentText, setCurrentText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // typing effect
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
    <div className="min-h-screen  flex items-start justify-start p-10">
      <div className="animate-fadeIn text-left">
        <h1 className="text-4xl font-bold">Hello, I am Johnny Stouffer</h1>
        <h2 className="text-xl italic h-8">{currentText}</h2>
        <p className="mt-4 max-w-lg">
          Hello! I am a CS Senior about to graduate from Michigan State University{" "}
          <span className="text-green-600 font-semibold">(Go green!)</span>. My
          experience ranges, most of my projects have been web development using React
          and SpringBoot, while in the workforce I have done more low-level programming
          with C++ and Qt Creator. Currently, I am finishing up{" "}
          <a
            href="https://focus-youtube.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            FocusTube
          </a>{" "}
          and{" "}
          <a
            href="https://odysseymaps.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            OdysseyMaps
          </a>{" "}
          and am starting to learn Computer Vision and Game development on the side!
          Feel free to reach out!
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
