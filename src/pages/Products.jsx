// import React, { useState, useRef, useEffect } from 'react';
// import { ArrowRight, Check, Zap, ChevronRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';


// // ── Inline product data ──────────────────────────────────────────────────────
// const products = [
//   {
//     id: 1,
//     category: "Physical AI",
//     badge: "Flagship",
//     title: "NeuroForge Atlas",
//     subtitle: "Autonomous Physical AI Agent",
//     description: "A full-stack embodied AI agent capable of perceiving, reasoning, and acting in unstructured real-world environments. Built on our proprietary NeuroCore architecture with real-time sensorimotor integration.",
//     image: "https://images.unsplash.com/photo-1684369175833-4b445ad6bfb5?w=800&q=70&auto=format&fit=crop",
//     features: ["Real-time 3D spatial reasoning", "Multi-modal sensor fusion", "Sub-10ms edge inference", "Self-correcting motion planning"],
//     specs: { Autonomy: "Level 4", Latency: "<10ms", Uptime: "99.99%", Deployment: "Edge / Cloud" },
//     cta: "Request Demo"
//   },
//   {
//     id: 2,
//     category: "AGI Systems",
//     badge: "New",
//     title: "NeuroForge Cognex",
//     subtitle: "General-Purpose AGI Platform",
//     description: "A foundation model platform fine-tuned for physical reasoning and task execution. Cognex bridges the gap between language understanding and physical world interaction through embodied simulation.",
//     image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=70&auto=format&fit=crop",
//     features: ["World model simulation", "Causal reasoning engine", "Zero-shot task generalization", "Continuous self-improvement"],
//     specs: { Parameters: "70B+", Tasks: "Multi-domain", Training: "Sim + Real", Interface: "REST API / SDK" },
//     cta: "Get API Access"
//   },
//   {
//     id: 3,
//     category: "Detection Systems",
//     badge: "Enterprise",
//     title: "NeuroForge Sentinel",
//     subtitle: "AI-Powered Threat & Anomaly Detection",
//     description: "Real-time visual intelligence system for detecting theft, intrusion, unauthorized access, and behavioral anomalies across retail, warehousing, and critical infrastructure environments.",
//     image: "https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&q=70&auto=format&fit=crop",
//     features: ["Theft & shoplifting detection", "Perimeter breach alerts", "Behavioral anomaly scoring", "Multi-camera orchestration"],
//     specs: { Accuracy: "99.2%", Cameras: "Up to 512", "Alert Latency": "<500ms", Integration: "ONVIF / RTSP" },
//     cta: "Request Demo"
//   },
//   {
//     id: 4,
//     category: "Analytics",
//     badge: "Popular",
//     title: "NeuroForge StreamIQ",
//     subtitle: "Real-Time Data Streaming & Analytics",
//     description: "A high-throughput AI analytics engine that ingests, processes, and visualizes sensor, video, and IoT data streams in real time. Built for mission-critical environments with zero data loss architecture.",
//     image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=70&auto=format&fit=crop",
//     features: ["1M+ events/sec throughput", "Live anomaly detection", "Predictive trend modeling", "Custom dashboard builder"],
//     specs: { Throughput: "1M+ eps", Latency: "<5ms", Storage: "Distributed", Export: "JSON / Parquet / CSV" },
//     cta: "Start Free Trial"
//   },
//   {
//     id: 5,
//     category: "Retail AI",
//     badge: "High ROI",
//     title: "NeuroForge RetainIQ",
//     subtitle: "Customer Churn Prediction & Retention",
//     description: "ML-powered churn prediction engine designed for physical retail. Analyzes foot traffic patterns, purchase behavior, and engagement signals to identify at-risk customers before they leave.",
//     image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=70&auto=format&fit=crop",
//     features: ["Churn risk scoring per customer", "Personalized retention triggers", "Foot traffic behavioral analysis", "Loyalty program integration"],
//     specs: { Accuracy: "94.7%", "Prediction Window": "30 days", "Data Sources": "POS / CRM / Vision", ROI: "3-5x avg" },
//     cta: "See Case Study"
//   },
//   {
//     id: 6,
//     category: "Predictive Maintenance",
//     badge: "Industry 4.0",
//     title: "NeuroForge PredictX",
//     subtitle: "Device & Equipment Failure Prediction",
//     description: "Industrial-grade predictive maintenance platform that monitors equipment health through vibration, thermal, and operational data. Predicts failures weeks in advance to eliminate unplanned downtime.",
//     image: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=800&q=70&auto=format&fit=crop",
//     features: ["72hr+ failure prediction window", "Vibration & thermal analysis", "Automated maintenance scheduling", "OEM-agnostic compatibility"],
//     specs: { "Prediction Window": "72hr+", Accuracy: "97.3%", Sensors: "IoT / OPC-UA / MQTT", "Downtime Reduction": "Up to 70%" },
//     cta: "Request Demo"
//   },
//   {
//     id: 7,
//     category: "Physical AI",
//     badge: "Research",
//     title: "NeuroForge SwarmNet",
//     subtitle: "Multi-Agent Drone Swarm Intelligence",
//     description: "Coordinated swarm AI for autonomous drone fleets. SwarmNet enables emergent collective behavior for surveillance, mapping, delivery, and search-and-rescue operations without centralized control.",
//     image: "https://images.unsplash.com/photo-1625314868143-20e93ce3ff33?w=800&q=70&auto=format&fit=crop",
//     features: ["Decentralized swarm coordination", "Dynamic obstacle avoidance", "Real-time mesh networking", "Autonomous mission replanning"],
//     specs: { "Fleet Size": "Up to 500", Coordination: "Decentralized", Comms: "Mesh / 5G", "Use Cases": "Surveillance / Logistics" },
//     cta: "Learn More"
//   },
//   {
//     id: 8,
//     category: "AGI Systems",
//     badge: "Beta",
//     title: "NeuroForge SynthMind",
//     subtitle: "Synthetic Data & Simulation Engine",
//     description: "Generate photorealistic synthetic training data and physics-accurate simulation environments for training physical AI models. Accelerate model development with zero real-world data collection.",
//     image: "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?w=800&q=70&auto=format&fit=crop",
//     features: ["Photorealistic scene generation", "Physics-accurate simulation", "Automatic data labeling", "Sim-to-real transfer pipeline"],
//     specs: { "Render Engine": "GPU Ray Tracing", Output: "10K+ images/hr", Formats: "COCO / YOLO / Pascal", Physics: "Real-time" },
//     cta: "Join Beta"
//   }
// ];

