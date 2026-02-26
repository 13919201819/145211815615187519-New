// import './SolutionsPage.css';
// import React from 'react';
// import { ArrowRight, Check } from 'lucide-react';
// import { solutions } from '../data/mock';
// import { Header } from '../components/Header';
// import { Footer } from '../components/Footer';
// import { useNavigate } from 'react-router-dom';

// export const SolutionsPage = () => {
//   const navigate = useNavigate();

//   const handleConsultation = () => {
//     navigate('/#contact');
//   };

//   return (
//     <div className="solutions-page">
//       <Header />
      
//       {/* Hero Section - Uses your existing typography classes */}
//       <section className="solutions-page-hero">
//         <div className="dark-content-container">
//           <div className="solutions-page-header">
//             {/* <span className="solutions-page-label body-small">Our Solutions</span> */}
//             <h1 className="solutions-page-title display-huge">
//               Next-Generation Physical AI & AGI Solutions
//             </h1>
//             <p className="solutions-page-subtitle body-large">
//               Pioneering the future of intelligent systems with cutting-edge physical AI and AGI technologies 
//               designed to revolutionize industries and redefine what's possible in autonomous operations
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* All Solutions Grid */}
//       <section className="solutions-page-content section-padding">
//         <div className="dark-content-container">
//           <div className="dark-grid">
//             {solutions.map((solution) => (
//               <div key={solution.id} className="solution-card">
//                 <div className="solution-image-wrapper">
//                   <img 
//                     src={solution.image} 
//                     alt={solution.title}
//                     className="solution-image"
//                   />
//                   <div className="solution-overlay"></div>
//                 </div>
                
//                 <div className="solution-content">
//                   <h3 className="heading-2">{solution.title}</h3>
//                   <p className="body-medium">{solution.description}</p>
                  
//                   <div className="solution-features">
//                     {solution.features.map((feature, index) => (
//                       <div key={index} className="feature-item">
//                         <Check size={16} className="feature-check" />
//                         <span className="body-small">{feature}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <button className="solution-cta">
//                     Learn More
//                     <ArrowRight size={18} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Consultation CTA Section - Styled like a solution card */}
//       <section className="consultation-cta-section section-padding">
//         <div className="dark-content-container">
//           {/* Use the same solution-card class for consistent styling */}
//           <div className="solution-card consultation-cta-card">
//             <div className="solution-content consultation-cta-wrapper">
//               <h2 className="consultation-cta-title heading-1">
//                 Ready to Transform Your Business?
//               </h2>
//               <p className="consultation-cta-text body-large">
//                 Partner with our experts to implement cutting-edge Physical AI and AGI solutions 
//                 tailored to your specific needs. Our team is ready to help you navigate the future 
//                 of intelligent automation and unlock unprecedented operational efficiency.
//               </p>
//               {/* Uses YOUR btn-primary class from Hero */}
//               <button className="btn-primary consultation-cta-btn" onClick={handleConsultation}>
//                 Schedule a Consultation
//                 <ArrowRight size={20} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };







import './SolutionsPage.css';
import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { solutions } from '../data/mock';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useNavigate } from 'react-router-dom';

// ── Shared lazy-loading utilities ──────────────────────────────────────────

const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
};

const LazyImage = ({ src, alt, className }) => {
  const [imgRef, inView] = useInView();
  const [loaded, setLoaded] = useState(false);

  return (
    <div ref={imgRef} className={className} style={{ position: 'relative', background: '#1a1a2e' }}>
      {inView && (
        <img
          src={src}
          alt={alt}
          className={className}
          onLoad={() => setLoaded(true)}
          style={{
            transition: 'opacity 0.5s ease',
            opacity: loaded ? 1 : 0,
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
      {(!inView || !loaded) && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }} />
      )}
    </div>
  );
};

const SolutionCard = ({ solution, index }) => {
  const [cardRef, inView] = useInView({ threshold: 0.15 });

  return (
    <div
      ref={cardRef}
      className="solution-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${(index % 3) * 0.1}s, transform 0.6s ease ${(index % 3) * 0.1}s`,
      }}
    >
      <div className="solution-image-wrapper">
        <LazyImage src={solution.image} alt={solution.title} className="solution-image" />
        <div className="solution-overlay"></div>
      </div>

      <div className="solution-content">
        <h3 className="heading-2">{solution.title}</h3>
        <p className="body-medium">{solution.description}</p>

        <div className="solution-features">
          {solution.features.map((feature, i) => (
            <div key={i} className="feature-item">
              <Check size={16} className="feature-check" />
              <span className="body-small">{feature}</span>
            </div>
          ))}
        </div>

        <button className="solution-cta">
          Learn More
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

// ── Page ───────────────────────────────────────────────────────────────────

export const SolutionsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="solutions-page">
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <Header />

      {/* Hero */}
      <section className="solutions-page-hero">
        <div className="dark-content-container">
          <div className="solutions-page-header">
            <h1 className="solutions-page-title display-huge">
              Next-Generation Physical AI & AGI Solutions
            </h1>
            <p className="solutions-page-subtitle body-large">
              Pioneering the future of intelligent systems with cutting-edge physical AI and AGI technologies 
              designed to revolutionize industries and redefine what's possible in autonomous operations
            </p>
          </div>
        </div>
      </section>

      {/* All Solutions — lazy loaded */}
      <section className="solutions-page-content section-padding">
        <div className="dark-content-container">
          <div className="dark-grid">
            {solutions.map((solution, index) => (
              <SolutionCard key={solution.id} solution={solution} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="consultation-cta-section section-padding">
        <div className="dark-content-container">
          <div className="solution-card consultation-cta-card">
            <div className="solution-content consultation-cta-wrapper">
              <h2 className="consultation-cta-title heading-1">
                Ready to Transform Your Business?
              </h2>
              <p className="consultation-cta-text body-large">
                Partner with our experts to implement cutting-edge Physical AI and AGI solutions 
                tailored to your specific needs. Our team is ready to help you navigate the future 
                of intelligent automation and unlock unprecedented operational efficiency.
              </p>
              <button
                className="btn-primary consultation-cta-btn"
                onClick={() => navigate('/#contact')}
              >
                Schedule a Consultation
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};