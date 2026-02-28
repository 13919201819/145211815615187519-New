import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cookie } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const LAST_UPDATED = 'March 1, 2026';
const COMPANY     = 'NeuroForgeAI';
const EMAIL       = 'contact@neuroforgeai.com';
const WEBSITE     = 'https://neuroforgeai.com';

const Section = ({ number, title, children }) => (
  <div style={{ marginBottom: 40 }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: '#00FFD1', letterSpacing: '0.5px', flexShrink: 0 }}>{String(number).padStart(2, '0')}</span>
      <h2 style={{ fontSize: 'clamp(16px, 2.5vw, 19px)', fontWeight: 600, color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>{title}</h2>
    </div>
    <div style={{ paddingLeft: 28, borderLeft: '1px solid rgba(255,255,255,0.07)' }}>
      {children}
    </div>
  </div>
);

const P = ({ children }) => (
  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, margin: '0 0 14px' }}>{children}</p>
);

const Ul = ({ items }) => (
  <ul style={{ margin: '8px 0 14px', padding: 0, listStyle: 'none' }}>
    {items.map((item, i) => (
      <li key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
        <span style={{ color: '#00FFD1', flexShrink: 0, marginTop: 2 }}>—</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Highlight = ({ children }) => (
  <div style={{ background: 'rgba(0,255,209,0.04)', border: '1px solid rgba(0,255,209,0.15)', borderLeft: '3px solid #00FFD1', padding: '14px 18px', margin: '16px 0' }}>
    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0 }}>{children}</p>
  </div>
);

// ── Cookie type card ──────────────────────────────────────────────────────────
const CookieCard = ({ name, type, purpose, duration, essential }) => (
  <div style={{ background: '#0d0d0d', border: `1px solid ${essential ? 'rgba(0,255,209,0.2)' : 'rgba(255,255,255,0.08)'}`, padding: '16px 18px', marginBottom: 10 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{name}</span>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: essential ? '#00FFD1' : 'rgba(255,255,255,0.4)', background: essential ? 'rgba(0,255,209,0.08)' : 'rgba(255,255,255,0.05)', border: `1px solid ${essential ? 'rgba(0,255,209,0.2)' : 'rgba(255,255,255,0.1)'}`, padding: '2px 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {essential ? 'Essential' : 'Non-essential'}
        </span>
        <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '2px 8px' }}>
          {type}
        </span>
      </div>
    </div>
    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '0 0 6px', lineHeight: 1.6 }}>{purpose}</p>
    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', margin: 0 }}>Duration: {duration}</p>
  </div>
);

