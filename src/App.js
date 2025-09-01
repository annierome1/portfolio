import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import "./index.css";

import Background from "./components/Background";
import Navbar     from "./components/Navbar";
import Hero       from "./components/Hero";
import AboutMe    from "./components/AboutMe";
import Skills     from "./components/Skills";
import Contact    from "./components/Contact";
import Projects   from "./components/Projects";
import Resume     from "./components/Resume";
import Chatbot    from "./components/Chatbot";


const GA_ID = 'G-N6PD7N19SN';

function GoogleAnalytics() {
  const location = useLocation();

  // fire a pageview on every route change
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', GA_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return (
    <Helmet>
      {/* 1) load gtag.js */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      {/* 2) initialize dataLayer and gtag() */}
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname
          });
        `}
      </script>
    </Helmet>
  );
}

export default function App() {
  const location = useLocation();

  // Scroll to top whenever route changes
  useEffect(() => {
    // Scroll both window and main container to top
    window.scrollTo(0, 0);
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // Enhanced scroll control for homepage
  useEffect(() => {
    if (location.pathname === '/') {
      let isScrolling = false;
      const sections = document.querySelectorAll('.snap-center');
      const totalSections = sections.length;

      const scrollToSection = (sectionIndex) => {
        if (sectionIndex < 0 || sectionIndex >= totalSections || isScrolling) return;
        
        isScrolling = true;
        const targetSection = sections[sectionIndex];
        
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        // Reset scrolling flag after animation
        setTimeout(() => {
          isScrolling = false;
        }, 800);
      };

      const handleWheel = (e) => {
        e.preventDefault(); // Prevent default scrolling behavior
        
        if (isScrolling) return;

        const container = document.querySelector('main');
        const scrollTop = container.scrollTop;
        const sectionHeight = window.innerHeight;
        const currentSection = Math.round(scrollTop / sectionHeight);

        if (e.deltaY > 0) {
          // Scrolling down - go to next section
          if (currentSection < totalSections - 1) {
            scrollToSection(currentSection + 1);
          }
        } else {
          // Scrolling up - go to previous section
          if (currentSection > 0) {
            scrollToSection(currentSection - 1);
          }
        }
      };

      const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
          e.preventDefault();
          const container = document.querySelector('main');
          const scrollTop = container.scrollTop;
          const sectionHeight = window.innerHeight;
          const currentSection = Math.round(scrollTop / sectionHeight);
          
          if (currentSection < totalSections - 1) {
            scrollToSection(currentSection + 1);
          }
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          e.preventDefault();
          const container = document.querySelector('main');
          const scrollTop = container.scrollTop;
          const sectionHeight = window.innerHeight;
          const currentSection = Math.round(scrollTop / sectionHeight);
          
          if (currentSection > 0) {
            scrollToSection(currentSection - 1);
          }
        }
      };

      const container = document.querySelector('main');
      if (container) {
        container.addEventListener('wheel', handleWheel, { passive: false });
        document.addEventListener('keydown', handleKeyDown);
        
        return () => {
          container.removeEventListener('wheel', handleWheel);
          document.removeEventListener('keydown', handleKeyDown);
        };
      }
    }
  }, [location.pathname]);

  return (
    <div className="relative">
      <Background />
      <GoogleAnalytics />
      <Navbar />
      <main className="relative z-10 pt-16 mt-25 snap-y snap-mandatory overflow-y-auto h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="snap-center min-h-screen flex items-center justify-center">
                  <Hero />
                </section>
                <section className="snap-center min-h-screen flex items-center justify-center">
                  <AboutMe />
                </section>
                <section className="snap-center min-h-screen flex items-center justify-center">
                  <Skills />
                </section>
                <section className="snap-center min-h-screen flex items-center justify-center">
                  <Contact />
                </section>
              </>
            }
          />
          <Route
            path="/projects"
            element={
              <section className="min-h-screen backdrop-blur-lg" id="projects-route">
                <div className="pt-16 flex justify-center">
                  <Projects />
                </div>
              </section>
            }
          />
                    <Route
            path="/resume"
            element={
              <section className="snap-center min-h-screen">
                <Resume />
              </section>
            }
          />
        </Routes>
      </main>
      <Chatbot />
    </div>
  );
}