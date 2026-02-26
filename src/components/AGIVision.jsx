/* prettier-ignore-file */


// import React from 'react';
// import { agiVision } from '../data/mock';

// export const AGIVision = () => {
//     return ( <
//         section id = "agi-vision"
//         className = "section-padding agi-section" >
//         <
//         div className = "dark-content-container" >
//         <
//         div className = "agi-content-grid" > { /* Left: Content */ } <
//         div className = "agi-left" >
//         <
//         div className = "agi-badge" > AGI Initiative < /div> <
//         h2 className = "display-large" > { agiVision.title } < /h2> <
//         p className = "heading-3 agi-subtitle" > { agiVision.subtitle } < /p> <
//         p className = "body-large" > { agiVision.description } < /p>

//         <
//         div className = "agi-principles" > {
//             agiVision.principles.map((principle, index) => ( <
//                 div key = { index }
//                 className = "principle-card" >
//                 <
//                 div className = "principle-number" > { String(index + 1).padStart(2, '0') } < /div> <
//                 div className = "principle-content" >
//                 <
//                 h4 className = "heading-3" > { principle.title } < /h4> <
//                 p className = "body-medium" > { principle.description } < /p> <
//                 /div> <
//                 /div>
//             ))
//         } <
//         /div> <
//         /div>

//         { /* Right: Image */ } <
//         div className = "agi-right" >
//         <
//         div className = "agi-image-wrapper" >
//         <
//         img src = { agiVision.image }
//         alt = "AGI Vision"
//         className = "agi-image" /
//         >
//         <
//         div className = "agi-image-overlay" > < /div> <
//         /div> <
//         /div> <
//         /div> <
//         /div> <
//         /section>
//     );
// };


/* prettier-ignore-file */
import React from 'react';
import { agiVision } from '../data/mock';

export const AGIVision = () => {
  return (
    <section id="agi-vision" className="section-padding agi-section">
      <div className="dark-content-container">
        <div className="agi-content-grid">
          <div className="agi-left">
            <div className="agi-badge">AGI Initiative</div>
            <h2 className="display-large">{agiVision.title}</h2>
            <p className="heading-3 agi-subtitle">{agiVision.subtitle}</p>
            <p className="body-large">{agiVision.description}</p>
            <div className="agi-principles">
              {agiVision.principles.map((principle, index) => (
                <div key={index} className="principle-card">
                  <div className="principle-number">{String(index + 1).padStart(2, '0')}</div>
                  <div className="principle-content">
                    <h4 className="heading-3">{principle.title}</h4>
                    <p className="body-medium">{principle.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="agi-right">
            <div className="agi-image-wrapper">
              <img src={agiVision.image} alt="AGI Vision" className="agi-image" />
              <div className="agi-image-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};