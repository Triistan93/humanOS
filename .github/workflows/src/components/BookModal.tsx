import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { CSSProperties } from "react";

type Step = { letter: string; title: string; desc: string; example: string; color: string };
type Pillar = { title: string; tag: string; desc: string; color: string };

const PROTOCOLS: Record<
  string,
  {
    id: string;
    title: string;
    subtitle: string;
    color: string;
    steps?: Step[];
    pillars?: Pillar[];
    layout: "osnp" | "pillars";
  }
> = {
  cnv: {
    id: "PROTOCOLO_01",
    title: "Comunicação Não-Violenta",
    subtitle: "Um método simples para resolver conflitos sem atacar o outro — e sem se anular.",
    color: "#8b3dff",
    layout: "osnp",
    steps: [
      {
        letter: "O",
        title: "Observação",
        desc: "Diga apenas os fatos, como uma câmera gravando.",
        example: '"Você entregou com atraso" vs "Você é irresponsável".',
        color: "#00f2ff",
      },
      {
        letter: "S",
        title: "Sentimento",
        desc: "Compartilhe como você se sentiu, sem culpar o outro.",
        example: '"Fiquei frustrado e muito preocupado."',
        color: "#8b3dff",
      },
      {
        letter: "N",
        title: "Necessidade",
        desc: "Explique o motivo por trás do seu sentimento.",
        example: '"Eu preciso de previsibilidade para o meu trabalho."',
        color: "#facc15",
      },
      {
        letter: "P",
        title: "Pedido",
        desc: "Faça um pedido claro e negociável — não uma exigência.",
        example: '"Podemos combinar avisos quando houver atraso?"',
        color: "#39ff14",
      },
    ],
  },
  escuta: {
    id: "PROTOCOLO_02",
    title: "Escuta Ativa",
    subtitle: "Escutar não é ficar calado esperando a vez de falar. É um esforço consciente.",
    color: "#00f2ff",
    layout: "pillars",
    pillars: [
      {
        title: "Presença Real",
        tag: "FOQUE NO AGORA",
        desc: "Desligue a vontade de retrucar enquanto o outro fala. Guarde o celular, faça contato visual e demonstre que você está presente de verdade.",
        color: "#00f2ff",
      },
      {
        title: "O Silêncio",
        tag: "RESPEITE A PAUSA",
        desc: "O silêncio não é ruim. Resista à tentação de interromper ou preencher os \"brancos\". Deixe a pessoa concluir a linha de raciocínio dela.",
        color: "#8b3dff",
      },
      {
        title: "Confirmação",
        tag: "VALIDAÇÃO",
        desc: "\"Deixe-me ver se eu entendi... você quis dizer que...\" Repetir a ideia mostra respeito, elimina confusão e garante que a mensagem chegou intacta.",
        color: "#39ff14",
      },
    ],
  },
  feedback: {
    id: "PROTOCOLO_03",
    title: "Radical Candor",
    subtitle: "O método de Kim Scott para dar feedbacks difíceis sem destruir relacionamentos.",
    color: "#39ff14",
    layout: "pillars",
    pillars: [
      {
        title: "Importar-se",
        tag: "EMPATIA REAL",
        desc: "Antes de corrigir alguém, mostre genuinamente que você se importa com o crescimento pessoal e profissional daquela pessoa.",
        color: "#00f2ff",
      },
      {
        title: "Confrontar",
        tag: "CLAREZA É GENTILEZA",
        desc: "Elogios falsos ou críticas amenizadas (o famoso \"sanduíche de feedback\") só confundem. Esconder a verdade não ajuda ninguém.",
        color: "#8b3dff",
      },
      {
        title: "Elogio Útil",
        tag: "ESPECIFICIDADE",
        desc: "Um \"bom trabalho\" genérico soa preguiçoso. Diga exatamente o que a pessoa fez, como fez e por que foi importante para o time.",
        color: "#39ff14",
      },
    ],
  },
};

