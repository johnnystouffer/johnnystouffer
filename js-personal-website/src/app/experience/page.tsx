"use client";

import { motion, useReducedMotion } from "framer-motion";

type Item = {
  company: string;
  role: string;
  location: string;
  dates: string;
  bullets: string[];
  tech?: string[];
};

const extracurriculars: Item[] = [
  {
    company: "Imagine Software",
    role: "Director",
    location: "East Lansing, MI",
    dates: "April 2025 – Present",
    bullets: [
      "A 900+ member SWE club with 90+ active members, I directed a 70+ member section that teaches new members our tech stack to join client projects, and help create their own projects"
    ],
    tech: ["Next.js", "JavaScript", "FastAPI", "Java", "RESTful APIs"],
  },
  {
    company: "Imagine Software",
    role: "Team Lead",
    location: "East Lansing, MI",
    dates: "Sep 2023 – April 2025",
    bullets: [
      "Team lead and lead developer of 6+ developer team. I created and assigned tasks to create an AR/VR application for APS Data Technologies, with the goal to increase tourism in Aurora IL."
    ],
    tech: ["React Native", "VR/AR", "Leadership", "Curriculum"],
  },
  {
    company: "Spartan Analytics Consulting Group",
    role: "Analyst & Project Manager",
    location: "East Lansing, MI",
    dates: "Jan 2022 – Jan 2024",
    bullets: [
      "Started out as an analyst, cleaning, parsing, and visualizing data for MSU Transportion to optimize routes by 10%, then lead a team of analysts to reduce food waste with MSU Culinary Services"
    ],
    tech: ["Analytics", "Visualization", "Project Management"],
  },
];

const items: Item[] = [
  {
    company: "Collins Aerospace",
    role: "Software Engineering Intern",
    location: "Cedar Rapids, IA",
    dates: "May 2025 – Aug 2025",
    bullets: [
      "Built a real-time map framework that improved field test accuracy by 80% and enabled GPS jammer prediction and vehicle tracking. Designed a multi-threaded parser processing 500+ GPS messages per minute with checksum-based integrity verification."
    ],
    tech: ["C++", "Qt", "Multithreading", "Maps/UI"],
  },
  {
    company: "Tesla",
    role: "Software Intern",
    location: "Reno, NV",
    dates: "May 2024 – Aug 2024",
    bullets: [
      "Developed distributed data pipelines and dashboards monitoring 100+ machines and 10k+ daily reports. Plus I automated KPI alerts and efficiency metrics, cutting maintenance planner workload by 15+ hours weekly and serving 50+ technicians."
    ],
    tech: ["Python", "PowerBI", "SQL", "Data Pipelines", "Dashboards"],
  },
  {
    company: "Michigan State University",
    role: "Teaching Assistant — Data Structures & Algorithms",
    location: "East Lansing, MI",
    dates: "Jan 2025 – Aug 2025",
    bullets: [
      "Designed coursework for a 300+ student class, additionally led helprooms for 30+ students and resolved online questions through piazza outside of class for 100+ students."
    ],
    tech: ["Python", "Algorithms", "Data Structures"],
  },
];

const listVariants = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default function ExperiencePage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="relative mx-auto max-w-3xl px-4 py-10 overflow-hidden">

      <header className="relative text-center">
        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.2)]"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h1>
        <motion.p
          className="mt-2 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          Highlights from internships, teaching, and leadership.
        </motion.p>
      </header>

      <motion.section
        className="relative mt-8 rounded-[2rem] overflow-hidden "
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/20 [mask:linear-gradient(white,transparent_65%)]" />

        <motion.ol
          className="relative p-6 sm:p-8 grid gap-8"
          variants={listVariants}
          initial="hidden"
          animate="show"
        >
          {items.map((it, idx) => (
            <motion.li
              key={idx}
              variants={itemVariants}
              className="relative"
            >

              <div className="relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(2,6,23,0.25)]">

                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h2 className="text-xl font-semibold">
                      {it.role} <span className="font-normal">@ {it.company}</span>
                    </h2>
                    <div className="text-sm">{it.dates}</div>
                  </div>
                  <div className="text-sm">{it.location}</div>

                  <ul className="mt-3 text-med">
                    {it.bullets.map((b, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                      >
                        {b}
                      </motion.li>
                    ))}
                  </ul>

                  {it.tech && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {it.tech.map((t, j) => (
                        <motion.span
                          key={t}
                          className="text-xs px-2 py-1 rounded-full border border-white/30 bg-white/10"
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: j * 0.04 }}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </motion.section>

      <section className="relative mt-10">
        <h2 className="text-2xl font-bold tracking-tight">Extracurriculars</h2>
        <p className="mt-2 text-sm">
          Leadership and club work relevant to software and analytics.
        </p>

        <motion.ol
          className="relative mt-6 grid gap-8"
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {extracurriculars.map((it, idx) => (
            <motion.li key={`x-${idx}`} variants={itemVariants} className="relative">
              <div className="relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(2,6,23,0.25)]">
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="text-xl font-semibold">
                      {it.role} <span className="font-normal">@ {it.company}</span>
                    </h3>
                    <div className="text-sm">{it.dates}</div>
                  </div>
                  <div className="text-sm">{it.location}</div>

                  <ul className="mt-3 text-sm">
                    {it.bullets.map((b, i) => (
                      <motion.li key={i}
                        initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
                      >
                        {b}
                      </motion.li>
                    ))}
                  </ul>

                  {it.tech && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {it.tech.map((t, j) => (
                        <motion.span key={t}
                          className="text-xs px-2 py-1 rounded-full border border-white/30 bg-white/10"
                          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }} transition={{ duration: 0.3, delay: j * 0.04 }}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </section>
    </main>
  );
}
