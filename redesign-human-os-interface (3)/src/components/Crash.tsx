import { useEffect, useMemo, useRef, useState } from "react";

/* ====================================================================
   CONFIGURAÇÃO DA SIMULAÇÃO DE ERRO / TELA AZUL (BSOD)
   Altere os valores abaixo em milissegundos (ms) para controlar a simulação.
   ==================================================================== */
const CRASH_CONFIG = {
  // Duração da fase 1: Glitch vermelho piscando e chacoalhando (ms)
  glitchDuration: 3000,

  // Duração da fase 2: Apagão/Escuridão rápida antes da tela azul (ms)
  blackoutDuration: 200,

  // Intervalo (ms) para incrementar a porcentagem (0% a 100%) na Tela Azul
  // Quanto MENOR este número, mais RÁPIDO a porcentagem sobe.
  percentageUpdateInterval: 600,

  // Incremento máximo de porcentagem por passo (ex: 8% a 15% por vez)
  maxStepIncrement: 12,

  // Pausa (ms) na Tela Azul quando atinge 100% antes de fechar e voltar ao site
  holdAtCompletionDelay: 2000,
};

type Phase = "glitch" | "black" | "bsod";

export default function Crash({ runId, onDone }: { runId: number; onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("glitch");
  const [progress, setProgress] = useState(0);
  const timers = useRef<number[]>([]);

  const bars = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        height: 2 + Math.random() * 28,
        delay: Math.random() * 0.5,
        color: Math.random() > 0.5 ? "rgba(0,242,255,0.6)" : "rgba(255,0,60,0.6)",
      })),
    [runId]
  );

  const qr = useMemo(() => Array.from({ length: 169 }, () => Math.random() > 0.5), [runId]);

  useEffect(() => {
    setPhase("glitch");
    setProgress(0);

    // Transição 1: Glitch -> Apagão
    timers.current.push(
      window.setTimeout(() => setPhase("black"), CRASH_CONFIG.glitchDuration)
    );

    // Transição 2: Apagão -> Tela Azul (BSOD)
    timers.current.push(
      window.setTimeout(
        () => setPhase("bsod"),
        CRASH_CONFIG.glitchDuration + CRASH_CONFIG.blackoutDuration
      )
    );

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [runId]);

  useEffect(() => {
    if (phase !== "bsod") return;
    const id = window.setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.floor(Math.random() * CRASH_CONFIG.maxStepIncrement) + 3);
        return next;
      });
    }, CRASH_CONFIG.percentageUpdateInterval);
    return () => window.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (progress >= 100 && phase === "bsod") {
      const t = window.setTimeout(onDone, CRASH_CONFIG.holdAtCompletionDelay);
      return () => window.clearTimeout(t);
    }
  }, [progress, phase, onDone]);

  return (
    <div className="fixed inset-0 z-[96]">
      {/* FASE 1: GLITCH VERMELHO */}
      {phase === "glitch" && (
        <div className="crash-jitter absolute inset-0 overflow-hidden bg-void">
          {bars.map((b) => (
            <div
              key={b.id}
              className="glitch-bar absolute left-0 w-full"
              style={{ top: `${b.top}%`, height: b.height, background: b.color, animationDelay: `${b.delay}s` }}
            />
          ))}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 font-mono">
            <div
              className="text-2xl font-bold uppercase tracking-[0.5em] text-error-neon md:text-5xl"
              style={{ textShadow: "4px 0 rgba(0,242,255,0.8), -4px 0 rgba(255,0,60,0.8)" }}
            >
              sinal perdido
            </div>
            <div className="text-xs uppercase tracking-[0.4em] text-slate-300 md:text-sm">
              AMYGDALA_HIJACK // DESCONECTADO // RUÍDO CRÍTICO
            </div>
          </div>
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(255,0,30,0.35) 100%)" }}
          />
        </div>
      )}

      {/* FASE 2: APAGÃO */}
      {phase === "black" && <div className="absolute inset-0 bg-black" />}

      {/* FASE 3: TELA AZUL (BSOD) */}
      {phase === "bsod" && (
        <div
          className="absolute inset-0 flex items-center justify-center p-6"
          style={{ background: "#0078d7", fontFamily: "'Segoe UI', system-ui, sans-serif" }}
        >
          <div className="w-[min(900px,88vw)] text-white">
            <div className="mb-6 font-light leading-none" style={{ fontSize: "clamp(6rem, 14vw, 10rem)" }}>
              :(
            </div>
            <h1 className="mb-8 max-w-[820px] text-xl font-light leading-relaxed md:text-[1.65rem]">
              A sua conversa encontrou um ruído crítico e gerou um desentendimento. Estamos esfriando os
              ânimos, baixando o tom de voz e organizando as ideias para tentar novamente.
            </h1>
            <div className="mb-10 text-xl font-light md:text-3xl">
              {progress < 100 ? (
                <span>
                  <strong className="font-bold tabular-nums">{progress}%</strong> processado
                </span>
              ) : (
                <span className="font-semibold text-cyan-200">REINICIANDO PROTOCOLO DE DIÁLOGO...</span>
              )}
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
                <span className="underline">https://comunicacao.clara/ajuda</span>
                <br />
                <br />
                Se você contatar um mediador, forneça este código:
                <br />
                Parada: <strong className="font-mono font-semibold">EMOTIONAL_OVERLOAD_EXCEPTION (Ruído_na_Transmissão)</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
