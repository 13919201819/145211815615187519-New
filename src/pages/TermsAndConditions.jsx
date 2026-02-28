import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
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

export const TermsAndConditions = () => {
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
              <FileText size={11} style={{ color: '#00FFD1' }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1.2px' }}>Legal</span>
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Terms &amp; Conditions
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', margin: 0 }}>
              Last updated: {LAST_UPDATED} &nbsp;·&nbsp; Effective immediately
            </p>
          </div>

          <div style={{ height: 1, background: 'linear-gradient(to right, rgba(0,255,209,0.3), transparent)', marginBottom: 48 }} />

          <Highlight>
            Please read these Terms &amp; Conditions carefully before using {COMPANY}'s website and services. By accessing <a href={WEBSITE} className="legal-link">{WEBSITE}</a> or using any of our services, you agree to be bound by these terms. If you do not agree, please discontinue use immediately.
          </Highlight>

          <Section number={1} title="Acceptance of Terms">
            <P>By accessing or using the {COMPANY} website and services, you confirm that you are at least 18 years of age, have the legal capacity to enter into a binding agreement, and agree to comply with these Terms &amp; Conditions and all applicable laws and regulations.</P>
          </Section>

          <Section number={2} title="Description of Services">
            <P>{COMPANY} provides physical AI solutions including but not limited to robotics, computer vision, edge AI systems, and enterprise AI consultation services. Our website allows you to:</P>
            <Ul items={[
              'Learn about our products and services.',
              'Book a product demonstration via our scheduling system.',
              'Submit enquiries through our contact form.',
              'Access information about our enterprise solutions.',
            ]} />
          </Section>

          <Section number={3} title="Intellectual Property">
            <P>All content on this website — including but not limited to text, graphics, logos, images, audio clips, software, and the overall design — is the exclusive property of {COMPANY} and is protected under applicable intellectual property laws of India and international treaties.</P>
            <P>You may not reproduce, distribute, modify, create derivative works from, publicly display, or exploit any content from this website without prior written permission from {COMPANY}.</P>
          </Section>

          <Section number={4} title="Permitted Use">
            <P>You agree to use this website only for lawful purposes. You must not:</P>
            <Ul items={[
              'Use the site in any way that violates applicable local, national, or international law or regulation.',
              'Attempt to gain unauthorised access to any part of the website or its related systems.',
              'Transmit any unsolicited or unauthorised advertising or promotional material.',
              'Knowingly transmit any data, send or upload any material that contains viruses or malicious code.',
              'Use automated tools to scrape, crawl, or extract data from the website without prior written consent.',
              'Impersonate any person or entity or misrepresent your affiliation with any person or entity.',
            ]} />
          </Section>

          <Section number={5} title="Demo Bookings">
            <P>When you book a product demonstration through our website:</P>
            <Ul items={[
              'You agree to provide accurate and complete information during the booking process.',
              'Bookings are subject to availability and our team\'s confirmation.',
              'We reserve the right to reschedule or cancel a booked demo with reasonable notice.',
              'Information shared during a demo is treated as confidential and subject to our Privacy Policy.',
              'Demo slots are in Indian Standard Time (IST) unless otherwise agreed.',
            ]} />
          </Section>

          <Section number={6} title="Disclaimer of Warranties">
            <P>This website and its content are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.</P>
            <P>{COMPANY} does not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.</P>
          </Section>

          <Section number={7} title="Limitation of Liability">
            <P>To the fullest extent permitted by applicable law, {COMPANY} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, goodwill, or other intangible losses, arising from:</P>
            <Ul items={[
              'Your access to or use of (or inability to access or use) the website.',
              'Any conduct or content of any third party on the website.',
              'Unauthorised access, use, or alteration of your transmissions or content.',
              'Any errors or omissions in any content on the website.',
            ]} />
          </Section>

          <Section number={8} title="Third-Party Links">
            <P>{COMPANY} may provide links to third-party websites or services for your convenience. These links do not constitute an endorsement of those websites or their content. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites.</P>
          </Section>

          <Section number={9} title="Governing Law & Jurisdiction">
            <P>These Terms &amp; Conditions are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in India.</P>
            <P>Any claims must be brought within one (1) year after the cause of action arises, failing which such claims shall be permanently barred.</P>
          </Section>

          <Section number={10} title="Modifications to Terms">
            <P>We reserve the right to modify these Terms &amp; Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following any changes constitutes your acceptance of the revised terms. We encourage you to review these terms periodically.</P>
          </Section>

          <Section number={11} title="Termination">
            <P>We reserve the right to terminate or suspend your access to the website at our sole discretion, without notice, for conduct that we believe violates these Terms &amp; Conditions or is harmful to other users, us, third parties, or for any other reason.</P>
          </Section>

          <Section number={12} title="Contact Us">
            <P>For any questions or concerns regarding these Terms &amp; Conditions, please contact us:</P>
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