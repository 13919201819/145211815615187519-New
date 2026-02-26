import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

export const Contact = () => {
  const { toast } = useToast();
  const [hoveredLink, setHoveredLink] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message Received!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="dark-content-container">
        <div className="contact-grid">
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
                    style={{ textDecoration: 'none', color: hoveredLink === 'email' ? '#00FFD1' : 'rgba(255, 255, 255, 0.85)', transition: 'color 0.2s ease' }}
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
                    style={{ textDecoration: 'none', color: hoveredLink === 'phone' ? '#00FFD1' : 'rgba(255, 255, 255, 0.85)', transition: 'color 0.2s ease' }}
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

          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="company" className="form-label">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Your company"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="form-input form-textarea"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Send Message
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};