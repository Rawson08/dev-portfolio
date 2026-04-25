/* Scroll-driven "Code Delivery" sequence
   Realistic SVG semi-truck driving left→right while scrolling.
   Cab is on the right (leading), trailer is the IDE/terminal.
*/

function RealisticTruck({ wheelRot, codeLines, pct, showCaret }) {
  // Tesla Semi-inspired silhouette — smooth silver aero nose, centered cab,
  // single swept windshield, flush wheel covers, minimalist fascia.
  return (
    <div className="truck-rig">
      <svg
        className="truck-svg"
        viewBox="0 0 780 260"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Silver body gradient — cool brushed aluminum */}
          <linearGradient id="cabBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="oklch(96% 0.003 240)" />
            <stop offset="35%" stopColor="oklch(82% 0.005 240)" />
            <stop offset="70%" stopColor="oklch(58% 0.008 240)" />
            <stop offset="100%" stopColor="oklch(38% 0.008 240)" />
          </linearGradient>
          <linearGradient id="cabSheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(100% 0 0 / .55)" />
            <stop offset="60%" stopColor="oklch(100% 0 0 / 0)" />
          </linearGradient>
          {/* Dark wrap-around windshield */}
          <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="oklch(22% 0.01 240)" />
            <stop offset="55%" stopColor="oklch(12% 0.005 240)" />
            <stop offset="100%" stopColor="oklch(18% 0.01 240)" />
          </linearGradient>
          {/* Trailer — matching silver/white */}
          <linearGradient id="trailer" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="oklch(97% 0.002 240)" />
            <stop offset="60%" stopColor="oklch(85% 0.003 240)" />
            <stop offset="100%" stopColor="oklch(70% 0.005 240)" />
          </linearGradient>
          <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(95% 0 0)" />
            <stop offset="50%" stopColor="oklch(70% 0 0)" />
            <stop offset="100%" stopColor="oklch(45% 0 0)" />
          </linearGradient>
          <radialGradient id="shadow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="oklch(0% 0 0 / .6)" />
            <stop offset="100%" stopColor="oklch(0% 0 0 / 0)" />
          </radialGradient>
          <filter id="truckShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="oklch(0% 0 0)" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="400" cy="240" rx="360" ry="14" fill="url(#shadow)" />

        {/* ============== TRAILER (left) ============== */}
        <g filter="url(#truckShadow)">
          <rect x="20" y="58" width="460" height="154" rx="4" fill="url(#trailer)" stroke="oklch(60% 0.005 240)" strokeWidth="1" />
          {/* Subtle horizontal panel line */}
          <line x1="22" y1="135" x2="478" y2="135" stroke="oklch(70% 0.005 240 / .5)" strokeWidth="1" />
          {/* Rear door seams */}
          <line x1="42" y1="60" x2="42" y2="210" stroke="oklch(65% 0.005 240)" strokeWidth="1" />
          <rect x="24" y="60" width="6" height="150" fill="oklch(75% 0.005 240)" />
          {/* Bottom skirt — aerodynamic */}
          <rect x="20" y="202" width="460" height="10" fill="oklch(55% 0.008 240)" />
          <rect x="60" y="212" width="380" height="14" rx="3" fill="oklch(45% 0.008 240)" />
          {/* Side terminal panel bg */}
          <rect x="58" y="76" width="400" height="112" rx="3" fill="oklch(10% 0.005 260)" stroke="oklch(50% 0.005 240)" strokeWidth="1" />
          {/* Mudflap */}
          <rect x="88" y="218" width="6" height="22" fill="oklch(12% 0 0)" />
        </g>

        {/* ============== TESLA SEMI CAB (right) ============== */}
        <g filter="url(#truckShadow)">
          {/* Fifth-wheel connector */}
          <rect x="478" y="175" width="24" height="40" fill="oklch(35% 0.005 240)" />
          <circle cx="490" cy="178" r="5" fill="url(#chrome)" />

          {/* Main cab body — smooth aero shape, centered driver bubble */}
          {/* Body silhouette: tall rear → arcs over top → steeply angled windshield → short nose → rounded bumper */}
          <path
            d="M 500 76
               L 590 76
               Q 640 76 670 96
               L 710 128
               Q 725 140 725 158
               L 725 206
               Q 725 214 717 214
               L 500 214
               Z"
            fill="url(#cabBody)"
            stroke="oklch(50% 0.008 240)"
            strokeWidth="1"
          />

          {/* Top sheen — bright highlight along the roofline */}
          <path
            d="M 504 80
               L 588 80
               Q 636 80 664 100
               L 700 130
               L 698 136
               L 660 106
               Q 634 88 586 88
               L 504 88 Z"
            fill="url(#cabSheen)"
          />

          {/* Side body crease / character line */}
          <path d="M 500 170 L 720 178" stroke="oklch(55% 0.008 240 / .6)" strokeWidth="1" fill="none" />

          {/* Rear cab edge detail */}
          <line x1="500" y1="76" x2="500" y2="214" stroke="oklch(50% 0.005 240)" strokeWidth="1" />

          {/* Wrap-around windshield — one continuous dark piece */}
          <path
            d="M 560 92
               L 596 92
               Q 636 92 660 108
               L 694 132
               Q 700 136 700 142
               L 700 152
               L 560 152
               Z"
            fill="url(#glass)"
            stroke="oklch(8% 0 0)"
            strokeWidth="1"
          />
          {/* Windshield reflection streaks */}
          <path d="M 572 102 L 680 130 L 676 138 L 568 110 Z" fill="oklch(100% 0 0 / .12)" />
          <path d="M 600 142 L 695 146 L 695 149 L 600 146 Z" fill="oklch(100% 0 0 / .18)" />

          {/* Side driver window — small, set behind windshield */}
          <path
            d="M 506 96 L 552 96 L 552 150 L 506 150 Z"
            fill="url(#glass)"
            opacity="0.9"
          />
          <line x1="552" y1="94" x2="552" y2="152" stroke="oklch(45% 0.008 240)" strokeWidth="1" />

          {/* Door seam + pillar */}
          <line x1="500" y1="94" x2="500" y2="210" stroke="oklch(45% 0.008 240)" strokeWidth="1" />

          {/* Minimal Tesla-style front — no grille, just a smooth panel */}
          {/* Lower front fascia with slim LED bar */}
          <rect x="700" y="158" width="24" height="4" rx="2" fill="oklch(90% 0.1 85)" opacity="0.9" />
          {/* LED headlight glow (subtle) */}
          <ellipse cx="735" cy="160" rx="18" ry="5" fill="oklch(95% 0.12 85 / .3)" />

          {/* Bumper */}
          <path d="M 694 200 Q 712 208 722 202 L 724 212 L 692 212 Z" fill="oklch(35% 0.008 240)" />

          {/* Tesla "T" emblem on nose */}
          <g transform="translate(695, 176)">
            <rect x="-1" y="-1" width="14" height="3" fill="oklch(40% 0.008 240)" rx="0.5" />
            <rect x="5" y="1" width="2" height="10" fill="oklch(40% 0.008 240)" rx="0.5" />
          </g>

          {/* Side mirror — slim aero */}
          <rect x="554" y="94" width="2" height="8" fill="oklch(45% 0.008 240)" />
          <path d="M 552 102 L 562 100 L 564 112 L 552 114 Z" fill="url(#cabBody)" stroke="oklch(45% 0.008 240)" strokeWidth="0.8" />

          {/* Flush door handle (very subtle) */}
          <rect x="524" y="160" width="14" height="2" rx="1" fill="oklch(55% 0.008 240)" />

          {/* "TESLA" wordmark on lower door */}
          <text x="520" y="190" fill="oklch(40% 0.008 240)" fontSize="8" fontFamily="var(--font-sans)" letterSpacing="2" fontWeight="600">TESLA</text>

          {/* Charge port indicator glow (small) */}
          <circle cx="493" cy="96" r="2" fill="oklch(75% 0.18 145)" opacity="0.7" />

          {/* Aero wheel arch cover hints (flush panels over wheels) */}
          <path d="M 510 214 Q 530 196 550 214" fill="oklch(42% 0.008 240)" opacity="0.7" />
          <path d="M 670 214 Q 690 196 710 214" fill="oklch(42% 0.008 240)" opacity="0.7" />
        </g>
      </svg>

      {/* Terminal overlay on side of trailer */}
      <div className="rig-terminal">
        <div className="rig-terminal-chrome">
          <span className="chrome-dot" style={{ background: '#ff5f57' }} />
          <span className="chrome-dot" style={{ background: '#febc2e' }} />
          <span className="chrome-dot" style={{ background: '#28c840' }} />
          <span className="chrome-title">~/portfolio — bash</span>
          <span className="chrome-pct">{pct}%</span>
        </div>
        <pre className="rig-terminal-code">
          <code>{codeLines}{showCaret && <span className="caret" />}</code>
        </pre>
      </div>

      {/* Wheels — flush Tesla-style covered rims */}
      <div className="rig-wheels">
        <div className="rig-wheel tesla" style={{ left: '10%', '--spin': `${wheelRot}deg` }}><span className="rim-inner" /></div>
        <div className="rig-wheel tesla" style={{ left: '16%', '--spin': `${wheelRot}deg` }}><span className="rim-inner" /></div>
        <div className="rig-wheel tesla" style={{ left: '64%', '--spin': `${wheelRot}deg` }}><span className="rim-inner" /></div>
        <div className="rig-wheel tesla" style={{ left: '70%', '--spin': `${wheelRot}deg` }}><span className="rim-inner" /></div>
        <div className="rig-wheel tesla" style={{ left: '89%', '--spin': `${wheelRot}deg` }}><span className="rim-inner" /></div>
      </div>
    </div>
  );
}

