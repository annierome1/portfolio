// pages/Projects.js
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaGraduationCap, FaGamepad, FaBriefcase, FaCode, FaBook } from 'react-icons/fa';
import { projects } from '../data/data';
import { motion } from 'framer-motion';

/* ---------- Portal root ---------- */
function useModalRoot(id = 'modal-root') {
  const [root, setRoot] = useState(null);
  useEffect(() => {
    if (typeof document === 'undefined') return;
    let el = document.getElementById(id);
    let created = false;
    if (!el) {
      el = document.createElement('div');
      el.id = id;
      document.body.appendChild(el);
      created = true;
    }
    setRoot(el);
    return () => {
      if (created && el?.parentNode) el.parentNode.removeChild(el);
    };
  }, [id]);
  return root;
}

/* ---------- Modal ---------- */
function ProjectModal({ project, isOpen, onClose }) {
  const modalRoot = useModalRoot();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted || !modalRoot || !isOpen || !project) return null;

  const modal = (
    <>
      {/* Modal container uses flex centering + dvh for stable layout */}
      <div className="fixed inset-0 z-[2147483646] flex items-center justify-center">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-[#192234]/80 backdrop-blur-sm"
          onClick={onClose}
        />
        {/* Card */}
        <div
          className="relative z-[2147483647]
                     w-[96vw] sm:w-[95vw] md:w-full max-w-6xl
                     h-[90dvh] sm:h-[90dvh] md:h-[90dvh]
                     bg-gradient-to-br from-[#192234] to-[#1a2335]
                     rounded-xl sm:rounded-2xl md:rounded-3xl
                     border border-[#e5dbf5]/20 shadow-2xl shadow-[#e5dbf5]/10 overflow-hidden mx-2 sm:mx-3 md:mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 bg-gradient-to-br from-[#192234] via-[#e5dbf5]/10 to-[#1a2335] border-b border-[#e5dbf5]/20">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-6 md:right-6 text-[#e5dbf5] hover:text-[#e5dbf5]/80
                         focus:outline-none transition-all duration-200 hover:scale-110
                         p-1.5 sm:p-2 md:p-3 rounded-full hover:bg-[#e5dbf5]/10 backdrop-blur-sm"
              aria-label="Close"
            >
              <FaTimes size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>

            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 md:mb-6 bg-[#e5dbf5]/20 text-[#e5dbf5] border border-[#e5dbf5]/30">
                {project.category}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 text-[#e5dbf5] px-2">
                {project.title}
              </h2>
              {project.subtitle && (
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#e5dbf5]/80 max-w-3xl mx-auto leading-relaxed px-2">
                  {project.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Body (scroll area) */}
          <div className="p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 overflow-y-auto h-[calc(80dvh-120px)] sm:h-[calc(88dvh-140px)] md:h-[calc(92dvh-160px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
              {/* Left: details */}
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                {project.description && (
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#e5dbf5] flex items-center">
                      <div className="w-1 h-4 sm:h-6 bg-gradient-to-b from-[#e5dbf5] to-blue-400 rounded-full mr-2 sm:mr-3"></div>
                      About
                    </h3>
                    <p className="text-sm sm:text-base text-[#e5dbf5]/80 leading-relaxed">{project.description}</p>
                  </div>
                )}

                {project.functions?.length > 0 && (
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#e5dbf5] flex items-center">
                      <div className="w-1 h-4 sm:h-6 bg-gradient-to-b from-[#e5dbf5] to-blue-400 rounded-full mr-2 sm:mr-3"></div>
                      Features
                    </h3>
                    <div className="space-y-1.5 sm:space-y-2">
                      {project.functions.map((fn, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#e5dbf5] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <p className="text-xs sm:text-sm text-[#e5dbf5]/80">{fn}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#e5dbf5] flex items-center">
                    <div className="w-1 h-4 sm:h-6 bg-gradient-to-b from-[#e5dbf5] to-blue-400 rounded-full mr-2 sm:mr-3"></div>
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech.name}
                        className="px-2 sm:px-3 py-1 bg-[#e5dbf5]/10 text-[#e5dbf5] rounded-lg border border-[#e5dbf5]/20 text-xs sm:text-sm"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                  {project.github && (
                    <button
                      onClick={() => window.open(project.github, '_blank')}
                      className="inline-flex items-center justify-center bg-[#e5dbf5]/10 hover:bg-[#e5dbf5]/20 text-[#e5dbf5] px-3 sm:px-4 py-2 rounded-lg transition-colors duration-200 border border-[#e5dbf5]/30 hover:border-[#e5dbf5]/50 text-sm sm:text-base"
                    >
                      <FaGithub className="mr-1.5 sm:mr-2" /> Code
                    </button>
                  )}
                  {project.link && (
                    <button
                      onClick={() => window.open(project.link, '_blank')}
                      className="inline-flex items-center justify-center bg-[#e5dbf5] hover:bg-[#e5dbf5]/90 text-[#192234] px-3 sm:px-4 py-2 rounded-lg transition-colors duration-200 text-sm sm:text-base"
                    >
                      <FaExternalLinkAlt className="mr-1.5 sm:mr-2" /> Demo
                    </button>
                  )}
                </div>
              </div>

              {/* Right: media — HIDDEN ON MOBILE */}
              {(project.embedUrl || project.photo) && (
                <div className="hidden sm:flex items-center justify-center">
                  {project.embedUrl ? (
                    <div className="w-full max-w-[15rem] sm:max-w-sm mx-auto">
                      <div className="relative mx-auto w-56 md:w-64 h-96 md:h-[30rem] bg-gray-900 rounded-[2rem] md:rounded-[2.5rem] p-2 shadow-2xl">
                        <div className="w-full h-full bg-gray-800 rounded-[2rem] p-1">
                          <div className="w-full h-full bg-black rounded-[1.75rem] overflow-hidden relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 md:w-20 h-5 md:h-6 bg-gray-900 rounded-b-2xl z-10"></div>
                            <video
                              className="w-full h-full object-cover"
                              autoPlay
                              muted
                              loop
                              playsInline
                              controls
                            >
                              <source src={project.embedUrl.replace('.mov', '.mp4')} type="video/mp4" />
                              <source src={project.embedUrl} type="video/quicktime" />
                              Your browser does not support HTML5 video.
                            </video>
                          </div>
                        </div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 md:w-32 h-1 bg-gray-600 rounded-full"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex justify-center">
                      <img
                        src={project.photo}
                        alt={`${project.title} screenshot`}
                        className="w-full max-w-[18rem] md:max-w-[24rem] h-auto max-h-72 md:max-h-96 object-contain rounded-xl shadow-lg border border-[#e5dbf5]/20"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modal, modalRoot);
}

/* ---------- Card ---------- */
const ProjectCard = ({ project, setSelectedProject }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group cursor-pointer"
      onClick={() => setSelectedProject(project)}
    >
      <div className="bg-gradient-to-br from-[#192234] to-[#1a2335] rounded-2xl p-4 sm:p-6 border border-[#e5dbf5]/20 hover:border-[#e5dbf5]/40 transition-all duration-300 backdrop-blur-sm hover:shadow-2xl hover:shadow-[#e5dbf5]/10">
        <div className="relative mb-4 sm:mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-[#e5dbf5]/5 to-[#e5dbf5]/10">
          {project.embedUrl ? (
            <img
              src={project.previewImage}
              alt={`${project.title} preview`}
              className="w-full h-32 sm:h-40 md:h-48 object-contain group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-[#192234]/20 to-[#1a2335]/20"
            />
          ) : project.photo ? (
            <img
              src={project.photo}
              alt={`${project.title} screenshot`}
              className="w-full h-32 sm:h-40 md:h-48 object-contain group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-[#192234]/20 to-[#1a2335]/20"
            />
          ) : (
            <div className="w-full h-32 sm:h-40 md:h-48 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl text-[#e5dbf5]/40 mb-2">💻</div>
                <p className="text-[#e5dbf5]/40 text-xs sm:text-sm">No preview</p>
              </div>
            </div>
          )}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
            <span className="inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-[#e5dbf5]/20 text-[#e5dbf5] border border-[#e5dbf5]/30">
              {project.category}
            </span>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-[#e5dbf5] group-hover:text-[#e5dbf5]/90 transition-colors duration-200">
            {project.title}
          </h3>

          {project.subtitle && (
            <p className="text-[#e5dbf5]/70 text-xs sm:text-sm leading-relaxed">
              {project.subtitle}
            </p>
          )}

          <div className="flex flex-wrap gap-1 sm:gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech.name}
                className="px-2 py-1 bg-[#e5dbf5]/10 text-[#e5dbf5]/80 text-xs rounded-lg border border-[#e5dbf5]/20"
              >
                {tech.name}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-[#e5dbf5]/10 text-[#e5dbf5]/60 text-xs rounded-lg border border-[#e5dbf5]/20">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------- Page ---------- */
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  

  // Start at top & disable restoration (robust)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Two RAFs ensures post-layout top on iOS
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    });
  }, []);

  // iOS-safe scroll lock for modal
  const scrollYRef = useRef(0);
  useEffect(() => {
    if (!selectedProject) return;

    scrollYRef.current = window.scrollY || window.pageYOffset || 0;
    const body = document.body;

    body.style.position = 'fixed';
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    // Prevent rubber-band scroll chaining while modal is open
    body.style.overscrollBehavior = 'contain';

    return () => {
      const y = scrollYRef.current;
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
      body.style.overscrollBehavior = '';
      window.scrollTo(0, y);
    };
  }, [selectedProject]);

  // Groups
  const clientWork = useMemo(() => projects.filter(p => p.category === 'Full-Stack'), []);
  const utampaWork = useMemo(() => projects.filter(p => p.title === 'University of Tampa App' || p.title === 'A Way Home'), []);
  const personalProjects = useMemo(() => projects.filter(p => p.category === 'Personal'), []);
  const schoolProjects = useMemo(() => projects.filter(p => p.category === 'School'), []);
  const educationalGames = useMemo(() => projects.filter(p => p.category === 'Educational Game'), []);
  const mobileApps = useMemo(() => projects.filter(p => p.category === 'Mobile App'), []);
  const threeDProjects = useMemo(() => projects.filter(p => p.category === '3D Development'), []);

  return (
    <section id="projects" className="py-4 sm:py-16 md:py-20" style={{ overflowAnchor: 'none' }}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#e5dbf5] mb-4 sm:mb-6">My Projects</h2>
          <p className="text-base sm:text-lg md:text-xl text-[#e5dbf5]/70 max-w-3xl mx-auto leading-relaxed px-4">
            A collection of my work across different domains, from client projects to personal experiments
          </p>
        </div>

        {/* Client Work */}
        {clientWork.length > 0 && (
          <div className="mb-20">
            <div className="mb-8 sm:mb-12 flex justify-center">
              <div className="w-11/12 sm:w-4/5 max-w-4xl inline-flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 bg-gradient-to-r from-[#e5dbf5]/10 to-[#e5dbf5]/5 rounded-2xl border border-[#e5dbf5]/20 backdrop-blur-sm">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#e5dbf5] to-[#e5dbf5]/80 rounded-xl flex items-center justify-center">
                  <FaBriefcase className="text-[#192234] text-lg sm:text-xl" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#e5dbf5]">Client Work</h3>
                  <p className="text-[#e5dbf5]/70 text-xs sm:text-sm">Professional websites and applications</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#192234]/50 to-[#1a2335]/50 rounded-3xl p-4 sm:p-6 md:p-8 border border-[#e5dbf5]/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {clientWork.map((project) => (
                  <ProjectCard key={project.id} project={project} setSelectedProject={setSelectedProject} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* UTampa */}
        {utampaWork.length > 0 && (
          <div className="mb-16 sm:mb-20">
            <div className="mb-8 sm:mb-12 flex justify-center">
              <div className="w-11/12 sm:w-4/5 max-w-4xl inline-flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 bg-gradient-to-r from-[#e5dbf5]/10 to-[#e5dbf5]/5 rounded-2xl border border-[#e5dbf5]/20 backdrop-blur-sm">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#e5dbf5] to-[#e5dbf5]/80 rounded-xl flex items-center justify-center">
                  <FaGraduationCap className="text-[#192234] text-lg sm:text-xl" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#e5dbf5]">University of Tampa</h3>
                  <p className="text-[#e5dbf5]/70 text-xs sm:text-sm">Academic and research projects</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1a2335]/50 to-[#192234]/50 rounded-3xl p-4 sm:p-6 md:p-8 border border-[#e5dbf5]/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {utampaWork.map((project) => (
                  <ProjectCard key={project.id} project={project} setSelectedProject={setSelectedProject} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Personal */}
        {personalProjects.length > 0 && (
          <div className="mb-16 sm:mb-20">
            <div className="mb-8 sm:mb-12 flex justify-center">
              <div className="w-11/12 sm:w-4/5 max-w-4xl inline-flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 bg-gradient-to-r from-[#e5dbf5]/10 to-[#e5dbf5]/5 rounded-2xl border border-[#e5dbf5]/20 backdrop-blur-sm">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#e5dbf5] to-[#e5dbf5]/80 rounded-xl flex items-center justify-center">
                  <FaCode className="text-[#192234] text-lg sm:text-xl" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#e5dbf5]">Personal Projects</h3>
                  <p className="text-[#e5dbf5]/70 text-xs sm:text-sm">Creative coding experiments</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#192234]/50 to-[#1a2335]/50 rounded-3xl p-4 sm:p-6 md:p-8 border border-[#e5dbf5]/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {personalProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} setSelectedProject={setSelectedProject} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Educational Games */}
        {educationalGames.length > 0 && (
          <div className="mb-16 sm:mb-20">
            <div className="mb-8 sm:mb-12 flex justify-center">
              <div className="w-11/12 sm:w-4/5 max-w-4xl inline-flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 bg-gradient-to-r from-[#e5dbf5]/10 to-[#e5dbf5]/5 rounded-2xl border border-[#e5dbf5]/20 backdrop-blur-sm">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#e5dbf5] to-[#e5dbf5]/80 rounded-xl flex items-center justify-center">
                  <FaGamepad className="text-[#192234] text-lg sm:text-xl" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#e5dbf5]">Educational Games</h3>
                  <p className="text-[#e5dbf5]/70 text-xs sm:text-sm">Learning through play</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1a2335]/50 to-[#192234]/50 rounded-3xl p-4 sm:p-6 md:p-8 border border-[#e5dbf5]/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {educationalGames.map((project) => (
                  <ProjectCard key={project.id} project={project} setSelectedProject={setSelectedProject} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* School */}
        {schoolProjects.length > 0 && (
          <div className="mb-16 sm:mb-20">
            <div className="mb-8 sm:mb-12 flex justify-center">
              <div className="w-11/12 sm:w-4/5 max-w-4xl inline-flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 bg-gradient-to-r from-[#e5dbf5]/10 to-[#e5dbf5]/5 rounded-2xl border border-[#e5dbf5]/20 backdrop-blur-sm">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#e5dbf5] to-[#e5dbf5]/80 rounded-xl flex items-center justify-center">
                  <FaBook className="text-[#192234] text-lg sm:text-xl" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#e5dbf5]">School Projects</h3>
                  <p className="text-[#e5dbf5]/70 text-xs sm:text-sm">Class assignments and coursework</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#192234]/50 to-[#1a2335]/50 rounded-3xl p-4 sm:p-6 md:p-8 border border-[#e5dbf5]/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {schoolProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} setSelectedProject={setSelectedProject} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 z-40 bg-[#e5dbf5]/20 hover:bg-[#e5dbf5]/30 text-[#e5dbf5] p-3 rounded-full border border-[#e5dbf5]/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg"
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </section>
  );
}
