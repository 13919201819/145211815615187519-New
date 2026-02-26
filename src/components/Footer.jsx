// import React from 'react';
// import { Github, Linkedin, Twitter } from 'lucide-react';
// import { companyInfo } from '../data/mock';

// export const Footer = () => {
//     const currentYear = new Date().getFullYear();

//     return ( <
//         footer className = "footer" >
//         <
//         div className = "dark-content-container" >
//         <
//         div className = "footer-content" > { /* Brand */ } <
//         div className = "footer-brand" >
//         <
//         div className = "footer-logo" > { companyInfo.name } < /div> <
//         p className = "body-medium footer-tagline" > { companyInfo.tagline } < /p>

//         <
//         div className = "footer-social" >
//         <
//         a href = "#"
//         className = "social-link" >
//         <
//         Twitter size = { 20 }
//         /> <
//         /a> <
//         a href = "#"
//         className = "social-link" >
//         <
//         Linkedin size = { 20 }
//         /> <
//         /a> <
//         a href = "#"
//         className = "social-link" >
//         <
//         Github size = { 20 }
//         /> <
//         /a> <
//         /div> <
//         /div>

//         { /* Links */ } <
//         div className = "footer-links-grid" >
//         <
//         div className = "footer-column" >
//         <
//         h4 className = "footer-heading" > Solutions < /h4> <
//         a href = "#solutions"
//         className = "footer-link" > Autonomous Robotics < /a> <
//         a href = "#solutions"
//         className = "footer-link" > Physical AI Agents < /a> <
//         a href = "#solutions"
//         className = "footer-link" > AGI - Ready Systems < /a> <
//         /div>

//         <
//         div className = "footer-column" >
//         <
//         h4 className = "footer-heading" > Company < /h4> <
//         a href = "#agi-vision"
//         className = "footer-link" > About Us < /a> <
//         a href = "#use-cases"
//         className = "footer-link" > Use Cases < /a> <
//         a href = "#technology"
//         className = "footer-link" > Technology < /a> <
//         /div>

//         <
//         div className = "footer-column" >
//         <
//         h4 className = "footer-heading" > Resources < /h4> <
//         a href = "#"
//         className = "footer-link" > Documentation < /a> <
//         a href = "#"
//         className = "footer-link" > Research Papers < /a> <
//         a href = "#"
//         className = "footer-link" > Blog < /a> <
//         /div>

//         <
//         div className = "footer-column" >
//         <
//         h4 className = "footer-heading" > Legal < /h4> <
//         a href = "#"
//         className = "footer-link" > Privacy Policy < /a> <
//         a href = "#"
//         className = "footer-link" > Terms of Service < /a> <
//         a href = "#"
//         className = "footer-link" > Cookie Policy < /a> <
//         /div> <
//         /div> <
//         /div>

//         <
//         div className = "footer-bottom" >
//         <
//         p className = "body-small" > ©{ currentYear } { companyInfo.name }.All rights reserved. < /p> <
//         /div> <
//         /div> <
//         /footer>
//     );
// };


// import React from 'react';
// import { Github, Linkedin, Twitter } from 'lucide-react';
// import { companyInfo } from '../data/mock';

// export const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="footer">
//       <div className="dark-content-container">
//         <div className="footer-content">
//           <div className="footer-brand">
//             <div className="footer-logo">{companyInfo.name}</div>
//             <p className="body-medium footer-tagline">{companyInfo.tagline}</p>

//             <div className="footer-social">
//               <a href="#" className="social-link">
//                 <Twitter size={20} />
//               </a>
//               <a href="#" className="social-link">
//                 <Linkedin size={20} />
//               </a>
//               <a href="#" className="social-link">
//                 <Github size={20} />
//               </a>
//             </div>
//           </div>

//           <div className="footer-links-grid">
//             <div className="footer-column">
//               <h4 className="footer-heading">Solutions</h4>
//               <a href="#solutions" className="footer-link">Autonomous Robotics</a>
//               <a href="#solutions" className="footer-link">Physical AI Agents</a>
//               <a href="#solutions" className="footer-link">AGI-Ready Systems</a>
//             </div>

//             <div className="footer-column">
//               <h4 className="footer-heading">Company</h4>
//               <a href="#agi-vision" className="footer-link">About Us</a>
//               <a href="#use-cases" className="footer-link">Use Cases</a>
//               <a href="#technology" className="footer-link">Technology</a>
//             </div>

//             <div className="footer-column">
//               <h4 className="footer-heading">Resources</h4>
//               <a href="#" className="footer-link">Documentation</a>
//               <a href="#" className="footer-link">Research Papers</a>
//               <a href="#" className="footer-link">Blog</a>
//             </div>

//             <div className="footer-column">
//               <h4 className="footer-heading">Legal</h4>
//               <a href="#" className="footer-link">Privacy Policy</a>
//               <a href="#" className="footer-link">Terms of Service</a>
//               <a href="#" className="footer-link">Cookie Policy</a>
//             </div>
//           </div>
//         </div>

//         <div className="footer-bottom">
//           <p className="body-small">©{currentYear} {companyInfo.name}. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };



import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { companyInfo } from '../data/mock';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="dark-content-container">
        <div className="footer-content">
          <div className="footer-brand">
            <a
              href="/"
              className="footer-logo"
              style={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              {companyInfo.name}
            </a>
            <p className="body-medium footer-tagline">{companyInfo.tagline}</p>

            <div className="footer-social">
              <a href="#" className="social-link">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link">
                <Linkedin size={20} />
              </a>
              <a href="#" className="social-link">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="footer-column">
              <h4 className="footer-heading">Solutions</h4>
              <a href="#solutions" className="footer-link">Autonomous Robotics</a>
              <a href="#solutions" className="footer-link">Physical AI Agents</a>
              <a href="#solutions" className="footer-link">AGI-Ready Systems</a>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Company</h4>
              <a href="#agi-vision" className="footer-link">About Us</a>
              <a href="#use-cases" className="footer-link">Use Cases</a>
              <a href="#technology" className="footer-link">Technology</a>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Resources</h4>
              <a href="#" className="footer-link">Documentation</a>
              <a href="#" className="footer-link">Research Papers</a>
              <a href="#" className="footer-link">Blog</a>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Legal</h4>
              <a href="#" className="footer-link">Privacy Policy</a>
              <a href="#" className="footer-link">Terms of Service</a>
              <a href="#" className="footer-link">Cookie Policy</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="body-small">©{currentYear} {companyInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};