export default function BookModal({
  modalId,
  onClose,
}: {
  modalId: string | null;
  onClose: () => void;
}) {
  const p = modalId ? PROTOCOLS[modalId] : null;

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          key="modal-backdrop"
          className="fixed inset-0 z-[85] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            key="modal-box"
            onClick={(e) => e.stopPropagation()}
            className="modal-breathe relative flex max-h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl md:rounded-3xl"
            style={
              {
                background: "rgba(8, 11, 18, 0.97)",
                border: `2px solid ${p.color}`,
                "--m-glow": `${p.color}66`,
              } as CSSProperties
            }
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* header */}
            <div
              className="flex items-center justify-between gap-6 border-b border-white/5 px-7 py-5 md:px-10"
              style={{ background: `linear-gradient(90deg, ${p.color}14, transparent 60%)` }}
            >
              <div className="flex items-center gap-4">
                <span className="relative h-2 w-2 rounded-full ping-dot" style={{ background: p.color, color: p.color }} />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] md:text-xs" style={{ color: p.color }}>
                  {p.id} <span className="text-slate-600">//</span>{" "}
                  <span className="text-slate-400">lendo módulo</span>
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-300 hover:rotate-90 hover:border-error-neon hover:text-error-neon"
              >
                <X size={18} />
              </button>
            </div>

            {/* body */}
            <div className="flex-1 overflow-y-auto px-7 py-8 md:px-10 md:py-10">
              <h3 className="font-display text-3xl font-bold uppercase italic tracking-tight text-white md:text-5xl">
                {p.title}
              </h3>
              <p className="mt-3 max-w-3xl text-lg font-light italic md:text-2xl" style={{ color: p.color }}>
                {p.subtitle}
              </p>

              {p.layout === "osnp" && p.steps && (
                <div className="mt-10">
                  <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.4em] text-slate-500 md:text-xs">
                    A Estrutura — O.S.N.P
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {p.steps.map((s, i) => (
                      <motion.div
                        key={s.letter}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                        className="std-card flex items-start gap-5 rounded-xl p-5 md:p-6"
                        style={{ borderLeft: `4px solid ${s.color}`, "--card-accent": `${s.color}88` } as CSSProperties}
                      >
                        <span className="font-mono text-4xl font-bold leading-none md:text-5xl" style={{ color: s.color }}>
                          {s.letter}
                        </span>
                        <div>
                          <h5 className="text-lg font-bold uppercase text-white md:text-xl">{s.title}</h5>
                          <p className="mt-1 text-sm font-light text-slate-300 md:text-base">{s.desc}</p>
                          <p className="mt-2 text-xs italic md:text-sm" style={{ color: s.color }}>
                            Ex: {s.example}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {p.layout === "pillars" && p.pillars && (
                <div className="mt-10 grid gap-5 md:grid-cols-3">
                  {p.pillars.map((pl, i) => (
                    <motion.div
                      key={pl.title}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                      className="std-card rounded-2xl p-7"
                      style={{ borderTop: `4px solid ${pl.color}`, "--card-accent": `${pl.color}88` } as CSSProperties}
                    >
                      <span className="font-mono text-5xl font-bold opacity-15" style={{ color: pl.color }}>
                        0{i + 1}
                      </span>
                      <h4 className="mt-3 text-xl font-bold uppercase text-white md:text-2xl">{pl.title}</h4>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] md:text-xs" style={{ color: pl.color }}>
                        ({pl.tag})
                      </p>
                      <p className="mt-4 text-sm font-light leading-relaxed text-slate-300 md:text-base">{pl.desc}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* footer strip */}
            <div
              className="border-t border-white/5 px-7 py-3 text-center font-mono text-[9px] uppercase tracking-[0.4em] text-slate-600 md:px-10 md:text-[10px]"
            >
              fim do módulo <span style={{ color: p.color }}>//</span> esc para fechar
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
