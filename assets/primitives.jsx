/* Primitives: hooks, small components */
const { useState, useEffect, useRef, useCallback, useMemo } = React;

// Intersection observer hook — add .in class on enter
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = (delayMs = 0) => {
      // Cancel anything stuck first
      if (el.getAnimations) el.getAnimations().forEach(a => a.cancel());
      // Direct class swap for immediate fallback visibility
      el.classList.add('in');
      // Then run a nice animation on top via WAAPI (it will override the static .in)
      try {
        el.animate(
          [
            { opacity: 0, transform: 'translateY(30px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 750, delay: delayMs, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' }
        );
      } catch (e) {}
    };

    const delay = parseFloat(el.style.animationDelay) || 0;

    // Synchronous check: if already in viewport at mount, reveal immediately
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      requestAnimationFrame(() => reveal(0));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          reveal(delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);

    // Fallback — ensure visibility if anything goes wrong
    const t = setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight + 200 && !el.classList.contains('in')) {
        reveal(0);
        io.unobserve(el);
      }
    }, 200);

    return () => { clearTimeout(t); io.disconnect(); };
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, as: As = 'div', className = '', style = {}, ...rest }) {
  const ref = useReveal();
  return (
    <As ref={ref} className={`reveal ${className}`} style={{ animationDelay: `${delay}ms`, ...style }} {...rest}>
      {children}
    </As>
  );
}

// Magnetic button (or any element)
function Magnetic({ strength = 0.35, children, className = '', as: As = 'a', ...rest }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = 'translate(0,0)';
  };
  return (
    <As
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: 'transform .35s cubic-bezier(.2,.7,.2,1)' }}
      {...rest}
    >
      {children}
    </As>
  );
}

// 3D tilt wrapper for project cards
function TiltCard({ children, className = '', style = {}, max = 8, ...rest }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -2 * max;
    const ry = (px - 0.5) * 2 * max;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    const inner = el.querySelector('.card-inner');
    if (inner) inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    const inner = el.querySelector('.card-inner');
    if (inner) inner.style.transform = 'rotateX(0) rotateY(0)';
  };
  return (
    <div ref={ref} className={`card ${className}`} style={style} onMouseMove={onMove} onMouseLeave={onLeave} {...rest}>
      <div className="card-inner" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}

// Icon component — minimal inline SVGs
const Icon = ({ name, size = 16, ...rest }) => {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', ...rest };
  switch (name) {
    case 'arrow-up-right': return <svg {...common}><path d="M7 17L17 7M7 7h10v10" /></svg>;
    case 'arrow-right': return <svg {...common}><path d="M5 12h14M13 5l7 7-7 7" /></svg>;
    case 'arrow-down': return <svg {...common}><path d="M12 5v14M5 12l7 7 7-7" /></svg>;
    case 'sun': return <svg {...common}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>;
    case 'moon': return <svg {...common}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>;
    case 'github': return <svg {...common}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg>;
    case 'linkedin': return <svg {...common}><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 100 4 2 2 0 000-4z" /></svg>;
    case 'mail': return <svg {...common}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></svg>;
    case 'instagram': return <svg {...common}><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.4A4 4 0 1112.6 8 4 4 0 0116 11.4zM17.5 6.5h.01" /></svg>;
    case 'download': return <svg {...common}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>;
    case 'sparkle': return <svg {...common}><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" /></svg>;
    case 'play': return <svg {...common}><polygon points="5 3 19 12 5 21 5 3" /></svg>;
    default: return null;
  }
};

// Scroll spy
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [ids.join(',')]);
  return active;
}

// Cursor dot
function CursorDot() {
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);
    let tx = 0, ty = 0, x = 0, y = 0;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const onOver = (e) => {
      if (e.target.closest && e.target.closest('a, button, .card, .chip, .cert, .theme-toggle')) dot.classList.add('hover');
      else dot.classList.remove('hover');
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    let raf;
    const tick = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
      dot.remove();
    };
  }, []);
  return null;
}

Object.assign(window, { useReveal, Reveal, Magnetic, TiltCard, Icon, useScrollSpy, CursorDot });
