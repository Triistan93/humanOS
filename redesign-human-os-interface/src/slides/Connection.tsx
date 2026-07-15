import { useEffect, useRef } from "react";
import { SectionTag, SlideTitle, Reveal, SlideShell } from "../components/ui";
import { Check, Lightbulb, Hand, MousePointer2 } from "lucide-react";

/* Pointer-reactive trust network: nodes glow & connect near cursor */
function TrustCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    type P = { x: number; y: number; ox: number; oy: number; ph: number };
    let pts: P[] = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = Array.from({ length: 34 }, (_, i) => {
        const gx = (i % 7) / 6;
        const gy = Math.floor(i / 7) / 4;
        return {
          ox: w * (0.08 + gx * 0.84) + (Math.random() - 0.5) * 30,
          oy: h * (0.1 + gy * 0.8) + (Math.random() - 0.5) * 30,
          x: 0,
          y: 0,
          ph: Math.random() * Math.PI * 2,
        };
      });
    };

    let t = 0;
    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, w, h);

      for (const p of pts) {
        p.x = p.ox + Math.sin(t + p.ph) * 9;
        p.y = p.oy + Math.cos(t * 0.8 + p.ph) * 9;
      }

      // static faint web
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 110) {
            ctx.strokeStyle = `rgba(57,255,20,${(1 - d / 110) * 0.07})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // activation around the cursor — trust spreads
      const R = 150;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < R) {
          const strength = 1 - dm / R;
          // link to cursor
          ctx.strokeStyle = `rgba(57,255,20,${strength * 0.5})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          // links between activated nodes
          for (let j = i + 1; j < pts.length; j++) {
            const b = pts[j];
            if (Math.hypot(b.x - mouse.x, b.y - mouse.y) < R && Math.hypot(a.x - b.x, a.y - b.y) < 120) {
              ctx.strokeStyle = `rgba(57,255,20,${strength * 0.35})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // nodes
      for (const p of pts) {
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        const on = dm < R;
        const strength = on ? 1 - dm / R : 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, on ? 3.4 : 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57,255,20,${0.25 + strength * 0.75})`;
        if (on) {
          ctx.shadowColor = "rgba(57,255,20,0.9)";
          ctx.shadowBlur = 12;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="h-full w-full cursor-crosshair" />;
}

const ITEMS = [
  { icon: Check, text: "Permissão para assumir um erro logo cedo." },
  { icon: Lightbulb, text: "Espaço seguro para dar ideias que parecem ruins." },
  { icon: Hand, text: 'Falar sobre falhas no processo sem ser taxado de "chato".' },
];

export default function Connection({ active }: { active: boolean }) {
  return (
    <SlideShell>
      <div className="grid w-full max-w-[1500px] items-center gap-10 lg:grid-cols-12 lg:gap-16">
        {/* left */}
        <div className="space-y-7 lg:col-span-6">
          <Reveal active={active} delay={0.05}>
            <SectionTag index="07" label="SEGURANÇA_PSICOLÓGICA" color="#39ff14" />
          </Reveal>
          <Reveal active={active} delay={0.12}>
            <SlideTitle>
              Segurança <span className="text-poison">Psicológica</span>
            </SlideTitle>
          </Reveal>
          <Reveal active={active} delay={0.2} className="space-y-5">
            <div className="border-l-4 border-poison pl-5">
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white md:text-lg">
                O cabo principal da rede
              </h3>
              <p className="mt-2 max-w-xl text-sm font-light leading-relaxed text-slate-300 md:text-lg">
                Se a equipe tem medo de errar ou de ser punida por falar a verdade, a informação não circula.
                O silêncio custa muito caro para a empresa.
              </p>
            </div>
            <div className="space-y-4 pt-2">
              {ITEMS.map((it, i) => {
                const Icon = it.icon;
                return (
                  <Reveal key={i} active={active} delay={0.3 + i * 0.1}>
                    <div className="flex items-center gap-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-poison/30 bg-poison/10 text-poison shadow-[0_0_20px_-6px_rgba(57,255,20,0.5)]">
                        <Icon size={17} strokeWidth={2} />
                      </div>
                      <span className="text-sm font-light text-slate-200 md:text-lg">{it.text}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* right — interactive trust network */}
        <Reveal active={active} delay={0.25} className="lg:col-span-6">
          <div
            className="glass corner-frame relative h-[46vh] overflow-hidden rounded-2xl md:h-[62vh]"
            style={{ borderColor: "rgba(57,255,20,0.25)", boxShadow: "0 0 50px -16px rgba(57,255,20,0.25)" }}
          >
            <TrustCanvas />
            <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-poison/70 md:text-[10px]">
              <MousePointer2 size={12} />
              rede_de_confiança — aproxime o cursor para ativar
            </div>
            <div className="pointer-events-none absolute bottom-5 right-5 font-mono text-[9px] uppercase tracking-[0.3em] text-slate-600 md:text-[10px]">
              34 nós // aguardando contato
            </div>
          </div>
        </Reveal>
      </div>
    </SlideShell>
  );
}
