import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Zap, Globe2, BarChart3, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const EMAIL = 'contact@neuroforgeai.com';

const STATS = [
  { value: '4+',    label: 'Industry Verticals',    sub: 'Manufacturing, Logistics, Defence, Agriculture' },
  { value: '2022',  label: 'Founded',               sub: 'Deep-tech roots from day one' },
  { value: '∞',     label: 'Addressable Market',    sub: '$180B+ physical AI market by 2030' },
  { value: 'India', label: 'Headquartered',         sub: 'Scaling globally from India' },
];

const WHY = [
  {
    icon: <TrendingUp size={20} style={{ color: '#00FFD1' }} />,
    title: 'Massive Market Timing',
    body: 'The physical AI market is projected to exceed $180 billion by 2030. Industrial automation, defence modernisation, and supply chain intelligence are converging — and we are positioned at the intersection.',
  },
  {
    icon: <Zap size={20} style={{ color: '#00FFD1' }} />,
    title: 'Proprietary Technology',
    body: 'Our AI stack combines edge inference, autonomous navigation, and real-time computer vision into vertically integrated systems — not assembled from off-the-shelf components.',
  },
  {
    icon: <Shield size={20} style={{ color: '#00FFD1' }} />,
    title: 'Defence-Grade Reliability',
    body: 'Built to operate in the harshest environments. Our systems meet industrial safety standards and are being evaluated for defence applications — a market with strong government tailwinds in India.',
  },
  {
    icon: <Globe2 size={20} style={{ color: '#00FFD1' }} />,
    title: 'India-First, Global Ambition',
    body: 'India is the world\'s fastest-growing manufacturing economy. We are building here first, with the explicit roadmap to export physical intelligence to Southeast Asia, the Middle East, and beyond.',
  },
  {
    icon: <BarChart3 size={20} style={{ color: '#00FFD1' }} />,
    title: 'Enterprise Revenue Model',
    body: 'Our business model combines hardware deployment, software licensing, and annual maintenance contracts — generating recurring revenue with strong gross margins at scale.',
  },
];

const FAQS = [
  {
    q: 'What stage is NeuroForgeAI at?',
    a: 'We are currently at the early growth stage — with working prototypes, pilot enterprise deployments, and active revenue conversations across four industry verticals. We are raising to accelerate product development, enterprise sales, and international expansion.',
  },
  {
    q: 'What type of investment are you seeking?',
    a: 'We are open to strategic angels, seed/pre-Series A institutional investors, and strategic corporate partners. We are particularly interested in investors with networks in manufacturing, defence, logistics, or deep-tech ecosystems.',
  },
  {
    q: 'How do I request a pitch deck or financial information?',
    a: `Please reach out directly to ${EMAIL} with the subject line "Investor Inquiry". We will respond within 48 hours with our investor materials under NDA.`,
  },
  {
    q: 'Are you open to international investors?',
    a: 'Yes. We welcome investors from all geographies, subject to applicable Indian foreign direct investment (FDI) regulations and FEMA compliance.',
  },
  {
    q: 'What is your go-to-market strategy?',
    a: 'We target enterprise clients through direct sales and industry partnerships, prioritising sectors with clear ROI on automation: manufacturing, logistics, defence, and agriculture. Each engagement typically begins with a paid pilot that converts into a long-term deployment contract.',
  },
];

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', background: 'none', border: 'none', padding: '18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: open ? '#00FFD1' : '#fff', transition: 'color 0.2s', lineHeight: 1.5 }}>{q}</span>
        <span style={{ flexShrink: 0, color: '#00FFD1' }}>{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
      </button>
      {open && (
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: '0 0 18px', paddingRight: 32 }}>{a}</p>
      )}
    </div>
  );
};

