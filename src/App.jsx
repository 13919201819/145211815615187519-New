// // import React from "react";
// // import "./App.css";
// // import { Header } from "./components/Header";
// // import { Hero } from "./components/Hero";
// // import { Solutions } from "./components/Solutions";
// // import { AGIVision } from "./components/AGIVision";
// // import { UseCases } from "./components/UseCases";
// // import { Technology } from "./components/Technology";
// // import { Contact } from "./components/Contact";
// // import { Footer } from "./components/Footer";
// // import { Toaster } from "./components/ui/sonner";
// // import LenisProvider from "./providers/LenisProvider";


// // function App() {
// //   return (
// //     <div className="App">
// //       <LenisProvider />
// //       <Header />
// //       <main>
// //         <Hero />
// //         <Solutions />
// //         <AGIVision />
// //         <UseCases />
// //         <Technology />
// //         <Contact />
// //       </main>
// //       <Footer />
// //       <Toaster />
// //     </div>
// //   );
// // }

// // export default App;



// // //cleaed



// import React from "react";
// import "./App.css";
// import { Header } from "./components/Header";
// import { Hero } from "./components/Hero";
// import { Solutions } from "./components/Solutions";
// import { AGIVision } from "./components/AGIVision";
// import { UseCases } from "./components/UseCases";
// import { Technology } from "./components/Technology";
// import { Contact } from "./components/Contact";
// import { Footer } from "./components/Footer";
// import { Toaster } from "./components/ui/sonner";
// import LenisProvider from "./providers/LenisProvider";

// // Import Loader components
// import { LoaderProvider } from "./context/LoaderContext";
// import LoaderWrapper from "./components/ui/LoaderWrapper";

// function App() {
//   return (
//     <LoaderProvider>
//       <div className="App">
//         {/* Global Loader - shows on page load */}
//         <LoaderWrapper />
        
//         <LenisProvider />
//         <Header />
//         <main>
//           <Hero />
//           <Solutions />
//           <AGIVision />
//           <UseCases />
//           <Technology />
//           <Contact />
//         </main>
//         <Footer />
//         <Toaster />
//       </div>
//     </LoaderProvider>
//   );
// }

// export default App;

// import React from "react";
// import "./App.css";
// import { Header } from "./components/Header";
// import { Hero } from "./components/Hero";
// import { Solutions } from "./components/Solutions";
// import { AGIVision } from "./components/AGIVision";
// import { UseCases } from "./components/UseCases";
// import { Technology } from "./components/Technology";
// import { Contact } from "./components/Contact";
// import { Footer } from "./components/Footer";
// import { Toaster } from "./components/ui/sonner";
// import LenisProvider from "./providers/LenisProvider";

// // Import Loader components
// import { LoaderProvider } from "./context/LoaderContext";
// import LoaderWrapper from "./components/ui/LoaderWrapper";
// import { usePageLoader } from "./hooks/usePageLoader";

// // Component that monitors page loading
// function PageLoadMonitor() {
//   usePageLoader(); // This will show loader until page fully loads
//   return null;
// }

// function App() {
//   return (
//     <LoaderProvider>
//       <div className="App">
//         {/* Global Loader - shows until page fully loads */}
//         <LoaderWrapper />
        
//         {/* Monitor page load state */}
//         <PageLoadMonitor />
        
//         <LenisProvider />
//         <Header />
//         <main>
//           <Hero />
//           <Solutions />
//           <AGIVision />
//           <UseCases />
//           <Technology />
//           <Contact />
//         </main>
//         <Footer />
//         <Toaster />
//       </div>
//     </LoaderProvider>
//   );
// }

// export default App;


// import React from "react";
// import "./App.css";
// import { HashRouter as Router, Routes, Route } from 'react-router-dom';import { Header } from "./components/Header";
// import { Hero } from "./components/Hero";
// import { Solutions } from "./components/Solutions";
// import { AGIVision } from "./components/AGIVision";
// // import { UseCases } from "./components/UseCases";
// import { Technology } from "./components/Technology";
// import { Contact } from "./components/Contact";
// import { Footer } from "./components/Footer";
// import { SolutionsPage } from "./pages/SolutionsPage";
// import { Toaster } from "./components/ui/sonner";
// import LenisProvider from "./providers/LenisProvider";
// import { Products } from './pages/Products';
// import { BookDemo } from './pages/BookDemo';
// import { PrivacyPolicy }      from './pages/PrivacyPolicy';
// import { TermsAndConditions } from './pages/TermsAndConditions';
// import { CookiePolicy }       from './pages/CookiePolicy';
// import { AboutUs }   from './pages/AboutUs';
// import { Investors } from './pages/Investors';

