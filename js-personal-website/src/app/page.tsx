"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const roles = ["CS Senior @ MSU", "SWE @ RTX", "Prev @ Tesla"];
  const [currentText, setCurrentText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < roles[roleIndex].length) {
      const t = setTimeout(() => {
        setCurrentText((prev) => prev + roles[roleIndex][charIndex]);
        setCharIndex((c) => c + 1);
      }, 100);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCurrentText("");
        setCharIndex(0);
        setRoleIndex((i) => (i + 1) % roles.length);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [charIndex, roleIndex, roles]);

  return (
    <motion.div
      className="flex items-start justify-center p-15"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className="text-left align-center max-w-2xl sm:max-w-3xl scale-105 sm:scale-110"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 1 },
          show: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
      >
        <motion.h1
          className="text-3xl sm:text-5xl font-bold"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          Hello! I'm Johnny Stouffer
        </motion.h1>

        <motion.h2
          className="text-xl sm:text-2xl italic h-8 font-semibold mt-1"
          aria-live="polite"
          aria-atomic="true"
          key={roleIndex}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {currentText}
        </motion.h2>

        <motion.p
          className="mt-6 text-base sm:text-lg max-w-xl sm:max-w-2xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
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
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
