import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HUD({
  current,
  total,
  names,
  signal,
  crashing,
  locked,
  onPrev,
  onNext,
  onGoTo,
  onMenu,
  menuOpen,
}: {
  current: number;
  total: number;
  names: string[];
  signal: number;
  crashing: boolean;
  locked: boolean;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
  onMenu: () => void;
  menuOpen: boolean;
}) {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const accent = crashing || signal < 35 ? "#ff4d4d" : signal < 70 ? "#facc15" : "#00f2ff";

  return (
    <>
      {/* progress rail */}
      <div className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-white/5">
        <div
          className="h-full transition-all duration-1000"
          style={{
            width: `${((current + 1) / total) * 100}%`,
            background: crashing ? "#ff4d4d" : "linear-gradient(90deg,#00f2ff,#8b3dff)",
            boxShadow: `0 0 18px ${accent}`,
            transitionTimingFunction: "cubic-bezier(0.83,0,0.17,1)",
          }}
        />
      </div>

      {/* menu button */}
      <button
        onClick={onMenu}
        aria-label="Menu"
        className="hud-button glass clip-tag fixed left-5 top-5 z-[75] flex h-12 w-12 flex-col items-center justify-center gap-[5px] text-cyan-neon md:left-7 md:top-7"
      >
        <span className={`h-[2px] bg-current transition-all duration-300 ${menuOpen ? "w-6 translate-y-[7px] rotate-45" : "w-6"}`} />
        <span className={`h-[2px] bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : "w-3.5 self-start ml-3"}`} />
        <span className={`h-[2px] bg-current transition-all duration-300 ${menuOpen ? "w-6 -translate-y-[7px] -rotate-45" : "w-6"}`} />
      </button>

      {/* right status pill */}
      <div className="fixed right-5 top-5 z-[75] md:right-7 md:top-7">
        <div className="glass flex items-center gap-3 rounded-full py-2.5 pl-4 pr-5 shadow-2xl md:gap-5 md:py-3 md:pl-5 md:pr-6">
          <span className="relative hidden h-1.5 w-1.5 rounded-full ping-dot sm:inline-block" style={{ background: accent, color: accent }} />
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 lg:inline">
            sinal
          </span>
          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-800 md:w-28">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${signal}%`, background: accent, boxShadow: `0 0 12px ${accent}` }}
            />
          </div>
          <span className="font-mono text-xs font-bold tabular-nums" style={{ color: accent }}>
            {String(Math.round(signal)).padStart(2, "0")}%
          </span>
          <span className="hidden h-4 w-px bg-white/10 md:block" />
          <span className="hidden font-mono text-[11px] tabular-nums text-slate-400 md:block">{clock}</span>
          <span className="hidden h-4 w-px bg-white/10 md:block" />
          <span className="font-mono text-[11px] tabular-nums text-slate-300">
            <span className="font-bold" style={{ color: accent }}>{String(current + 1).padStart(2, "0")}</span>
            <span className="text-slate-600">/{String(total).padStart(2, "0")}</span>
          </span>
        </div>
      </div>

      {/* nav arrows */}
      <AnimatePresence>
        {!locked && current > 0 && (
          <motion.button
            key="prev"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            onClick={onPrev}
            aria-label="Anterior"
            className="hud-button glass fixed left-4 top-1/2 z-[70] hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-cyan-neon md:flex"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </motion.button>
        )}
        {!locked && current < total - 1 && (
          <motion.button
            key="next"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            onClick={onNext}
            aria-label="Próximo"
            className="hud-button glass fixed right-4 top-1/2 z-[70] hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-cyan-neon md:flex"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* bottom-left module label */}
      <div className="fixed bottom-6 left-5 z-[70] hidden font-mono text-[11px] uppercase tracking-[0.3em] text-slate-500 md:left-7 md:block">
        <span className="text-cyan-neon/60">//</span> {String(current + 1).padStart(2, "0")} — {names[current]}
      </div>

      {/* bottom-center segment ticks */}
      <div className="fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onGoTo(i)}
            aria-label={`Ir para ${names[i]}`}
            className="group flex h-6 items-center"
          >
            <span
              className="block h-[3px] rounded-full transition-all duration-500"
              style={{
                width: i === current ? 34 : 14,
                background: i === current ? "#00f2ff" : "rgba(255,255,255,0.18)",
                boxShadow: i === current ? "0 0 12px rgba(0,242,255,0.7)" : "none",
              }}
            />
          </button>
        ))}
      </div>

      {/* bottom-right key hints */}
      <div className="fixed bottom-6 right-5 z-[70] hidden items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-600 md:right-7 lg:flex">
        <span className="flex items-center gap-1.5">
          <kbd className="glass rounded px-1.5 py-0.5 text-slate-400">←</kbd>
          <kbd className="glass rounded px-1.5 py-0.5 text-slate-400">→</kbd>
          navegar
        </span>
        <span className="flex items-center gap-1.5">
          <kbd className="glass rounded px-1.5 py-0.5 text-slate-400">esc</kbd>
          fechar
        </span>
      </div>
    </>
  );
}
