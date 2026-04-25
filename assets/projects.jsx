/* Projects bento grid with tilt cards */

const PROJECTS = [
  {
    id: 'expensage',
    tag: 'Full-stack · PWA',
    title: 'ExpenSage',
    desc: 'A Splitwise-style expense splitter with JWT auth, group management, AI receipt scanning via Google Cloud Vision, and push notifications. Spring Boot backend, React + TypeScript frontend.',
    meta: ['Spring Boot', 'React · TS', 'Vertex AI', 'PostgreSQL'],
    span: 'span-7',
    visual: 'v-expense',
    link: '#',
    year: '2025',
  },
  {
    id: 'myapps',
    tag: 'Platform · Auth',
    title: 'My Apps',
    desc: 'Centralized dashboard for managing multiple applications with shared auth. Migrated infra Heroku → Railway, refactored routes MongoDB → PostgreSQL, integrated Mailgun.',
    meta: ['Node.js', 'PostgreSQL', 'Railway', 'Mailgun'],
    span: 'span-5',
    visual: 'v-apps',
    link: 'https://rawson08.github.io/my-apps',
    year: '2024',
  },
  {
    id: 'auction',
    tag: 'Systems · Networking',
    title: 'Auction House',
    desc: 'Terminal-based auction platform with server-client architecture. Led a 3-person team — owned listing, bidding, and transaction-closure flows end-to-end.',
    meta: ['Java', 'Sockets', 'Teamwork'],
    span: 'span-4',
    visual: 'v-auction',
    year: '2024',
  },
  {
    id: 'bomb',
    tag: 'Low-level · C/ASM',
    title: 'Bomb Lab',
    desc: 'Reverse-engineered a compiled C/Assembly binary using computer architecture fundamentals — registers, stack frames, and conditional branching — to defuse each phase.',
    meta: ['C', 'x86-64 Assembly', 'GDB'],
    span: 'span-4',
    visual: 'v-bomb',
    year: '2023',
  },
  {
    id: 'arca',
    tag: 'Enterprise · In production',
    title: 'ARCA Internal Tooling',
    desc: 'A suite of ASP.NET Core MVC apps with Razor views, EF Core, Azure AD role management, and CRUD tooling — used daily by 500+ staff across operations.',
    meta: ['ASP.NET Core', 'Azure AD', 'EF Core', 'Azure DevOps'],
    span: 'span-4',
    visual: 'v-apps',
    year: '2025 – Present',
  },
];

function Projects() {
  return (
    <section id="work" className="section container">
      <div className="section-head">
        <div>
          <div className="section-eyebrow">01 / Work</div>
          <h2 className="section-title">Selected <em>projects</em></h2>
        </div>
        <p className="section-kicker">
          A mix of side projects, coursework, and production work. Hover each card — they tilt in 3D
          and respond to your cursor.
        </p>
      </div>

      <div className="bento">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={i * 80} className={p.span}>
            <TiltCard className="" max={6}>
              <div className={`card-visual ${p.visual}`}></div>
              <div className="card-tag">
                <span className="tag-dot"></span>
                {p.tag}
                <span style={{ marginLeft: 'auto', color: 'var(--text-dimmer)' }}>{p.year}</span>
              </div>
              <h3 className="card-title">{p.title}</h3>
              <p className="card-desc">{p.desc}</p>
              <div className="card-meta">
                {p.meta.map(m => <span key={m}>{m}</span>)}
              </div>
              {p.link && (
                <a
                  href={p.link}
                  target={p.link.startsWith('http') ? '_blank' : undefined}
                  rel="noopener"
                  style={{ position: 'absolute', top: 22, right: 22, color: 'var(--text)', textDecoration: 'none', width: 40, height: 40, borderRadius: '50%', display: 'grid', placeItems: 'center', border: '1.5px solid var(--border-strong)', background: 'var(--surface-strong)', transition: 'all .25s var(--ease)', zIndex: 2, boxShadow: '0 2px 8px oklch(0% 0 0 / .08)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'rotate(45deg)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.background = 'var(--surface-strong)'; e.currentTarget.style.transform = 'rotate(0)'; }}
                  aria-label={`Open ${p.title}`}
                >
                  <Icon name="arrow-up-right" size={18} strokeWidth={2.2} />
                </a>
              )}
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Projects });