// const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

// // ── Badge color mapping ──────────────────────────────────────────────────────
// const badgeStyles = {
//   Flagship:      { background: 'rgba(0,255,209,0.15)', color: '#00FFD1', border: '1px solid rgba(0,255,209,0.4)' },
//   New:           { background: 'rgba(0,200,255,0.12)', color: '#00C8FF', border: '1px solid rgba(0,200,255,0.35)' },
//   Enterprise:    { background: 'rgba(255,180,0,0.12)', color: '#FFB400', border: '1px solid rgba(255,180,0,0.35)' },
//   Popular:       { background: 'rgba(0,255,209,0.15)', color: '#00FFD1', border: '1px solid rgba(0,255,209,0.4)' },
//   'High ROI':    { background: 'rgba(80,255,120,0.12)', color: '#50FF78', border: '1px solid rgba(80,255,120,0.35)' },
//   'Industry 4.0':{ background: 'rgba(255,100,80,0.12)', color: '#FF6450', border: '1px solid rgba(255,100,80,0.35)' },
//   Research:      { background: 'rgba(180,100,255,0.12)', color: '#B464FF', border: '1px solid rgba(180,100,255,0.35)' },
//   Beta:          { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.2)' },
// };

// // ── Intersection observer hook ───────────────────────────────────────────────
// const useInView = () => {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.1, rootMargin: '80px' });
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);
//   return [ref, inView];
// };

// // ── Lazy image ───────────────────────────────────────────────────────────────
// const LazyImage = React.memo(({ src, alt }) => {
//   const [ref, inView] = useInView();
//   const [loaded, setLoaded] = useState(false);
//   return (
//     <div ref={ref} style={{ position: 'relative', width: '100%', height: '100%', background: '#0a0a0a', overflow: 'hidden' }}>
//       {!loaded && (
//         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,#121212 25%,#1e1e1e 50%,#121212 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
//       )}
//       {inView && (
//         <img src={src} alt={alt} decoding="async" onLoad={() => setLoaded(true)}
//           style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }} />
//       )}
//     </div>
//   );
// });

// // ── Product Card ─────────────────────────────────────────────────────────────
// const ProductCard = React.memo(({ product, index }) => {
//   const [cardRef, inView] = useInView();
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       ref={cardRef}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: '#121212',
//         border: hovered ? '1px solid #00FFD1' : '1px solid rgba(255,255,255,0.12)',
//         overflow: 'hidden',
//         display: 'flex',
//         flexDirection: 'column',
//         opacity: inView ? 1 : 0,
//         transform: inView ? 'translateY(0)' : 'translateY(40px)',
//         transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s ease ${index * 0.07}s, border-color 0.3s ease`,
//         cursor: 'pointer',
//       }}
//     >
//       {/* Image */}
//       <div style={{ position: 'relative', height: '220px', overflow: 'hidden', flexShrink: 0 }}>
//         <LazyImage src={product.image} alt={product.title} />
//         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85))' }} />

//         {/* Badge */}
//         <div style={{ position: 'absolute', top: 16, left: 16, padding: '4px 12px', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', ...badgeStyles[product.badge] }}>
//           {product.badge}
//         </div>

//         {/* Category */}
//         <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 12, fontWeight: 600, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1px' }}>
//           {product.category}
//         </div>
//       </div>

