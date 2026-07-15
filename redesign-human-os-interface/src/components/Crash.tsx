import { useEffect, useMemo, useRef, useState } from "react";

type Phase = "glitch" | "black" | "bsod";

export default function Crash({ runId, onDone }: { runId: number; onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("glitch");
  const [progress, setProgress] = useState(0);
  const timers = useRef<number[]>([]);

  // random glitch bars per run
  const bars = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        height: 2 + Math.random() * 26,
        delay: Math.random() * 0.5,
        color: Math.random() > 0.5 ? "rgba(0,242,255,0.5)" : "rgba(255,0,60,0.5)",
      })),
    [runId]
  );

  // fake QR blocks
  const qr = useMemo(() => Array.from({ length: 169 }, () => Math.random() > 0.5), [runId]);

  useEffect(() => {
    setPhase("glitch");
    setProgress(0);
    timers.current.push(window.setTimeout(() => setPhase("black"), 1500));
    timers.current.push(window.setTimeout(() => setPhase("bsod"), 1680));
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [runId]);

  useEffect(() => {
    if (phase !== "bsod") return;
    const id = window.setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.floor(Math.random() * 13) + 3);
        return next;
      });
    }, 420);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (progress >= 100 && phase === "bsod") {
      const t = window.setTimeout(onDone, 1600);
      return () => window.clearTimeout(t);
    }
  }, [progress, phase, onDone]);

  return (
    <div className="fixed inset-0 z-[96]">
      {phase === "glitch" && (
        <div className="crash-jitter absolute inset-0 overflow-hidden bg-void">
          {bars.map((b) => (
            <div
              key={b.id}
              className="glitch-bar absolute left-0 w-full"
              style={{ top: `${b.top}%`, height: b.height, background: b.color, animationDelay: `${b.delay}s` }}
            />
          ))}
          {/* center warning text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 font-mono">
            <div className="text-2xl font-bold uppercase tracking-[0.5em] text-error-neon md:text-4xl" style={{ textShadow: "4px 0 rgba(0,242,255,0.7), -4px 0 rgba(255,0,60,0.7)" }}>
              sinal perdido
            </div>
            <div className="text-xs uppercase tracking-[0.4em] text-slate-400">
              buffer_overflow // desconectado // ruído crítico
            </div>
          </div>
          {/* red vignette */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(255,0,30,0.25) 100%)" }} />
        </div>
      )}

      {phase === "black" && <div className="absolute inset-0 bg-black" />}

      {phase === "bsod" && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "#0078d7", fontFamily: "'Segoe UI', system-ui, sans-serif" }}
        >
          <div className="w-[min(900px,86vw)] text-white">
            <div className="mb-6 font-light leading-none" style={{ fontSize: "clamp(6rem, 14vw, 10rem)" }}>:(</div>
            <h1 className="mb-8 max-w-[820px] text-xl font-light leading-relaxed md:text-[1.65rem]">
              A sua conversa encontrou um ruído crítico e gerou um desentendimento. Estamos esfriando os
              ânimos, baixando o tom de voz e organizando as ideias para tentar novamente.
            </h1>
            <div className="mb-10 text-lg font-light md:text-2xl">
              {progress < 100 ? `${progress}% processado` : "REINICIANDO PROTOCOLO DE DIÁLOGO..."}
            </div>
            <div className="flex items-start gap-8">
              <div className="hidden shrink-0 bg-white p-1.5 sm:block" style={{ width: 118, height: 118 }}>
                <div className="grid h-full w-full grid-cols-[repeat(13,1fr)] grid-rows-[repeat(13,1fr)]">
                  {qr.map((on, i) => (
                    <span key={i} style={{ background: on ? "#0078d7" : "white" }} />
                  ))}
                </div>
              </div>
              <div className="text-[13px] font-light leading-relaxed opacity-90 md:text-sm">
                Para obter mais informações sobre como evitar ruídos, visite
                <br />
                https://comunicacao.clara/ajuda
                <br />
                <br />
                Se você contatar um mediador, forneça este código:
                <br />
                Parada: EMOTIONAL_OVERLOAD_EXCEPTION (Ruído_na_Transmissão)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
