import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import './App.css';

// --- Cursor ---
const Cursor = ({ cursorX, cursorY }) => (
  <motion.div
    className="cursor-ring"
    style={{ left: cursorX, top: cursorY, x: '-50%', y: '-50%' }}
  />
);

// --- Nav ---
const Nav = ({ activePage, setActivePage }) => (
  <nav className="nav-bar">
    <div onClick={() => setActivePage('home')} className="nav-logo">AURELIUS</div>
    <div className="nav-links">
      {['philosophy', 'nexus', 'security', 'contact'].map(p => (
        <button
          key={p}
          onClick={() => setActivePage(p)}
          className={`nav-btn ${activePage === p ? 'active' : ''}`}
        >
          {p}
          {activePage === p && (
            <motion.div layoutId="underline" className="nav-underline" />
          )}
        </button>
      ))}
    </div>
  </nav>
);

// --- HOME PAGE (Scrollable) ---
const HeroSection = ({ setActivePage }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <motion.section ref={ref} className="hero-section" style={{ y, opacity }}>
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="hero-content"
      >
        <div className="hero-eyebrow">Est. MMXXV · Digital Sovereignty</div>
        <h1 className="hero-title">
          Pure<br />
          <span className="hero-gold">Authority</span>
        </h1>
        <p className="hero-sub">Digital Architecture for the Sovereign.</p>
        <div className="hero-cta-row">
          <button className="btn-primary" onClick={() => setActivePage('contact')}>Enter the System</button>
          <button className="btn-ghost" onClick={scrollToNext}>Learn More ↓</button>
        </div>
      </motion.div>
      <div className="hero-scroll-hint" onClick={scrollToNext} style={{ cursor: 'pointer' }}>
        <span>Scroll to explore</span>
        <div className="scroll-line" />
      </div>
    </motion.section>
  );
};