export const Investors = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .inv-card { background:#0d0d0d; border:1px solid rgba(255,255,255,0.07); padding:28px 24px; transition:border-color 0.25s, transform 0.25s; }
        .inv-card:hover { border-color:rgba(0,255,209,0.25); transform:translateY(-3px); }
        .inv-stat { text-align:center; padding:32px 20px; border-right:1px solid rgba(255,255,255,0.06); }
        .inv-stat:last-child { border-right:none; }
        @media (max-width:640px) {
          .inv-stat { border-right:none; border-bottom:1px solid rgba(255,255,255,0.06); }
          .inv-stat:last-child { border-bottom:none; }
          .inv-stats-grid { grid-template-columns:1fr 1fr !important; }
          .inv-why-grid   { grid-template-columns:1fr !important; }
          .inv-hero-btns  { flex-direction:column; align-items:stretch !important; }
          .inv-hero-btns button { justify-content:center; }
        }
      `}</style>

      <Header />

      <div style={{ background: '#000', minHeight: '100vh' }}>

        {/* ── Hero ── */}
        <div style={{ padding: 'clamp(120px,14vw,160px) 5% clamp(60px,8vw,100px)', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '0%', left: '-10%', width: 'clamp(300px,50vw,600px)', height: 'clamp(300px,50vw,600px)', background: 'radial-gradient(circle, rgba(0,255,209,0.03) 0%, transparent 65%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 860, margin: '0 auto', animation: 'fadeUp 0.6s ease' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,255,209,0.07)', border: '1px solid rgba(0,255,209,0.2)', padding: '5px 14px', marginBottom: 24 }}>
              <TrendingUp size={11} style={{ color: '#00FFD1' }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Investor Relations</span>
            </div>

            <h1 style={{ fontSize: 'clamp(30px, 6vw, 60px)', fontWeight: 700, color: '#fff', margin: '0 0 24px', lineHeight: 1.08, letterSpacing: '-0.03em' }}>
              Invest in the<br />
              <span style={{ color: '#00FFD1' }}>future of physical AI.</span>
            </h1>

            <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: 'rgba(255,255,255,0.5)', maxWidth: 560, lineHeight: 1.8, margin: '0 0 36px' }}>
              NeuroForgeAI is building the foundational infrastructure for intelligent machines — robots, autonomous systems, and edge AI that operate in the real world. We are seeking strategic partners who share our conviction that physical intelligence is the next great technology wave.
            </p>

            <div className="inv-hero-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={`mailto:${EMAIL}?subject=Investor Inquiry — NeuroForgeAI`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#00FFD1', color: '#000', padding: '14px 28px', fontSize: 14, fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,209,0.1)'; e.currentTarget.style.color = '#00FFD1'; e.currentTarget.style.outline = '1px solid #00FFD1'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#00FFD1'; e.currentTarget.style.color = '#000'; e.currentTarget.style.outline = 'none'; }}>
                Request Pitch Deck <Mail size={15} />
              </a>
              <button onClick={() => navigate('/book-demo')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'transparent', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)', padding: '14px 28px', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,209,0.4)'; e.currentTarget.style.color = '#00FFD1'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}>
                See Product Demo <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div className="inv-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {STATS.map((s, i) => (
                <div key={i} className="inv-stat">
                  <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#00FFD1', letterSpacing: '-0.02em', marginBottom: 6 }}>{s.value}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Why Invest ── */}
        <div style={{ padding: 'clamp(60px,8vw,100px) 5%', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div style={{ marginBottom: 48 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1.2px' }}>The Opportunity</span>
              <h2 style={{ fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 600, color: '#fff', margin: '12px 0 0', letterSpacing: '-0.02em' }}>Why NeuroForgeAI?</h2>
            </div>

            <div className="inv-why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
              {WHY.map((w, i) => (
                <div key={i} className="inv-card">
                  <div style={{ marginBottom: 14 }}>{w.icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: '0 0 10px', letterSpacing: '-0.01em' }}>{w.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: 0 }}>{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Thesis ── */}
        <div style={{ padding: 'clamp(60px,8vw,100px) 5%', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,255,209,0.015)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Investment Thesis</span>
            <blockquote style={{ fontSize: 'clamp(18px, 3vw, 26px)', fontWeight: 500, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, margin: '24px 0', fontStyle: 'italic', letterSpacing: '-0.01em' }}>
              "Software AI transformed how we process information. Physical AI will transform how we interact with — and reshape — the world around us. The companies that win this decade will be the ones that make machines intelligent, not just connected."
            </blockquote>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', margin: 0 }}>— NeuroForgeAI Founding Team</p>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div style={{ padding: 'clamp(60px,8vw,100px) 5%', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ marginBottom: 40 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Common Questions</span>
              <h2 style={{ fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 600, color: '#fff', margin: '12px 0 0', letterSpacing: '-0.02em' }}>Investor FAQ</h2>
            </div>
            <div>
              {FAQS.map((faq, i) => <FaqItem key={i} {...faq} />)}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div style={{ padding: 'clamp(60px,8vw,100px) 5%' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div style={{ background: '#0d0d0d', border: '1px solid rgba(0,255,209,0.2)', padding: 'clamp(32px,5vw,56px)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: '-20%', right: '-5%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(0,255,209,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,255,209,0.07)', border: '1px solid rgba(0,255,209,0.2)', padding: '4px 12px' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Let's Talk</span>
              </div>

              <h2 style={{ fontSize: 'clamp(20px, 4vw, 32px)', fontWeight: 600, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
                Interested in investing in NeuroForgeAI?
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: 0, maxWidth: 420, lineHeight: 1.7 }}>
                Reach out to our team directly. We respond to all serious investor enquiries within 48 hours.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
                <a href={`mailto:${EMAIL}?subject=Investor Inquiry — NeuroForgeAI`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#00FFD1', color: '#000', padding: '13px 28px', fontSize: 14, fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,209,0.1)'; e.currentTarget.style.color = '#00FFD1'; e.currentTarget.style.outline = '1px solid #00FFD1'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#00FFD1'; e.currentTarget.style.color = '#000'; e.currentTarget.style.outline = 'none'; }}>
                  <Mail size={15} /> {EMAIL}
                </a>
                <button onClick={() => navigate('/about')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'transparent', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)', padding: '13px 24px', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,209,0.3)'; e.currentTarget.style.color = '#00FFD1'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}>
                  Learn About Us <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
};