// // Import Loader components
// import { LoaderProvider } from "./context/LoaderContext";
// import LoaderWrapper from "./components/ui/LoaderWrapper";
// import { usePageLoader } from "./hooks/usePageLoader";

// // Component that monitors page loading
// function PageLoadMonitor() {
//   usePageLoader();
//   return null;
// }

// // Home Page Component
// function HomePage() {
//   return (
//     <>
//       <Header />
//       <main>
//         <Hero />
//         <Solutions />
//         <AGIVision />
//         {/* <UseCases /> */}
//         <Technology />
//         <Contact />
//       </main>
//       <Footer />
//     </>
//   );
// }

// function App() {
//   return (
//     <LoaderProvider>
//       <Router>
//         <div className="App">
//           <LoaderWrapper />
//           <PageLoadMonitor />
//           <LenisProvider />
          
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/next-gen-physical-ai-agi-solutions" element={<SolutionsPage />} />
//             <Route path="/products" element={<Products />} />
//             <Route path="/book-demo" element={<BookDemo />} />
//             <Route path="/privacy-policy"      element={<PrivacyPolicy />} />
//             <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
//             <Route path="/cookie-policy"       element={<CookiePolicy />} />
//             <Route path="/about"     element={<AboutUs />} />
//             <Route path="/investors" element={<Investors />} />
//           </Routes>
          
//           <Toaster />
//         </div>
//       </Router>
//     </LoaderProvider>
//   );
// }

// export default App;




import React, { useEffect } from "react";
import "./App.css";

import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Solutions } from "./components/Solutions";
import { AGIVision } from "./components/AGIVision";
// import { UseCases } from "./components/UseCases";
import { Technology } from "./components/Technology";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

import { SolutionsPage } from "./pages/SolutionsPage";
import { Toaster } from "./components/ui/sonner";

import LenisProvider from "./providers/LenisProvider";

import { Products } from "./pages/Products";
import { BookDemo } from "./pages/BookDemo";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsAndConditions } from "./pages/TermsAndConditions";
import { CookiePolicy } from "./pages/CookiePolicy";
import { AboutUs } from "./pages/AboutUs";
import { Investors } from "./pages/Investors";

import { LoaderProvider } from "./context/LoaderContext";
import LoaderWrapper from "./components/ui/LoaderWrapper";
import { usePageLoader } from "./hooks/usePageLoader";


// Page Loading Monitor
function PageLoadMonitor() {
  usePageLoader();
  return null;
}


// Home Page Component
function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sectionId = params.get("section");

    if (!sectionId) return;

    let attempts = 0;
    let interval;

    const scrollToSection = () => {
      const element = document.getElementById(sectionId);

      if (element) {
        clearInterval(interval);

        requestAnimationFrame(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        });

        return true;
      }

      return false;
    };

    interval = setInterval(() => {
      attempts++;

      if (scrollToSection() || attempts >= 30) {
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };

  }, [location.search]);

  return (
    <>
      <Header />

      <main>
        <Hero />
        <Solutions />
        <AGIVision />
        {/* <UseCases /> */}
        <Technology />
        <Contact />
      </main>

      <Footer />
    </>
  );
}


// Application Routes
function AppRoutes() {
  return (
    <>
      <LoaderWrapper />

      <PageLoadMonitor />

      <LenisProvider />

      <Routes>

        {/* Homepage */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* Solutions */}
        <Route
          path="/next-gen-physical-ai-agi-solutions"
          element={<SolutionsPage />}
        />

        {/* Products */}
        <Route
          path="/products"
          element={<Products />}
        />

        {/* Book Demo */}
        <Route
          path="/book-demo"
          element={<BookDemo />}
        />

        {/* Legal Pages */}
        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/terms-and-conditions"
          element={<TermsAndConditions />}
        />

        <Route
          path="/cookie-policy"
          element={<CookiePolicy />}
        />

        {/* Other Pages */}
        <Route
          path="/about"
          element={<AboutUs />}
        />

        <Route
          path="/investors"
          element={<Investors />}
        />

      </Routes>

      <Toaster />
    </>
  );
}


// Main App
function App() {
  return (
    <LoaderProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </LoaderProvider>
  );
}

export default App;
