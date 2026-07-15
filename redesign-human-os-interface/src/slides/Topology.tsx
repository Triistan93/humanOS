import { SectionTag, SlideTitle, Reveal, SlideShell } from "../components/ui";
import { Filter, PhoneOff, LayoutGrid } from "lucide-react";
import type { CSSProperties } from "react";

/* ------------------------------------------------------------------ */
/* Animated mini network diagrams (SMIL packets flowing on edges)     */
/* ------------------------------------------------------------------ */

function Node({ x, y, color, pulse = false }: { x: number; y: number; color: string; pulse?: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={7} fill="#050b16" stroke={color} strokeWidth={1.2} opacity={0.9} />
      <circle cx={x} cy={y} r={3} fill={color}>
        {pulse && <animate attributeName="r" values="3;5.4;3" dur="1.4s" repeatCount="indefinite" />}
        {pulse && <animate attributeName="opacity" values="1;0.45;1" dur="1.4s" repeatCount="indefinite" />}
      </circle>
    </g>
  );
}

function Packet({ path, color, dur, begin = "0s" }: { path: string; color: string; dur: string; begin?: string }) {
  return (
    <circle r={2.6} fill={color} opacity={0.95}>
      <animateMotion dur={dur} repeatCount="indefinite" begin={begin} path={path} />
    </circle>
  );
}

function BottleneckDiagram() {
  const c = "#ff4d4d";
  const sats = [
    [32, 28],
    [32, 122],
    [268, 28],
    [268, 122],
    [150, 16],
  ];
  return (
    <svg viewBox="0 0 300 150" className="w-full">
      {sats.map(([x, y], i) => (
        <line key={i} x1={x} y1={y} x2={150} y2={80} stroke={c} strokeWidth={0.7} opacity={0.3} />
      ))}
      {sats.map(([x, y], i) => (
        <Packet key={`p${i}`} path={`M${x},${y} L150,80`} color={c} dur={`${1.6 + i * 0.35}s`} begin={`${i * 0.3}s`} />
      ))}
      {sats.map(([x, y], i) => (
        <Node key={`n${i}`} x={x} y={y} color="#94a3b8" />
      ))}
      <Node x={150} y={80} color={c} pulse />
    </svg>
  );
}

function ChainDiagram() {
  const c = "#facc15";
  const pts: [number, number][] = [
    [28, 80],
    [88, 68],
    [150, 84],
    [212, 70],
    [272, 80],
  ];
  const labels = ["sexta 14h", "sexta 14h?", "sexta??", "qui...14h?", "???"];
  return (
    <svg viewBox="0 0 300 150" className="w-full">
      {pts.slice(0, -1).map(([x1, y1], i) => {
        const [x2, y2] = pts[i + 1];
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={0.7} opacity={0.3} />;
      })}
      <circle r={3.4} fill={c}>
        <animateMotion dur="4.5s" repeatCount="indefinite" path="M28,80 L88,68 L150,84 L212,70 L272,80" />
        <animate attributeName="opacity" values="1;0.7;0.4;0.15" keyTimes="0;0.5;0.8;1" dur="4.5s" repeatCount="indefinite" />
      </circle>
      {pts.map(([x, y], i) => (
        <g key={i}>
          <Node x={x} y={y} color={i === 0 ? c : "#94a3b8"} />
          <text
            x={x}
            y={y + 34}
            textAnchor="middle"
            fill={i === 0 ? c : "#64748b"}
            fontSize={9}
            fontFamily="JetBrains Mono, monospace"
          >
            {labels[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}

function MeshDiagram() {
  const c = "#00f2ff";
  const R = 56;
  const cx = 150;
  const cy = 78;
  const nodes: [number, number][] = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return [cx + R * Math.cos(a) * 2, cy + R * Math.sin(a)];
  });
  const edges: [number, number][] = [];
  for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) edges.push([i, j]);
  return (
    <svg viewBox="0 0 300 150" className="w-full">
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={c} strokeWidth={0.55} opacity={0.18} />
      ))}
      <Packet path={`M${nodes[0][0]},${nodes[0][1]} L${nodes[3][0]},${nodes[3][1]}`} color={c} dur="2.2s" />
      <Packet path={`M${nodes[1][0]},${nodes[1][1]} L${nodes[4][0]},${nodes[4][1]}`} color="#8b3dff" dur="2.8s" begin="0.4s" />
      <Packet path={`M${nodes[2][0]},${nodes[2][1]} L${nodes[5][0]},${nodes[5][1]}`} color="#39ff14" dur="2.5s" begin="0.9s" />
      <Packet path={`M${nodes[5][0]},${nodes[5][1]} L${nodes[0][0]},${nodes[0][1]}`} color={c} dur="3.1s" begin="0.2s" />
      {nodes.map(([x, y], i) => (
        <Node key={i} x={x} y={y} color={c} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */

const TYPES = [
  {
    icon: Filter,
    color: "#ff4d4d",
    title: "O Gargalo",
    desc: "Uma única pessoa centraliza todas as informações. Se ela fica doente ou ocupada, a rede inteira para de funcionar.",
    Diagram: BottleneckDiagram,
  },
  {
    icon: PhoneOff,
    color: "#facc15",
    title: "Telefone Sem Fio",
    desc: "Existem muitos intermediários. A mensagem original perde o sentido e os detalhes até chegar ao destino final.",
    Diagram: ChainDiagram,
  },
  {
    icon: LayoutGrid,
    color: "#00f2ff",
    title: "Rede Aberta",
    desc: "Acesso transparente. Todos veem o mesmo painel, os mesmos combinados e as mesmas metas simultaneamente.",
    Diagram: MeshDiagram,
  },
];

export default function Topology({ active }: { active: boolean }) {
  return (
    <SlideShell>
      <div className="w-full max-w-[1500px] space-y-10 text-center md:space-y-14">
        <Reveal active={active} delay={0.05}>
          <SectionTag index="05" label="TOPOLOGIA_DA_REDE" color="#facc15" />
        </Reveal>
        <Reveal active={active} delay={0.12} className="space-y-4">
          <SlideTitle className="mx-auto">
            A Rede da <span className="text-warning-neon">Equipe</span>
          </SlideTitle>
          <p className="mx-auto max-w-3xl text-base font-light text-slate-300 md:text-xl">
            Como a informação viaja dentro do seu setor? Estruturas ruins de comunicação geram atrasos em
            todo o sistema.
          </p>
        </Reveal>

        <div className="grid gap-6 text-left md:grid-cols-3">
          {TYPES.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.title} active={active} delay={0.22 + i * 0.12}>
                <div
                  className="std-card group flex h-full flex-col rounded-2xl p-6 md:p-8"
                  style={{ borderTop: `3px solid ${t.color}`, "--card-accent": `${t.color}88` } as CSSProperties}
                >
                  <div className="flex items-center justify-between">
                    <Icon size={26} strokeWidth={1.5} style={{ color: t.color }} />
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-600 md:text-[10px]">
                      topology_0{i + 1}
                    </span>
                  </div>
                  <div className="my-5 rounded-xl border border-white/5 bg-black/40 px-2 py-3">
                    <t.Diagram />
                  </div>
                  <h4 className="text-xl font-bold uppercase text-white md:text-2xl">{t.title}</h4>
                  <p className="mt-2 text-sm font-light leading-relaxed text-slate-300 md:text-base">{t.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}
