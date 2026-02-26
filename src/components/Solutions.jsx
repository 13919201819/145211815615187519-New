// import React, { useRef, useEffect, useState } from 'react';
// import { ArrowRight, Check } from 'lucide-react';
// import { solutions } from '../data/mock';
// import { useNavigate } from 'react-router-dom';

// const useInView = (options = {}) => {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting) {
//         setInView(true);
//         observer.disconnect();
//       }
//     }, { threshold: 0.1, ...options });

//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, []);

//   return [ref, inView];
// };

// const LazyImage = ({ src, alt, className }) => {
//   const [imgRef, inView] = useInView();
//   const [loaded, setLoaded] = useState(false);

//   return (
//     <div ref={imgRef} className={className} style={{ position: 'relative', background: '#1a1a2e' }}>
//       {inView && (
//         <img
//           src={src}
//           alt={alt}
//           className={className}
//           onLoad={() => setLoaded(true)}
//           style={{
//             transition: 'opacity 0.5s ease',
//             opacity: loaded ? 1 : 0,
//             position: 'absolute',
//             inset: 0,
//             width: '100%',
//             height: '100%',
//             objectFit: 'cover',
//           }}
//         />
//       )}
//       {(!inView || !loaded) && (
//         <div style={{
//           position: 'absolute',
//           inset: 0,
//           background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)',
//           backgroundSize: '200% 100%',
//           animation: 'shimmer 1.5s infinite',
//         }} />
//       )}
//     </div>
//   );
// };

// const SolutionCard = ({ solution, index }) => {
//   const [cardRef, inView] = useInView({ threshold: 0.15 });

//   return (
//     <div
//       ref={cardRef}
//       className="solution-card"
//       style={{
//         opacity: inView ? 1 : 0,
//         transform: inView ? 'translateY(0)' : 'translateY(40px)',
//         transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
//       }}
//     >
//       <div className="solution-image-wrapper">
//         <LazyImage src={solution.image} alt={solution.title} className="solution-image" />
//         <div className="solution-overlay"></div>
//       </div>

//       <div className="solution-content">
//         <h3 className="heading-2">{solution.title}</h3>
//         <p className="body-medium">{solution.description}</p>

//         <div className="solution-features">
//           {solution.features.map((feature, i) => (
//             <div key={i} className="feature-item">
//               <Check size={16} className="feature-check" />
//               <span className="body-small">{feature}</span>
//             </div>
//           ))}
//         </div>

//         <button className="solution-cta">
//           Learn More
//           <ArrowRight size={18} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export const Solutions = () => {
//   const navigate = useNavigate();

//   // ✅ Only first 3 solutions shown on homepage
//   const previewSolutions = solutions.slice(0, 3);

//   return (
//     <>
//       <style>{`
//         @keyframes shimmer {
//           0%   { background-position: 200% 0; }
//           100% { background-position: -200% 0; }
//         }
//       `}</style>

//       <section id="solutions" className="section-padding">
//         <div className="dark-content-container">
//           <div className="section-header">
//             <h2 className="display-large">Our Solutions</h2>
//             <p className="body-large section-subtitle">
//               Cutting-edge physical AI systems designed for real-world deployment
//             </p>
//           </div>

//           <div className="dark-grid">
//             {previewSolutions.map((solution, index) => (
//               <SolutionCard key={solution.id} solution={solution} index={index} />
//             ))}
//           </div>

//           <div style={{ textAlign: 'center', marginTop: '3rem' }}>
//             <button
//               className="solution-cta explore-more-cta"
//               onClick={() => navigate('/next-gen-physical-ai-agi-solutions')}
//             >
//               Explore More Solutions
//               <ArrowRight size={18} />
//             </button>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };





import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { solutions } from '../data/mock';
import { useNavigate } from 'react-router-dom';

// Shared observer for better performance — one observer for all elements
const observerMap = new Map();
let sharedObserver = null;

const getObserver = () => {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const cb = observerMap.get(entry.target);
        if (cb && entry.isIntersecting) {
          cb();
          sharedObserver.unobserve(entry.target);
          observerMap.delete(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '100px' }); // rootMargin preloads before fully visible
  }
  return sharedObserver;
};

const useInView = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = getObserver();
    observerMap.set(el, () => setInView(true));
    observer.observe(el);
    return () => {
      observerMap.delete(el);
      observer.unobserve(el);
    };
  }, []);

  return [ref, inView];
};

const LazyImage = React.memo(({ src, alt }) => {
  const [imgRef, inView] = useInView();
  const [loaded, setLoaded] = useState(false);
  const handleLoad = useCallback(() => setLoaded(true), []);

  return (
    <div
      ref={imgRef}
      style={{ position: 'relative', width: '100%', height: '100%', background: '#1a1a2e', overflow: 'hidden' }}
    >
      {/* Shimmer placeholder — always rendered until image loads */}
      {!loaded && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }} />
      )}

      {/* Only inject <img> into DOM once in viewport */}
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          decoding="async" // non-blocking decode
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
            willChange: 'opacity', // hint to browser for GPU compositing
          }}
        />
      )}
    </div>
  );
});

const SolutionCard = React.memo(({ solution, index }) => {
  const [cardRef, inView] = useInView();

  return (
    <div
      ref={cardRef}
      className="solution-card"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
        willChange: 'opacity, transform',
      }}
    >
      <div className="solution-image-wrapper">
        <LazyImage src={solution.image} alt={solution.title} />
        <div className="solution-overlay" />
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
});

export const Solutions = () => {
  const navigate = useNavigate();
  const previewSolutions = solutions.slice(0, 3);

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <section id="solutions" className="section-padding">
        <div className="dark-content-container">
          <div className="section-header">
            <h2 className="display-large">Our Solutions</h2>
            <p className="body-large section-subtitle">
              Cutting-edge physical AI systems designed for real-world deployment
            </p>
          </div>

          <div className="dark-grid">
            {previewSolutions.map((solution, index) => (
              <SolutionCard key={solution.id} solution={solution} index={index} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              className="solution-cta explore-more-cta"
              onClick={() => navigate('/next-gen-physical-ai-agi-solutions')}
            >
              Explore More Solutions
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};