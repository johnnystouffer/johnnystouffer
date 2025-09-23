"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Home() {
  const roles = useMemo(
    () => ["CS Senior @ MSU", "SWE @ RTX", "Prev @ Tesla"],
    []
  );

  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    const current = roles[roleIndex % roles.length];
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const TYPING_MS = prefersReduced ? 0 : 55;
    const DELETING_MS = prefersReduced ? 0 : 30;
    const HOLD_MS = prefersReduced ? 800 : 1200;

    let timer: number | null = null;

    const tick = () => {
      if (!mounted.current) return;

      if (!isDeleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          timer = window.setTimeout(() => setIsDeleting(true), HOLD_MS);
          return;
        }
        timer = window.setTimeout(tick, TYPING_MS);
      } else {
        const next = current.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (next.length === 0) {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % roles.length);
          timer = window.setTimeout(tick, TYPING_MS);
          return;
        }
        timer = window.setTimeout(tick, DELETING_MS);
      }
    };

    timer = window.setTimeout(tick, isDeleting ? DELETING_MS : TYPING_MS);

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [text, isDeleting, roleIndex, roles]);

  const reduce = useReducedMotion();

  return (
    <div className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_50%_at_50%_20%,black,transparent)]"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent dark:via-muted/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.08),transparent_35%),radial-gradient(circle_at_80%_0%,hsl(var(--secondary)/0.08),transparent_35%)]" />
      </div>

      <motion.section
        className="mx-auto max-w-3xl px-6 pt-28 sm:pt-36"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="inline-flex items-center rounded-full border bg-background/60 px-3 py-1 text-xs sm:text-sm shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/40">
          <motion.span className="relative mr-2 inline-block" aria-hidden>
            <motion.span
              className="block size-1.5 sm:size-2 rounded-full bg-emerald-500"
              animate={
                reduce
                  ? {}
                  : {
                      scale: [1, 1.15, 1],
                      filter: ["brightness(1)", "brightness(1.6)", "brightness(1)"],
                    }
              }
              transition={reduce ? {} : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: "0 0 0px 0px rgba(16,185,129,0.0)" }}
              animate={
                reduce
                  ? {}
                  : {
                      boxShadow: [
                        "0 0 0px 0px rgba(16,185,129,0.0)",
                        "0 0 14px 6px rgba(16,185,129,0.35)",
                        "0 0 0px 0px rgba(16,185,129,0.0)",
                      ],
                    }
              }
              transition={reduce ? {} : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.span>
          <span>New-grad 2026</span>
        </div>

        <motion.h1
          className="mt-4 text-4xl sm:text-6xl font-bold tracking-tight leading-tight"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text">
            Hello, I&apos;m Johnny Stouffer
          </span>
        </motion.h1>

        <motion.h2
          className="mt-2 text-lg sm:text-2xl font-semibold italic h-7 sm:h-8"
          key={roleIndex}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="align-middle">{text}</span>
          <span className="ml-px align-middle select-none after:content-['|'] after:animate-pulse" aria-hidden />
        </motion.h2>

        <motion.p
          className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          CS senior at Michigan State graduating in 2026. I build projects with
          React + Spring Boot and ship C++ tools in industry. Recent work:{" "}
          <a
            href="https://focus-youtube.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-4 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            FocusTube
          </a>{" "}
          (distraction and algorithm free YouTube) and{" "}
          <a
            href="https://odysseymaps.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-4 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            OdysseyMaps
          </a>{" "}
          (video game progress tracking); both live. Feel free to reach out!
        </motion.p>
      </motion.section>
    </div>
  );
}