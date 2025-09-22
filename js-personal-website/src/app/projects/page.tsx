// app/projects/page.tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";

type Project = {
  name: string;
  link?: string;
  repo?: string;
  stack: string[];
  dates: string;
  bullets: string[];
};

const projects: Project[] = [
  {
    name: "Odyssey Maps",
    link: "https://odysseymaps.com",
    stack: ["React", "TypeScript", "Leaflet", "Spring Boot", "PostgreSQL"],
    dates: "May 2024 – Present",
    bullets: [
      "Odyssey maps is a video game progress website, where you can track you progress on Super Mario Odyssey (more games later) to reduce time spent when trying to do a completionist run. Created because I had little free time, and I spent too much time just searching all over the map to find nothing.",
    ],
  },
  {
    name: "FocusTube",
    link: "https://focus-youtube.vercel.app/",
    stack: ["Next.js", "TypeScript", "YouTube Data API", "Tailwind CSS"],
    dates: "May 2025 – Present",
    bullets: [
      "A distraction and algorithm free youtube. Made because I dislike shorts, reccomendations, and other features that catch my attention when I want to focus. Allows for playlists, intentional watching, descriptions, and a UI/UX that is simpler, more relaxing, and less likely to distract.",
    ],
  },
  {
    name: "UFC Fight Predictor",
    repo: "https://github.com/johnnystouffer/mma-prediction-analysis",
    stack: ["PyTorch", "Pandas", "BeautifulSoup", "Python"],
    dates: "July 2023 – Aug 2023",
    bullets: [
      "A neural network Machine Learning project, I made this because two things, I love MMA and grew up doing Tang Soo Do (E Dan rank) and I wanted to learn more about PyTorch. I webscraped the UFCs website of ALL fights and ALL fighters, trained it using PyTorch to acheive a 70% accuracy rating.",
    ],
  },
];

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <motion.h1
        className="text-3xl sm:text-4xl font-extrabold tracking-tight"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h1>

      <motion.p
        className="mt-2 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Things I wanted to make / wanted to learn.
      </motion.p>

      <motion.ol
        className="mt-6 relative"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 1 },
          show: { opacity: 1, transition: { staggerChildren: 0.12 } },
        }}
      >
        {projects.map((p, idx) => (
          <motion.li
            key={p.name}
            className="mb-12 pl-4 border-l border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <div className="absolute w-3 h-3 bg-primary rounded-full -left-1.5 mt-2.5" />

            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <motion.h2
                className="text-xl font-semibold"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
              >
                {p.name}
              </motion.h2>
              <div className="text-sm text-muted-foreground">{p.dates}</div>
            </div>

            <div className="mt-1 text-sm text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">
              {p.link && (
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                >
                  <Link href={p.link} target="_blank" className="underline">
                    Live site
                  </Link>
                </motion.span>
              )}
              {p.repo && (
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.08 }}
                >
                  <Link href={p.repo} target="_blank" className="underline">
                    Repository
                  </Link>
                </motion.span>
              )}
            </div>

            <div className="mt-2 flex flex-wrap gap-2 text-sm">
              {p.stack.map((s, j) => (
                <motion.span
                  key={s}
                  className="px-2 py-1 rounded-full bg-background shadow-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: j * 0.05 }}
                >
                  {s}
                </motion.span>
              ))}
            </div>

            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm">
              {p.bullets.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  {b}
                </motion.li>
              ))}
            </ul>
          </motion.li>
        ))}
      </motion.ol>
    </main>
  );
}
