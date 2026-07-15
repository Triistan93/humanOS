import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

const GLYPHS = "█▓▒░<>/\\|—+=*#01ΔΣΞ§";

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

/* ------------------------------------------------------------------ */
/* ScrambleText — decodes from glyphs to final text.                   */
/* mode="decode" resolves once when `active`; mode="chaos" keeps       */
/* re-scrambling random positions forever (the "noise" look).          */
/* ------------------------------------------------------------------ */
export function ScrambleText({
  text,
  active = true,
  mode = "decode",
  speed = 28,
  className = "",
}: {
  text: string;
  active?: boolean;
  mode?: "decode" | "chaos";
  speed?: number;
  className?: string;
}) {
  const [out, setOut] = useState(text);
  const frame = useRef(0);

  useEffect(() => {
    if (!active) return;
    frame.current = 0;
    const totalFrames = Math.ceil(text.length * 1.6);

    const id = window.setInterval(() => {
      frame.current += 1;
      if (mode === "chaos") {
        const chars = text.split("");
        const scrambled = chars.map((c, i) => {
          if (c === " " || c === "\n") return c;
          const hash = (Math.sin(i * 91.7 + frame.current * 0.9) + 1) / 2;
          return hash > 0.72 ? randomGlyph() : c;
        });
        setOut(scrambled.join(""));
        return;
      }
      const revealed = Math.floor((frame.current / totalFrames) * text.length);
      const chars = text.split("").map((c, i) => {
        if (i <= revealed || c === " ") return c;
        return randomGlyph();
      });
      setOut(chars.join(""));
      if (revealed >= text.length) window.clearInterval(id);
    }, speed);

    return () => window.clearInterval(id);
  }, [active, text, mode, speed]);

  return <span className={className}>{out}</span>;
}

/* ---------------- Section tag — mono HUD label ---------------- */
export function SectionTag({
  index,
  label,
  color = "#00f2ff",
}: {
  index: string;
  label: string;
  color?: string;
}) {
  return (
    <div className="inline-flex items-center gap-3 font-mono text-[11px] md:text-xs tracking-[0.35em] uppercase">
      <span
        className="relative inline-block h-1.5 w-1.5 rounded-full ping-dot"
        style={{ background: color, color }}
      />
      <span className="text-slate-500">MOD.{index}</span>
      <span className="text-slate-700">//</span>
      <span style={{ color }}>{label}</span>
    </div>
  );
}

/* ---------------- Reveal on slide activation ---------------- */
export function Reveal({
  active,
  delay = 0,
  y = 32,
  className = "",
  children,
}: {
  active: boolean;
  delay?: number;
  y?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={false}
      animate={active ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y, filter: "blur(6px)" }}
      transition={{ duration: 0.9, delay, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Slide shell ---------------- */
export function SlideShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative flex h-screen w-screen shrink-0 flex-col overflow-y-auto overflow-x-hidden px-6 py-24 md:px-14 lg:px-20 ${className}`}>
      <div className="m-auto w-full">{children}</div>
    </section>
  );
}

/* ---------------- Big slide heading ---------------- */
export function SlideTitle({
  children,
  accent,
  className = "",
}: {
  children: ReactNode;
  accent?: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`font-display text-4xl font-bold uppercase italic leading-[0.95] tracking-tighter text-white md:text-6xl xl:text-7xl ${className}`}>
      {children}
      {accent}
    </h2>
  );
}
