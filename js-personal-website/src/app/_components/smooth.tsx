'use client'

export default function SmoothBackground({
  className = 'fixed inset-0 -z-10 pointer-events-none opacity-35'
}: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <style>{`
        .smooth-bg {
          position:absolute; inset:0;
          background: radial-gradient(circle at 30% 40%, #1e3a8a 0%, transparent 60%),
                      radial-gradient(circle at 70% 60%, #9333ea 0%, transparent 65%),
                      linear-gradient(to bottom right, #0f172a, #1e293b);
          background-blend-mode: screen;
          animation: hueShift 80s linear infinite;
        }
        @keyframes hueShift {
          from { filter: hue-rotate(0deg); }
          to   { filter: hue-rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .smooth-bg { animation: none; }
        }
      `}</style>
      <div className="smooth-bg" />
    </div>
  )
}
