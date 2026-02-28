import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Target, Eye, Globe2, ChevronRight } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const PILLARS = [
  {
    icon: '⚡',
    title: 'Physical Intelligence',
    body: 'We believe the next frontier of AI is not confined to screens and servers. True intelligence must exist in the physical world — sensing, reasoning, and acting in real environments alongside humans.',
  },
  {
    icon: '🔬',
    title: 'Research-First',
    body: 'Every product we ship is grounded in rigorous research. We invest deeply in foundational AI science so that our systems are not just capable today, but architected for the capabilities of tomorrow.',
  },
  {
    icon: '🏭',
    title: 'Industrial Impact',
    body: 'We build for the real economy — manufacturing floors, logistics networks, defence systems, and critical infrastructure. Our mission is measured in operational uptime, not benchmark scores.',
  },
  {
    icon: '🌐',
    title: 'Made in India, Built for the World',
    body: 'Born in India\'s engineering ecosystem, we carry the ambition to become a globally trusted name in physical AI — exporting intelligence, not just software.',
  },
];

const TIMELINE = [
  { year: '2022', event: 'NeuroForgeAI founded with a focus on edge AI research for industrial robotics.' },
  { year: '2023', event: 'First physical AI prototype demonstrated at an Indian defence technology expo.' },
  { year: '2024', event: 'Expanded into computer vision and autonomous navigation for manufacturing.' },
  { year: '2025', event: 'Launched enterprise demo programme; partnerships across 4 industry verticals.' },
  { year: '2026', event: 'Scaling globally. Building the infrastructure for AGI-ready physical systems.' },
];

