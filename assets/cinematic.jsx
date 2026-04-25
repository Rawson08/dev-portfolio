/* Cinematic scroll sequence — Rockstar-inspired */

// Hook: returns scroll progress (0..1) through an element's lifecycle in the viewport
function useScrollProgress(ref, { offset = 'start end -- end start' } = {}) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when top of el enters bottom of viewport, 1 when bottom leaves top
        const total = r.height + vh;
        const traveled = vh - r.top;
        const prog = Math.max(0, Math.min(1, traveled / total));
        setP(prog);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
  return p;
}

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const mapRange = (v, inMin, inMax, outMin, outMax) => {
  const t = clamp((v - inMin) / (inMax - inMin), 0, 1);
  return outMin + (outMax - outMin) * t;
};

// Cinematic sequence: sticky titleblock that grows, parallax cards drift past,
// color wash transitions, grain + chromatic fringe.
function CinematicInterstitial() {
  const rootRef = useRef(null);
  const p = useScrollProgress(rootRef);

  // Beats
  // 0.10 - 0.40  title scales up & tracks out
  // 0.30 - 0.60  image cards slide in from sides w/ parallax
  // 0.55 - 0.80  color wash sweep
  // 0.75 - 1.00  title collapses to small marker, "proceed" ticks in

  const titleScale = mapRange(p, 0.05, 0.38, 0.55, 1.25);
  const titleTrack = mapRange(p, 0.05, 0.38, -0.06, 0.02); // letter-spacing em
  const titleOpacity = mapRange(p, 0.02, 0.1, 0, 1) * (1 - mapRange(p, 0.78, 0.92, 0, 1));

  const leftCardX = mapRange(p, 0.28, 0.58, -40, 6); // vw
  const leftCardY = mapRange(p, 0.28, 0.7, 40, -20);
  const rightCardX = mapRange(p, 0.32, 0.62, 40, -6);
  const rightCardY = mapRange(p, 0.32, 0.7, 60, -10);
  const cardOpacity = mapRange(p, 0.28, 0.45, 0, 1) * (1 - mapRange(p, 0.75, 0.9, 0, 1));

  const washY = mapRange(p, 0.5, 0.82, 110, -10); // vh
  const washOpacity = mapRange(p, 0.48, 0.62, 0, 1) * (1 - mapRange(p, 0.82, 0.95, 0, 1));

  const markerOpacity = mapRange(p, 0.82, 0.95, 0, 1);
  const markerY = mapRange(p, 0.82, 0.95, 20, 0);

  // Parallax bg grid
  const gridY = mapRange(p, 0, 1, 0, -80);

  return (
    <section
      ref={rootRef}
      className="cinematic"
      aria-hidden="true"
    >
      <div className="cine-inner">
        {/* parallax backdrop layers */}
        <div className="cine-grid" style={{ transform: `translate3d(0, ${gridY}px, 0)` }} />
        <div className="cine-grain" />

        {/* color wash sweep */}
        <div
          className="cine-wash"
          style={{
            transform: `translate3d(0, ${washY}vh, 0)`,
            opacity: washOpacity,
          }}
        />

        {/* image cards with parallax */}
        <div
          className="cine-card cine-card-l"
          style={{
            transform: `translate3d(${leftCardX}vw, ${leftCardY}px, 0) rotate(-4deg)`,
            opacity: cardOpacity,
          }}
        >
          <div className="cine-card-label">ship_001.log</div>
          <div className="cine-card-fill v-arca" />
          <div className="cine-card-caption">ARCA · internal tooling</div>
        </div>
        <div
          className="cine-card cine-card-r"
          style={{
            transform: `translate3d(${rightCardX}vw, ${rightCardY}px, 0) rotate(3deg)`,
            opacity: cardOpacity,
          }}
        >
          <div className="cine-card-label">build_017.scene</div>
          <div className="cine-card-fill v-expn" />
          <div className="cine-card-caption">ExpenSage · full-stack</div>
        </div>

        {/* massive title */}
        <div
          className="cine-title"
          style={{
            transform: `translate3d(0,0,0) scale(${titleScale})`,
            letterSpacing: `${titleTrack}em`,
            opacity: titleOpacity,
          }}
        >
          <div className="cine-eyebrow">
            <span>◆</span>
            <span>Chapter 01</span>
            <span>◆</span>
          </div>
          <h2 className="cine-headline">
            Built to<br /><em>ship.</em>
          </h2>
          <div className="cine-sub">Five years of production code, reviewed in full.</div>
        </div>

        {/* corner marker that pops at end */}
        <div
          className="cine-marker"
          style={{ transform: `translateY(${markerY}px)`, opacity: markerOpacity }}
        >
          <span className="cine-marker-line" />
          <span>Proceed to selected work</span>
          <span className="cine-marker-line" />
        </div>

        {/* sticky progress rail */}
        <div className="cine-rail">
          <div className="cine-rail-fill" style={{ transform: `scaleY(${p})` }} />
          <div className="cine-rail-pct">{String(Math.round(p * 100)).padStart(2, '0')}</div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CinematicInterstitial, useScrollProgress, clamp, lerp, mapRange });