//       {/* Content */}
//       <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
//         <div>
//           <h3 style={{ fontSize: 22, fontWeight: 600, color: '#fff', margin: 0, lineHeight: 1.2 }}>{product.title}</h3>
//           <p style={{ fontSize: 14, color: '#00FFD1', marginTop: 6, marginBottom: 0, fontWeight: 500 }}>{product.subtitle}</p>
//         </div>

//         <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: 0 }}>{product.description}</p>

//         {/* Features */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//           {product.features.map((f, i) => (
//             <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//               <Check size={14} style={{ color: '#00FFD1', flexShrink: 0 }} />
//               <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{f}</span>
//             </div>
//           ))}
//         </div>

//         {/* Specs */}
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16, marginTop: 'auto' }}>
//           {Object.entries(product.specs).map(([k, v]) => (
//             <div key={k}>
//               <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 2 }}>{k}</div>
//               <div style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>{v}</div>
//             </div>
//           ))}
//         </div>

//         {/* CTA */}
//         <button style={{
//           marginTop: 8,
//           background: hovered ? '#00FFD1' : 'transparent',
//           color: hovered ? '#000' : '#00FFD1',
//           border: '1px solid #00FFD1',
//           padding: '12px 20px',
//           fontSize: 14,
//           fontWeight: 600,
//           cursor: 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           gap: 8,
//           transition: 'all 0.3s ease',
//           width: '100%',
//         }}>
//           {product.cta}
//           <ArrowRight size={16} />
//         </button>
//       </div>
//     </div>
//   );
// });

// // ── Main Products Page ────────────────────────────────────────────────────────
// export const Products = () => {
//   const navigate = useNavigate();
//   const [activeCategory, setActiveCategory] = useState('All');

//   const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);

//   return (
//     <>
//       <style>{`
//         @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
//         @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
//         .filter-btn:hover { border-color: #00FFD1 !important; color: #00FFD1 !important; }
//       `}</style>

//       {/* ── Hero ── */}
//       <section style={{ background: '#000', paddingTop: 140, paddingBottom: 80, paddingLeft: '7.6923%', paddingRight: '7.6923%', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
//         <div style={{ maxWidth: 1400, margin: '0 auto' }}>
//           {/* Breadcrumb */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, animation: 'fadeDown 0.5s ease' }}>
//             <span
//               onClick={() => navigate('/')}
//               style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color 0.2s' }}
//               onMouseEnter={e => e.target.style.color = '#00FFD1'}
//               onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
//             >Home</span>
//             <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.25)' }} />
//             <span style={{ fontSize: 14, color: '#00FFD1' }}>Products</span>
//           </div>

//           <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
//             <div>
//               <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,255,209,0.08)', border: '1px solid rgba(0,255,209,0.25)', padding: '6px 14px', marginBottom: 20 }}>
//                 <Zap size={14} style={{ color: '#00FFD1' }} />
//                 <span style={{ fontSize: 12, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1px' }}>Product Suite</span>
//               </div>
//               <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, color: '#fff', margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
//                 Physical Intelligence,<br />
//                 <span style={{ color: '#00FFD1' }}>Productized.</span>
//               </h1>
//               <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', marginTop: 20, marginBottom: 0, maxWidth: 560, lineHeight: 1.6 }}>
//                 End-to-end AI products for detection, prediction, analytics, and autonomous systems — built for the real world.
//               </p>
//             </div>

//             <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
//               {[{ val: products.length + '+', label: 'Products' }, { val: '8', label: 'Categories' }, { val: '30+', label: 'Clients' }].map(s => (
//                 <div key={s.label} style={{ textAlign: 'center' }}>
//                   <div style={{ fontSize: 36, fontWeight: 700, color: '#00FFD1', lineHeight: 1 }}>{s.val}</div>
//                   <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── Filter Bar ── */}
//       <section style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '20px 7.6923%', position: 'sticky', top: 80, zIndex: 9 }}>
//         <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
//           <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px', marginRight: 8 }}>Filter:</span>
//           {categories.map(cat => (
//             <button
//               key={cat}
//               className="filter-btn"
//               onClick={() => setActiveCategory(cat)}
//               style={{
//                 background: activeCategory === cat ? '#00FFD1' : 'transparent',
//                 color: activeCategory === cat ? '#000' : 'rgba(255,255,255,0.5)',
//                 border: activeCategory === cat ? '1px solid #00FFD1' : '1px solid rgba(255,255,255,0.15)',
//                 padding: '7px 16px',
//                 fontSize: 13,
//                 fontWeight: 500,
//                 cursor: 'pointer',
//                 transition: 'all 0.2s ease',
//                 letterSpacing: '0.3px',
//               }}
//             >
//               {cat}
//             </button>
//           ))}
//           <span style={{ marginLeft: 'auto', fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
//         </div>
//       </section>