export const AboutUs = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        .about-link { color:#00FFD1; text-decoration:none; border-bottom:1px solid rgba(0,255,209,0.3); transition:border-color 0.2s; }
        .about-link:hover   { border-color:#00FFD1; }
        .pillar-card { background:#0d0d0d; border:1px solid rgba(255,255,255,0.07); padding:28px 24px; transition:border-color 0.25s, transform 0.25s; }
        .pillar-card:hover  { border-color:rgba(0,255,209,0.25); transform:translateY(-3px); }
        .timeline-dot::before { content:''; display:block; width:8px; height:8px; background:#00FFD1; border-radius:50%; flex-shrink:0; margin-top:5px; }
      `}</style>

      <Header />

      <div style={{ background: '#000', minHeight: '100vh' }}>

        {/* ── Hero ── */}
        <div style={{ padding: 'clamp(120px,14vw,160px) 5% clamp(60px,8vw,100px)', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
          {/* bg accent */}
          <div style={{ position: 'absolute', top: '10%', right: '-5%', width: 'clamp(280px,40vw,500px)', height: 'clamp(280px,40vw,500px)', background: 'radial-gradient(circle, rgba(0,255,209,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 860, margin: '0 auto', animation: 'fadeUp 0.6s ease' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,255,209,0.07)', border: '1px solid rgba(0,255,209,0.2)', padding: '5px 14px', marginBottom: 24 }}>
              <Globe2 size={11} style={{ color: '#00FFD1' }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1.2px' }}>About NeuroForgeAI</span>
            </div>

            <h1 style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 700, color: '#fff', margin: '0 0 24px', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              We are building<br />
              <span style={{ color: '#00FFD1' }}>the physical layer</span><br />
              of artificial intelligence.
            </h1>

            <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255,255,255,0.5)', maxWidth: 600, lineHeight: 1.75, margin: '0 0 36px' }}>
              NeuroForgeAI is an Indian deep-tech company pioneering AI systems that operate in the real world — autonomous robots, intelligent machines, and edge AI that think, act, and adapt without human intervention.
            </p>

            <button
              onClick={() => navigate('/book-demo')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#00FFD1', color: '#000', border: 'none', padding: '14px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,209,0.1)'; e.currentTarget.style.color = '#00FFD1'; e.currentTarget.style.outline = '1px solid #00FFD1'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#00FFD1'; e.currentTarget.style.color = '#000'; e.currentTarget.style.outline = 'none'; }}
            >
              See It in Action <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* ── Mission ── */}
        <div style={{ padding: 'clamp(60px,8vw,100px) 5%', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.06)' }}>

              {/* Mission */}
              <div style={{ background: '#000', padding: 'clamp(28px,4vw,48px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <Target size={18} style={{ color: '#00FFD1' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Our Mission</span>
                </div>
                <p style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 600, color: '#fff', lineHeight: 1.4, margin: '0 0 18px', letterSpacing: '-0.01em' }}>
                  Make physical AI accessible to every industry that moves the real world.
                </p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: 0 }}>
                  We exist to close the gap between cutting-edge AI research and industrial deployment — delivering systems that are not just intelligent, but reliable, safe, and scalable in demanding real-world conditions.
                </p>
              </div>

              {/* Vision */}
              <div style={{ background: '#000', padding: 'clamp(28px,4vw,48px)', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <Eye size={18} style={{ color: '#00FFD1' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Our Vision</span>
                </div>
                <p style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 600, color: '#fff', lineHeight: 1.4, margin: '0 0 18px', letterSpacing: '-0.01em' }}>
                  A world where intelligent machines amplify human potential at every scale.
                </p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: 0 }}>
                  We envision a future where physical AI systems operate seamlessly across factories, cities, hospitals, and borders — not replacing human ingenuity, but multiplying it.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* ── Pillars ── */}
        <div style={{ padding: 'clamp(60px,8vw,100px) 5%', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto' }}>
            <div style={{ marginBottom: 48 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1.2px' }}>What We Stand For</span>
              <h2 style={{ fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 600, color: '#fff', margin: '12px 0 0', letterSpacing: '-0.02em' }}>Our Core Beliefs</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
              {PILLARS.map((p, i) => (
                <div key={i} className="pillar-card">
                  <div style={{ fontSize: 28, marginBottom: 16 }}>{p.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.01em' }}>{p.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: 0 }}>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div style={{ padding: 'clamp(60px,8vw,100px) 5%', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <div style={{ marginBottom: 48 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Our Journey</span>
              <h2 style={{ fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 600, color: '#fff', margin: '12px 0 0', letterSpacing: '-0.02em' }}>How We Got Here</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {TIMELINE.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 24, paddingBottom: i < TIMELINE.length - 1 ? 32 : 0, position: 'relative' }}>
                  {/* Line */}
                  {i < TIMELINE.length - 1 && (
                    <div style={{ position: 'absolute', left: 42, top: 24, width: 1, height: 'calc(100% - 8px)', background: 'rgba(255,255,255,0.07)' }} />
                  )}
                  {/* Year */}
                  <div style={{ width: 56, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, paddingTop: 2 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#00FFD1', letterSpacing: '0.5px' }}>{item.year}</span>
                    <div style={{ width: 8, height: 8, background: '#00FFD1', borderRadius: '50%', marginRight: -4, border: '2px solid #000', position: 'relative', zIndex: 1 }} />
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)', padding: '14px 18px' }}>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: 0 }}>{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div style={{ padding: 'clamp(60px,8vw,100px) 5%' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 20 }}>
            <h2 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 600, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
              Ready to build the future with us?
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', margin: 0, maxWidth: 440, lineHeight: 1.7 }}>
              Whether you're a potential partner, enterprise client, or investor — we'd love to talk.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
              <button onClick={() => navigate('/book-demo')}
                style={{ background: '#00FFD1', color: '#000', border: 'none', padding: '13px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,209,0.1)'; e.currentTarget.style.color = '#00FFD1'; e.currentTarget.style.outline = '1px solid #00FFD1'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#00FFD1'; e.currentTarget.style.color = '#000'; e.currentTarget.style.outline = 'none'; }}>
                Book a Demo <ArrowRight size={15} />
              </button>
              <button onClick={() => navigate('/investors')}
                style={{ background: 'transparent', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)', padding: '13px 28px', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,209,0.4)'; e.currentTarget.style.color = '#00FFD1'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}>
                Investor Relations <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
};