export const CookiePolicy = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .legal-link { color: #00FFD1; text-decoration: none; border-bottom: 1px solid rgba(0,255,209,0.3); transition: border-color 0.2s; }
        .legal-link:hover { border-color: #00FFD1; }
      `}</style>

      <Header />

      <div style={{ background: '#000', minHeight: '100vh', padding: 'clamp(100px,12vw,140px) 5% 80px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          {/* Back */}
          <button onClick={() => navigate(-1)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', padding: 0, marginBottom: 40, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#00FFD1'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}>
            <ArrowLeft size={14} /> Back
          </button>

          {/* Hero */}
          <div style={{ marginBottom: 56, animation: 'fadeUp 0.4s ease' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,255,209,0.07)', border: '1px solid rgba(0,255,209,0.2)', padding: '5px 12px', marginBottom: 20 }}>
              <Cookie size={11} style={{ color: '#00FFD1' }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Legal</span>
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Cookie Policy
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
              Last updated: {LAST_UPDATED} &nbsp;·&nbsp; Effective immediately
            </p>
          </div>

          <div style={{ height: 1, background: 'linear-gradient(to right, rgba(0,255,209,0.3), transparent)', marginBottom: 48 }} />

          <Highlight>
            This Cookie Policy explains how {COMPANY} uses cookies and similar tracking technologies on <a href={WEBSITE} className="legal-link">{WEBSITE}</a>. By continuing to use our website, you consent to our use of cookies as described in this policy.
          </Highlight>

          <Section number={1} title="What Are Cookies?">
            <P>Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.</P>
            <P>Cookies can be "session cookies" (deleted when you close your browser) or "persistent cookies" (which remain on your device for a set period or until manually deleted).</P>
          </Section>

          <Section number={2} title="Cookies We Use">
            <P>We use the following categories of cookies on our website:</P>

            <div style={{ marginTop: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10 }}>Essential Cookies</div>
              <CookieCard
                name="Session Cookie"
                type="Session"
                purpose="Maintains your session state as you navigate across pages of the website."
                duration="Until browser is closed"
                essential
              />
              <CookieCard
                name="CSRF Token"
                type="Session"
                purpose="Protects against cross-site request forgery attacks when submitting forms."
                duration="Until browser is closed"
                essential
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10 }}>Functional Cookies</div>
              <CookieCard
                name="Timezone Preference"
                type="Persistent"
                purpose="Remembers your timezone selection for the demo booking scheduler."
                duration="30 days"
                essential={false}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10 }}>Analytics Cookies</div>
              <CookieCard
                name="Analytics"
                type="Persistent"
                purpose="Helps us understand how visitors interact with our website — pages visited, time spent, and traffic sources. Used to improve the user experience."
                duration="Up to 24 months"
                essential={false}
              />
            </div>
          </Section>

          <Section number={3} title="Third-Party Cookies">
            <P>We may use third-party services that set their own cookies. These include:</P>
            <Ul items={[
              'Google Calendar API — used when you book a demo to create calendar events and generate Google Meet links. Subject to Google\'s Privacy Policy.',
              'Vercel Analytics — used to monitor website performance and availability.',
            ]} />
            <P>We do not control third-party cookies and recommend reviewing the privacy policies of those services directly.</P>
          </Section>

          <Section number={4} title="How to Manage Cookies">
            <P>You have the right to accept or decline non-essential cookies. You can manage cookies in the following ways:</P>
            <Ul items={[
              'Browser settings — most browsers allow you to view, delete, and block cookies. Refer to your browser\'s help documentation for instructions.',
              'Incognito / Private mode — browsing in private mode prevents persistent cookies from being stored.',
              'Third-party opt-outs — you can opt out of analytics tracking via browser extensions such as uBlock Origin or similar tools.',
            ]} />
            <Highlight>
              Please note that disabling essential cookies may affect the functionality of our website, including the demo booking system and contact forms.
            </Highlight>
          </Section>

          <Section number={5} title="Browser-Specific Instructions">
            <P>To manage cookies in popular browsers:</P>
            <Ul items={[
              'Google Chrome — Settings → Privacy & Security → Cookies and other site data',
              'Mozilla Firefox — Settings → Privacy & Security → Cookies and Site Data',
              'Safari — Preferences → Privacy → Manage Website Data',
              'Microsoft Edge — Settings → Cookies and site permissions → Cookies and site data',
            ]} />
          </Section>

          <Section number={6} title="Cookie Consent">
            <P>When you first visit our website, you will be presented with a cookie consent notice. By clicking "Accept" or continuing to browse the site, you consent to our use of cookies as described in this policy.</P>
            <P>You may withdraw your consent at any time by clearing your browser's cookies and adjusting your browser settings to refuse cookies. Note that this will not affect the lawfulness of any processing carried out before your withdrawal.</P>
          </Section>

          <Section number={7} title="Do Not Track">
            <P>Some browsers include a "Do Not Track" (DNT) feature. Currently, there is no industry-standard response to DNT signals. Our website does not alter its behaviour based on DNT signals, but we are committed to respecting user privacy through the measures described in this policy.</P>
          </Section>

          <Section number={8} title="Updates to This Policy">
            <P>We may update this Cookie Policy periodically to reflect changes in technology, legislation, or our data practices. We will post the updated policy on this page with a revised "Last updated" date. We encourage you to review this policy regularly.</P>
          </Section>

          <Section number={9} title="Contact Us">
            <P>If you have any questions about our use of cookies, please contact us:</P>
            <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.08)', padding: '18px 20px', marginTop: 8 }}>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: '0 0 6px', fontWeight: 600 }}>{COMPANY}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: '0 0 4px' }}>India</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                Email: <a href={`mailto:${EMAIL}`} className="legal-link">{EMAIL}</a>
              </p>
            </div>
          </Section>

        </div>
      </div>

      <Footer />
    </>
  );
};