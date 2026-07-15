import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Quote, Sparkles, CheckCircle2 } from "lucide-react";
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
    author: string;
    book: string;
    year: number;
    quote: string;
    layout: "osnp" | "pillars" | "matrix";
    steps?: Step[];
    pillars?: Pillar[];
    quadrants?: { title: string; subtitle: string; desc: string; color: string; badge: string }[];
  }
> = {
  cnv: {
    id: "PROTOCOLO_01",
    title: "Comunicação Não-Violenta",
    subtitle: "Estrutura sistemática para dissolver conflitos sem violência velada e sem se anular.",
    color: "#8b3dff",
    author: "Marshall B. Rosenberg, Ph.D.",
    book: "Comunicação Não-Violenta: Técnicas para Aprimorar Relacionamentos Pessoais e Profissionais (1999)",
    year: 1999,
    quote: "Todo julgamento é uma expressão trágica de uma necessidade humana não atendida.",
    layout: "osnp",
    steps: [
      {
        letter: "O",
        title: "Observação (Fatos Isentos)",
        desc: "Descreva a cena como uma câmera gravando. Separe fatos brutos de julgamentos ou interpretações.",
        example: '"Você me enviou a apresentação 2 horas após o prazo do cliente" em vez de "Você é irresponsável".',
        color: "#00f2ff",
      },
      {
        letter: "S",
        title: "Sentimento (Vulnerabilidade Consciente)",
        desc: "Assuma a responsabilidade pelas suas emoções sem culpabilizar a outra pessoa.",
        example: '"Fiquei angustiado e preocupado com a nossa imagem institucional."',
        color: "#8b3dff",
      },
      {
        letter: "N",
        title: "Necessidade (Valores Fundamentais)",
        desc: "Articule a necessidade universal não atendida por trás do sentimento.",
        example: '"Preciso de previsibilidade e pontualidade para organizar minhas entregas."',
        color: "#facc15",
      },
      {
        letter: "P",
        title: "Pedido (Ação Concreta e Exequível)",
        desc: "Solicite uma ação específica e mensurável. Um pedido aceita recusa; uma exigência gera resistência.",
        example: '"Podemos combinar que você enviará a versão prévia com 24h de antecedência?"',
        color: "#39ff14",
      },
    ],
  },
  escuta: {
    id: "PROTOCOLO_02",
    title: "Escuta Ativa & Reflexiva",
    subtitle: "Método comprovado em Harvard para desarmar respostas defensivas e capturar a intenção do emissor.",
    color: "#00f2ff",
    author: "Carl Rogers & Richard Farson (Harvard Business Review)",
    book: "Active Listening (1957)",
    year: 1957,
    quote: "A maior barreira à comunicação é a nossa tendência compulsiva de julgar antes de compreender de fato.",
    layout: "pillars",
    pillars: [
      {
        title: "Presença & Suspensão",
        tag: "DESLIGUE A RÉPLICA",
        desc: "Interrompa o diálogo interno formulando a tréplica. Elimine telas, faça contato visual sustentado e absorva a comunicação não-verbal (tom, postura, respiração).",
        color: "#00f2ff",
      },
      {
        title: "Pausa & Silêncio Estratégico",
        tag: "O ESPAÇO PARA O PENSAMENTO",
        desc: "O silêncio de 3 a 5 segundos após a fala do interlocutor permite que ele expresse a camada mais profunda da questão. Não preencha o vazio com soluções prematuras.",
        color: "#8b3dff",
      },
      {
        title: "Loop de Paráfrase",
        tag: "VALIDAÇÃO DO PAYLOAD",
        desc: 'Sintetize antes de responder: "Deixe-me ver se compreendi com clareza: o que mais te preocupa no projeto atual é X e Y, correto?". Isso valida a recepção sem ruído.',
        color: "#39ff14",
      },
    ],
  },
  feedback: {
    id: "PROTOCOLO_03",
    title: "Radical Candor (Candidor Radical)",
    subtitle: "A matriz de liderança de Kim Scott para dar feedbacks sinceros sem destruição interpessoal.",
    color: "#39ff14",
    author: "Kim Scott (Ex-Diretora Google & Apple University)",
    book: "Radical Candor: Be a Kick-Ass Boss Without Losing Your Humanity (2017)",
    year: 2017,
    quote: "Clareza é gentileza. Esconder a verdade por vergonha ou conforto é uma forma de egoísmo.",
    layout: "matrix",
    quadrants: [
      {
        title: "Radical Candor (O Ideal)",
        subtitle: "Importar-se Pessoalmente + Confrontar Diretamene",
        desc: "Você cuida da pessoa enquanto fala a verdade de forma clara e específica. Foco em ajudar o outro a crescer.",
        color: "#39ff14",
        badge: "QUADRANTE ALVO",
      },
      {
        title: "Empatia Ruinosa",
        subtitle: "Importar-se Pessoalmente + Não Confrontar",
        desc: "A armadilha do 'bonzinho'. Você esconde falhas críticas para não magoar, mas impede que a pessoa evolua e compromete o time.",
        color: "#facc15",
        badge: "GARGALO SILENCIOSO",
      },
      {
        title: "Agressão Abominável",
        subtitle: "Não se Importar + Confrontar Diretamene",
        desc: "Ataques pessoais, humilhação pública e críticas sem empatia. Gera medo, defesa e destruição da segurança psicológica.",
        color: "#ff4d4d",
        badge: "RUÍDO CRÍTICO",
      },
      {
        title: "Insinceridade Manipulativa",
        subtitle: "Não se Importar + Não Confrontar",
        desc: "Fofoca pelas costas, comentários passivo-agressivos e falsidade política. Destrói a confiança de todo o ecossistema.",
        color: "#8b3dff",
        badge: "TÓXICO",
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
          className="fixed inset-0 z-[85] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            key="modal-box"
            onClick={(e) => e.stopPropagation()}
            className="modal-breathe relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl md:rounded-3xl"
            style={
              {
                background: "rgba(6, 9, 16, 0.98)",
                border: `2px solid ${p.color}`,
                "--m-glow": `${p.color}66`,
              } as CSSProperties
            }
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* Top Bar Header */}
            <div
              className="flex items-center justify-between gap-6 border-b border-white/10 px-7 py-5 md:px-10"
              style={{ background: `linear-gradient(90deg, ${p.color}18, transparent 70%)` }}
            >
              <div className="flex items-center gap-3">
                <span className="relative h-2 w-2 rounded-full ping-dot" style={{ background: p.color, color: p.color }} />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] md:text-xs" style={{ color: p.color }}>
                  {p.id} <span className="text-slate-600">//</span> METODOLOGIA_CIENTÍFICA
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

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto px-7 py-8 md:px-10 md:py-10">
              {/* Author & Literature Citation Badge */}
              <div className="mb-6 inline-flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 font-mono text-xs text-slate-300">
                <BookOpen size={16} style={{ color: p.color }} />
                <span>Autor: <strong className="text-white">{p.author}</strong></span>
                <span className="text-slate-600">|</span>
                <span>Obra: <em className="text-slate-200">{p.book}</em></span>
              </div>

              <h3 className="font-display text-3xl font-bold uppercase italic tracking-tight text-white md:text-5xl">
                {p.title}
              </h3>
              <p className="mt-3 max-w-3xl text-lg font-light leading-relaxed md:text-xl" style={{ color: p.color }}>
                {p.subtitle}
              </p>

              {/* Quote Block */}
              <div className="relative mt-6 rounded-2xl border-l-4 bg-black/40 p-5 font-mono text-sm italic text-slate-200" style={{ borderLeftColor: p.color }}>
                <Quote size={24} className="absolute top-3 right-4 opacity-15" style={{ color: p.color }} />
                "{p.quote}" — <span className="not-italic font-bold text-slate-400">{p.author}</span>
              </div>

              {/* OSNP 4 Steps Layout */}
              {p.layout === "osnp" && p.steps && (
                <div className="mt-10">
                  <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.4em] text-slate-400">
                    <span>A Estrutura Quádrupla (O.S.N.P)</span>
                    <Sparkles size={14} className="text-purple-400" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {p.steps.map((s, i) => (
                      <motion.div
                        key={s.letter}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                        className="std-card flex items-start gap-5 rounded-2xl p-6"
                        style={{ borderLeft: `4px solid ${s.color}`, "--card-accent": `${s.color}88` } as CSSProperties}
                      >
                        <span className="font-mono text-4xl font-bold leading-none md:text-5xl" style={{ color: s.color }}>
                          {s.letter}
                        </span>
                        <div>
                          <h5 className="text-lg font-bold uppercase text-white md:text-xl">{s.title}</h5>
                          <p className="mt-2 text-sm font-light text-slate-300 leading-relaxed">{s.desc}</p>
                          <div className="mt-3 rounded-lg border border-white/5 bg-black/50 p-3 font-mono text-xs italic" style={{ color: s.color }}>
                            Exemplo Prático: {s.example}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pillars Layout */}
              {p.layout === "pillars" && p.pillars && (
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                  {p.pillars.map((pl, i) => (
                    <motion.div
                      key={pl.title}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.12, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                      className="std-card rounded-2xl p-7 flex flex-col justify-between"
                      style={{ borderTop: `4px solid ${pl.color}`, "--card-accent": `${pl.color}88` } as CSSProperties}
                    >
                      <div>
                        <span className="font-mono text-4xl font-bold opacity-20" style={{ color: pl.color }}>
                          0{i + 1}
                        </span>
                        <h4 className="mt-2 text-xl font-bold uppercase text-white md:text-2xl">{pl.title}</h4>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: pl.color }}>
                          ({pl.tag})
                        </p>
                        <p className="mt-4 text-sm font-light leading-relaxed text-slate-300">{pl.desc}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[10px] text-slate-500 flex items-center gap-2">
                        <CheckCircle2 size={12} style={{ color: pl.color }} /> Protocolo validado em laboratório
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Radical Candor Matrix Layout */}
              {p.layout === "matrix" && p.quadrants && (
                <div className="mt-10">
                  <div className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-slate-400">
                    A Matriz de 2 Eixos: Importar-se Pessoalmente (Y) vs Confrontar Diretamente (X)
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    {p.quadrants.map((q, i) => (
                      <motion.div
                        key={q.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                        className="std-card rounded-2xl p-6 border-l-4"
                        style={{ borderLeftColor: q.color, "--card-accent": `${q.color}88` } as CSSProperties}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 rounded border" style={{ color: q.color, borderColor: `${q.color}44`, backgroundColor: `${q.color}10` }}>
                            {q.badge}
                          </span>
                          <span className="font-mono text-xs text-slate-500">Q0{i + 1}</span>
                        </div>
                        <h4 className="mt-3 text-xl font-bold uppercase text-white">{q.title}</h4>
                        <p className="font-mono text-xs mt-1 font-medium" style={{ color: q.color }}>
                          {q.subtitle}
                        </p>
                        <p className="mt-3 text-sm font-light text-slate-300 leading-relaxed">{q.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 bg-black/40 px-7 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-slate-500 md:px-10">
              REFERÊNCIA BIBLIOGRÁFICA REGISTRADA // TECLE ESC PARA FECHAR
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