//       {/* ── Products Grid ── */}
//       <section style={{ background: '#000', padding: '60px 7.6923% 100px' }}>
//         <div style={{ maxWidth: 1400, margin: '0 auto' }}>
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
//             gap: 28,
//           }}>
//             {filtered.map((product, index) => (
//               <ProductCard key={product.id} product={product} index={index} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Bottom CTA ── */}
//       <section style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '80px 7.6923%', textAlign: 'center' }}>
//         <div style={{ maxWidth: 600, margin: '0 auto' }}>
//           <h2 style={{ fontSize: 36, fontWeight: 600, color: '#fff', margin: '0 0 16px' }}>Need a Custom Solution?</h2>
//           <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', marginBottom: 36, lineHeight: 1.6 }}>
//             Every enterprise has unique challenges. Our team builds tailored physical AI systems for your exact requirements.
//           </p>
//           <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
//             <button
//               onClick={() => navigate('/#contact')}
//               style={{ background: '#00FFD1', color: '#000', border: 'none', padding: '14px 32px', fontSize: 16, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.3s ease' }}
//               onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,209,0.1)'; e.currentTarget.style.color = '#00FFD1'; e.currentTarget.style.outline = '1px solid #00FFD1'; }}
//               onMouseLeave={e => { e.currentTarget.style.background = '#00FFD1'; e.currentTarget.style.color = '#000'; e.currentTarget.style.outline = 'none'; }}
//             >
//               Talk to Our Team <ArrowRight size={18} />
//             </button>
//             <button
//               onClick={() => navigate('/')}
//               style={{ background: 'transparent', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.2)', padding: '14px 32px', fontSize: 16, fontWeight: 500, cursor: 'pointer', transition: 'all 0.3s ease' }}
//               onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#fff'; }}
//               onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
//             >
//               Back to Home
//             </button>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };







// import React, { useState, useRef, useEffect } from 'react';
// import { ArrowRight, Check, Zap, ChevronRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { Header } from '../components/Header';
// import { Footer } from '../components/Footer';

// // ── Inline product data ──────────────────────────────────────────────────────
// const products = [
//   {
//     id: 1,
//     category: "Physical AI",
//     badge: "Flagship",
//     title: "NeuroForge Atlas",
//     subtitle: "Autonomous Physical AI Agent",
//     description: "A full-stack embodied AI agent capable of perceiving, reasoning, and acting in unstructured real-world environments. Built on our proprietary NeuroCore architecture with real-time sensorimotor integration.",
//     image: "https://images.unsplash.com/photo-1684369175833-4b445ad6bfb5?w=800&q=70&auto=format&fit=crop",
//     features: ["Real-time 3D spatial reasoning", "Multi-modal sensor fusion", "Sub-10ms edge inference", "Self-correcting motion planning"],
//     specs: { Autonomy: "Level 4", Latency: "<10ms", Uptime: "99.99%", Deployment: "Edge / Cloud" },
//     cta: "Request Demo"
//   },
//   {
//     id: 2,
//     category: "AGI Systems",
//     badge: "New",
//     title: "NeuroForge Cognex",
//     subtitle: "General-Purpose AGI Platform",
//     description: "A foundation model platform fine-tuned for physical reasoning and task execution. Cognex bridges the gap between language understanding and physical world interaction through embodied simulation.",
//     image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=70&auto=format&fit=crop",
//     features: ["World model simulation", "Causal reasoning engine", "Zero-shot task generalization", "Continuous self-improvement"],
//     specs: { Parameters: "70B+", Tasks: "Multi-domain", Training: "Sim + Real", Interface: "REST API / SDK" },
//     cta: "Get API Access"
//   },
//   {
//     id: 3,
//     category: "Detection Systems",
//     badge: "Enterprise",
//     title: "NeuroForge Sentinel",
//     subtitle: "AI-Powered Threat & Anomaly Detection",
//     description: "Real-time visual intelligence system for detecting theft, intrusion, unauthorized access, and behavioral anomalies across retail, warehousing, and critical infrastructure environments.",
//     image: "https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&q=70&auto=format&fit=crop",
//     features: ["Theft & shoplifting detection", "Perimeter breach alerts", "Behavioral anomaly scoring", "Multi-camera orchestration"],
//     specs: { Accuracy: "99.2%", Cameras: "Up to 512", "Alert Latency": "<500ms", Integration: "ONVIF / RTSP" },
//     cta: "Request Demo"
//   },
//   {
//     id: 4,
//     category: "Analytics",
//     badge: "Popular",
//     title: "NeuroForge StreamIQ",
//     subtitle: "Real-Time Data Streaming & Analytics",
//     description: "A high-throughput AI analytics engine that ingests, processes, and visualizes sensor, video, and IoT data streams in real time. Built for mission-critical environments with zero data loss architecture.",
//     image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=70&auto=format&fit=crop",
//     features: ["1M+ events/sec throughput", "Live anomaly detection", "Predictive trend modeling", "Custom dashboard builder"],
//     specs: { Throughput: "1M+ eps", Latency: "<5ms", Storage: "Distributed", Export: "JSON / Parquet / CSV" },
//     cta: "Start Free Trial"
//   },
//   {
//     id: 5,
//     category: "Retail AI",
//     badge: "High ROI",
//     title: "NeuroForge RetainIQ",
//     subtitle: "Customer Churn Prediction & Retention",
//     description: "ML-powered churn prediction engine designed for physical retail. Analyzes foot traffic patterns, purchase behavior, and engagement signals to identify at-risk customers before they leave.",
//     image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=70&auto=format&fit=crop",
//     features: ["Churn risk scoring per customer", "Personalized retention triggers", "Foot traffic behavioral analysis", "Loyalty program integration"],
//     specs: { Accuracy: "94.7%", "Prediction Window": "30 days", "Data Sources": "POS / CRM / Vision", ROI: "3-5x avg" },
//     cta: "See Case Study"
//   },
//   {
//     id: 6,
//     category: "Predictive Maintenance",
//     badge: "Industry 4.0",
//     title: "NeuroForge PredictX",
//     subtitle: "Device & Equipment Failure Prediction",
//     description: "Industrial-grade predictive maintenance platform that monitors equipment health through vibration, thermal, and operational data. Predicts failures weeks in advance to eliminate unplanned downtime.",
//     image: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=800&q=70&auto=format&fit=crop",
//     features: ["72hr+ failure prediction window", "Vibration & thermal analysis", "Automated maintenance scheduling", "OEM-agnostic compatibility"],
//     specs: { "Prediction Window": "72hr+", Accuracy: "97.3%", Sensors: "IoT / OPC-UA / MQTT", "Downtime Reduction": "Up to 70%" },
//     cta: "Request Demo"
//   },
//   {
//     id: 7,
//     category: "Physical AI",
//     badge: "Research",
//     title: "NeuroForge SwarmNet",
//     subtitle: "Multi-Agent Drone Swarm Intelligence",
//     description: "Coordinated swarm AI for autonomous drone fleets. SwarmNet enables emergent collective behavior for surveillance, mapping, delivery, and search-and-rescue operations without centralized control.",
//     image: "https://images.unsplash.com/photo-1625314868143-20e93ce3ff33?w=800&q=70&auto=format&fit=crop",
//     features: ["Decentralized swarm coordination", "Dynamic obstacle avoidance", "Real-time mesh networking", "Autonomous mission replanning"],
//     specs: { "Fleet Size": "Up to 500", Coordination: "Decentralized", Comms: "Mesh / 5G", "Use Cases": "Surveillance / Logistics" },
//     cta: "Learn More"
//   },
//   {
//     id: 8,
//     category: "AGI Systems",
//     badge: "Beta",
//     title: "NeuroForge SynthMind",
//     subtitle: "Synthetic Data & Simulation Engine",
//     description: "Generate photorealistic synthetic training data and physics-accurate simulation environments for training physical AI models. Accelerate model development with zero real-world data collection.",
//     image: "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?w=800&q=70&auto=format&fit=crop",
//     features: ["Photorealistic scene generation", "Physics-accurate simulation", "Automatic data labeling", "Sim-to-real transfer pipeline"],
//     specs: { "Render Engine": "GPU Ray Tracing", Output: "10K+ images/hr", Formats: "COCO / YOLO / Pascal", Physics: "Real-time" },
//     cta: "Join Beta"
//   }
// ];

