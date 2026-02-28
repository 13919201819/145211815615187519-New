// import React, { useState } from 'react';
// import { Send, Mail, MapPin, Phone } from 'lucide-react';
// import { useToast } from '../hooks/use-toast';

// export const Contact = () => {
//   const { toast } = useToast();
//   const [hoveredLink, setHoveredLink] = useState(null);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     company: '',
//     message: ''
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     toast({
//       title: "Message Received!",
//       description: "We'll get back to you within 24 hours.",
//     });
//     setFormData({ name: '', email: '', company: '', message: '' });
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <section id="contact" className="section-padding contact-section">
//       <div className="dark-content-container">
//         <div className="contact-grid">
//           <div className="contact-info">
//             <h2 className="display-large">Let's Build the Future</h2>
//             <p className="body-large">
//               Ready to integrate physical AI into your operations? Get in touch with our team.
//             </p>

//             <div className="contact-details">
//               <div className="contact-item">
//                 <Mail size={24} className="contact-icon" />
//                 <div>
//                   <div className="contact-label">Email</div>
//                   <a
//                     href="mailto:contact@neuroforgeai.com"
//                     className="body-medium contact-link"
//                     style={{ textDecoration: 'none', color: hoveredLink === 'email' ? '#00FFD1' : 'rgba(255, 255, 255, 0.85)', transition: 'color 0.2s ease' }}
//                     onMouseEnter={() => setHoveredLink('email')}
//                     onMouseLeave={() => setHoveredLink(null)}
//                   >
//                     contact@neuroforgeai.com
//                   </a>
//                 </div>
//               </div>

//               <div className="contact-item">
//                 <Phone size={24} className="contact-icon" />
//                 <div>
//                   <div className="contact-label">Phone</div>
//                   <a
//                     href="tel:+917622817924"
//                     className="body-medium contact-link"
//                     style={{ textDecoration: 'none', color: hoveredLink === 'phone' ? '#00FFD1' : 'rgba(255, 255, 255, 0.85)', transition: 'color 0.2s ease' }}
//                     onMouseEnter={() => setHoveredLink('phone')}
//                     onMouseLeave={() => setHoveredLink(null)}
//                   >
//                     +91 7622817924
//                   </a>
//                 </div>
//               </div>

//               <div className="contact-item">
//                 <MapPin size={24} className="contact-icon" />
//                 <div>
//                   <div className="contact-label">Location</div>
//                   <div className="body-medium">India</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="contact-form-wrapper">
//             <form onSubmit={handleSubmit} className="contact-form">
//               <div className="form-group">
//                 <label htmlFor="name" className="form-label">Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="form-input"
//                   placeholder="Your name"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="email" className="form-label">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="form-input"
//                   placeholder="your@email.com"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="company" className="form-label">Company</label>
//                 <input
//                   type="text"
//                   id="company"
//                   name="company"
//                   value={formData.company}
//                   onChange={handleChange}
//                   className="form-input"
//                   placeholder="Your company"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="message" className="form-label">Message</label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   rows="5"
//                   className="form-input form-textarea"
//                   placeholder="Tell us about your project..."
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="btn-primary"
//                 style={{ width: '100%', justifyContent: 'center' }}
//               >
//                 Send Message
//                 <Send size={20} />
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };




import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export const Contact = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('https://connect-3.vercel.app/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });

    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error state when user starts typing again
    if (status === 'error') setStatus('idle');
  };

  const isLoading = status === 'loading';

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="dark-content-container">
        <div className="contact-grid">

          {/* ── Left: Info ── */}
          <div className="contact-info">
            <h2 className="display-large">Let's Build the Future</h2>
            <p className="body-large">
              Ready to integrate physical AI into your operations? Get in touch with our team.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <Mail size={24} className="contact-icon" />
                <div>
                  <div className="contact-label">Email</div>
                  <a
                    href="mailto:contact@neuroforgeai.com"
                    className="body-medium contact-link"
                    style={{ textDecoration: 'none', color: hoveredLink === 'email' ? '#00FFD1' : 'rgba(255,255,255,0.85)', transition: 'color 0.2s ease' }}
                    onMouseEnter={() => setHoveredLink('email')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    contact@neuroforgeai.com
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <Phone size={24} className="contact-icon" />
                <div>
                  <div className="contact-label">Phone</div>
                  <a
                    href="tel:+917622817924"
                    className="body-medium contact-link"
                    style={{ textDecoration: 'none', color: hoveredLink === 'phone' ? '#00FFD1' : 'rgba(255,255,255,0.85)', transition: 'color 0.2s ease' }}
                    onMouseEnter={() => setHoveredLink('phone')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    +91 7622817924
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <MapPin size={24} className="contact-icon" />
                <div>
                  <div className="contact-label">Location</div>
                  <div className="body-medium">India</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="contact-form-wrapper">

            {/* Success state */}
            {status === 'success' ? (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', padding: '48px 24px', gap: 16,
                background: 'rgba(0,255,209,0.04)', border: '1px solid rgba(0,255,209,0.2)',
                minHeight: 320,
              }}>
                <CheckCircle size={48} style={{ color: '#00FFD1' }} />
                <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 600, margin: 0 }}>Message Sent!</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6, margin: 0, maxWidth: 280 }}>
                  We'll get back to you within 24 hours. Check your inbox for a confirmation.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  style={{
                    marginTop: 8, background: 'transparent', border: '1px solid rgba(0,255,209,0.3)',
                    color: '#00FFD1', padding: '10px 24px', fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,255,209,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name *</label>
                  <input
                    type="text" id="name" name="name"
                    value={formData.name} onChange={handleChange}
                    required disabled={isLoading}
                    className="form-input" placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    type="email" id="email" name="email"
                    value={formData.email} onChange={handleChange}
                    required disabled={isLoading}
                    className="form-input" placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company" className="form-label">Company</label>
                  <input
                    type="text" id="company" name="company"
                    value={formData.company} onChange={handleChange}
                    disabled={isLoading}
                    className="form-input" placeholder="Your company"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message" name="message"
                    value={formData.message} onChange={handleChange}
                    required disabled={isLoading}
                    rows={5} className="form-input form-textarea"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Error banner */}
                {status === 'error' && (
                  <div style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    background: 'rgba(255,68,68,0.08)', border: '1px solid rgba(255,68,68,0.3)',
                    padding: '12px 14px', marginBottom: 4,
                  }}>
                    <AlertCircle size={15} style={{ color: '#ff4444', flexShrink: 0, marginTop: 1 }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#ff4444', marginBottom: 2 }}>Send Failed</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,100,100,0.8)' }}>{errorMsg}</div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                  style={{
                    width: '100%', justifyContent: 'center',
                    opacity: isLoading ? 0.7 : 1,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isLoading ? (
                    <>
                      <span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                      Sending...
                    </>
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </button>

                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};