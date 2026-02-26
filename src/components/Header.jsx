// import React, { useState } from 'react';
// import { Menu, X } from 'lucide-react';
// import { companyInfo } from '../data/mock';

// export const Header = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const navLinks = [
//     { name: 'Products', href: '#products' },
//     { name: 'Solutions', href: '#solutions' },
//     { name: 'AGI Vision', href: '#agi-vision' },
//       // { name: 'Use Cases', href: '#use-cases' },
//     { name: 'Technology', href: '#technology' },
//     { name: 'Contact', href: '#contact' }
//   ];

//   return (
//     <header className="dark-header">
//       <div className="dark-logo-text">
//         {companyInfo.name}
//       </div>
      
//       {/* Desktop Navigation */}
//       <nav className="dark-nav">
//         {navLinks.map((link) => (
//           <a key={link.name} href={link.href} className="dark-nav-link">
//             {link.name}
//           </a>
//         ))}
//         <a href="#contact" className="btn-primary" style={{ padding: '12px 24px', minHeight: 'auto' }}>
//           Get Started
//         </a>
//       </nav>

//       {/* Mobile Menu Button */}
//       <button 
//         className="mobile-menu-btn"
//         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//       >
//         {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       {/* Mobile Navigation */}
//       {mobileMenuOpen && (
//         <div className="mobile-menu">
//           {navLinks.map((link) => (
//             <a 
//               key={link.name} 
//               href={link.href} 
//               className="mobile-nav-link"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               {link.name}
//             </a>
//           ))}
//           <a 
//             href="#contact" 
//             className="btn-primary" 
//             style={{ width: '100%', justifyContent: 'center' }}
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             Get Started
//           </a>
//         </div>
//       )}
//     </header>
//   );
// };


import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { companyInfo } from '../data/mock';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Products', href: '/products' },
    { name: 'Solutions', href: '/next-gen-physical-ai-agi-solutions' },
    { name: 'AGI Vision', href: '#agi-vision' },
      // { name: 'Use Cases', href: '#use-cases' },
    { name: 'Technology', href: '#technology' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className="dark-header">
      <a
        href="/"
        className="dark-logo-text"
        style={{ textDecoration: 'none', cursor: 'pointer' }}
      >
        {companyInfo.name}
      </a>
      
      {/* Desktop Navigation */}
      <nav className="dark-nav">
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className="dark-nav-link">
            {link.name}
          </a>
        ))}
        <a href="#contact" className="btn-primary" style={{ padding: '12px 24px', minHeight: 'auto' }}>
          Get Started
        </a>
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Started
          </a>
        </div>
      )}
    </header>
  );
};