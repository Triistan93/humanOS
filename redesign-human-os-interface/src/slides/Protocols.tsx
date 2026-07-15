import { useState } from "react";
import { SectionTag, SlideTitle, Reveal, SlideShell } from "../components/ui";
import { HeartPulse, Headphones, MessagesSquare, Download, Loader2, CheckCircle2, ChevronRight } from "lucide-react";
import type { CSSProperties } from "react";

const MODULES = [
  {
    id: "cnv",
    icon: HeartPulse,
    color: "#8b3dff",
    title: "Comunicação Não-Violenta",
    sub: "Método 01: Traduzindo Conflitos.",
  },
  {
    id: "escuta",
    icon: Headphones,
    color: "#00f2ff",
    title: "Escuta Ativa",
    sub: "Método 02: Expandindo a Atenção.",
  },
  {
    id: "feedback",
    icon: MessagesSquare,
    color: "#39ff14",
    title: "Radical Candor (Feedback)",
    sub: "Método 03: Comunicação Direta e Cuidadosa.",
  },
];

type SyncState = "idle" | "syncing" | "done";

export default function Protocols({
  active,
  onOpenModal,
}: {
  active: boolean;
  onOpenModal: (id: string) => void;
}) {
  const [sync, setSync] = useState<SyncState>("idle");

  const startSync = () => {
    if (sync !== "idle") return;
    setSync("syncing");
    window.setTimeout(() => setSync("done"), 2200);
  };

  return (
    <SlideShell>
      <div className="grid w-full max-w-[1500px] items-center gap-10 lg:grid-cols-12 lg:gap-16">
        {/* left */}
        <div className="space-y-7 lg:col-span-5">
          <Reveal active={active} delay={0.05}>
            <SectionTag index="03" label="DATABASE_DE_PROTOCOLOS" color="#8b3dff" />
          </Reveal>
          <Reveal active={active} delay={0.12}>
            <SlideTitle>
              Ferramentas de <span className="text-violet-neon">Conexão</span>
            </SlideTitle>
          </Reveal>
          <Reveal active={active} delay={0.2}>
            <p className="max-w-xl text-base font-light leading-relaxed text-slate-300 md:text-xl">
              Ative as melhores práticas para limpar o ruído, evitar desentendimentos e falar com clareza no
              dia a dia.
            </p>
          </Reveal>
          <Reveal active={active} delay={0.28}>
            <button
              onClick={startSync}
              disabled={sync !== "idle"}
              className={`hud-button group inline-flex items-center gap-3 rounded-sm px-9 py-4 font-mono text-xs font-bold uppercase tracking-[0.25em] transition-all duration-500 md:text-sm ${
                sync === "done"
                  ? "bg-poison text-void shadow-[0_0_35px_rgba(57,255,20,0.35)]"
                  : "bg-violet-neon text-white shadow-[0_0_35px_rgba(139,61,255,0.3)] hover:bg-white hover:text-violet-neon"
              }`}
            >
              {sync === "idle" && <Download size={18} className="transition-transform duration-300 group-hover:translate-y-0.5" />}
              {sync === "syncing" && <Loader2 size={18} className="animate-spin" />}
              {sync === "done" && <CheckCircle2 size={18} />}
              {sync === "idle" ? "Ativar_Ferramentas" : sync === "syncing" ? "Preparando_Sistema..." : "Ferramentas_Ativas"}
            </button>
          </Reveal>

          {sync === "done" && (
            <Reveal active delay={0.1}>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-poison/70 md:text-xs">
                // 3 protocolos desbloqueados — clique para abrir o módulo
              </p>
            </Reveal>
          )}
        </div>

        {/* right — module list */}
        <div className="relative lg:col-span-7">
          {/* scan sweep */}
          {sync === "syncing" && (
            <div
              className="scan-sweep pointer-events-none absolute left-0 z-10 h-10 w-full"
              style={{
                background: "linear-gradient(to bottom, transparent, rgba(0,242,255,0.35), transparent)",
              }}
            />
          )}

          <div className="space-y-4">
            {MODULES.map((m, i) => {
              const Icon = m.icon;
              const revealed = sync === "done";
              return (
                <button
                  key={m.id}
                  onClick={() => revealed && onOpenModal(m.id)}
                  className={`glass group flex w-full items-center gap-5 rounded-2xl border p-5 text-left transition-all duration-700 md:gap-6 md:p-6 ${
                    revealed ? "cursor-pointer hover:bg-white/[0.05]" : "cursor-default"
                  }`}
                  style={
                    {
                      borderColor: `${m.color}${revealed ? "55" : "1e"}`,
                      opacity: sync === "idle" ? 0 : 1,
                      transform: sync === "idle" ? "translateY(26px)" : "translateY(0)",
                      transitionDelay: sync === "idle" ? "0ms" : `${i * 160}ms`,
                      "--card-accent": `${m.color}88`,
                    } as CSSProperties
                  }
                >
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: `${m.color}14`,
                      borderColor: `${m.color}45`,
                      color: m.color,
                      boxShadow: revealed ? `0 0 24px -8px ${m.color}` : "none",
                    }}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <div className="flex-grow">
                    <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-600 md:text-[10px]">
                      record_0{i + 1} {revealed ? "— desbloqueado" : sync === "syncing" ? "— sincronizando..." : "— criptografado"}
                    </div>
                    <h3 className="mt-0.5 text-lg font-bold uppercase leading-tight tracking-tight text-white md:text-2xl">
                      {m.title}
                    </h3>
                    <p className="mt-0.5 text-sm font-light italic text-slate-400 md:text-base">{m.sub}</p>
                  </div>
                  <ChevronRight
                    size={20}
                    className={`shrink-0 transition-all duration-300 ${revealed ? "opacity-60 group-hover:translate-x-1.5 group-hover:opacity-100" : "opacity-10"}`}
                    style={{ color: m.color }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
