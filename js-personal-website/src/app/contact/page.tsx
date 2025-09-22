// app/contact/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const EMAILS = [
  { label: "MSU Email", address: "stouff17@msu.edu" },
  { label: "Personal Email", address: "johnstouffer18@gmail.com" },
];

const LINKS = {
  linkedin: "https://linkedin.com/in/johnny-stouffer/",
  github: "https://github.com/johnnystouffer",
};

const listVariants = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } }, // ease removed
};

export default function ContactPage() {
  const [copied, setCopied] = useState<string | null>(null);

  async function copyEmail(address: string) {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(address);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  }

  return (
    <main className="px-4 py-10">
      <section className="mx-auto max-w-3xl">
        <div className="text-center">
          <motion.h1
            className="text-3xl sm:text-5xl font-extrabold tracking-tight"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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

        {/* Card */}
        <motion.div
          className="mt-8 rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="p-6 sm:p-8 grid gap-4"
            variants={listVariants}
            initial="hidden"
            animate="show"
          >
            {/* email blocks */}
            {EMAILS.map((email) => (
              <motion.div
                key={email.address}
                className="group rounded-2xl border p-5 hover:shadow-md transition-shadow flex items-center justify-between"
                variants={itemVariants}
              >
                <div>
                  <div className="font-semibold text-sm sm:text-base">
                    {email.label}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground break-all">
                    {email.address}
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => copyEmail(email.address)}
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-primary/10 text-xs sm:text-sm"
                  aria-live="polite"
                >
                  <i className="las la-copy text-lg sm:text-xl" />
                  <span>{copied === email.address ? "Copied" : "Copy"}</span>
                </motion.button>
              </motion.div>
            ))}

            {/* quick links */}
            <motion.div variants={itemVariants}>
              <Link
                href={LINKS.linkedin}
                target="_blank"
                className="group rounded-2xl border p-5 hover:shadow-md transition-shadow block"
              >
                <div className="flex items-center gap-3">
                  <i className="lab la-linkedin text-2xl sm:text-3xl" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">
                      LinkedIn
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground group-hover:underline break-all">
                      linkedin.com/in/johnny-stouffer
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                href={LINKS.github}
                target="_blank"
                className="group rounded-2xl border p-5 hover:shadow-md transition-shadow block"
              >
                <div className="flex items-center gap-3">
                  <i className="lab la-github text-2xl sm:text-3xl" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">
                      GitHub
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground group-hover:underline break-all">
                      github.com/johnnystouffer
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
