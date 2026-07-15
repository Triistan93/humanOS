import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  { text: "HUMAN_OS v9.0.4 — kernel neural 5.19", delay: 0 },
  { text: "> inicializando interface neural ............ OK", delay: 350 },
  { text: "> carregando protocolos de comunicação ...... OK", delay: 750 },
  { text: "> calibrando filtros anti-ruído ............. OK", delay: 1150 },
  { text: "> firewall emocional ........................ ONLINE", delay: 1600 },
  { text: "> módulos de empatia ........................ 8/8 CARREGADOS", delay: 2000 },
  { text: "> estabelecendo uplink com a equipe ......... PRONTO", delay: 2450 },
];

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(0);
  const [established, setEstablished] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    const timers: number[] = [];
    LINES.forEach((l, i) => {
      timers.push(window.setTimeout(() => setVisible(i + 1), l.delay));
    });
    timers.push(
      window.setTimeout(() => setEstablished(true), 2950),
      window.setTimeout(() => {
        if (!done.current) {
          done.current = true;
          onDone();
        }
      }, 3800)
    );
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  const skip = () => {
    if (!done.current) {
      done.current = true;
      onDone();
    }
  };

  const progress = established ? 100 : Math.round((visible / LINES.length) * 88);

  return (
    <motion.div
      key="boot"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
      onClick={skip}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="grid-floor absolute inset-0 opacity-60" />

      <div className="relative w-[min(680px,88vw)] font-mono">
        {/* header row */}
        <div className="mb-6 flex items-center justify-between text-[10px] tracking-[0.4em] text-cyan-neon/50 uppercase">
          <span>boot_sequence</span>
          <span>tty0 — /dev/human</span>
        </div>

        {/* terminal window */}
        <div className="glass-deep corner-frame relative p-7 md:p-9">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-error-neon/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning-neon/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-poison/70" />
          </div>

          <div className="min-h-[210px] space-y-2 text-[13px] leading-relaxed md:text-sm">
            {LINES.slice(0, visible).map((l, i) => (
              <div
                key={i}
                className={i === 0 ? "text-white" : "text-cyan-neon/80"}
                style={i === 0 ? { letterSpacing: "0.12em" } : undefined}
              >
                {l.text}
              </div>
            ))}
            {!established && <span className="caret inline-block h-4 w-2.5 translate-y-0.5 bg-cyan-neon" />}
            {established && (
              <div className="pt-3 text-base font-bold tracking-[0.3em] text-poison md:text-lg">
                [ CONEXÃO ESTABELECIDA ]
              </div>
            )}
          </div>

          {/* progress */}
          <div className="mt-7">
            <div className="mb-2 flex justify-between text-[10px] tracking-[0.3em] text-slate-500 uppercase">
              <span>carregando sistema</span>
              <span className={established ? "text-poison" : "text-cyan-neon"}>{progress}%</span>
            </div>
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                  background: established ? "#39ff14" : "linear-gradient(90deg,#00f2ff,#8b3dff)",
                  boxShadow: "0 0 16px rgba(0,242,255,0.6)",
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 text-center text-[10px] tracking-[0.35em] text-slate-600 uppercase">
          clique para pular
        </div>
      </div>
    </motion.div>
  );
}
