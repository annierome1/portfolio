// pages/Projects.js
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaGraduationCap, FaGamepad, FaBriefcase, FaCode, FaBook, FaMobileAlt } from 'react-icons/fa';
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
                     max-h-[90dvh]
                     bg-gradient-to-br from-[#192234] to-[#1a2335]
                     rounded-xl sm:rounded-2xl md:rounded-3xl
                     border border-[#e5dbf5]/20 shadow-2xl shadow-[#e5dbf5]/10 overflow-hidden mx-2 sm:mx-3 md:mx-4
                     flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative flex-shrink-0 p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 bg-gradient-to-br from-[#192234] via-[#e5dbf5]/10 to-[#1a2335] border-b border-[#e5dbf5]/20">
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
          <div className="flex-1 min-h-0 p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 overflow-y-auto">
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

/* ---------- Minimal Kanban Card ---------- */
const KanbanCard = ({ project, setSelectedProject }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="cursor-pointer mb-2"
      onClick={() => setSelectedProject(project)}
    >
      <div className="bg-[#1a2335]/50 hover:bg-[#1a2335]/80 rounded-md p-3 border border-[#e5dbf5]/5 hover:border-[#e5dbf5]/20 transition-all duration-150">
        {/* Title */}
        <h3 className="text-sm font-medium text-[#e5dbf5] mb-1.5 leading-snug">
          {project.title}
        </h3>

        {/* Tech Stack - Minimal Pills */}
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 2).map((tech) => (
            <span
              key={tech.name}
              className="text-[9px] text-[#e5dbf5]/50"
            >
              {tech.name}
            </span>
          ))}
          {project.technologies.length > 2 && (
            <span className="text-[9px] text-[#e5dbf5]/30">
              +{project.technologies.length - 2}
            </span>
          )}
        </div>

        {/* Bottom Indicators */}
        <div className="flex items-center gap-1.5 mt-2">
          {project.github && (
            <FaGithub className="w-2.5 h-2.5 text-[#e5dbf5]/25" />
          )}
          {project.link && (
            <FaExternalLinkAlt className="w-2.5 h-2.5 text-[#e5dbf5]/25" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ---------- Kanban Column ---------- */
const KanbanColumn = ({ title, icon: Icon, count, projects, setSelectedProject, color = "#e5dbf5" }) => {
  return (
    <div className="flex-shrink-0 w-full sm:w-72 bg-[#192234]/20 rounded-lg p-3 border border-[#e5dbf5]/5">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#e5dbf5]/5">
        <div className="flex items-center gap-2">
          <Icon className="text-[#e5dbf5]/60 text-xs" />
          <h3 className="font-medium text-[#e5dbf5]/80 text-xs uppercase tracking-wide">{title}</h3>
        </div>
        <span className="text-[10px] text-[#e5dbf5]/40">
          {count}
        </span>
      </div>

      {/* Cards Container */}
      <div className="space-y-0 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#e5dbf5]/10 scrollbar-track-transparent">
        {projects.map((project) => (
          <KanbanCard key={project.id || project.title} project={project} setSelectedProject={setSelectedProject} />
        ))}
      </div>
    </div>
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

  // Kanban columns data
  const kanbanColumns = useMemo(() => {
    const columns = [
      {
        title: 'Client Work',
        icon: FaBriefcase,
        projects: projects.filter(p => p.category === 'Full-Stack')
      },
      {
        title: 'Personal',
        icon: FaCode,
        projects: projects.filter(p => p.category === 'Personal')
      },
      {
        title: 'University Work',
        icon: FaGraduationCap,
        projects: projects.filter(p => p.title === 'University of Tampa App' || p.title === 'A Way Home')
      },
      {
        title: 'Educational Games',
        icon: FaGamepad,
        projects: projects.filter(p => p.category === 'Educational Game')
      },
      {
        title: 'Mobile Apps',
        icon: FaMobileAlt,
        projects: projects.filter(p => p.category === 'Mobile App' && p.title !== 'University of Tampa App')
      },
      {
        title: 'School',
        icon: FaBook,
        projects: projects.filter(p => p.category === 'School')
      },
      {
        title: '3D Development',
        icon: FaCode,
        projects: projects.filter(p => p.category === '3D Development' && p.title !== 'A Way Home')
      }
    ];
    
    // Filter out empty columns
    return columns.filter(col => col.projects.length > 0);
  }, []);

  return (
    <section id="projects" className="py-4 sm:py-16 md:py-20" style={{ overflowAnchor: 'none' }}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#e5dbf5] mb-4 sm:mb-6">My Projects</h2>
          <p className="text-base sm:text-lg md:text-xl text-[#e5dbf5]/70 max-w-3xl mx-auto leading-relaxed px-4">
            A collection of my work organized Kanban-style
          </p>
        </div>

        {/* Kanban Board */}
        <div className="relative">
          {/* Horizontal scroll container on desktop, vertical stack on mobile */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 overflow-x-auto pb-4 sm:pb-6 scrollbar-thin scrollbar-thumb-[#e5dbf5]/20 scrollbar-track-transparent">
            {kanbanColumns.map((column, idx) => (
              <KanbanColumn
                key={idx}
                title={column.title}
                icon={column.icon}
                count={column.projects.length}
                projects={column.projects}
                setSelectedProject={setSelectedProject}
              />
            ))}
          </div>

          {/* Scroll hint for desktop */}
          <div className="hidden sm:block text-center mt-4 text-[#e5dbf5]/40 text-xs">
            ← Scroll horizontally to see all columns →
          </div>
        </div>
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
