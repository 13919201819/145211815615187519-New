import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const LAST_UPDATED = 'March 1, 2026';
const COMPANY     = 'NeuroForgeAI';
const EMAIL       = 'contact@neuroforgeai.com';
const WEBSITE     = 'https://neuroforgeai.com';

const Section = ({ number, title, children }) => (
  <div style={{ marginBottom: 40, animation: 'fadeUp 0.5s ease both' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: '#00FFD1', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.5px', flexShrink: 0 }}>{String(number).padStart(2, '0')}</span>
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
  <div style={{ background: 'rgba(0,255,209,0.04)', border: '1px solid rgba(0,255,209,0.15)', borderLeft: '3px solid #00FFD1', padding: '14px 18px', margin: '16px 0', borderRadius: 0 }}>
    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0 }}>{children}</p>
  </div>
);

export const PrivacyPolicy = () => {
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
              <Shield size={11} style={{ color: '#00FFD1' }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Legal</span>
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Privacy Policy
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
              Last updated: {LAST_UPDATED} &nbsp;·&nbsp; Effective immediately
            </p>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'linear-gradient(to right, rgba(0,255,209,0.3), transparent)', marginBottom: 48 }} />

          {/* Intro */}
          <Highlight>
            This Privacy Policy describes how {COMPANY} ("we", "us", or "our") collects, uses, and shares information when you use our website and services. By accessing our website at <a href={WEBSITE} className="legal-link">{WEBSITE}</a>, you agree to the practices described in this policy.
          </Highlight>

          <Section number={1} title="Information We Collect">
            <P>We collect information you provide directly to us and information collected automatically when you use our services.</P>
            <Ul items={[
              'Contact information (name, email address, phone number, company name) when you fill out forms or book a demo.',
              'Communications you send us, including messages through our contact form.',
              'Usage data such as pages visited, time spent, referring URLs, and browser/device information.',
              'Cookies and similar tracking technologies (see our Cookie Policy for details).',
            ]} />
          </Section>

          <Section number={2} title="How We Use Your Information">
            <P>We use the information we collect for the following purposes:</P>
            <Ul items={[
              'To respond to your inquiries and provide customer support.',
              'To schedule and conduct product demonstrations you request.',
              'To send transactional emails (booking confirmations, responses to contact form submissions).',
              'To improve our website, products, and services.',
              'To comply with legal obligations applicable under Indian law.',
              'To detect and prevent fraudulent or unauthorised activity.',
            ]} />
          </Section>

          <Section number={3} title="Legal Basis for Processing">
            <P>We process your personal data on the following legal bases under applicable Indian data protection law (including the Digital Personal Data Protection Act, 2023):</P>
            <Ul items={[
              'Consent — where you have given clear consent for us to process your data.',
              'Contractual necessity — where processing is necessary to fulfil a service you have requested.',
              'Legitimate interests — where processing is necessary for our legitimate business interests.',
              'Legal obligation — where we are required to process data to comply with the law.',
            ]} />
          </Section>

          <Section number={4} title="Sharing of Information">
            <P>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</P>
            <Ul items={[
              'With service providers who assist us in operating our website and conducting our business (e.g. email delivery, calendar integrations), bound by confidentiality agreements.',
              'With Google LLC for calendar event creation and Google Meet link generation via the Google Calendar API.',
              'When required by law, court order, or governmental authority.',
              'To protect the rights, property, or safety of NeuroForgeAI, our users, or the public.',
            ]} />
          </Section>

          <Section number={5} title="Data Retention">
            <P>We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law. Contact form submissions are retained for up to 12 months. Demo booking records are retained for up to 24 months for business purposes.</P>
          </Section>

          <Section number={6} title="Data Security">
            <P>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</P>
          </Section>

          <Section number={7} title="Your Rights">
            <P>Subject to applicable law, you have the following rights regarding your personal data:</P>
            <Ul items={[
              'Right to access — request a copy of the personal data we hold about you.',
              'Right to correction — request correction of inaccurate or incomplete data.',
              'Right to erasure — request deletion of your personal data.',
              'Right to withdraw consent — at any time, where processing is based on consent.',
              'Right to grievance redressal — raise a complaint with us or the Data Protection Board of India.',
            ]} />
            <P>To exercise any of these rights, contact us at <a href={`mailto:${EMAIL}`} className="legal-link">{EMAIL}</a>.</P>
          </Section>

          <Section number={8} title="Third-Party Links">
            <P>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.</P>
          </Section>

          <Section number={9} title="Children's Privacy">
            <P>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal data from children. If you believe we have inadvertently collected data from a minor, please contact us immediately.</P>
          </Section>

          <Section number={10} title="Changes to This Policy">
            <P>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated "Last updated" date. Your continued use of our services after any changes constitutes acceptance of the updated policy.</P>
          </Section>

          <Section number={11} title="Contact Us">
            <P>If you have any questions about this Privacy Policy or our data practices, please contact us:</P>
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