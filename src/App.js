import React from "react";
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
import Chatbot    from "./components/Chatbot";

export default function App() {
  return (
    <div className="relative">
      <Background />
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
              <section className="snap-center min-h-screen backdrop-blur-lg">
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