function CodeTruckScene() {
  const rootRef = useRef(null);
  const p = useScrollProgress(rootRef);

  const truckX = mapRange(p, 0.02, 0.96, -40, 105);
  const truckBob = Math.sin(p * Math.PI * 8) * 3;
  const truckOpacity = mapRange(p, 0.0, 0.06, 0, 1) * (1 - mapRange(p, 0.96, 1.0, 0, 1));
  const wheelRot = p * 2200;
  const exhaust = mapRange(p, 0.02, 0.25, 0, 1);
  const trailShift = mapRange(p, 0, 1, 0, -2000);

  const codeProgress = clamp(mapRange(p, 0.12, 0.82, 0, 1), 0, 1);

  const commits = [
    { at: 0.22, label: 'feat: auth guard', hue: 0 },
    { at: 0.36, label: 'refactor: db pool', hue: 40 },
    { at: 0.48, label: 'fix: race cond.', hue: 80 },
    { at: 0.62, label: 'test: 42 passing', hue: 140 },
    { at: 0.74, label: 'perf: index scan', hue: 200 },
  ];

  const stampP = mapRange(p, 0.86, 0.96, 0, 1);
  const stampScale = lerp(2.2, 1, stampP);
  const stampOpacity = stampP * (1 - mapRange(p, 0.995, 1.0, 0, 1));
  const stampRot = lerp(-14, -6, stampP);

  const codeSource =
`$ deploy prod
› building bundle…
› running checks…
› pushing commit 9f3a1c2
› containers up · 200 OK`;

  const shown = codeSource.slice(0, Math.floor(codeSource.length * codeProgress));
  const pct = String(Math.round(p * 100)).padStart(2, '0');

  return (
    <section ref={rootRef} className="truck-scene" aria-hidden="true">
      <div className="truck-inner">
        <div className="truck-ground">
          <div className="truck-road-dashes" style={{ transform: `translateX(${trailShift}px)` }} />
        </div>

        <div className="truck-tokens" style={{ transform: `translateX(${trailShift * 0.35}px)` }}>
          {['{ }', '</>', '( )', '=>', '===', '&&', '||', '[0]', '// TODO', 'async', 'await', 'npm i', '⎇ main', '+12 −3'].map((t, i) => (
            <span key={i} className="truck-token" style={{ left: `${(i * 14) % 180}%`, top: `${(i * 37) % 70 + 10}%`, animationDelay: `${i * 0.4}s` }}>{t}</span>
          ))}
        </div>

        <div className="truck-label truck-label-start">
          <span>◆ src/main</span>
          <span>origin</span>
        </div>
        <div className="truck-label truck-label-end">
          <span>production ◆</span>
          <span>destination</span>
        </div>

        <div className="truck-commits">
          {commits.map((c, i) => {
            const local = mapRange(p, c.at, c.at + 0.18, 0, 1);
            if (local <= 0 || local >= 1) return null;
            // Commits should fly off the TOP-LEFT of the trailer as the truck heads right.
            // Position them in world coords by anchoring to truck-X + trailer offset.
            const truckPx = truckX * (window.innerWidth / 100);
            const tx = truckPx + lerp(-140, -360, local); // drift back and left
            const ty = -lerp(20, 160, Math.sin(local * Math.PI));
            const rot = lerp(0, -300, local);
            const opacity = Math.sin(local * Math.PI);
            return (
              <div
                key={i}
                className="truck-commit"
                style={{
                  transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`,
                  opacity,
                  '--commit-hue': c.hue,
                }}
              >
                <span className="truck-commit-sha">#{(i + 1).toString(16).padStart(4, '0')}</span>
                <span className="truck-commit-msg">{c.label}</span>
              </div>
            );
          })}
        </div>

        {/* Exhaust puffs emit from the cab stack — positioned in world coords */}
        <div
          className="truck-exhaust-trail"
          style={{
            transform: `translate3d(${truckX}vw, ${truckBob}px, 0)`,
            opacity: exhaust,
          }}
        >
          {[0, 1, 2, 3, 4].map(i => (
            <span key={i} className="truck-puff" style={{ animationDelay: `${i * 0.28}s` }} />
          ))}
        </div>

        {/* The truck rig */}
        <div
          className="truck"
          style={{
            transform: `translate3d(${truckX}vw, ${truckBob}px, 0)`,
            opacity: truckOpacity,
          }}
        >
          <RealisticTruck
            wheelRot={wheelRot}
            codeLines={shown}
            pct={pct}
            showCaret={codeProgress > 0 && codeProgress < 1}
          />
        </div>

        <div
          className="truck-stamp"
          style={{
            transform: `translate(-50%, -50%) rotate(${stampRot}deg) scale(${stampScale})`,
            opacity: stampOpacity,
          }}
        >
          <div className="stamp-ring">
            <div className="stamp-text">
              <span>DEPLOYED</span>
              <span className="stamp-meta">✓ 200 OK · main · v1.0.0</span>
            </div>
          </div>
        </div>

        <div className="truck-caption">
          <span className="truck-eyebrow">Chapter 02 · Delivery</span>
          <h2 className="truck-headline">
            From commit to <em>production</em>.
          </h2>
          <p className="truck-sub">Scroll to ship.</p>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CodeTruckScene, RealisticTruck });
