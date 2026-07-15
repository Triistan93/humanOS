import { motion, AnimatePresence } from "framer-motion";
import {
  Radio,
  AudioWaveform,
  Server,
  MessagesSquare,
  Network,
  Handshake,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const MODULES: { name: string; icon: LucideIcon; color: string }[] = [
  { name: "INTRO", icon: Radio, color: "#00f2ff" },
  { name: "O RUÍDO", icon: AudioWaveform, color: "#ff4d4d" },
  { name: "FERRAMENTAS", icon: Server, color: "#8b3dff" },
  { name: "CLAREZA", icon: MessagesSquare, color: "#00f2ff" },
  { name: "TOPOLOGIA", icon: Network, color: "#facc15" },
  { name: "ALINHAMENTO", icon: Handshake, color: "#00f2ff" },
  { name: "CONEXÃO", icon: ShieldCheck, color: "#39ff14" },
  { name: "HACKS", icon: Zap, color: "#00f2ff" },
];

import { BookOpen } from "lucide-react";

export default function Sidebar({
  open,
  current,
  onGoTo,
  onClose,
  onOpenSources,
}: {
  open: boolean;
  current: number;
  onGoTo: (i: number) => void;
  onClose: () => void;
  onOpenSources: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[72] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.nav
            key="drawer"
            className="glass-deep fixed left-0 top-0 z-[74] flex h-full w-[320px] flex-col border-r border-cyan-neon/30"
            initial={{ x: -340 }}
            animate={{ x: 0 }}
            exit={{ x: -340 }}
            transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="border-b border-white/5 px-8 pb-6 pt-24">
              <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-cyan-neon/50">
                Network_Console
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600">
                8 módulos carregados
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
              {MODULES.map((m, i) => {
                const Icon = m.icon;
                const active = i === current;
                return (
                  <button
                    key={m.name}
                    onClick={() => onGoTo(i)}
                    className={`group relative flex items-center gap-4 rounded-lg px-4 py-3 text-left font-mono text-sm transition-all duration-300 ${
                      active ? "bg-white/[0.06] text-white" : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-200"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="sidebar-active"
                        className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full"
                        style={{ background: m.color, boxShadow: `0 0 12px ${m.color}` }}
                      />
                    )}
                    <Icon size={16} strokeWidth={1.75} style={{ color: active ? m.color : undefined }} className="shrink-0 opacity-80" />
                    <span className="text-[10px] text-slate-600">{String(i + 1).padStart(2, "0")}.</span>
                    <span className="tracking-[0.2em]">{m.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-white/5 px-6 py-4 space-y-3">
              <button
                onClick={onOpenSources}
                className="flex w-full items-center justify-center gap-2 rounded border border-cyan-neon/40 bg-cyan-neon/10 py-2.5 font-mono text-xs text-cyan-neon uppercase tracking-widest hover:bg-cyan-neon hover:text-void font-bold transition-all"
              >
                <BookOpen size={14} /> Base Bibliográfica
              </button>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600 text-center">
                human_os <span className="text-cyan-neon/60">//</span> v9.0.4
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
