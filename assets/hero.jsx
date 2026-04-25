/* Hero section + nav */

function Nav({ theme, setTheme, active }) {
  const items = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'about', label: 'About' },
  ];
  const [hoverIdx, setHoverIdx] = useState(null);
  const activeIdx = items.findIndex(i => i.id === active);
  const targetIdx = hoverIdx !== null ? hoverIdx : (activeIdx >= 0 ? activeIdx : 0);
  const linksRef = useRef(null);
  const [pill, setPill] = useState({ x: 0, w: 0 });

  useEffect(() => {
    if (!linksRef.current) return;
    const el = linksRef.current.querySelectorAll('a')[targetIdx];
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = linksRef.current.getBoundingClientRect();
    setPill({ x: r.left - p.left, w: r.width });
  }, [targetIdx, active]);

  // Ripple on click
  const onLinkClick = (e) => {
    const a = e.currentTarget;
    const r = a.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'nav-ripple';
    ripple.style.left = (e.clientX - r.left) + 'px';
    ripple.style.top = (e.clientY - r.top) + 'px';
    a.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  };

  return (
    <div className="nav-wrap">
      {/* SVG goo filter for water-drop morph */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <nav className="nav">
        <a href="#home" className="nav-brand" aria-label="Roshan Subedi">
          <div className="nav-mark"><span>R</span></div>
          <span className="nav-wordmark">
            <span className="nav-wm-name">Roshan Subedi</span>
            <span className="nav-wm-role">Software Engineer</span>
          </span>
        </a>
        <div className="nav-links" ref={linksRef} onMouseLeave={() => setHoverIdx(null)}>
          <span
            className="nav-pill"
            style={{
              transform: `translateX(${pill.x}px)`,
              width: pill.w,
              opacity: pill.w ? 1 : 0,
            }}
            aria-hidden="true"
          >
            <span className="nav-pill-drop" />
          </span>
          {items.map((it, i) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={active === it.id ? 'active' : ''}
              onMouseEnter={() => setHoverIdx(i)}
              onClick={onLinkClick}
            >
              {it.label}
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={15} />
          </button>
          <Magnetic as="a" href="#contact" className="nav-cta" strength={0.25}>
            Contact <Icon name="arrow-up-right" size={13} />
          </Magnetic>
        </div>
      </nav>
    </div>
  );
}

// Morphing hero headline — cycles through roles.
// Uses a hidden in-flow "measurer" that OWNS the width, with the animated word positioned absolute on top.
function MorphingWord({ words, interval = 2400 }) {
  const [idx, setIdx] = useState(0);
  const [state, setState] = useState('in'); // 'in' | 'out'
  useEffect(() => {
    const t = setInterval(() => {
      setState('out');
      setTimeout(() => {
        setIdx(i => (i + 1) % words.length);
        setState('in');
      }, 500);
    }, interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  const wrapStyle = {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'baseline',
    fontStyle: 'italic',
    color: 'var(--accent)',
  };
  const measurerStyle = {
    visibility: 'hidden',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    transition: 'all .4s cubic-bezier(.2,.7,.2,1)',
  };
  const wordStyle = {
    position: 'absolute',
    left: 0, top: 0,
    whiteSpace: 'nowrap',
    opacity: state === 'in' ? 1 : 0,
    transform: state === 'in' ? 'translateY(0) rotate(0)' : 'translateY(-.4em) rotate(-2deg)',
    transition: 'transform .55s cubic-bezier(.2,.7,.2,1), opacity .45s cubic-bezier(.2,.7,.2,1)',
    willChange: 'transform, opacity',
  };

  return (
    <span style={wrapStyle}>
      {/* Measurer: sits in flow and owns the width so siblings reflow correctly */}
      <span style={measurerStyle} aria-hidden="true">{words[idx]}</span>
      {/* Visible animated word, layered on top */}
      <span style={wordStyle}>{words[idx]}</span>
    </span>
  );
}

// Scramble text — good for secondary variant
function ScrambleText({ text, trigger = 0 }) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    const chars = "!<>-_\\/[]{}—=+*^?#_";
    let frame = 0;
    const target = text;
    const queue = [];
    for (let i = 0; i < Math.max(display.length, target.length); i++) {
      const from = display[i] || '';
      const to = target[i] || '';
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20);
      queue.push({ from, to, start, end });
    }
    let raf;
    const update = () => {
      let out = '';
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        if (frame >= end) { complete++; out += to; }
        else if (frame >= start) {
          out += chars[Math.floor(Math.random() * chars.length)];
        } else { out += from; }
      }
      setDisplay(out);
      frame++;
      if (complete !== queue.length) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [trigger]);
  return <>{display}</>;
}

// Classic hero — staggered word-by-word reveal with sweeping underline on the accent
function ClassicHero() {
  const lines = [
    ['Full-stack', { text: 'engineer', em: true }],
    ['writing', 'software'],
    ['that', 'ships.'],
  ];
  // Flatten to get indexes for stagger
  let counter = 0;
  const wordStyle = (i) => ({
    display: 'inline-block',
    opacity: 0,
    transform: 'translateY(.6em)',
    animation: `classicWordIn .8s cubic-bezier(.2,.7,.2,1) ${0.2 + i * 0.08}s forwards`,
  });
  return (
    <h1 className="hero-title">
      <style>{`
        @keyframes classicWordIn { to { opacity: 1; transform: translateY(0); } }
        @keyframes classicUnderline { to { transform: scaleX(1); } }
        .classic-em { position: relative; display: inline-block; }
        .classic-em::after {
          content: "";
          position: absolute; left: 0; right: 0; bottom: .08em; height: 3px;
          background: var(--accent);
          transform: scaleX(0); transform-origin: left;
          animation: classicUnderline .9s cubic-bezier(.6,.1,.2,1) 1.1s forwards;
          border-radius: 2px;
        }
      `}</style>
      {lines.map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {line.map((w, wi) => {
            const i = counter++;
            const isEm = typeof w === 'object' && w.em;
            const text = typeof w === 'object' ? w.text : w;
            return (
              <React.Fragment key={wi}>
                {isEm ? (
                  <em className="classic-em" style={wordStyle(i)}>{text}</em>
                ) : (
                  <span style={wordStyle(i)}>{text}</span>
                )}
                {wi < line.length - 1 ? ' ' : ''}
              </React.Fragment>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function Hero({ variant = 'morph' }) {
  const roles = ['building.', 'shipping.', 'debugging.', 'thinking.', 'crafting.'];
  // Variant A: morphing word
  // Variant B: full scramble headline
  // Variant C: multi-line static with italic accent
  const [scrambleTrigger, setScrambleTrigger] = useState(0);
  useEffect(() => {
    if (variant !== 'scramble') return;
    const t = setInterval(() => setScrambleTrigger(v => v + 1), 3500);
    return () => clearInterval(t);
  }, [variant]);
  const scrambleWords = ['Engineer.', 'Developer.', 'Problem-solver.'];
  const scrambleIdx = scrambleTrigger % scrambleWords.length;

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <Reveal>
              <div className="hero-eyebrow">
                <span className="dot"></span>
                <span>Open to opportunities · Albuquerque, NM</span>
              </div>
            </Reveal>

            {variant === 'morph' && (
              <Reveal delay={100}>
                <h1 className="hero-title">
                  Software that<br />
                  gets <em><MorphingWord words={roles} /></em>
                </h1>
              </Reveal>
            )}
            {variant === 'scramble' && (
              <Reveal delay={100}>
                <h1 className="hero-title">
                  Roshan Subedi,<br />
                  <em><ScrambleText text={scrambleWords[scrambleIdx]} trigger={scrambleTrigger} /></em>
                </h1>
              </Reveal>
            )}
            {variant === 'classic' && (
              <Reveal delay={100}>
                <ClassicHero />
              </Reveal>
            )}

            <Reveal delay={200}>
              <p className="hero-sub">
                Junior Application Developer at ARCA building internal tools used by 500+ staff.
                I care about clean code, shipping, and making things that people actually use — not
                just ones that look good in screenshots.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="hero-cta-row">
                <Magnetic as="a" href="#work" className="btn" strength={0.3}>
                  See my work <Icon name="arrow-right" size={14} className="arrow" />
                  <span className="shine"></span>
                </Magnetic>
                <Magnetic as="a" href="https://rawson08.github.io/assets/files/Roshan_Subedi_Resume.pdf" target="_blank" rel="noopener" className="btn ghost" strength={0.2}>
                  <Icon name="download" size={14} /> Download résumé
                </Magnetic>
              </div>
            </Reveal>

            <Reveal delay={450}>
              <div className="hero-stats">
                <div>
                  <div className="stat-num">500<span style={{color:'var(--accent)'}}>+</span></div>
                  <div className="stat-label">Staff served daily</div>
                </div>
                <div>
                  <div className="stat-num">3.52<span style={{color:'var(--text-dim)', fontSize:'.5em'}}>/4.0</span></div>
                  <div className="stat-label">UNM CS GPA</div>
                </div>
                <div>
                  <div className="stat-num">4<span style={{color:'var(--accent)'}}>yr</span></div>
                  <div className="stat-label">Shipping code</div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="hero-card" id="hero-photo-card">
              <div className="hero-card-inner">
                <div className="hero-card-top">
                  <span>RS / 2026</span>
                  <span>NM · USA</span>
                </div>
                <div className="hero-avatar" aria-label="Roshan Subedi">
                  <img src="assets/profile.jpg" alt="Roshan Subedi" loading="lazy" />
                </div>
                <div className="hero-card-bottom">
                  <div>
                    <strong>Roshan Subedi</strong>
                    <span>Application Developer, Jr · ARCA</span>
                  </div>
                  <span style={{display:'flex',alignItems:'center',gap:6}}>
                    <span style={{display:'inline-block',width:6,height:6,borderRadius:'50%',background:'oklch(75% 0.18 140)',boxShadow:'0 0 0 3px oklch(75% 0.18 140 / .25)'}}></span>
                    Available
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, MorphingWord, ScrambleText });
