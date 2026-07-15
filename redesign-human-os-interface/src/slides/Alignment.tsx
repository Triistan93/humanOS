import { SectionTag, SlideTitle, Reveal, SlideShell, ScrambleText } from "../components/ui";
import { XCircle, CheckCircle2, PenLine } from "lucide-react";

const EXPECTATIVA = "Eu achei que ele fosse me enviar o relatório antes da reunião de diretoria, já que era óbvio que eu precisaria dele.";
const ACORDO = "Nós combinamos ontem, por escrito, que o relatório estaria na minha mesa impreterivelmente até as 09:00 de hoje.";

export default function Alignment({ active }: { active: boolean }) {
  return (
    <SlideShell>
      <div className="grid w-full max-w-[1500px] items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* left */}
        <div className="space-y-7">
          <Reveal active={active} delay={0.05}>
            <SectionTag index="06" label="ALINHAMENTO_DE_EXPECTATIVAS" color="#00f2ff" />
          </Reveal>
          <Reveal active={active} delay={0.12}>
            <SlideTitle>
              Acordos <span className="text-cyan-neon not-italic">vs</span>
              <br />
              <span className="text-stroke" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.45)" }}>
                Expectativas
              </span>
            </SlideTitle>
          </Reveal>
          <Reveal active={active} delay={0.2}>
            <p className="max-w-xl text-base font-light leading-relaxed text-slate-300 md:text-xl">
              Muitos problemas acontecem porque cobramos coisas que nunca foram combinadas abertamente.
            </p>
          </Reveal>
          <Reveal active={active} delay={0.3}>
            <div className="glass inline-flex items-center gap-4 rounded-xl px-5 py-4">
              <PenLine size={20} className="shrink-0 text-cyan-neon" strokeWidth={1.75} />
              <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-slate-400 md:text-xs">
                <span className="text-cyan-neon">dica_do_sistema:</span> transforme expectativas em acordos
                — de preferência por escrito.
              </p>
            </div>
          </Reveal>
        </div>

        {/* right — decode comparison */}
        <div className="space-y-6">
          <Reveal active={active} delay={0.24}>
            <div className="glass group relative overflow-hidden rounded-2xl border-l-4 border-l-error-neon bg-error-neon/5 p-6 md:p-8">
              <XCircle size={130} className="absolute -bottom-8 -right-8 text-error-neon opacity-[0.07] transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" />
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold uppercase tracking-tight text-error-neon md:text-2xl">
                  Expectativa <span className="font-mono text-xs font-normal text-slate-500">[ ruído ]</span>
                </h3>
                <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-error-neon/70 md:text-[10px]">
                  <span className="relative h-1.5 w-1.5 rounded-full ping-dot bg-error-neon text-error-neon" />
                  instável
                </span>
              </div>
              <p className="min-h-[72px] font-mono text-sm font-light leading-relaxed text-slate-300 md:min-h-[84px] md:text-lg">
                <ScrambleText text={EXPECTATIVA} active={active} mode="chaos" speed={90} />
              </p>
              <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.3em] text-slate-600 md:text-[10px]">
                // falha de decodificação — mensagem nunca foi combinada
              </div>
            </div>
          </Reveal>

          <Reveal active={active} delay={0.36}>
            <div className="glass group relative overflow-hidden rounded-2xl border-l-4 border-l-cyan-neon bg-cyan-neon/5 p-6 md:p-8">
              <CheckCircle2 size={130} className="absolute -bottom-8 -right-8 text-cyan-neon opacity-[0.07] transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110" />
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold uppercase tracking-tight text-cyan-neon md:text-2xl">
                  Acordo <span className="font-mono text-xs font-normal text-slate-500">[ sinal limpo ]</span>
                </h3>
                <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-neon/70 md:text-[10px]">
                  <span className="relative h-1.5 w-1.5 rounded-full ping-dot bg-cyan-neon text-cyan-neon" />
                  validado
                </span>
              </div>
              <p className="min-h-[72px] font-mono text-sm font-light leading-relaxed text-slate-200 md:min-h-[84px] md:text-lg">
                <ScrambleText text={ACORDO} active={active} mode="decode" speed={26} />
              </p>
              <div className="mt-4 font-mono text-[9px] uppercase tracking-[0.3em] text-slate-600 md:text-[10px]">
                // handshake completo — combinado explícito e documentado
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </SlideShell>
  );
}