// const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

// // ── Badge color mapping ──────────────────────────────────────────────────────
// const badgeStyles = {
//   Flagship:      { background: 'rgba(0,255,209,0.15)', color: '#00FFD1', border: '1px solid rgba(0,255,209,0.4)' },
//   New:           { background: 'rgba(0,200,255,0.12)', color: '#00C8FF', border: '1px solid rgba(0,200,255,0.35)' },
//   Enterprise:    { background: 'rgba(255,180,0,0.12)', color: '#FFB400', border: '1px solid rgba(255,180,0,0.35)' },
//   Popular:       { background: 'rgba(0,255,209,0.15)', color: '#00FFD1', border: '1px solid rgba(0,255,209,0.4)' },
//   'High ROI':    { background: 'rgba(80,255,120,0.12)', color: '#50FF78', border: '1px solid rgba(80,255,120,0.35)' },
//   'Industry 4.0':{ background: 'rgba(255,100,80,0.12)', color: '#FF6450', border: '1px solid rgba(255,100,80,0.35)' },
//   Research:      { background: 'rgba(180,100,255,0.12)', color: '#B464FF', border: '1px solid rgba(180,100,255,0.35)' },
//   Beta:          { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.2)' },
// };

// // ── Intersection observer hook ───────────────────────────────────────────────
// const useInView = () => {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.1, rootMargin: '80px' });
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);
//   return [ref, inView];
// };

// // ── Lazy image ───────────────────────────────────────────────────────────────
// const LazyImage = React.memo(({ src, alt }) => {
//   const [ref, inView] = useInView();
//   const [loaded, setLoaded] = useState(false);
//   return (
//     <div ref={ref} style={{ position: 'relative', width: '100%', height: '100%', background: '#0a0a0a', overflow: 'hidden' }}>
//       {!loaded && (
//         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,#121212 25%,#1e1e1e 50%,#121212 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
//       )}
//       {inView && (
//         <img src={src} alt={alt} decoding="async" onLoad={() => setLoaded(true)}
//           style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }} />
//       )}
//     </div>
//   );
// });

