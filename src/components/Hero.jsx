// import React from 'react';
// import Spline from '@splinetool/react-spline';
// import { ArrowRight, Play } from 'lucide-react';
// import { heroContent } from '../data/mock';

// export const Hero = () => {
//   return (
//     <section className="hero-section">
//       <div className="hero-content-wrapper">
//         {/* Left Content */}
//         <div className="hero-left">
//           <h1 className="display-huge">
//             {heroContent.headline}
//           </h1>
//           <p className="body-large hero-subheadline">
//             {heroContent.subheadline}
//           </p>
//           <div className="hero-cta-group">
//             <button className="btn-primary">
//               {heroContent.ctaPrimary}
//               <ArrowRight size={20} />
//             </button>
//             <button className="btn-secondary">
//               <Play size={20} />
//               {heroContent.ctaSecondary}
//             </button>
//           </div>
//         </div>

//         {/* Right 3D Animation */}
//         <div className="hero-right">
//           <div className="spline-container">
//             <Spline scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


import React from 'react';
import Spline from '@splinetool/react-spline';
import { ArrowRight, Play } from 'lucide-react';
import { heroContent } from '../data/mock';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-content-wrapper">
        {/* Left Content */}
        <div className="hero-left">
          <h1 className="display-huge">
            {heroContent.headline}
          </h1>
          <p className="body-large hero-subheadline">
            {heroContent.subheadline}
          </p>
          <div className="hero-cta-group">
            <button className="btn-primary" onClick={() => navigate('/products')}>
              {heroContent.ctaPrimary}
              <ArrowRight size={20} />
            </button>
            <button className="btn-secondary" onClick={() => navigate('/book-demo')}>
              <Play size={20} />
              {heroContent.ctaSecondary}
            </button>
          </div>
        </div>

        {/* Right 3D Animation */}
        <div className="hero-right">
          <div className="spline-container">
            <Spline scene="https://prod.spline.design/NbVmy6DPLhY-5Lvg/scene.splinecode" />
          </div>
        </div>
      </div>
    </section>
  );
};