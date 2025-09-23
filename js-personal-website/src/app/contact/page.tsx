// app/contact/page.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EMAILS = [
  { label: "MSU Email", address: "stouff17@msu.edu" },
  { label: "Personal Email", address: "johnstouffer18@gmail.com" },
];

const LINKS = {
  linkedin: "https://linkedin.com/in/johnny-stouffer/",
  github: "https://github.com/johnnystouffer",
  resume: "/John_Stouffer_Resume_Master.pdf",
};

const listVariants = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default function ContactPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  async function copyEmail(address: string) {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(address);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  }

  const fadeUp = useMemo(
    () => ({
      initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6 },
    }),
    [prefersReducedMotion]
  );

  return (
    <main className="relative min-h-[calc(100dvh-4rem)] px-4 py-10 overflow-hidden">


      <section className="relative mx-auto max-w-3xl">
        <div className="text-center">
          <motion.h1
            className="text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.2)]"
            {...fadeUp}
          >
            Contact
          </motion.h1>
          <motion.p
            className="mt-3 text-xs sm:text-base text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            Copy an email or use the links below.
          </motion.p>
        </div>

        <motion.div
          className="mt-8 rounded-[2rem] overflow-hidden backdrop-blur-2xl bg-white/5 dark:bg-white/5 border border-white/15"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <motion.div
              className="relative p-6 sm:p-8 grid gap-4"
              variants={listVariants}
              initial="hidden"
              animate="show"
            >
              {EMAILS.map((email) => (
                <motion.div
                  key={email.address}
                  className="group relative rounded-2xl p-[1px]"
                  variants={itemVariants}
                >
                  {/* liquid glass card frame */}
                  <div className="rounded-2xl backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 shadow-[0_10px_30px_rgba(2,6,23,0.25)]">
                    <div className="flex items-center justify-between p-5">
                      <div>
                        <div className="font-semibold text-sm sm:text-base ">
                          {email.label}
                        </div>
                        <div className="text-xs sm:text-sm  break-all">
                          {email.address}
                        </div>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => copyEmail(email.address)}
                        className="relative inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm  shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                        aria-live="polite"
                      >
                        <i className="las la-copy text-lg sm:text-xl" />
                        <span>{copied === email.address ? "Copied" : "Copy"}</span>
                        <span aria-hidden className="absolute inset-0 rounded-full ring-1 ring-white/20" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className="relative p-[1px] rounded-2xl">
                <Link
                  href={LINKS.resume}
                  target="_blank"
                  className="group block rounded-2xl backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 hover:bg-white/15 transition-colors shadow-[0_10px_30px_rgba(2,6,23,0.25)]"
                >
                  <div className="flex items-center gap-3 p-5">
                    <i className="las la-file-alt text-2xl sm:text-3xl " />
                    <div>
                      <div className="font-semibold text-sm sm:text-base ">
                        Resume
                      </div>
                      <div className="text-xs sm:text-sm  group-hover:underline break-all">
                        View my resume
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants} className="relative p-[1px] rounded-2xl">
                <Link
                  href={LINKS.linkedin}
                  target="_blank"
                  className="group block rounded-2xl backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 hover:bg-white/15 transition-colors shadow-[0_10px_30px_rgba(2,6,23,0.25)]"
                >
                  <div className="flex items-center gap-3 p-5">
                    <i className="lab la-linkedin text-2xl sm:text-3xl " />
                    <div>
                      <div className="font-semibold text-sm sm:text-base ">
                        LinkedIn
                      </div>
                      <div className="text-xs sm:text-sm group-hover:underline break-all">
                        linkedin.com/in/johnny-stouffer
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* GitHub */}
              <motion.div variants={itemVariants} className="relative p-[1px] rounded-2xl">
                <Link
                  href={LINKS.github}
                  target="_blank"
                  className="group block rounded-2xl backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 hover:bg-white/15 transition-colors shadow-[0_10px_30px_rgba(2,6,23,0.25)]"
                >
                  <div className="flex items-center gap-3 p-5">
                    <i className="lab la-github text-2xl sm:text-3xl" />
                    <div>
                      <div className="font-semibold text-sm sm:text-base">
                        GitHub
                      </div>
                      <div className="text-xs sm:text-sm group-hover:underline break-all">
                        github.com/johnnystouffer
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

      </section>
    </main>
  );
}
