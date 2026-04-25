/* App root + Tweaks panel + edit-mode integration */

function TweaksPanel({ theme, setTheme, heroVariant, setHeroVariant, accentHue, setAccentHue, visible, onClose, onReset }) {
  if (!visible) return null;
  return (
    <div className="tweaks-panel" role="dialog" aria-label="Tweaks">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <h6 style={{ margin: 0 }}>Tweaks</h6>
        <button
          onClick={onClose}
          aria-label="Close tweaks"
          style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: '0 4px' }}
        >×</button>
      </div>
      <div className="tweak-row">
        <label>Theme</label>
        <div className="seg">
          <button className={theme === 'dark' ? 'on' : ''} onClick={() => setTheme('dark')}>Dark</button>
          <button className={theme === 'light' ? 'on' : ''} onClick={() => setTheme('light')}>Light</button>
        </div>
      </div>
      <div className="tweak-row">
        <label>Hero</label>
        <div className="seg">
          <button className={heroVariant === 'morph' ? 'on' : ''} onClick={() => setHeroVariant('morph')}>Morph</button>
          <button className={heroVariant === 'scramble' ? 'on' : ''} onClick={() => setHeroVariant('scramble')}>Scramble</button>
          <button className={heroVariant === 'classic' ? 'on' : ''} onClick={() => setHeroVariant('classic')}>Classic</button>
        </div>
      </div>
      <div className="tweak-row">
        <label>Accent</label>
        <input
          type="range" min="0" max="360" step="5"
          value={accentHue}
          onChange={(e) => setAccentHue(Number(e.target.value))}
          style={{ flex: 1, accentColor: `oklch(68% 0.19 ${accentHue})` }}
        />
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
        <button
          onClick={onReset}
          style={{ flex: 1, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-dim)', padding: '6px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 11, fontFamily: 'var(--font-mono)', letterSpacing: '.06em', textTransform: 'uppercase' }}
        >Reset defaults</button>
      </div>
      <div style={{ color: 'var(--text-dimmer)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', marginTop: 10, lineHeight: 1.6 }}>
        Shift + T to toggle<br />
        Saves to localStorage
      </div>
    </div>
  );
}

function App() {
  const defaults = window.TWEAK_DEFAULTS || { theme: 'dark', heroVariant: 'morph', accentHue: 245 };
  const [theme, setTheme] = useState(defaults.theme);
  const [heroVariant, setHeroVariant] = useState(defaults.heroVariant);
  const [accentHue, setAccentHue] = useState(defaults.accentHue);
  const [editMode, setEditMode] = useState(false);

  const active = useScrollSpy(['home', 'work', 'experience', 'skills', 'about']);

  // Apply theme + accent to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-h', String(accentHue));
  }, [accentHue]);

  // Persist to localStorage for instant UX on reload
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('rs-portfolio') || '{}');
      if (saved.theme) setTheme(saved.theme);
      if (saved.heroVariant) setHeroVariant(saved.heroVariant);
      if (typeof saved.accentHue === 'number') setAccentHue(saved.accentHue);
    } catch (e) {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem('rs-portfolio', JSON.stringify({ theme, heroVariant, accentHue }));
    } catch (e) {}
  }, [theme, heroVariant, accentHue]);

  // Edit mode protocol
  useEffect(() => {
    const onMessage = (e) => {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode') setEditMode(true);
      else if (d.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', onMessage);
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}
    return () => window.removeEventListener('message', onMessage);
  }, []);

  // Local keyboard shortcut: Shift+T toggles tweaks panel (useful when running locally)
  useEffect(() => {
    const onKey = (e) => {
      if (e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey && (e.key === 'T' || e.key === 't')) {
        const tag = (e.target && e.target.tagName) || '';
        if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return;
        e.preventDefault();
        setEditMode((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Push edits up to host (persist to file)
  const pushEdit = (edits) => {
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*'); } catch (e) {}
  };

  const wrapSet = (key, setter) => (val) => {
    setter(val);
    pushEdit({ [key]: val });
  };

  return (
    <>
      <Nav theme={theme} setTheme={wrapSet('theme', setTheme)} active={active} />
      <Hero variant={heroVariant} />
      <CinematicInterstitial />
      <Projects />
      <Experience />
      <CodeTruckScene />
      <Skills />
      <Education />
      <About />
      <Contact />
      <TweaksPanel
        visible={editMode}
        theme={theme} setTheme={wrapSet('theme', setTheme)}
        heroVariant={heroVariant} setHeroVariant={wrapSet('heroVariant', setHeroVariant)}
        accentHue={accentHue} setAccentHue={wrapSet('accentHue', setAccentHue)}
        onClose={() => {
          setEditMode(false);
          try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (e) {}
        }}
        onReset={() => {
          try { localStorage.removeItem('rs-portfolio'); } catch (e) {}
          const d = window.TWEAK_DEFAULTS || { theme: 'dark', heroVariant: 'morph', accentHue: 245 };
          wrapSet('theme', setTheme)(d.theme);
          wrapSet('heroVariant', setHeroVariant)(d.heroVariant);
          wrapSet('accentHue', setAccentHue)(d.accentHue);
        }}
      />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