// // ── Product Card ─────────────────────────────────────────────────────────────
// const ProductCard = React.memo(({ product, index }) => {
//   const [cardRef, inView] = useInView();
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       ref={cardRef}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: '#121212',
//         border: hovered ? '1px solid #00FFD1' : '1px solid rgba(255,255,255,0.12)',
//         overflow: 'hidden',
//         display: 'flex',
//         flexDirection: 'column',
//         opacity: inView ? 1 : 0,
//         transform: inView ? 'translateY(0)' : 'translateY(40px)',
//         transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s ease ${index * 0.07}s, border-color 0.3s ease`,
//         cursor: 'pointer',
//       }}
//     >
//       {/* Image */}
//       <div style={{ position: 'relative', height: '220px', overflow: 'hidden', flexShrink: 0 }}>
//         <LazyImage src={product.image} alt={product.title} />
//         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85))' }} />

//         {/* Badge */}
//         <div style={{ position: 'absolute', top: 16, left: 16, padding: '4px 12px', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', ...badgeStyles[product.badge] }}>
//           {product.badge}
//         </div>

//         {/* Category */}
//         <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 12, fontWeight: 600, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1px' }}>
//           {product.category}
//         </div>
//       </div>

//       {/* Content */}
//       <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
//         <div>
//           <h3 style={{ fontSize: 22, fontWeight: 600, color: '#fff', margin: 0, lineHeight: 1.2 }}>{product.title}</h3>
//           <p style={{ fontSize: 14, color: '#00FFD1', marginTop: 6, marginBottom: 0, fontWeight: 500 }}>{product.subtitle}</p>
//         </div>

//         <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: 0 }}>{product.description}</p>

//         {/* Features */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//           {product.features.map((f, i) => (
//             <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//               <Check size={14} style={{ color: '#00FFD1', flexShrink: 0 }} />
//               <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{f}</span>
//             </div>
//           ))}
//         </div>

//         {/* Specs */}
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16, marginTop: 'auto' }}>
//           {Object.entries(product.specs).map(([k, v]) => (
//             <div key={k}>
//               <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 2 }}>{k}</div>
//               <div style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>{v}</div>
//             </div>
//           ))}
//         </div>

//         {/* CTA */}
//         <button style={{
//           marginTop: 8,
//           background: hovered ? '#00FFD1' : 'transparent',
//           color: hovered ? '#000' : '#00FFD1',
//           border: '1px solid #00FFD1',
//           padding: '12px 20px',
//           fontSize: 14,
//           fontWeight: 600,
//           cursor: 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           gap: 8,
//           transition: 'all 0.3s ease',
//           width: '100%',
//         }}>
//           {product.cta}
//           <ArrowRight size={16} />
//         </button>
//       </div>
//     </div>
//   );
// });

// // ── Main Products Page ────────────────────────────────────────────────────────
// export const Products = () => {
//   const navigate = useNavigate();
//   const [activeCategory, setActiveCategory] = useState('All');

//   const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);

//   return (
//     <>
//       <style>{`
//         @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
//         @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
//         .filter-btn:hover { border-color: #00FFD1 !important; color: #00FFD1 !important; }
//       `}</style>

//       <Header />

//       {/* ── Hero ── */}
//       <section style={{ background: '#000', paddingTop: 140, paddingBottom: 80, paddingLeft: '7.6923%', paddingRight: '7.6923%', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
//         <div style={{ maxWidth: 1400, margin: '0 auto' }}>
//           {/* Breadcrumb */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, animation: 'fadeDown 0.5s ease' }}>
//             <span
//               onClick={() => navigate('/')}
//               style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color 0.2s' }}
//               onMouseEnter={e => e.target.style.color = '#00FFD1'}
//               onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
//             >Home</span>
//             <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.25)' }} />
//             <span style={{ fontSize: 14, color: '#00FFD1' }}>Products</span>
//           </div>

//           <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
//             <div>
//               <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,255,209,0.08)', border: '1px solid rgba(0,255,209,0.25)', padding: '6px 14px', marginBottom: 20 }}>
//                 <Zap size={14} style={{ color: '#00FFD1' }} />
//                 <span style={{ fontSize: 12, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1px' }}>Product Suite</span>
//               </div>
//               <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, color: '#fff', margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
//                 Physical Intelligence,<br />
//                 <span style={{ color: '#00FFD1' }}>Productized.</span>
//               </h1>
//               <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', marginTop: 20, marginBottom: 0, maxWidth: 560, lineHeight: 1.6 }}>
//                 End-to-end AI products for detection, prediction, analytics, and autonomous systems — built for the real world.
//               </p>
//             </div>

