/* Skills, Experience (timeline), Education, Certs, About, Contact, Footer */

const SKILL_GROUPS = {
  'Frontend': ['TypeScript', 'React', 'Angular', 'HTML5', 'CSS3', 'Tailwind', 'Bootstrap', 'a11y'],
  'Backend': ['Java 17+', 'Spring Boot', 'ASP.NET Core', 'Node.js', 'Express', 'Python', 'C#', 'REST', 'JWT'],
  'Databases': ['PostgreSQL', 'T-SQL', 'MongoDB', 'EF Core', 'SQL', 'NoSQL'],
  'Cloud & DevOps': ['Azure AD', 'Azure DevOps', 'GCP Vertex AI', 'Vision API', 'Cloudflare R2', 'Docker', 'Railway', 'Git'],
  'Tools': ['VS Code', 'IntelliJ', 'Visual Studio', 'SSMS', 'Postman', 'Swagger', 'Vite', 'Maven'],
};

function Skills() {
  const allChips = useMemo(() => Object.values(SKILL_GROUPS).flat(), []);
  const half = Math.ceil(allChips.length / 2);
  const row1 = [...allChips.slice(0, half), ...allChips.slice(0, half)];
  const row2 = [...allChips.slice(half), ...allChips.slice(half)];

  return (
    <section id="skills" className="section container">
      <div className="section-head">
        <div>
          <div className="section-eyebrow">02 / Stack</div>
          <h2 className="section-title">Tools I <em>reach for</em></h2>
        </div>
        <p className="section-kicker">
          Comfortable across the stack — from Spring Boot services to ASP.NET Core MVC to React PWAs.
          Hover the ticker to pause it.
        </p>
      </div>

      <Reveal>
        <div className="marquee-wrap">
          <div className="marquee">
            {row1.map((s, i) => (
              <span key={`r1-${i}`} className="chip"><span className="dot"></span>{s}</span>
            ))}
          </div>
        </div>
        <div className="marquee-wrap" style={{ marginTop: 12 }}>
          <div className="marquee reverse">
            {row2.map((s, i) => (
              <span key={`r2-${i}`} className="chip"><span className="dot"></span>{s}</span>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="skills-cats">
        {Object.entries(SKILL_GROUPS).slice(0, 3).map(([k, v], i) => (
          <Reveal key={k} delay={i * 100}>
            <div className="skill-cat">
              <h4>{k}</h4>
              <div className="chips">
                {v.map(s => <span key={s} className="mini-chip">{s}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const EXPERIENCE = [
  {
    date: 'Jul 2025 — Present',
    title: 'Application Developer, Jr',
    org: 'ARCA (Opening Doors)',
    orgLink: 'https://arcaopeningdoors.org',
    loc: 'Albuquerque, NM',
    bullets: [
      'Ship and maintain in-house web apps supporting daily operations for 500+ staff.',
      'Build features with ASP.NET Core MVC, Razor, and Entity Framework Core following MVC best practices.',
      'Implement CRUD flows, validation, and role-based access control across internal tooling.',
      'Manage user roles and permissions through Azure Active Directory for secure access.',
      'Modernize legacy applications and databases to keep systems stable and trustworthy.',
      'Use Azure DevOps for version control, work tracking, and code review.',
    ],
    tags: ['ASP.NET Core', 'Razor', 'EF Core', 'Azure AD', 'Azure DevOps', 'SharePoint', 'SQL Server'],
  },
  {
    date: 'Feb 2022 — May 2025',
    title: 'Annex Supervisor',
    org: 'University of New Mexico IT',
    loc: 'Albuquerque, NM',
    bullets: [
      'Provided technical support and troubleshooting for faculty, staff, and students.',
      'Contributed to internal tools using C#, SQL, and JavaScript — focused on usability.',
      'Maintained SharePoint sites and Windows Server environments.',
      'Managed a team of student consultants; handled inquiries and customer escalations.',
    ],
    tags: ['C#', 'SQL', 'JavaScript', 'SharePoint', 'Windows Server', 'Leadership'],
  },
];

function Experience() {
  return (
    <section id="experience" className="section container">
      <div className="section-head">
        <div>
          <div className="section-eyebrow">03 / Experience</div>
          <h2 className="section-title">Where I've <em>worked</em></h2>
        </div>
        <p className="section-kicker">
          Hands-on production experience building tools people actually use — not demos, not
          take-homes.
        </p>
      </div>

      <div className="timeline">
        {EXPERIENCE.map((e, i) => (
          <Reveal key={i} delay={i * 100}>
            <article className="timeline-item">
              <div className="tl-date">{e.date}</div>
              <div>
                <h3 className="tl-title">{e.title}</h3>
                <div className="tl-org">
                  {e.orgLink
                    ? <a href={e.orgLink} target="_blank" rel="noopener">{e.org}</a>
                    : e.org}
                  {' · '}
                  <span className="text-dim">{e.loc}</span>
                </div>
                <ul className="tl-bullets">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <div className="tl-tags">
                  {e.tags.map(t => <span key={t} className="tl-tag">{t}</span>)}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Education() {
  const certs = [
    { t: 'Career Essentials in Generative AI', d: 'Microsoft / LinkedIn learning path on GenAI fundamentals and applications.' },
    { t: 'Introduction to Artificial Intelligence', d: 'Foundational principles of AI in business and technology.' },
    { t: 'Introduction to Prompt Engineering', d: 'Designing effective prompts for generative AI applications.' },
    { t: 'Ethics in the Age of Generative AI', d: 'Ethical responsibilities and challenges in GenAI.' },
    { t: 'Learning Microsoft 365 Copilot', d: 'Leveraging AI tools within Microsoft 365 for productivity.' },
    { t: 'Streamlining Your Work with Copilot', d: 'Practical workflows with Microsoft Copilot tools.' },
    { t: 'What Is Generative AI?', d: 'Intro to the tools, techniques, and potential of GenAI.' },
    { t: 'GenAI & the Evolution of Search', d: 'Role of generative AI in advancing online search.' },
  ];
  return (
    <section id="education" className="section container">
      <div className="section-head">
        <div>
          <div className="section-eyebrow">04 / Education</div>
          <h2 className="section-title">School &amp; <em>credentials</em></h2>
        </div>
      </div>

      <div className="two-col">
        <Reveal>
          <div className="edu-card">
            <div className="muted" style={{ marginBottom: 10 }}>Aug 2021 — May 2025 · Albuquerque, NM</div>
            <h3>University of New Mexico</h3>
            <div className="text-dim" style={{ fontSize: 15, marginTop: 4 }}>B.S. Computer Science · Minor, Mathematics</div>
            <div style={{ display: 'flex', gap: 24, marginTop: 20, alignItems: 'baseline' }}>
              <div>
                <div className="stat-num" style={{ fontSize: 42 }}>3.52<span style={{ color: 'var(--text-dim)', fontSize: '.45em' }}>/4.0</span></div>
                <div className="stat-label">Cumulative GPA</div>
              </div>
            </div>
            <h4 style={{ marginTop: 26, marginBottom: 8, fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>Relevant coursework</h4>
            <ul>
              <li>Database Management (SQL, NoSQL)</li>
              <li>Software Engineering</li>
              <li>AI/ML · NLP · Cloud Computing</li>
              <li>Operating Systems · Networks</li>
              <li>Data Structures &amp; Algorithms</li>
            </ul>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="edu-card">
            <div className="muted" style={{ marginBottom: 10 }}>Honors &amp; awards</div>
            <h3>Recognitions</h3>
            <ul>
              <li><strong style={{ color: 'var(--text)' }}>Dean's List, School of Engineering</strong> — Fall '21, Fall '22, Spring '24</li>
              <li><strong style={{ color: 'var(--text)' }}>International Amigo Scholarship</strong> — in-state tuition benefit, 3.0+ GPA</li>
              <li><strong style={{ color: 'var(--text)' }}>SoE Student Success Scholarship</strong> — $1,000 award for academic performance</li>
            </ul>
          </div>
        </Reveal>
      </div>

      <div style={{ marginTop: 60 }}>
        <Reveal>
          <div className="section-eyebrow" style={{ marginBottom: 20 }}>Certificates &amp; coursework</div>
          <div className="cert-grid">
            {certs.map((c, i) => (
              <Reveal key={c.t} delay={i * 60} className="cert">
                <h5>{c.t}</h5>
                <p>{c.d}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section container">
      <div className="section-head">
        <div>
          <div className="section-eyebrow">05 / About</div>
          <h2 className="section-title">A bit about <em>me</em></h2>
        </div>
      </div>

      <div className="about-grid">
        <Reveal>
          <div className="about-portrait">
            <div className="about-portrait-frame">
              <img src="assets/profile.jpg" alt="Roshan Subedi" loading="lazy" />
              <div className="about-portrait-ring" aria-hidden="true"></div>
              <div className="about-portrait-tag">
                <span className="dot"></span>
                <span>Available for work</span>
              </div>
            </div>
            <div className="about-portrait-caption">
              <span className="portrait-name">Roshan Subedi</span>
              <span className="portrait-role">Software Engineer · Albuquerque, NM</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="about-copy">
            <p>
              I'm <strong>Roshan</strong> — a Junior Application Developer at ARCA, shipping
              internal web apps used by hundreds of people every day.
            </p>
            <p>
              My day-to-day is <strong>ASP.NET Core MVC</strong>, <strong>Blazor</strong>, and the
              Microsoft ecosystem. I work across the stack — from Azure AD role modeling, to EF Core
              schemas, to Razor views — and I care most about software that <em>actually gets used</em>,
              not software that just demos well.
            </p>
            <p>
              Outside production work, I like building side projects that force me into unfamiliar
              corners — AI receipt scanning, socket programming, even defusing binary bombs in
              assembly. Each one leaves me a slightly more well-rounded engineer.
            </p>
            <p>
              Currently sharpening: <strong>.NET + distributed systems</strong>, with an eye on
              scalable cloud-native applications. Open to full-time and contract work.
            </p>
            <div className="about-sig">— Roshan</div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="stack-list">
            {[
              ['Now', 'Application Developer, Jr @ ARCA'],
              ['Location', 'Albuquerque, NM · Mountain Time'],
              ['Learning', '.NET distributed systems, system design'],
              ['Listening', 'Lo-fi + film scores while coding'],
              ['Reading', '"Designing Data-Intensive Apps" — Kleppmann'],
              ['Coffee', 'Light-roast pour-over'],
            ].map(([k, v]) => (
              <div className="stack-row" key={k}>
                <span className="k">{k}</span>
                <span className="v">{v}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section container">
      <Reveal>
        <div className="contact">
          <div className="section-eyebrow" style={{ justifyContent: 'center', marginBottom: 20 }}>06 / Contact</div>
          <h2 className="contact-title">Let's build <em>something</em>.</h2>
          <p className="contact-sub">
            Open to full-time software engineering roles, contract work, and interesting side
            projects. Usually reply within a day.
          </p>
          <div className="contact-links">
            <Magnetic as="a" href="mailto:roshansbd8@gmail.com" className="btn" strength={0.3}>
              <Icon name="mail" size={14} /> roshansbd8@gmail.com
              <span className="shine"></span>
            </Magnetic>
            <Magnetic as="a" href="https://github.com/Rawson08" target="_blank" rel="noopener" className="btn ghost" strength={0.25}>
              <Icon name="github" size={14} /> GitHub
            </Magnetic>
            <Magnetic as="a" href="https://linkedin.com/in/roshansbd" target="_blank" rel="noopener" className="btn ghost" strength={0.25}>
              <Icon name="linkedin" size={14} /> LinkedIn
            </Magnetic>
            <Magnetic as="a" href="https://instagram.com/raw_son_sbd" target="_blank" rel="noopener" className="btn ghost" strength={0.25}>
              <Icon name="instagram" size={14} /> Instagram
            </Magnetic>
          </div>
        </div>
      </Reveal>

      <footer>
        <div>© 2026 Roshan Subedi · All rights reserved</div>
        <div style={{ display: 'flex', gap: 16 }}>
          <span>Built with React &amp; too much coffee</span>
        </div>
      </footer>
    </section>
  );
}

Object.assign(window, { Skills, Experience, Education, About, Contact });
