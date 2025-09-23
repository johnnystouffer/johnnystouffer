// app/projects/page.tsx
"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

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
  {
    name: "CampusBites",
    repo: "https://github.com/johnnystouffer/campus-bites",
    stack: ["Django", "React", "OpenAI API", "CRUD App", "RESTful APIs"],
    dates: "Aug. 2024 – Sep. 2024",
    bullets: [
      "Hackathon project. Lead a team of 4 to create a simple CRUD app for students to post and find new deals that they found around campus. Additionally used OpenAI to make suggestions for users on deals that they want.",
    ],
  },
  {
    name: "Democratic Index Dashboard",
    link: "https://demoindex-1719fb67ec5e.herokuapp.com/",
    stack: ["Python", "Plotly Dash", "HTML/CSS", "Pandas", "matplotlib"],
    dates: "Nov. 2022 – May 2023",
    bullets: [
      "School project TURNED Personal Project. Took a report on Democracies around the world and predicting how they are projected to do in the future. Uploaded this data via Pandas, cleaned it, manipulated it, and then created 5 visualizations to show what democracy is like around the world",
    ],
  },
];

// Only use variants for mount-time animations. No whileInView.
// Hidden state never sets opacity to 0 to avoid stuck invisibility.
const listVariants = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function ProjectsPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="relative mx-auto max-w-3xl px-4 py-10 overflow-hidden text-center">
      <motion.h1
        className="text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.2)]"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </motion.h1>

      <motion.p
        className="mt-2 text-sm"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Things I wanted to make / wanted to learn.
      </motion.p>

      <motion.section
        className="relative mt-8 rounded-[2rem] overflow-hidden"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/20 [mask:linear-gradient(white,transparent_65%)]"
        />

        <motion.ol
          className="relative p-6 sm:p-8 grid gap-8"
          initial={prefersReducedMotion ? false : "hidden"}
          animate="show"
          variants={listVariants}
        >
          {projects.map((p) => (
            <motion.li key={p.name} variants={itemVariants} className="relative">
              <div className="relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(2,6,23,0.25)]">
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <motion.h2
                      className="text-xl font-semibold"
                      // Start visible. Only apply subtle lift on mount.
                      initial={prefersReducedMotion ? false : { y: 8 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.45 }}
                    >
                      {p.name}
                    </motion.h2>
                    <div className="text-sm">{p.dates}</div>
                  </div>

                  <div className="mt-1 text-sm flex flex-wrap gap-x-3 gap-y-1">
                    {p.link && (
                      <span>
                        <Link href={p.link} target="_blank" className="underline">
                          Live site
                        </Link>
                      </span>
                    )}
                    {p.repo && (
                      <span>
                        <Link href={p.repo} target="_blank" className="underline">
                          Repository
                        </Link>
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2 text-sm">
                    {p.stack.map((s) => (
                      <motion.span
                        key={s}
                        className="px-2 py-1 rounded-full border border-white/30 bg-white/10"
                        initial={prefersReducedMotion ? false : { scale: 0.98 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.25 }}
                      >
                        {s}
                      </motion.span>
                    ))}
                  </div>

                  <ul className="mt-3 list-disc pl-5 space-y-2 text-sm">
                    {p.bullets.map((b, i) => (
                      <motion.li
                        key={i}
                        initial={prefersReducedMotion ? false : { x: -6, opacity: 1 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {b}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </motion.section>
    </main>
  );
}