//             <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
//               {[{ val: products.length + '+', label: 'Products' }, { val: '8', label: 'Categories' }, { val: '30+', label: 'Clients' }].map(s => (
//                 <div key={s.label} style={{ textAlign: 'center' }}>
//                   <div style={{ fontSize: 36, fontWeight: 700, color: '#00FFD1', lineHeight: 1 }}>{s.val}</div>
//                   <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── Filter Bar ── */}
//       <section style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '20px 7.6923%', position: 'sticky', top: 80, zIndex: 9 }}>
//         <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
//           <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px', marginRight: 8 }}>Filter:</span>
//           {categories.map(cat => (
//             <button
//               key={cat}
//               className="filter-btn"
//               onClick={() => setActiveCategory(cat)}
//               style={{
//                 background: activeCategory === cat ? '#00FFD1' : 'transparent',
//                 color: activeCategory === cat ? '#000' : 'rgba(255,255,255,0.5)',
//                 border: activeCategory === cat ? '1px solid #00FFD1' : '1px solid rgba(255,255,255,0.15)',
//                 padding: '7px 16px',
//                 fontSize: 13,
//                 fontWeight: 500,
//                 cursor: 'pointer',
//                 transition: 'all 0.2s ease',
//                 letterSpacing: '0.3px',
//               }}
//             >
//               {cat}
//             </button>
//           ))}
//           <span style={{ marginLeft: 'auto', fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
//         </div>
//       </section>

//       {/* ── Products Grid ── */}
//       <section style={{ background: '#000', padding: '60px 7.6923% 100px' }}>
//         <div style={{ maxWidth: 1400, margin: '0 auto' }}>
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
//             gap: 28,
//           }}>
//             {filtered.map((product, index) => (
//               <ProductCard key={product.id} product={product} index={index} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Bottom CTA ── */}
//       <section style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '80px 7.6923%', textAlign: 'center' }}>
//         <div style={{ maxWidth: 600, margin: '0 auto' }}>
//           <h2 style={{ fontSize: 36, fontWeight: 600, color: '#fff', margin: '0 0 16px' }}>Need a Custom Solution?</h2>
//           <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', marginBottom: 36, lineHeight: 1.6 }}>
//             Every enterprise has unique challenges. Our team builds tailored physical AI systems for your exact requirements.
//           </p>
//           <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
//             <button
//               onClick={() => navigate('/#contact')}
//               style={{ background: '#00FFD1', color: '#000', border: 'none', padding: '14px 32px', fontSize: 16, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.3s ease' }}
//               onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,209,0.1)'; e.currentTarget.style.color = '#00FFD1'; e.currentTarget.style.outline = '1px solid #00FFD1'; }}
//               onMouseLeave={e => { e.currentTarget.style.background = '#00FFD1'; e.currentTarget.style.color = '#000'; e.currentTarget.style.outline = 'none'; }}
//             >
//               Talk to Our Team <ArrowRight size={18} />
//             </button>
//             <button
//               onClick={() => navigate('/')}
//               style={{ background: 'transparent', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.2)', padding: '14px 32px', fontSize: 16, fontWeight: 500, cursor: 'pointer', transition: 'all 0.3s ease' }}
//               onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#fff'; }}
//               onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
//             >
//               Back to Home
//             </button>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// };



import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Check, Zap, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

import { products } from '../data/mock';

const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

// ── Badge color mapping ──────────────────────────────────────────────────────
const badgeStyles = {
  Flagship:      { background: 'rgba(0,255,209,0.15)', color: '#00FFD1', border: '1px solid rgba(0,255,209,0.4)' },
  New:           { background: 'rgba(0,200,255,0.12)', color: '#00C8FF', border: '1px solid rgba(0,200,255,0.35)' },
  Enterprise:    { background: 'rgba(255,180,0,0.12)', color: '#FFB400', border: '1px solid rgba(255,180,0,0.35)' },
  Popular:       { background: 'rgba(0,255,209,0.15)', color: '#00FFD1', border: '1px solid rgba(0,255,209,0.4)' },
  'High ROI':    { background: 'rgba(80,255,120,0.12)', color: '#50FF78', border: '1px solid rgba(80,255,120,0.35)' },
  'Industry 4.0':{ background: 'rgba(255,100,80,0.12)', color: '#FF6450', border: '1px solid rgba(255,100,80,0.35)' },
  Research:      { background: 'rgba(180,100,255,0.12)', color: '#B464FF', border: '1px solid rgba(180,100,255,0.35)' },
  Beta:          { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.2)' },
};

// ── Intersection observer hook ───────────────────────────────────────────────
const useInView = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.1, rootMargin: '80px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

// ── Lazy image ───────────────────────────────────────────────────────────────
const LazyImage = React.memo(({ src, alt }) => {
  const [ref, inView] = useInView();
  const [loaded, setLoaded] = useState(false);
  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', height: '100%', background: '#0a0a0a', overflow: 'hidden' }}>
      {!loaded && (
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,#121212 25%,#1e1e1e 50%,#121212 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
      )}
      {inView && (
        <img src={src} alt={alt} decoding="async" onLoad={() => setLoaded(true)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }} />
      )}
    </div>
  );
});

