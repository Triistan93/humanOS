import { motion } from "framer-motion";
import { Radar, ChevronRight, BookOpen } from "lucide-react";

export default function Hero({
  active,
  onNext,
  onOpenSources,
}: {
  active: boolean;
  onNext: () => void;
  onOpenSources: () => void;
}) {
  const stagger = (d: number) => ({
    initial: false as const,
    animate: active ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 40, filter: "blur(8px)" },
    transition: { duration: 1, delay: d, ease: [0.19, 1, 0.22, 1] as const },
  });

  return (
    <section className="relative flex h-screen w-screen shrink-0 items-center justify-center overflow-hidden">
      {/* Background rings */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
        <div className="spin-slow h-[78vmin] w-[78vmin] rounded-full border border-dashed border-cyan-neon/20" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
        <div className="spin-slow h-[104vmin] w-[104vmin] rounded-full border border-cyan-neon/10" style={{ animationDirection: "reverse", animationDuration: "40s" }} />
      </div>

      {/* Corner HUD badges with citations */}
      <div className="pointer-events-none absolute left-24 top-24 hidden font-mono text-[10px] uppercase leading-loose tracking-[0.3em] text-cyan-neon/50 lg:block">
        FONTE: PETER DRUCKER (1973)
        <br />
        "60% DOS ERROS SÃO RUÍDO"
      </div>
      <div className="pointer-events-none absolute bottom-24 right-24 hidden text-right font-mono text-[10px] uppercase leading-loose tracking-[0.3em] text-cyan-neon/50 lg:block">
        SHANNON & WEAVER (1949)
        <br />
        TEORIA DA INFORMAÇÃO
      </div>

      <div className="relative z-10 max-w-6xl px-6 text-center">
        <motion.div {...stagger(0.1)} className="mb-6 inline-flex items-center gap-3">
          <span className="glass clip-tag px-5 py-2 font-mono text-[10px] uppercase tracking-[0.45em] text-cyan-neon md:text-xs">
            Sistema Operacional Humano <span className="text-slate-500">//</span> v9.0
          </span>
        </motion.div>

        <motion.h1
          {...stagger(0.25)}
          className="font-display text-[15vw] font-bold uppercase italic leading-[0.85] tracking-tighter md:text-[9.5rem] lg:text-[10.5rem]"
        >
          O Fator
          <br />
          <span className="text-stroke text-glow-cyan bg-clip-text" style={{ WebkitTextStroke: "2px rgba(0,242,255,0.65)" }}>
            Rede
          </span>
        </motion.h1>

        <motion.p
          {...stagger(0.45)}
          className="mx-auto mt-6 max-w-3xl text-lg font-light leading-relaxed text-slate-300 md:text-2xl"
        >
          O maior desafio das empresas não são as máquinas. É o{" "}
          <span className="font-medium text-cyan-neon">ruído na hora de conversar.</span>
        </motion.p>

        {/* Drucker Quote Citation */}
        <motion.div {...stagger(0.55)} className="mx-auto mt-6 max-w-2xl">
          <div className="rounded-xl border border-cyan-neon/30 bg-black/40 p-4 font-mono text-xs text-slate-300 italic">
            "60% de todos os problemas administrativos são resultado de comunicação ineficaz."
            <span className="not-italic block mt-1 text-cyan-neon font-bold text-[10px] uppercase tracking-widest">
              — Peter Drucker, Pai da Administração Moderna (1973)
            </span>
          </div>
        </motion.div>

        <motion.div {...stagger(0.7)} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onNext}
            className="hud-button group relative inline-flex items-center gap-4 overflow-hidden rounded-sm bg-cyan-neon px-10 py-5 font-mono text-sm font-bold uppercase tracking-[0.3em] text-void transition-colors duration-300 hover:bg-white md:px-12 md:py-5 md:text-base"
          >
            <Radar size={20} className="transition-transform duration-500 group-hover:rotate-180" />
            Estabelecer_Conexão
            <ChevronRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>

          <button
            onClick={onOpenSources}
            className="hud-button group inline-flex items-center gap-3 rounded-sm border border-cyan-neon/50 bg-white/5 px-8 py-5 font-mono text-xs font-bold uppercase tracking-[0.25em] text-cyan-neon transition-all duration-300 hover:bg-cyan-neon/10"
          >
            <BookOpen size={18} />
            Ver_Fontes_&_Livros
          </button>
        </motion.div>
      </div>

      {/* Ticker with Literature References */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/5 bg-black/40 py-2.5 backdrop-blur-sm">
        <div className="ticker-track flex w-max whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.4em] text-slate-400">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex">
              {[
                "Claude Shannon (Bell Labs, 1949)",
                "Marshall Rosenberg (CNV, 1999)",
                "Amy Edmondson (Harvard, 2018)",
                "Kim Scott (Radical Candor, 2017)",
                "Steven Pinker (Harvard, 2014)",
                "Carl Rogers (HBR, 1957)",
                "Alex Pentland (MIT, 2014)",
                "Fred Kofman (Stanford, 2006)",
              ].map((t) => (
                <span key={t} className="mx-8 flex items-center gap-8">
                  <BookOpen size={12} className="text-cyan-neon" /> {t}{" "}
                  <span className="text-cyan-neon/40">//</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
