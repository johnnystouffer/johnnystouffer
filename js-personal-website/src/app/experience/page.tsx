"use client";

import { motion } from "framer-motion";

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
    role: "Team Lead -> E-Board (Director of Educational Pipeline)",
    location: "East Lansing, MI",
    dates: "Sep 2023 – Present",
    bullets: [
      "Led training pipeline for 900+ member club, 70 active, 50 being in educational.",
      "Created website and tutorials to help new members learn tech stack to get onto Imagine client projects and Internships.",
      "Team lead for 6+ member team on VR/AR Mobile application designed to increase tourism in Aurora IL.",
    ],
    tech: ["VR/AR", "Leadership", "Curriculum"],
  },
  {
    company: "Spartan Analytics Consulting Group",
    role: "Analyst → Project Manager",
    location: "East Lansing, MI",
    dates: "Jan 2023 – Jan 2024",
    bullets: [
      "Cleaned, parsed, and visualized data for MSU Transportation.",
      "Managed analysts to create a project for MSU Culinary Services.",
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
      "Improved field test accuracy by 80% with a real-time map framework for GPS jammer prediction, error radius, and vehicle positions.",
      "Turned ambiguous operator feedback into concrete UI workflows, raising task completion satisfaction by 50%.",
      "Built a multi-threaded GPS message parser handling 500+ msgs/min with low latency and fault tolerance.",
    ],
    tech: ["C++", "Qt", "Multithreading", "Maps/UI"],
  },
  {
    company: "Tesla",
    role: "Software Intern",
    location: "Reno, NV",
    dates: "May 2024 – Aug 2024",
    bullets: [
      "Designed distributed data pipelines and dashboards to monitor 100+ machines and 10k+ daily reports.",
      "Cut planner workload by 15+ hours weekly via an automated KPI alerting system with on-call runbooks.",
      "Automated refresh pipelines to deliver live efficiency metrics for 50+ technicians.",
    ],
    tech: ["Python", "Data Pipelines", "Dashboards"],
  },
  {
    company: "Michigan State University",
    role: "Teaching Assistant — Data Structures & Algorithms",
    location: "East Lansing, MI",
    dates: "Jan 2025 – Aug 2025",
    bullets: [
      "Co-defined algorithms coursework with 15+ TAs for 300+ students.",
      "Led helprooms and debugging for 30+ students weekly.",
      "Resolved 100+ questions on Piazza to improve access outside helprooms.",
    ],
    tech: ["Java", "Algorithms", "Data Structures"],
  },
];

export default function ExperiencePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Experience</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Highlights from internships and teaching roles.
      </p>

      <ol className="mt-6 relative">
        {items.map((it, idx) => (
          <motion.li
            key={idx}
            className="mb-12 pl-4 border-l border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            <div className="absolute w-3 h-3 bg-primary rounded-full -left-1.5 mt-2.5" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h2 className="text-xl font-semibold">
                {it.role} <span className="font-normal">@ {it.company}</span>
              </h2>
              <div className="text-sm text-muted-foreground">{it.dates}</div>
            </div>
            <div className="text-sm text-muted-foreground">{it.location}</div>

            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm">
              {it.bullets.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.15 + i * 0.1 }}
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
                    className="text-xs px-2 py-1 rounded-full border"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.15 + j * 0.05 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.li>
        ))}
      </ol>

      <h2 className="mt-10 text-2xl font-bold tracking-tight">Extracurriculars</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Leadership and club work relevant to software and analytics.
      </p>

      <ol className="mt-6 relative">
        {extracurriculars.map((it, idx) => (
          <motion.li key={`x-${idx}`} className="mb-12 pl-4 border-l border-border"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            <div className="absolute w-3 h-3 bg-primary rounded-full -left-1.5 mt-2.5" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="text-xl font-semibold">
                {it.role} <span className="font-normal">@ {it.company}</span>
              </h3>
              <div className="text-sm text-muted-foreground">{it.dates}</div>
            </div>
            <div className="text-sm text-muted-foreground">{it.location}</div>

            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm">
              {it.bullets.map((b, i) => (
                <motion.li key={i}
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.15 + i * 0.1 }}
                >
                  {b}
                </motion.li>
              ))}
            </ul>

            {it.tech && (
              <div className="mt-3 flex flex-wrap gap-2">
                {it.tech.map((t, j) => (
                  <motion.span key={t}
                    className="text-xs px-2 py-1 rounded-full border"
                    initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ duration: 0.3, delay: idx * 0.15 + j * 0.05 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.li>
        ))}
      </ol>
    </main>
  );
}
