import { useEffect, useRef } from "react";

const DEFAULT_LINES = [
  "const App = () => {",
  "  const [state, setState] = useState(null);",
  "  useEffect(() => {/* fetch data */}, []);",
  "  return <Dashboard theme='dark' />",
  "}",
  "// TODO: Optimize renders",
  "function sum(a,b){ return a + b }",
];

export default function Background({
  lines = DEFAULT_LINES,
  minChars = 40,           // minimum characters typed per snippet
  maxChars = 160,          // maximum characters typed per snippet
  typingSpeed = [10, 26],  // ms per char [min, max] randomized
  spawnEveryMs = 1800,     // how often to spawn a new snippet
  fadeOutMs = 7000,        // slow fade-out duration
  liveLimit = 6,           // cap simultaneous snippets
  marginPct = 10,          // keep snippets away from edges (percent)
  crossSpawnChance = 0.05, // probability of spawning cross instead of code (5%)
  crossFadeOutMs = 5000,   // cross fade-out duration
}) {
  const rafRef = useRef(null);
  const lerpState = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const snippets = useRef(new Set());
  const crosses = useRef(new Set()); // track crosses separately
  const reduced = useRef(false);

  useEffect(() => {
    // Reduced motion?
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mqReduce.matches;
    const onMQ = () => (reduced.current = mqReduce.matches);
    mqReduce.addEventListener?.("change", onMQ);

    // Parallax drift via CSS vars
    const root = document.documentElement;
    const onScroll = () => {
      lerpState.current.tx = window.scrollX;
      lerpState.current.ty = window.scrollY;
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };
    const tick = () => {
      const s = lerpState.current;
      s.x += (s.tx - s.x) * 0.08;
      s.y += (s.ty - s.y) * 0.08;
      root.style.setProperty("--scrollX", String(s.x));
      root.style.setProperty("--scrollY", String(s.y));
      if (Math.abs(s.tx - s.x) > 0.1 || Math.abs(s.ty - s.y) > 0.1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Spawner
    const timer = setInterval(() => {
      if (snippets.current.size >= liveLimit) return;
      
      // Occasionally spawn a cross instead of code (only if no cross exists)
      if (Math.random() < crossSpawnChance && crosses.current.size === 0) {
        spawnCross();
      } else {
        spawnSnippet();
      }
    }, spawnEveryMs);

    // Initial kick
    spawnSnippet();

    return () => {
      clearInterval(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mqReduce.removeEventListener?.("change", onMQ);
      // cleanup nodes
      for (const el of snippets.current) el.remove();
      snippets.current.clear();
      for (const el of crosses.current) el.remove();
      crosses.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spawnSnippet = () => {
    const el = document.createElement("pre");
    el.className = "bg-code-snippet";

    // Ensure there's a dedicated container for background snippets
    let container = document.getElementById("bg-snippets-layer");
    if (!container) {
      container = document.createElement("div");
      container.id = "bg-snippets-layer";
      container.style.position = "fixed";
      container.style.inset = "0";
      container.style.zIndex = "-1"; // Always behind content
      container.style.pointerEvents = "none";
      document.body.appendChild(container);
    }

    // Random placement with margins
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const padX = (vw * marginPct) / 100;
    const padY = (vh * marginPct) / 100;
    const x = rand(padX, vw - padX - 1);
    const y = rand(padY, vh - padY - 1);
    const rot = rand(-4, 4); // slight tilt
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.transform = `rotate(${rot}deg)`;

    // Opacity profile per snippet
    el.style.setProperty("--startOpacity", String(clamp(rand(0.7, 0.95), 0, 1)));
    el.style.setProperty("--endOpacity", "0");
    el.style.setProperty("--fadeOutMs", `${fadeOutMs}ms`);

    container.appendChild(el);
    snippets.current.add(el);

    // Build text payload
    const targetChars = Math.round(rand(minChars, maxChars));
    const text = buildRandomText(lines, targetChars);

    if (reduced.current) {
      el.textContent = text;
      el.dataset.phase = "show";
      setTimeout(() => {
        el.dataset.phase = "fade";
        setTimeout(() => cleanup(el), fadeOutMs + 50);
      }, 400);
      return;
    }

    // Typewriter animation
    let i = 0;
    el.dataset.phase = "show";
    const speed = Math.round(rand(typingSpeed[0], typingSpeed[1]));
    const iv = setInterval(() => {
      if (!el.isConnected) { clearInterval(iv); return; }
      el.textContent = text.slice(0, i++);
      if (i > text.length) {
        clearInterval(iv);
        setTimeout(() => {
          if (!el.isConnected) return;
          el.dataset.phase = "fade";
          setTimeout(() => cleanup(el), fadeOutMs + 50);
        }, 800);
      }
    }, speed);
  };

  const spawnCross = () => {
    const crossEl = document.createElement("div");
    crossEl.className = "bg-cross";

    // Ensure there's a dedicated container for background snippets
    let container = document.getElementById("bg-snippets-layer");
    if (!container) {
      container = document.createElement("div");
      container.id = "bg-snippets-layer";
      container.style.position = "fixed";
      container.style.inset = "0";
      container.style.zIndex = "-1"; // Always behind content
      container.style.pointerEvents = "none";
      document.body.appendChild(container);
    }

    // Random placement with margins
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const padX = (vw * marginPct) / 100;
    const padY = (vh * marginPct) / 100;
    const x = rand(padX, vw - padX - 100); // Leave space for cross width
    const y = rand(padY, vh - padY - 100); // Leave space for cross height
    const rot = rand(-8, 8); // slight tilt
    const scale = rand(0.8, 1.2); // size variation
    
    crossEl.style.left = `${x}px`;
    crossEl.style.top = `${y}px`;
    crossEl.style.transform = `rotate(${rot}deg) scale(${scale})`;

    // Create cross using SVG for smooth drawing animation
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "50");
    svg.setAttribute("height", "70");
    svg.style.filter = "drop-shadow(0 0 8px rgba(255, 192, 0, 0.6)) drop-shadow(0 0 16px rgba(255, 192, 0, 0.3))";

    // Vertical line path (hand-drawn with subtle imperfections)
    const verticalPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    verticalPath.setAttribute("d", "M25 5 Q25.3 15 24.8 25 Q25.2 35 24.9 45 Q25.1 55 25 65");
    verticalPath.setAttribute("stroke", "rgba(255, 192, 0, 0.9)");
    verticalPath.setAttribute("stroke-width", "3");
    verticalPath.setAttribute("stroke-linecap", "round");
    verticalPath.setAttribute("fill", "none");
    
    // Horizontal line path (hand-drawn with subtle imperfections)
    const horizontalPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    horizontalPath.setAttribute("d", "M5 25 Q15 24.7 25 25.2 Q35 25.1 45 25");
    horizontalPath.setAttribute("stroke", "rgba(255, 192, 0, 0.9)");
    horizontalPath.setAttribute("stroke-width", "3");
    horizontalPath.setAttribute("stroke-linecap", "round");
    horizontalPath.setAttribute("fill", "none");

    svg.appendChild(verticalPath);
    svg.appendChild(horizontalPath);
    crossEl.appendChild(svg);

    // Animation properties
    crossEl.style.position = "absolute";
    crossEl.style.opacity = "1"; // Start visible for drawing animation
    
    container.appendChild(crossEl);
    snippets.current.add(crossEl);
    crosses.current.add(crossEl); // track crosses separately

    // Get path lengths and set up drawing animation
    const verticalLength = verticalPath.getTotalLength();
    const horizontalLength = horizontalPath.getTotalLength();
    
    // Initially hide the paths
    verticalPath.style.strokeDasharray = verticalLength;
    verticalPath.style.strokeDashoffset = verticalLength;
    horizontalPath.style.strokeDasharray = horizontalLength;
    horizontalPath.style.strokeDashoffset = horizontalLength;

    if (reduced.current) {
      // Skip drawing animation for reduced motion
      verticalPath.style.strokeDashoffset = "0";
      horizontalPath.style.strokeDashoffset = "0";
    } else {
      // Animate drawing the vertical line first (top to bottom)
      verticalPath.style.transition = "stroke-dashoffset 800ms ease-out";
      setTimeout(() => {
        if (verticalPath.isConnected) {
          verticalPath.style.strokeDashoffset = "0";
        }
      }, 100);

      // Then animate drawing the horizontal line (left to right) with slight overlap
      horizontalPath.style.transition = "stroke-dashoffset 600ms ease-out";
      setTimeout(() => {
        if (horizontalPath.isConnected) {
          horizontalPath.style.strokeDashoffset = "0";
        }
      }, 500);
    }

    // Start fade out after delay
    setTimeout(() => {
      if (crossEl.isConnected) {
        crossEl.style.transition = "opacity 1000ms ease-in-out";
        crossEl.style.opacity = "0";
        setTimeout(() => {
          cleanup(crossEl);
          crosses.current.delete(crossEl); // remove from cross tracking
        }, 1000);
      }
    }, crossFadeOutMs);
  };

  const cleanup = (el) => {
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
      snippets.current.delete(el);
    }
  };

  return null;
}

/* utils */
function rand(min, max) { return Math.random() * (max - min) + min; }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function buildRandomText(lines, targetChars) {
  let out = "";
  while (out.length < targetChars) {
    const line = lines[Math.floor(Math.random() * lines.length)];
    out += (out ? "\n" : "") + line;
  }
  return out.slice(0, targetChars);
}
