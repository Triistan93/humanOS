import { useEffect, useMemo, useRef, useState } from "react";
import { SectionTag, SlideTitle, Reveal, SlideShell } from "../components/ui";
import { Megaphone, Ear, TriangleAlert, Skull, BookOpen } from "lucide-react";

const GLYPHS = "█▓▒░#%&@$?!*";
const MESSAGE = "O relatório será entregue sexta-feira às 14:00.";

function garble(text: string, amount: number) {
  const cut = Math.floor((amount / 100) * text.length);
  return text
    .split("")
    .map((c, i) => {
      if (c === " ") return " ";
      const edge = i + (Math.sin(i * 12.9898) + 1) * 3;
      return edge < cut ? GLYPHS[Math.floor(Math.abs(Math.sin(i * 78.233)) * GLYPHS.length)] : c;
    })
    .join("");
}

function Waveform({ noise }: { noise: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const noiseRef = useRef(noise);
  noiseRef.current = noise;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      t += 0.03;
      const n = noiseRef.current / 100;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const mid = h / 2;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 6]);
      ctx.beginPath();
      ctx.moveTo(0, mid);
      ctx.lineTo(w, mid);
      ctx.stroke();
      ctx.setLineDash([]);

      const cr = Math.round(0 + n * 255);
      const cg = Math.round(242 - n * 165);
      const cb = Math.round(255 - n * 178);

      if (n > 0.02) {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const spike = (Math.random() - 0.5) * (h * 0.9) * n;
          const y = mid + spike;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${cr}, ${cg * 0.4}, ${cb * 0.4}, ${0.35 * n})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const carrier = Math.sin(x * 0.028 + t * 2.2) * Math.sin(x * 0.006 + t * 0.6);
        const amp = (h * 0.3) * (1 - n * 0.45);
        const jitter = (Math.random() - 0.5) * h * 0.55 * n;
        const y = mid + carrier * amp + jitter;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, 0.95)`;
      ctx.lineWidth = 2;
      ctx.shadowColor = `rgba(${cr}, ${cg}, ${cb}, 0.8)`;
      ctx.shadowBlur = 14;
      ctx.stroke();
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="h-44 w-full md:h-60" />;
}

export default function Noise({
  active,
  onCrash,
}: {
  active: boolean;
  onCrash: () => void;
}) {
  const [noise, setNoise] = useState(38);
  const integrity = 100 - noise;
  const statusColor = noise > 65 ? "#ff4d4d" : noise > 35 ? "#facc15" : "#00f2ff";

  const garbled = useMemo(() => garble(MESSAGE, noise), [noise]);

  return (
    <SlideShell>
      <div className="grid w-full max-w-[1600px] items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-5">
          <Reveal active={active} delay={0.05}>
            <SectionTag index="02" label="SINAL_VS_RUÍDO" color="#ff4d4d" />
          </Reveal>
          <Reveal active={active} delay={0.12}>
            <SlideTitle>
              Sinal <span className="text-cyan-neon">vs</span> Ruído
            </SlideTitle>
          </Reveal>

          {/* Theoretical Foundations Badge */}
          <Reveal active={active} delay={0.18}>
            <div className="inline-flex items-center gap-2 rounded-lg border border-error-neon/30 bg-error-neon/10 px-3 py-1.5 font-mono text-[10px] text-error-neon uppercase tracking-wider">
              <BookOpen size={13} />
              <span>Teoria da Informação (Shannon & Weaver, 1949) + Nobel Daniel Kahneman (Noise, 2021)</span>
            </div>
          </Reveal>

          <Reveal active={active} delay={0.24} className="space-y-4">
            <div className="flex gap-4">
              <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-cyan-neon/30 bg-cyan-neon/10 text-cyan-neon">
                <Megaphone size={18} strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white md:text-base">
                  O "Emissor" <span className="text-slate-500">(quem fala)</span>
                </h3>
                <p className="mt-1 text-sm font-light leading-relaxed text-slate-300 md:text-base">
                  Falamos sob o viés de urgência, pressupostos subentendidos e frases ambíguas.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-violet-neon/30 bg-violet-neon/10 text-violet-neon">
                <Ear size={18} strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white md:text-base">
                  O "Receptor" <span className="text-slate-500">(quem ouve)</span>
                </h3>
                <p className="mt-1 text-sm font-light leading-relaxed text-slate-300 md:text-base">
                  Filtra a mensagem por seus viéses de confirmação pessoais e projeta expectativas.
                </p>
              </div>
            </div>

            <div className="glass flex items-start gap-4 rounded-xl border-l-4 border-l-error-neon bg-error-neon/5 p-5">
              <TriangleAlert size={20} className="mt-0.5 shrink-0 text-error-neon" strokeWidth={1.75} />
              <p className="text-sm font-medium leading-snug text-slate-200 md:text-base">
                <span className="font-mono text-xs text-error-neon">// DIAGNÓSTICO KANEMAN:</span> ruído é a variabilidade indesejada no julgamento humano que gera{" "}
                <span className="font-bold text-error-neon underline underline-offset-4">fofoca, conflito e retrabalho</span>.
              </p>
            </div>
          </Reveal>

          <Reveal active={active} delay={0.32}>
            <button
              onClick={onCrash}
              className="group inline-flex items-center gap-3 rounded-sm bg-error-neon px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.25em] text-white shadow-[0_0_35px_rgba(255,77,77,0.3)] transition-all duration-300 hover:bg-white hover:text-error-neon md:text-sm"
            >
              <Skull size={18} className="transition-transform duration-500 group-hover:rotate-[20deg]" />
              Simular_Falha_Sistema
            </button>
          </Reveal>
        </div>

        {/* Right Column — Interactive Monitor */}
        <Reveal active={active} delay={0.22} className="lg:col-span-7">
          <div className="glass corner-frame relative overflow-hidden rounded-2xl p-6 md:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-slate-400 md:text-xs">
                Simulador_de_Canal // Bell_Labs_Protocol
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] md:text-xs">
                <span className="relative h-1.5 w-1.5 rounded-full ping-dot" style={{ background: statusColor, color: statusColor }} />
                <span style={{ color: statusColor }}>
                  {noise > 65 ? "transmissão corrompida" : noise > 35 ? "degradação parcial" : "mensagem íntegra"}
                </span>
              </div>
            </div>

            <Waveform noise={noise} />

            <div className="mt-6">
              <div className="mb-1.5 flex justify-between font-mono text-[10px] uppercase tracking-[0.3em] md:text-xs">
                <span className="text-slate-400">fidelidade da mensagem (shannon-weaver ratio)</span>
                <span className="font-bold tabular-nums" style={{ color: statusColor }}>
                  {integrity}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${integrity}%`, background: statusColor, boxShadow: `0 0 12px ${statusColor}` }}
                />
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-white/8 bg-black/40 p-4">
              <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500 md:text-[10px]">
                payload decodificado no terminal do receptor:
              </div>
              <p className="break-words font-mono text-sm leading-relaxed md:text-base" style={{ color: statusColor }}>
                {garbled}
              </p>
            </div>

            <div className="mt-7">
              <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.3em] md:text-xs">
                <span className="text-slate-400">gradiente de ruído no canal humano</span>
                <span className="tabular-nums text-slate-500">{noise}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={noise}
                onChange={(e) => setNoise(Number(e.target.value))}
                aria-label="Nível de ruído"
                className="w-full cursor-pointer accent-error-neon"
              />
              <div className="mt-1 flex justify-between font-mono text-[9px] uppercase tracking-[0.25em] text-slate-500">
                <span>transmissão limpa</span>
                <span>entropia total</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </SlideShell>
  );
}
