import { SectionTag, SlideTitle, Reveal, SlideShell } from "../components/ui";
import { Crosshair, CircleHelp, Minimize2, Quote } from "lucide-react";
import type { CSSProperties } from "react";

const RULES = [
  {
    icon: Crosshair,
    color: "#00f2ff",
    title: "Seja Específico",
    desc: 'Troque "fazer rápido" por "entregar até sexta-feira às 14h".',
  },
  {
    icon: CircleHelp,
    color: "#8b3dff",
    title: "Valide o Entendimento",
    desc: 'Termine com "O que você entendeu disso?" em vez de apenas perguntar "Entendeu?".',
  },
  {
    icon: Minimize2,
    color: "#39ff14",
    title: "Menos é Mais",
    desc: "Seja direto. Textos e áudios longos viram ruído e acabam sendo ignorados pela equipe.",
  },
];

export default function Clarity({ active }: { active: boolean }) {
  return (
    <SlideShell>
      <div className="grid w-full max-w-[1500px] items-center gap-10 lg:grid-cols-12 lg:gap-16">
        {/* left */}
        <div className="space-y-7 lg:col-span-5">
          <Reveal active={active} delay={0.05}>
            <SectionTag index="04" label="O_SINAL_LIMPO" color="#00f2ff" />
          </Reveal>
          <Reveal active={active} delay={0.12}>
            <SlideTitle>
              O Sinal <span className="text-cyan-neon">Limpo</span>
            </SlideTitle>
          </Reveal>
          <Reveal active={active} delay={0.2}>
            <p className="max-w-xl text-base font-light leading-relaxed text-slate-300 md:text-xl">
              O óbvio não existe até que seja dito. A comunicação eficaz dentro de uma equipe exige precisão
              absoluta.
            </p>
          </Reveal>
          <Reveal active={active} delay={0.28}>
            <div className="glass relative overflow-hidden rounded-2xl border-l-4 border-l-warning-neon bg-warning-neon/5 p-6 md:p-7">
              <Quote size={48} className="absolute -right-2 -top-2 text-warning-neon/15" />
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                O maior inimigo da produtividade:
              </p>
              <p className="mt-3 text-xl font-bold italic leading-snug text-warning-neon md:text-2xl">
                "Eu achei que você já sabia."
              </p>
            </div>
          </Reveal>
        </div>

        {/* right — rule cards */}
        <div className="space-y-5 lg:col-span-7">
          {RULES.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.title} active={active} delay={0.2 + i * 0.12}>
                <div
                  className="std-card group flex items-center gap-6 rounded-2xl border-l-4 p-6 md:gap-8 md:p-8"
                  style={{ borderLeftColor: r.color, "--card-accent": `${r.color}88` } as CSSProperties}
                >
                  <div className="relative shrink-0">
                    <Icon
                      size={44}
                      strokeWidth={1.25}
                      style={{ color: r.color }}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] tracking-[0.3em] text-slate-600">
                        REGRA_0{i + 1}
                      </span>
                      <span className="h-px flex-grow bg-white/5" />
                    </div>
                    <h3 className="mt-1 text-xl font-bold uppercase text-white md:text-2xl">{r.title}</h3>
                    <p className="mt-1.5 text-sm font-light text-slate-400 md:text-lg">{r.desc}</p>
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
