import { SectionTag, SlideTitle, Reveal, SlideShell } from "../components/ui";
import { ListChecks, Handshake, Clock, Search, RotateCcw } from "lucide-react";
import type { CSSProperties } from "react";

const HACKS = [
  {
    icon: ListChecks,
    color: "#00f2ff",
    title: "Escrita Direta",
    desc: "Use tópicos (bullet points). Seja educado e gentil, mas vá direto ao ponto nas suas mensagens e e-mails.",
  },
  {
    icon: Handshake,
    color: "#8b3dff",
    title: "Boa Intenção",
    desc: "Assuma sempre que o seu colega quer ajudar. Isso desarma a nossa atitude defensiva instantaneamente.",
  },
  {
    icon: Clock,
    color: "#facc15",
    title: "Reunião Precisa",
    desc: "Se a reunião não tem uma pauta clara e não gera uma ação no final, ela provavelmente deveria ter sido um e-mail.",
  },
  {
    icon: Search,
    color: "#39ff14",
    title: "Seja Curioso",
    desc: "Pergunte mais. Afirme menos. A curiosidade elimina o julgamento precipitado e evita grandes brigas.",
  },
];

export default function Hacks({ active, onRestart }: { active: boolean; onRestart: () => void }) {
  return (
    <SlideShell>
      <div className="w-full max-w-[1500px] space-y-10 text-center md:space-y-12">
        <Reveal active={active} delay={0.05}>
          <SectionTag index="08" label="MICRO_HACKS_DE_COMUNICAÇÃO" color="#00f2ff" />
        </Reveal>
        <Reveal active={active} delay={0.12}>
          <SlideTitle className="mx-auto">
            Micro Hacks de <span className="text-cyan-neon">Comunicação</span>
          </SlideTitle>
        </Reveal>

        <div className="grid gap-5 text-left md:grid-cols-2 xl:grid-cols-4">
          {HACKS.map((hx, i) => {
            const Icon = hx.icon;
            return (
              <Reveal key={hx.title} active={active} delay={0.2 + i * 0.11}>
                <div
                  className="std-card group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 md:p-8"
                  style={{ borderBottom: `3px solid ${hx.color}`, "--card-accent": `${hx.color}88` } as CSSProperties}
                >
                  <span
                    className="pointer-events-none absolute -right-3 -top-5 font-mono text-8xl font-bold opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.12]"
                    style={{ color: hx.color }}
                  >
                    0{i + 1}
                  </span>
                  <div
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                    style={{ background: `${hx.color}12`, borderColor: `${hx.color}40`, color: hx.color }}
                  >
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-lg font-bold uppercase text-white md:text-xl">{hx.title}</h4>
                  <p className="mt-3 text-sm font-light leading-relaxed text-slate-300 md:text-base">{hx.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* end of transmission */}
        <Reveal active={active} delay={0.65} className="pt-4">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-4">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-cyan-neon/40 to-transparent" />
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-slate-500">
              fim_da_transmissão <span className="text-cyan-neon/60">//</span> human_os v9.0.4
            </p>
            <button
              onClick={onRestart}
              className="hud-button group inline-flex items-center gap-3 rounded-sm border border-cyan-neon/40 bg-cyan-neon/5 px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.25em] text-cyan-neon transition-all duration-300 hover:bg-cyan-neon hover:text-void"
            >
              <RotateCcw size={15} className="transition-transform duration-500 group-hover:-rotate-180" />
              Reiniciar_Sistema
            </button>
          </div>
        </Reveal>
      </div>
    </SlideShell>
  );
}
