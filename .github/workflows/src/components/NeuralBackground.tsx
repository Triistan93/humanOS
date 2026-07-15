import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number; // 0 = cyan, 1 = violet, 2 = poison
};

const COLORS = ["0, 242, 255", "139, 61, 255", "57, 255, 20"];

export default function NeuralBackground({ slideIndex }: { slideIndex: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const slideHueShift = useRef(slideIndex);

  useEffect(() => {
    slideHueShift.current = slideIndex;
  }, [slideIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let nodes: Node[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(90, Math.floor((w * h) / 22000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.5,
        hue: Math.random() > 0.86 ? (Math.random() > 0.5 ? 1 : 2) : 0,
      }));
    };

    const onMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX / w, y: e.clientY / h };
    };

    let t = 0;
    const draw = () => {
      t += 0.004;
      ctx.clearRect(0, 0, w, h);

      const px = (mouse.current.x - 0.5) * 22;
      const py = (mouse.current.y - 0.5) * 22;

      // drifting nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
      }

      // connections
      const linkDist = Math.min(w, h) * 0.14;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.14;
            ctx.strokeStyle = `rgba(${COLORS[a.hue === b.hue ? a.hue : 0]}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x + px, a.y + py);
            ctx.lineTo(b.x + px, b.y + py);
            ctx.stroke();
          }
        }
      }

      // node dots
      for (const n of nodes) {
        const pulse = 0.6 + Math.sin(t * 2 + n.x * 0.01) * 0.4;
        ctx.fillStyle = `rgba(${COLORS[n.hue]}, ${0.35 * pulse})`;
        ctx.beginPath();
        ctx.arc(n.x + px, n.y + py, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <>
      {/* deep-space gradient base */}
      <div
        className="fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 70% -10%, rgba(0, 60, 100, 0.28) 0%, transparent 55%), radial-gradient(ellipse 100% 80% at 10% 110%, rgba(60, 0, 110, 0.22) 0%, transparent 55%), #010409",
        }}
      />
      <canvas ref={canvasRef} className="fixed inset-0 opacity-90" />
      {/* grid floor */}
      <div className="grid-floor fixed inset-0" />
    </>
  );
}

/* Soft cursor glow that trails the pointer */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[600px] w-[600px] rounded-full opacity-60"
      style={{
        background: "radial-gradient(circle, rgba(0, 242, 255, 0.055) 0%, rgba(0, 242, 255, 0.02) 40%, transparent 70%)",
      }}
    />
  );
}
