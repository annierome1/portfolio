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

  // Section-stopping functionality for homepage with auto-scroll fix
  useEffect(() => {
    if (location.pathname === '/') {
      let isScrolling = false;
      let lastScrollTime = 0;
      let lastKeyTime = 0;
      let lastScrollToSectionTime = 0;
      const scrollCooldown = 500; // Increased cooldown to prevent jumping
      const keyCooldown = 800; // Increased cooldown for keyboard events
      const scrollToSectionCooldown = 1000; // Cooldown between scrollToSection calls
      
      const sections = document.querySelectorAll('.snap-center');
      const totalSections = sections.length;
      
      console.log('=== SECTIONS DEBUG ===');
      console.log('Total sections found:', totalSections);
      sections.forEach((section, index) => {
        console.log(`Section ${index}:`, section);
        console.log(`Section ${index} classes:`, section.className);
      });
      console.log('=== END SECTIONS DEBUG ===');

      const scrollToSection = (sectionIndex) => {
        console.log('=== SCROLL TO SECTION DEBUG ===');
        console.log('Attempting to scroll to section:', sectionIndex);
        console.log('isScrolling:', isScrolling);
        console.log('Section bounds check:', sectionIndex >= 0 && sectionIndex < totalSections);
        
        // Add additional cooldown check for scrollToSection calls
        const now = Date.now();
        if (now - lastScrollToSectionTime < scrollToSectionCooldown) {
          console.log('ScrollToSection called too soon, ignoring');
          return;
        }
        lastScrollToSectionTime = now;
        
        if (sectionIndex < 0 || sectionIndex >= totalSections || isScrolling) {
          console.log('Scroll blocked - invalid section or already scrolling');
          return;
        }
        
        isScrolling = true;
        const targetSection = sections[sectionIndex];
        console.log('Target section element:', targetSection);
        console.log('Starting scroll animation...');
        
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        // Increased timeout to ensure animation completes
        setTimeout(() => {
          console.log('Scroll animation completed, resetting isScrolling flag');
          isScrolling = false;
        }, 1500); // Increased timeout to 1500ms
        
        console.log('=== END SCROLL TO SECTION DEBUG ===');
      };

      const handleWheel = (e) => {
        e.preventDefault();
        
        if (isScrolling) return;
        
        // Throttle scroll events to prevent rapid firing
        const now = Date.now();
        if (now - lastScrollTime < scrollCooldown) {
          return;
        }
        lastScrollTime = now;

        const container = document.querySelector('main');
        const scrollTop = container.scrollTop;
        const sectionHeight = window.innerHeight;
        const currentSection = Math.floor(scrollTop / sectionHeight);

        // Simplified mouse pad scrolling - works like keyboard but with throttling
        if (e.deltaY > 0) {
          // Scrolling down - go to next section
          if (currentSection < totalSections - 1) {
            scrollToSection(currentSection + 1);
          }
        } else if (e.deltaY < 0) {
          // Scrolling up - go to previous section
          if (currentSection > 0) {
            scrollToSection(currentSection - 1);
          }
        }
      };

      const handleKeyDown = (e) => {
        // Check for arrow keys and page keys
        const isDownKey = e.key === 'ArrowDown' || e.key === 'PageDown' || e.keyCode === 40 || e.keyCode === 34;
        const isUpKey = e.key === 'ArrowUp' || e.key === 'PageUp' || e.keyCode === 38 || e.keyCode === 33;
        
        if (isDownKey || isUpKey) {
          console.log('=== KEYBOARD DEBUG ===');
          console.log('Key pressed:', e.key, 'KeyCode:', e.keyCode);
          console.log('isScrolling:', isScrolling);
          
          e.preventDefault();
          e.stopPropagation();
          
          // Add keyboard cooldown to prevent rapid key presses
          const now = Date.now();
          if (now - lastKeyTime < keyCooldown) {
            console.log('Key press too soon, ignoring (cooldown:', now - lastKeyTime, 'ms)');
            return;
          }
          lastKeyTime = now;
          
          if (isScrolling) {
            console.log('Already scrolling, ignoring key press');
            return;
          }
          
          const container = document.querySelector('main');
          const scrollTop = container.scrollTop;
          const sectionHeight = window.innerHeight;
          const currentSection = Math.floor(scrollTop / sectionHeight);
          const scrollPosition = scrollTop % sectionHeight;
          
          console.log('Container scrollTop:', scrollTop);
          console.log('Section height:', sectionHeight);
          console.log('Current section:', currentSection);
          console.log('Scroll position within section:', scrollPosition);
          console.log('Total sections:', totalSections);
          
          if (isDownKey && currentSection < totalSections - 1) {
            console.log('Moving to next section:', currentSection + 1);
            scrollToSection(currentSection + 1);
          } else if (isUpKey && currentSection > 0) {
            console.log('Moving to previous section:', currentSection - 1);
            scrollToSection(currentSection - 1);
          } else {
            console.log('Cannot move further in this direction');
          }
          console.log('=== END KEYBOARD DEBUG ===');
        }
      };

      const container = document.querySelector('main');
      if (container) {
        container.addEventListener('wheel', handleWheel, { passive: false });
        
        // Attach keyboard listeners to multiple targets for reliability
        document.addEventListener('keydown', handleKeyDown, { capture: true });
        window.addEventListener('keydown', handleKeyDown, { capture: true });
        container.addEventListener('keydown', handleKeyDown, { capture: true });
        
        return () => {
          container.removeEventListener('wheel', handleWheel);
          document.removeEventListener('keydown', handleKeyDown, { capture: true });
          window.removeEventListener('keydown', handleKeyDown, { capture: true });
          container.removeEventListener('keydown', handleKeyDown, { capture: true });
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
              <section className="min-h-screen">
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