// ── Product Card ─────────────────────────────────────────────────────────────
const ProductCard = React.memo(({ product, index }) => {
  const [cardRef, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#121212',
        border: hovered ? '1px solid #00FFD1' : '1px solid rgba(255,255,255,0.12)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${index * 0.07}s, transform 0.6s ease ${index * 0.07}s, border-color 0.3s ease`,
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden', flexShrink: 0 }}>
        <LazyImage src={product.image} alt={product.title} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85))' }} />

        {/* Badge */}
        <div style={{ position: 'absolute', top: 16, left: 16, padding: '4px 12px', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', ...badgeStyles[product.badge] }}>
          {product.badge}
        </div>

        {/* Category */}
        <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 12, fontWeight: 600, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
        <div>
          <h3 style={{ fontSize: 22, fontWeight: 600, color: '#fff', margin: 0, lineHeight: 1.2 }}>{product.title}</h3>
          <p style={{ fontSize: 14, color: '#00FFD1', marginTop: 6, marginBottom: 0, fontWeight: 500 }}>{product.subtitle}</p>
        </div>

        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, margin: 0 }}>{product.description}</p>

        {/* Features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {product.features.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Check size={14} style={{ color: '#00FFD1', flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Specs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16, marginTop: 'auto' }}>
          {Object.entries(product.specs).map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 2 }}>{k}</div>
              <div style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button style={{
          marginTop: 8,
          background: hovered ? '#00FFD1' : 'transparent',
          color: hovered ? '#000' : '#00FFD1',
          border: '1px solid #00FFD1',
          padding: '12px 20px',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          transition: 'all 0.3s ease',
          width: '100%',
        }}>
          {product.cta}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
});

// ── Main Products Page ────────────────────────────────────────────────────────
export const Products = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);

  return (
    <>
      <style>{`
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .filter-btn:hover { border-color: #00FFD1 !important; color: #00FFD1 !important; }
      `}</style>

      <Header />

      {/* ── Hero ── */}
      <section style={{ background: '#000', paddingTop: 140, paddingBottom: 80, paddingLeft: '7.6923%', paddingRight: '7.6923%', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, animation: 'fadeDown 0.5s ease' }}>
            <span
              onClick={() => navigate('/')}
              style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#00FFD1'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
            >Home</span>
            <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.25)' }} />
            <span style={{ fontSize: 14, color: '#00FFD1' }}>Products</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,255,209,0.08)', border: '1px solid rgba(0,255,209,0.25)', padding: '6px 14px', marginBottom: 20 }}>
                <Zap size={14} style={{ color: '#00FFD1' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#00FFD1', textTransform: 'uppercase', letterSpacing: '1px' }}>Product Suite</span>
              </div>
              <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, color: '#fff', margin: 0, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                Physical Intelligence,<br />
                <span style={{ color: '#00FFD1' }}>Productized.</span>
              </h1>
              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', marginTop: 20, marginBottom: 0, maxWidth: 560, lineHeight: 1.6 }}>
                End-to-end AI products for detection, prediction, analytics, and autonomous systems — built for the real world.
              </p>
            </div>

            {/* <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {[{ val: products.length + '+', label: 'Products' }, { val: '8', label: 'Categories' }, { val: '30+', label: 'Clients' }].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 36, fontWeight: 700, color: '#00FFD1', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section style={{ background: '#0a0a0a', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '20px 7.6923%', position: 'sticky', top: 80, zIndex: 9 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px', marginRight: 8 }}>Filter:</span>
          {categories.map(cat => (
            <button
              key={cat}
              className="filter-btn"
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#00FFD1' : 'transparent',
                color: activeCategory === cat ? '#000' : 'rgba(255,255,255,0.5)',
                border: activeCategory === cat ? '1px solid #00FFD1' : '1px solid rgba(255,255,255,0.15)',
                padding: '7px 16px',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '0.3px',
              }}
            >
              {cat}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </section>

      {/* ── Products Grid ── */}
      <section style={{ background: '#000', padding: '60px 7.6923% 100px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: 28,
          }}>
            {filtered.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '80px 7.6923%', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 36, fontWeight: 600, color: '#fff', margin: '0 0 16px' }}>Need a Custom Solution?</h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', marginBottom: 36, lineHeight: 1.6 }}>
            Every enterprise has unique challenges. Our team builds tailored physical AI systems for your exact requirements.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/#contact')}
              style={{ background: '#00FFD1', color: '#000', border: 'none', padding: '14px 32px', fontSize: 16, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,255,209,0.1)'; e.currentTarget.style.color = '#00FFD1'; e.currentTarget.style.outline = '1px solid #00FFD1'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#00FFD1'; e.currentTarget.style.color = '#000'; e.currentTarget.style.outline = 'none'; }}
            >
              Talk to Our Team <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/')}
              style={{ background: 'transparent', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.2)', padding: '14px 32px', fontSize: 16, fontWeight: 500, cursor: 'pointer', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};