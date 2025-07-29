// src/App.js
import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { Routes, Route } from "react-router-dom";
import "./index.css";

import Background from "./components/Background";
import Navbar     from "./components/Navbar";
import Hero       from "./components/Hero";
import AboutMe    from "./components/AboutMe";
import Skills     from "./components/Skills";
import Contact    from "./components/Contact";
import Projects   from "./components/Projects";
import Resume     from "./components/Resume";
import Footer     from "./components/Footer";
import Chatbot    from "./components/Chatbot";

export default function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      inertia: 0.8,
    });
    // update on resize
    window.addEventListener("resize", () => scroll.update());
    return () => {
      window.removeEventListener("resize", () => scroll.update());
      scroll.destroy();
    };
  }, []);

  return (
    <div className="relative flex flex-col h-screen">
      <Background />
      <Navbar />

      {/* ❶ This wrapper has NO overflow-y-auto, NO snap-* */}
      <div ref={containerRef} data-scroll-container className="flex-1 pt-16">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <WrapSection><Hero /></WrapSection>
                <WrapSection><AboutMe /></WrapSection>
                <WrapSection><Skills /></WrapSection>
                <WrapSection><Contact /></WrapSection>
                <WrapSection><Footer /></WrapSection>
              </>
            }
          />
          <Route
            path="/projects"
            element={<WrapSection><Projects /></WrapSection>}
          />
          <Route
            path="/resume"
            element={<WrapSection><Resume /></WrapSection>}
          />
        </Routes>
      </div>

      <Chatbot />
    </div>
  );
}
