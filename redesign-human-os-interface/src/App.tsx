import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import NeuralBackground, { CursorGlow } from "./components/NeuralBackground";
import BootSequence from "./components/BootSequence";
import HUD from "./components/HUD";
import Sidebar, { MODULES } from "./components/Sidebar";
import BookModal from "./components/BookModal";
import Crash from "./components/Crash";
import Hero from "./slides/Hero";
import Noise from "./slides/Noise";
import Protocols from "./slides/Protocols";
import Clarity from "./slides/Clarity";
import Topology from "./slides/Topology";
import Alignment from "./slides/Alignment";
import Connection from "./slides/Connection";
import Hacks from "./slides/Hacks";

const TOTAL = 8;
const NAMES = MODULES.map((m) => m.name);
const SIGNALS = [85, 24, 61, 97, 74, 91, 95, 99];

export default function App() {
  const [booted, setBooted] = useState(false);
  const [slide, setSlide] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState<string | null>(null);
  const [crashRun, setCrashRun] = useState(0); // 0 = inactive
  const crashActive = crashRun > 0;

  const locked = !booted || crashActive || modal !== null;

  const goTo = useCallback(
    (i: number) => {
      if (locked) return;
      setSlide(Math.min(Math.max(i, 0), TOTAL - 1));
      setSidebarOpen(false);
    },
    [locked]
  );

  const step = useCallback(
    (d: number) => {
      if (locked) return;
      setSlide((s) => Math.min(Math.max(s + d, 0), TOTAL - 1));
    },
    [locked]
  );

  /* keyboard navigation */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (modal) setModal(null);
        else if (sidebarOpen) setSidebarOpen(false);
        return;
      }
      if (locked) return;
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") step(1);
      if (e.key === "ArrowLeft" || e.key === "PageUp") step(-1);
      if (e.key === "Home") goTo(0);
      if (e.key === "End") goTo(TOTAL - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [locked, modal, sidebarOpen, step, goTo]);

  /* wheel navigation (debounced) */
  const wheelLock = useRef(0);
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (locked) return;
      const now = Date.now();
      if (now - wheelLock.current < 1100) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 30) return;
      wheelLock.current = now;
      step(delta > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [locked, step]);

  /* touch swipe */
  const touch = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const start = (e: TouchEvent) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY });
    const end = (e: TouchEvent) => {
      if (!touch.current || locked) return;
      const dx = e.changedTouches[0].clientX - touch.current.x;
      const dy = e.changedTouches[0].clientY - touch.current.y;
      touch.current = null;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) step(dx < 0 ? 1 : -1);
    };
    window.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("touchend", end, { passive: true });
    return () => {
      window.removeEventListener("touchstart", start);
      window.removeEventListener("touchend", end);
    };
  }, [locked, step]);

  const signal = crashActive ? 0 : SIGNALS[slide];

  return (
    <div className="fixed inset-0 overflow-hidden bg-void font-display text-slate-100">
      <NeuralBackground slideIndex={slide} />
      <CursorGlow />
      <div className="vignette" />

      {/* slide track */}
      <main
        className="slide-track relative z-10 flex h-screen"
        style={{ transform: `translateX(-${slide * 100}vw)` }}
      >
        <Hero active={booted && slide === 0} onNext={() => step(1)} />
        <Noise active={slide === 1} onCrash={() => setCrashRun((r) => r + 1)} />
        <Protocols active={slide === 2} onOpenModal={setModal} />
        <Clarity active={slide === 3} />
        <Topology active={slide === 4} />
        <Alignment active={slide === 5} />
        <Connection active={slide === 6} />
        <Hacks active={slide === 7} onRestart={() => goTo(0)} />
      </main>

      {/* HUD chrome */}
      {booted && (
        <HUD
          current={slide}
          total={TOTAL}
          names={NAMES}
          signal={signal}
          crashing={crashActive}
          locked={locked}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
          onGoTo={goTo}
          onMenu={() => setSidebarOpen((o) => !o)}
          menuOpen={sidebarOpen}
        />
      )}

      <Sidebar open={booted && sidebarOpen} current={slide} onGoTo={goTo} onClose={() => setSidebarOpen(false)} />

      <BookModal modalId={modal} onClose={() => setModal(null)} />

      <AnimatePresence>
        {crashActive && (
          <Crash key={`crash-${crashRun}`} runId={crashRun} onDone={() => setCrashRun(0)} />
        )}
      </AnimatePresence>

      {/* CRT layers above everything */}
      <div className="scanlines" />

      {/* boot overlay */}
      <AnimatePresence>{!booted && <BootSequence onDone={() => setBooted(true)} />}</AnimatePresence>
    </div>
  );
}