const PillarsSection = () => {
  const pillars = [
    {
      num: '01',
      title: 'Sovereignty',
      desc: 'Absolute and undivided control over your entire digital ecosystem. We engineer systems that answer only to you — not algorithms, not third parties, not the market.',
      tag: 'Core Principle'
    },
    {
      num: '02',
      title: 'Performance',
      desc: 'Latency-free execution deployed at the edge of logic. Sub-2ms response times are not a promise — they are an architectural inevitability.',
      tag: 'Infrastructure'
    },
    {
      num: '03',
      title: 'Intuition',
      desc: 'Interfaces sculpted to feel like a direct extension of cognitive intent. When design disappears, what remains is pure thought made digital.',
      tag: 'Experience'
    }
  ];

  return (
    <section className="pillars-section">
      <div className="section-label">The Three Pillars</div>
      <div className="pillars-grid">
        {pillars.map((p, i) => (
          <motion.div
            key={i}
            className="pillar-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
          >
            <div className="pillar-num">{p.num}</div>
            <div className="pillar-tag">{p.tag}</div>
            <h3 className="pillar-title">{p.title}</h3>
            <p className="pillar-desc">{p.desc}</p>
            <div className="pillar-arrow">→</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ManifestoSection = () => (
  <section className="manifesto-section">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="manifesto-inner"
    >
      <div className="manifesto-line" />
      <blockquote className="manifesto-quote">
        "We do not build software. We architect digital civilizations — sovereign, impenetrable, and forged for those who refuse to be governed by convention."
      </blockquote>
      <div className="manifesto-line" />
      <cite className="manifesto-cite">— The Aurelius Doctrine, Vol. I</cite>
    </motion.div>
  </section>
);

const StatsSection = () => {
  const stats = [
    { val: '99.9%', label: 'Uptime Guarantee' },
    { val: '1,024', label: 'Global Nodes' },
    { val: '2ms', label: 'Edge Latency' },
    { val: '∞', label: 'Scalability' },
    { val: 'AES-256', label: 'Encryption Standard' },
    { val: '0', label: 'Compromises' },
  ];

  return (
    <section className="stats-section">
      <div className="section-label">By The Numbers</div>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="stat-item"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <div className="stat-val">{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const services = [
    { title: 'Nexus Architecture', desc: 'Distributed systems engineered for complete operational autonomy at any scale.' },
    { title: 'Quantum Fortress', desc: 'Post-quantum cryptographic layers that render conventional breach attempts obsolete.' },
    { title: 'Cognitive UI', desc: 'Interface design that learns and adapts — vanishing into seamless interaction.' },
    { title: 'Edge Deployment', desc: 'Deploy anywhere on Earth. Sub-millisecond response from 200+ global nodes.' },
    { title: 'Digital Identity', desc: 'Sovereign identity protocols that put ownership back in your hands permanently.' },
    { title: 'Command Intelligence', desc: 'Real-time analytics dashboards with predictive decision-support engines.' },
  ];

  return (
    <section className="services-section">
      <div className="section-label">What We Build</div>
      <h2 className="services-heading">Our Arsenal</h2>
      <div className="services-list">
        {services.map((s, i) => (
          <motion.div
            key={i}
            className="service-row"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ x: 12 }}
          >
            <span className="service-index">0{i + 1}</span>
            <div className="service-body">
              <h4 className="service-title">{s.title}</h4>
              <p className="service-desc">{s.desc}</p>
            </div>
            <span className="service-chevron">↗</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    { quote: 'Aurelius didn\'t just redesign our infrastructure — it eliminated every single point of failure we had accepted as normal.', author: 'E. Voss', role: 'CTO, Helion Capital' },
    { quote: 'The philosophy matches the product. Rare. Most companies promise sovereignty and deliver surveillance.', author: 'M. Ishikawa', role: 'Director, Nexus Labs' },
    { quote: 'Two milliseconds. I thought it was a typo. It was not.', author: 'A. Reinholt', role: 'Founder, Archipelago Systems' },
  ];

  return (
    <section className="testimonials-section">
      <div className="section-label">Testimonials</div>
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
          >
            <div className="testimonial-quote-mark">"</div>
            <p className="testimonial-text">{t.quote}</p>
            <div className="testimonial-author">
              <div className="author-dot" />
              <div>
                <div className="author-name">{t.author}</div>
                <div className="author-role">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const CtaBanner = ({ setActivePage }) => (
  <section className="cta-banner">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="cta-inner"
    >
      <h2 className="cta-title">Ready to Claim Your Domain?</h2>
      <p className="cta-sub">One conversation is all it takes to architect your digital sovereignty.</p>
      <button className="btn-primary btn-large" onClick={() => setActivePage('contact')}>
        Begin Transmission →
      </button>
    </motion.div>
  </section>
);

const HomePage = ({ setActivePage }) => (
  <div className="home-page">
    <HeroSection setActivePage={setActivePage} />
    <PillarsSection />
    <ManifestoSection />
    <StatsSection />
    <ServicesSection />
    <TestimonialsSection />
    <CtaBanner setActivePage={setActivePage} />
  </div>
);

// --- PHILOSOPHY PAGE ---
const PhilosophyPage = () => (
  <div className="inner-page">
    <div className="inner-page-header">
      <div className="section-label">Our Belief System</div>
      <h2 className="inner-title">The Ideology.</h2>
    </div>

    <div className="philosophy-manifesto">
      <p>"Complexity is the enemy of progress. Aurelius strips away the digital noise to provide a sanctuary of pure logic — where every decision is informed, every system is intentional, and every interface is inevitable."</p>
    </div>

    <div className="philosophy-blocks">
      {[
        { title: 'Minimal in Form', body: 'We remove until nothing remains but purpose. Every pixel carries intention. Every interaction has weight. Beauty is the byproduct of extreme precision.' },
        { title: 'Maximal in Impact', body: 'Power is not measured in features. It is measured in outcomes. We build systems that create leverage — amplifying human intelligence without obscuring it.' },
        { title: 'The Long Game', body: 'We architect for decades, not quarters. Our clients do not update their infrastructure — they inherit it as infrastructure updates around them.' },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="philosophy-block"
          initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 * i }}
        >
          <h3>{b.title}</h3>
          <p>{b.body}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

// --- NEXUS PAGE ---
const NexusPage = () => (
  <div className="inner-page">
    <div className="inner-page-header">
      <div className="section-label">Infrastructure Core</div>
      <h2 className="inner-title">Nexus Link.</h2>
    </div>
    <div className="nexus-stats">
      {[
        { label: 'UPTIME', val: '99.9%' },
        { label: 'NODES', val: '1,024' },
        { label: 'SECURITY', val: 'AES-256' },
        { label: 'LATENCY', val: '2ms' }
      ].map((stat, i) => (
        <motion.div
          key={i}
          className="nexus-stat"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="nexus-stat-val">{stat.val}</div>
          <div className="nexus-stat-label">{stat.label}</div>
        </motion.div>
      ))}
    </div>
    <div className="nexus-status-badge">
      <span className="status-dot" />
      <span>SYSTEM CORE ACTIVE · ALL NODES NOMINAL</span>
    </div>
    <div className="nexus-diagram">
      {[1, 2, 3, 4, 5, 6].map(n => (
        <motion.div
          key={n}
          className="nexus-node"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2 + n * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        >
          N{n}
        </motion.div>
      ))}
    </div>
  </div>
);

// --- SECURITY PAGE ---
const SecurityPage = () => (
  <div className="inner-page">
    <div className="inner-page-header">
      <div className="section-label">Defence Architecture</div>
      <h2 className="inner-title">Fortress.</h2>
    </div>
    <p className="inner-body">
      Our architecture is decentralized by nature. We don't simply protect data — we structurally eliminate the possibility of its compromise through multi-layered, quantum-grade cryptographic protocols distributed across sovereign nodes with zero single points of failure.
    </p>
    <div className="security-layers">
      {[
        { layer: 'L1', name: 'Quantum Encryption', detail: 'Post-quantum lattice-based cryptography' },
        { layer: 'L2', name: 'Zero-Trust Network', detail: 'Every packet verified, no exceptions' },
        { layer: 'L3', name: 'Distributed Consensus', detail: 'No single point of compromise exists' },
        { layer: 'L4', name: 'Sovereign Key Management', detail: 'Your keys. Your vault. Your terms.' },
      ].map((l, i) => (
        <motion.div
          key={i}
          className="security-layer"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="layer-badge">{l.layer}</div>
          <div>
            <div className="layer-name">{l.name}</div>
            <div className="layer-detail">{l.detail}</div>
          </div>
          <div className="layer-sealed">SEALED ✓</div>
        </motion.div>
      ))}
    </div>
    <div className="security-stamp">
      <span>ENCRYPTION STATUS: SEALED · BREACH PROBABILITY: 0.000%</span>
    </div>
  </div>
);

// --- CONTACT PAGE (The Masterpiece) ---
const ContactPage = () => {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', intent: '', budget: '' });

  const fields = [
    { key: 'name', label: 'Your Name / Organization', type: 'text', placeholder: 'e.g. Marcus Aurelius Corp.' },
    { key: 'email', label: 'Your Contact Address', type: 'email', placeholder: 'your@domain.com' },
    { key: 'intent', label: 'The Intent', type: 'textarea', placeholder: 'Describe what you want to build, achieve, or protect.' },
    { key: 'budget', label: 'Engagement Scope', type: 'select', options: ['Classified — will discuss', 'Under $25K', '$25K – $100K', '$100K – $500K', '$500K+'] },
  ];

  const handleNext = () => {
    if (step < fields.length - 1) setStep(s => s + 1);
    else handleSubmit();
  };

  const handleSubmit = () => setSent(true);

  const currentField = fields[step];

  return (
    <div className="contact-page">
      {/* Left Panel */}
      <div className="contact-left">
        <div className="contact-eyebrow">Identity Transmission Protocol</div>
        <h2 className="contact-heading">Let's<br />Talk.</h2>
        <p className="contact-intro">
          Every great system begins with one conversation. Tell us what you're building — we'll tell you how to make it unbreakable.
        </p>
        <div className="contact-details">
          <div className="contact-detail-row">
            <span className="contact-detail-label">Channel</span>
            <span>command@aurelius.sys</span>
          </div>
          <div className="contact-detail-row">
            <span className="contact-detail-label">Response</span>
            <span>&lt; 24h · Priority Access</span>
          </div>
          <div className="contact-detail-row">
            <span className="contact-detail-label">Protocol</span>
            <span>Encrypted End-to-End</span>
          </div>
        </div>
        <div className="contact-socials">
          {['X (Twitter)', 'LinkedIn', 'GitHub'].map(s => (
            <div key={s} className="contact-social">{s} ↗</div>
          ))}
        </div>
      </div>

      {/* Right Panel — Stepped Form */}
      <div className="contact-right">
        {!sent ? (
          <motion.div
            key="form"
            className="contact-form-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Progress */}
            <div className="form-progress">
              {fields.map((_, i) => (
                <div key={i} className={`progress-dot ${i <= step ? 'active' : ''}`} />
              ))}
              <span className="progress-label">{step + 1} / {fields.length}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                className="form-step"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <label className="form-label">{currentField.label}</label>

                {currentField.type === 'textarea' ? (
                  <textarea
                    className="form-input form-textarea"
                    value={form[currentField.key]}
                    onChange={e => setForm(f => ({ ...f, [currentField.key]: e.target.value }))}
                    placeholder={currentField.placeholder}
                    rows={5}
                  />
                ) : currentField.type === 'select' ? (
                  <div className="form-options">
                    {currentField.options.map(opt => (
                      <button
                        key={opt}
                        className={`form-option ${form[currentField.key] === opt ? 'selected' : ''}`}
                        onClick={() => setForm(f => ({ ...f, [currentField.key]: opt }))}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input
                    type={currentField.type}
                    className="form-input"
                    value={form[currentField.key]}
                    onChange={e => setForm(f => ({ ...f, [currentField.key]: e.target.value }))}
                    placeholder={currentField.placeholder}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="form-actions">
              {step > 0 && (
                <button className="btn-back" onClick={() => setStep(s => s - 1)}>← Back</button>
              )}
              <button
                className="btn-primary btn-next"
                onClick={handleNext}
              >
                {step < fields.length - 1 ? 'Continue →' : 'Transmit Signal ✦'}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            className="contact-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="success-icon">✦</div>
            <h3 className="success-title">Transmission Received.</h3>
            <p className="success-body">
              Your signal has been routed through our secure channels. A sovereign response will arrive within 24 hours.
            </p>
            <div className="success-ref">REF: AUR-{Math.random().toString(36).substring(2, 8).toUpperCase()}</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// --- FOOTER ---
const Footer = () => (
  <footer className="site-footer">
    <div className="footer-inner">
      <div className="footer-brand">AURELIUS</div>
      <div className="footer-copy">© MMXXV · All systems sovereign</div>
      <div className="footer-status">
        <span className="status-dot" />
        All Systems Operational
      </div>
    </div>
  </footer>
);

// --- ROOT APP ---
export default function App() {
  const containerRef = useRef(null);
  const [activePage, setActivePage] = useState('home');

  const springConfig = { damping: 28, stiffness: 160 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.2, 2),
      new THREE.MeshStandardMaterial({ color: 0xFFD700, wireframe: true, transparent: true, opacity: 0.35 })
    );
    scene.add(core);
    scene.add(new THREE.AmbientLight(0xffffff, 2.5));

    let raf;
    const animate = () => {
      core.rotation.y += 0.002;
      core.rotation.x += 0.001;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMove = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMove);
      renderer.dispose();
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  return (
    <div className="app-root">
      <div ref={containerRef} className="three-canvas" />
      <Cursor cursorX={cursorX} cursorY={cursorY} />
      <Nav activePage={activePage} setActivePage={setActivePage} />

      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {activePage === 'home' && <HomePage setActivePage={setActivePage} />}
            {activePage === 'philosophy' && <PhilosophyPage />}
            {activePage === 'nexus' && <NexusPage />}
            {activePage === 'security' && <SecurityPage />}
            {activePage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {activePage === 'home' && <Footer />}
    </div>
  );
}