import { SectionTag, SlideTitle, Reveal, SlideShell } from "../components/ui";
import { ListChecks, Handshake, Clock, Search, RotateCcw, BookOpen } from "lucide-react";
import type { CSSProperties } from "react";

const HACKS = [
  {
    icon: ListChecks,
    color: "#00f2ff",
    title: "Escrita Direta & Próxima Ação",
    desc: "Use tópicos. Defina a 'Próxima Ação Física' com dono e data. Seja cortês, mas objetivo nas mensagens e e-mails.",
    author: "David Allen (GTD)",
  },
  {
    icon: Handshake,
    color: "#8b3dff",
    title: "Pressuposto de Boa Intenção",
    desc: "Assuma inicialmente que o colega agiu com boa intenção. Isso desativa a amígdalas cerebrais e o estado defensivo.",
    author: "Marcus Buckingham",
  },
  {
    icon: Clock,
    color: "#facc15",
    title: "Reunião Precisa (Checklist)",
    desc: "Sem pauta enviada previamente e sem entregáveis pactuados no final, a reunião deveria ter sido um documento de texto.",
    author: "Atul Gawande",
  },
  {
    icon: Search,
    color: "#39ff14",
    title: "Modo Curioso vs Julgador",
    desc: "Faça perguntas investigativas antes de formular acusações. A curiosidade desarma a escalada de conflitos.",
    author: "Edgar Schein (MIT)",
  },
];

export default function Hacks({
  active,
  onRestart,
  onOpenSources,
}: {
  active: boolean;
  onRestart: () => void;
  onOpenSources: () => void;
}) {
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
                  className="std-card group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-7 md:p-8"
                  style={{ borderBottom: `3px solid ${hx.color}`, "--card-accent": `${hx.color}88` } as CSSProperties}
                >
                  <div>
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

                  <div className="mt-6 border-t border-white/5 pt-3 font-mono text-[10px] text-slate-400 flex items-center justify-between">
                    <span>Base: <strong className="text-white">{hx.author}</strong></span>
                    <BookOpen size={12} style={{ color: hx.color }} />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* End of Transmission + Citation Drawer Callout */}
        <Reveal active={active} delay={0.65} className="pt-4">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-4">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-cyan-neon/40 to-transparent" />

            <button
              onClick={onOpenSources}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-neon/40 bg-cyan-neon/10 px-6 py-2.5 font-mono text-xs text-cyan-neon uppercase tracking-widest transition-all hover:bg-cyan-neon hover:text-void font-bold shadow-[0_0_20px_rgba(0,242,255,0.2)]"
            >
              <BookOpen size={15} /> Explora a Central de Fontes Bibliográficas
            </button>

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
