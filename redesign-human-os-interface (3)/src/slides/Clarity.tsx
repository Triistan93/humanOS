import { SectionTag, SlideTitle, Reveal, SlideShell } from "../components/ui";
import { Crosshair, CircleHelp, Minimize2, Quote, BookOpen } from "lucide-react";
import type { CSSProperties } from "react";

const RULES = [
  {
    icon: Crosshair,
    color: "#00f2ff",
    title: "Seja Específico & Quantitativo",
    desc: 'Elimine adjetivos vagos. Troque "fazer urgente" por "entregar o relatório revisado até sexta-feira às 14h".',
    source: "Princípio Minto / McKinsey",
  },
  {
    icon: CircleHelp,
    color: "#8b3dff",
    title: "Vença a Maldição do Conhecimento",
    desc: 'O Dr. Steven Pinker (Harvard) provou que assumimos que o outro sabe o contexto. Valide com "O que ficou combinado de ação física?" em vez de "Entendeu?".',
    source: "Dr. Steven Pinker (Harvard, 2014)",
  },
  {
    icon: Minimize2,
    color: "#39ff14",
    title: "BLUF (Bottom Line Up Front)",
    desc: "Apresente a conclusão e a solicitação no primeiro parágrafo. Textos e áudios prolixos viram ruído e são descartados cognitivamente.",
    source: "Comunicação de Alta Precisão",
  },
];

export default function Clarity({ active }: { active: boolean }) {
  return (
    <SlideShell>
      <div className="grid w-full max-w-[1500px] items-center gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-5">
          <Reveal active={active} delay={0.05}>
            <SectionTag index="04" label="O_SINAL_LIMPO" color="#00f2ff" />
          </Reveal>
          <Reveal active={active} delay={0.12}>
            <SlideTitle>
              O Sinal <span className="text-cyan-neon">Limpo</span>
            </SlideTitle>
          </Reveal>

          <Reveal active={active} delay={0.18}>
            <p className="max-w-xl text-base font-light leading-relaxed text-slate-300 md:text-xl">
              O óbvio não existe até que seja dito de forma inequívoca. A comunicação eficaz dentro de uma equipe exige precisão cirúrgica.
            </p>
          </Reveal>

          {/* George Bernard Shaw Quote Box */}
          <Reveal active={active} delay={0.28}>
            <div className="glass relative overflow-hidden rounded-2xl border-l-4 border-l-warning-neon bg-warning-neon/5 p-6 md:p-7">
              <Quote size={48} className="absolute -right-2 -top-2 text-warning-neon/15" />
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-warning-neon mb-2">
                <BookOpen size={12} /> Citação Clássica de Literatura
              </div>
              <p className="text-lg font-bold italic leading-snug text-warning-neon md:text-xl">
                "O maior problema na comunicação é a ilusão de que ela foi realizada."
              </p>
              <span className="mt-3 block font-mono text-xs text-slate-400">
                — George Bernard Shaw, Prêmio Nobel de Literatura (1903)
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right Column — Cards with sources */}
        <div className="space-y-5 lg:col-span-7">
          {RULES.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.title} active={active} delay={0.2 + i * 0.12}>
                <div
                  className="std-card group flex items-start gap-6 rounded-2xl border-l-4 p-6 md:gap-8 md:p-7"
                  style={{ borderLeftColor: r.color, "--card-accent": `${r.color}88` } as CSSProperties}
                >
                  <div className="relative shrink-0 mt-1">
                    <Icon
                      size={36}
                      strokeWidth={1.5}
                      style={{ color: r.color }}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between gap-3 font-mono text-[10px]">
                      <span className="tracking-[0.3em] text-slate-500">REGRA_0{i + 1}</span>
                      <span className="text-slate-400 rounded bg-white/5 px-2 py-0.5 border border-white/10">
                        {r.source}
                      </span>
                    </div>
                    <h3 className="mt-1.5 text-xl font-bold uppercase text-white md:text-2xl">{r.title}</h3>
                    <p className="mt-2 text-sm font-light text-slate-300 leading-relaxed md:text-base">{r.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}
