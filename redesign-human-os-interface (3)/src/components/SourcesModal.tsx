import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Quote, Award, Sparkles, Filter } from "lucide-react";
import { SOURCES } from "../data/sources";

export default function SourcesModal({
  open,
  onClose,
  initialCategory,
}: {
  open: boolean;
  onClose: () => void;
  initialCategory?: string;
}) {
  const [filterCat, setFilterCat] = useState<string>(initialCategory || "TODOS");


  const list = Object.values(SOURCES);
  const categories = ["TODOS", ...Array.from(new Set(list.map((s) => s.category)))];

  const filtered = filterCat === "TODOS" ? list : list.filter((s) => s.category === filterCat);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="sources-backdrop"
          className="fixed inset-0 z-[88] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            key="sources-box"
            onClick={(e) => e.stopPropagation()}
            className="modal-breathe relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-cyan-neon/40 bg-void/98 shadow-[0_0_60px_rgba(0,242,255,0.15)] md:rounded-3xl"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-6 py-5 md:px-10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-neon/30 bg-cyan-neon/10 text-cyan-neon">
                  <BookOpen size={18} />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-neon">
                    Base_Bibliográfica_&_Científica
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-white md:text-xl">
                    Fundamentação Teórica das Referências
                  </h3>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Fechar"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-300 hover:rotate-90 hover:border-error-neon hover:text-error-neon"
              >
                <X size={18} />
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto border-b border-white/5 bg-black/30 px-6 py-3 md:px-10">
              <Filter size={14} className="mr-2 text-slate-500 shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCat(cat)}
                  className={`shrink-0 rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                    filterCat === cat
                      ? "bg-cyan-neon text-void font-bold shadow-[0_0_15px_rgba(0,242,255,0.4)]"
                      : "border border-white/10 bg-white/5 text-slate-400 hover:border-cyan-neon/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 md:px-10 md:py-8">
              <div className="grid gap-6 md:grid-cols-2">
                {filtered.map((s) => (
                  <div
                    key={s.id}
                    className="std-card group relative flex flex-col justify-between rounded-2xl border border-white/10 p-6 transition-all duration-300 hover:border-cyan-neon/50"
                  >
                    <div>
                      <div className="mb-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-neon">
                        <span className="flex items-center gap-1.5">
                          <Award size={12} /> {s.category}
                        </span>
                        <span className="text-slate-500">{s.year}</span>
                      </div>

                      <h4 className="text-lg font-bold uppercase text-white group-hover:text-cyan-neon transition-colors">
                        {s.author}
                      </h4>
                      <p className="font-mono text-xs text-slate-400">{s.role}</p>

                      <div className="mt-3 inline-block rounded border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs italic text-slate-200">
                        📖 "{s.book}"
                      </div>

                      <div className="relative mt-4 rounded-xl border-l-2 border-cyan-neon/60 bg-black/40 p-4 font-mono text-xs font-light leading-relaxed text-slate-300 italic">
                        <Quote size={20} className="absolute -top-2 -right-1 text-cyan-neon/15" />
                        "{s.quote}"
                      </div>
                    </div>

                    <div className="mt-4 border-t border-white/5 pt-3 flex items-center justify-between font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                      <span>Conceito: <strong className="text-cyan-neon">{s.concept}</strong></span>
                      <Sparkles size={12} className="text-cyan-neon opacity-60" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 bg-black/40 px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-slate-500 md:px-10">
              {filtered.length} Obras Acadêmicas e Referências Mapeadas // Human OS v9.0
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
