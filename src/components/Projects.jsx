// pages/Projects.js
import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaBuilding, FaGraduationCap, FaPuzzlePiece, FaUser } from 'react-icons/fa';
import { projects } from '../data/data';



/* ------------------------------------------------------------------ */
/* Portal root helper: creates <div id="modal-root" /> in <body> if needed */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/* Project Modal Component — viewport-centered + hard scroll lock      */
/* ------------------------------------------------------------------ */
function ProjectModal({ project, isOpen, onClose }) {
  const modalRoot = useModalRoot();
  const [mounted, setMounted] = useState(false);

  // Ensure client render before using portal
  useEffect(() => setMounted(true), []);

  if (!mounted || !modalRoot || !isOpen || !project) return null;

  const modal = (
    <>
      {/* Overlay (max z-index to beat any app layers) */}
      <div
        className="fixed inset-0 z-[2147483646] bg-black/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Centered panel anchored to the VIEWPORT (not page) */}
      <div
        className="fixed z-[2147483647] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu
                   w-[min(90vw,80rem)] max-h-[90dvh] overflow-y-auto
                   bg-gray-900/95 backdrop-blur-xl text-[#e6dcf7]
                   rounded-3xl shadow-2xl border border-[#e6dcf7]/20"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with modern gradient background */}
        <div className="relative p-8 bg-gradient-to-br from-gray-900 via-[#e6dcf7]/5 to-gray-800 border-b border-[#e6dcf7]/10">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-[#e6dcf7] hover:text-[#f0e9ff]
                       focus:outline-none transition-all duration-200 hover:scale-110
                       p-3 rounded-full hover:bg-[#e6dcf7]/10 backdrop-blur-sm"
            aria-label="Close"
          >
            <FaTimes size={20} />
          </button>

          {/* Project Title and Category */}
          <div className="text-center max-w-4xl mx-auto">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              project.category === 'Full-Stack' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
              project.category === 'Personal' ? 'bg-[#e6dcf7]/20 text-[#e6dcf7] border border-[#e6dcf7]/30' :
              project.category === 'School' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
              project.category === 'Mobile App' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
              project.category === 'Educational Game' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' :
              'bg-gray-500/20 text-gray-300 border border-gray-500/30'
            }`}>
              {project.category}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#e6dcf7] to-blue-300 bg-clip-text text-transparent">
              {project.title}
            </h2>
            {project.subtitle && (
              <p className="text-xl text-[#e6dcf7]/80 max-w-3xl mx-auto leading-relaxed">
                {project.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Content with modern layout */}
        <div className="p-8">
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Project Details */}
            <div className="space-y-6">
              {/* Description */}
              {project.description && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-[#e6dcf7] flex items-center">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#e6dcf7] to-blue-400 rounded-full mr-3"></div>
                    About
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{project.description}</p>
                </div>
              )}

              {/* Functions/Features */}
              {project.functions && project.functions.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-[#e6dcf7] flex items-center">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#e6dcf7] to-blue-400 rounded-full mr-3"></div>
                    Features
                  </h3>
                  <div className="space-y-2">
                    {project.functions.map((fn, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#e6dcf7] rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm">{fn}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-[#e6dcf7] flex items-center">
                  <div className="w-1 h-6 bg-gradient-to-b from-[#e6dcf7] to-blue-400 rounded-full mr-3"></div>
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech.name}
                      className="px-3 py-1 bg-[#e6dcf7]/10 text-[#e6dcf7] rounded-lg border border-[#e6dcf7]/20 text-sm"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                {project.github && (
                  <button
                    onClick={() => window.open(project.github, '_blank')}
                    className="inline-flex items-center justify-center bg-gray-800/80 hover:bg-gray-700/80 text-white px-4 py-2 rounded-lg transition-colors duration-200 border border-gray-600/50"
                  >
                    <FaGithub className="mr-2" /> Code
                  </button>
                )}
                {project.link && (
                  <button
                    onClick={() => window.open(project.link, '_blank')}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-[#e6dcf7] to-blue-600 hover:from-[#f0e9ff] hover:to-blue-700 text-gray-900 px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    <FaExternalLinkAlt className="mr-2" /> Demo
                  </button>
                )}
              </div>
            </div>

            {/* Right: Media Display or Centered Content */}
            <div className="flex items-center justify-center">
              {project.embedUrl ? (
                /* Video Content */
                <div className="w-full max-w-md">
                  <video
                    className="w-full h-auto rounded-xl shadow-lg border border-[#e6dcf7]/20"
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
              ) : project.photo ? (
                /* Image Content */
                <div className="w-full max-w-md">
                  <img
                    src={project.photo}
                    alt={`${project.title} screenshot`}
                    className="w-full h-auto rounded-xl shadow-lg border border-[#e6dcf7]/20"
                  />
                </div>
              ) : (
                /* No Media - Centered Project Info */
                <div className="w-full text-center">
                  <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/30 backdrop-blur-sm">
                    <div className="text-6xl mb-4">💻</div>
                    <h3 className="text-lg font-semibold text-[#e6dcf7] mb-3">Project Details</h3>
                    
                    {/* Show category if available */}
                    {project.category && (
                      <div className="mb-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          project.category === 'Full-Stack' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                          project.category === 'Personal' ? 'bg-[#e6dcf7]/20 text-[#e6dcf7] border border-[#e6dcf7]/30' :
                          project.category === 'School' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                          project.category === 'Mobile App' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                          project.category === 'Educational Game' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' :
                          'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                        }`}>
                          {project.category}
                        </span>
                      </div>
                    )}

                    {/* Show subtitle if available */}
                    {project.subtitle && (
                      <p className="text-gray-300 text-sm mb-4">{project.subtitle}</p>
                    )}

                    {/* Show technology count */}
                    <div className="text-gray-400 text-xs">
                      {project.technologies.length} technologies used
                      {project.functions && project.functions.length > 0 && (
                        <span> • {project.functions.length} features</span>
                      )}
                    </div>
                  </div>
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

// Project Card Component
function ProjectCard({ project, onClick }) {
  return (
    <div
      className="group p-6 bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg cursor-pointer
                 hover:shadow-2xl hover:bg-gray-700/80 hover:scale-[1.02] border border-gray-700/50
                 transition-all duration-300 transform"
      onClick={() => onClick(project)}
    >
      {/* Category Badge */}
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
          project.category === 'Full-Stack' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
          project.category === 'Personal' ? 'bg-[#e6dcf7]/20 text-[#e6dcf7] border border-[#e6dcf7]/30' :
          project.category === 'School' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
          project.category === 'Mobile App' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
          project.category === 'Educational Game' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' :
          'bg-gray-500/20 text-gray-300 border border-gray-500/30'
        }`}>
          {project.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-3 text-[#e6dcf7] group-hover:text-[#f0e9ff] transition-colors duration-200">
        {project.title}
      </h3>

      {/* Subtitle/Description */}
      <p className="text-sm text-gray-300 mb-4 leading-relaxed">
        {project.subtitle || `${project.description.substring(0, 100)}...`}
      </p>

      {/* Technologies Preview */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.slice(0, 3).map((tech) => (
          <span key={tech.name} className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded-md text-xs font-medium">
            {tech.name}
          </span>
        ))}
        {project.technologies.length > 3 && (
          <span className="bg-gray-700/50 text-gray-400 px-2 py-1 rounded-md text-xs font-medium">
            +{project.technologies.length - 3} more
          </span>
        )}
      </div>

      {/* Links Preview */}
      <div className="flex gap-2 text-sm text-gray-400">
        {project.github && <FaGithub className="opacity-60" />}
        {project.link && <FaExternalLinkAlt className="opacity-60" />}
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpen = (project) => setSelectedProject(project);
  const handleClose = () => setSelectedProject(null);

  // HARD scroll lock while modal is open (prevents page from influencing centering)
  useEffect(() => {
    if (!selectedProject) return;
    const y = window.scrollY || window.pageYOffset || 0;

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyWidth = body.style.width;

    html.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${y}px`;
    body.style.width = '100%';

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.position = prevBodyPosition;
      const top = body.style.top;
      body.style.top = prevBodyTop;
      body.style.width = prevBodyWidth;

      // restore scroll to where the user was
      const scrollTo = top ? -parseInt(top, 10) : 0;
      window.scrollTo(0, scrollTo);
    };
  }, [selectedProject]);

  // Organize projects by category
  const clientWork = useMemo(() => projects.filter(p => p.category === 'Full-Stack'), []);
  const utampaWork = useMemo(() => projects.filter(p => p.title === 'University of Tampa App' || p.title === 'A Way Home'), []);
  const personalProjects = useMemo(() => projects.filter(p => p.category === 'Personal'), []);
  const schoolProjects = useMemo(() => projects.filter(p => p.category === 'School'), []);
  const educationalGames = useMemo(() => projects.filter(p => p.category === 'Educational Game'), []);
  const mobileApps = useMemo(() => projects.filter(p => p.category === 'Mobile App'), []);

  return (
    <section id="projects" className="text-[#e6dcf7] p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#e6dcf7] to-[#e6dcf7] bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A showcase of my work across different domains, from client websites to academic projects
          </p>
        </div>

        {/* Client Work / Websites Section */}
        <div className="mb-20">
          <div className="relative mb-12 p-8 rounded-3xl overflow-hidden group">
            {/* Background with geometric pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-[#e6dcf7]/5 to-blue-600/10 opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-4 left-4 w-2 h-2 bg-[#e6dcf7] rounded-full opacity-20"></div>
              <div className="absolute top-16 left-16 w-2 h-2 bg-[#e6dcf7] rounded-full opacity-20"></div>
              <div className="absolute top-28 left-28 w-2 h-2 bg-[#e6dcf7] rounded-full opacity-20"></div>
              <div className="absolute top-40 left-40 w-2 h-2 bg-[#e6dcf7] rounded-full opacity-20"></div>
              <div className="absolute top-8 right-8 w-2 h-2 bg-[#e6dcf7] rounded-full opacity-20"></div>
              <div className="absolute top-20 right-20 w-2 h-2 bg-[#e6dcf7] rounded-full opacity-20"></div>
              <div className="absolute top-32 right-32 w-2 h-2 bg-[#e6dcf7] rounded-full opacity-20"></div>
            </div>
            
            {/* Content with left-aligned layout */}
            <div className="relative flex items-center space-x-8">
              <div className="flex-shrink-0">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/30 to-[#e6dcf7]/20 backdrop-blur-sm border border-blue-500/30 group-hover:scale-110 transition-transform duration-500">
                  <FaBuilding className="text-6xl text-blue-400" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-[#e6dcf7] bg-clip-text text-transparent">
                  Client Work & Websites
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                  Professional websites and applications built for clients with modern technologies and CMS integration
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientWork.map((project) => (
              <ProjectCard key={project.title} project={project} onClick={handleOpen} />
            ))}
          </div>
        </div>

        {/* University of Tampa Work Section */}
        <div className="mb-20">
          <div className="relative mb-12 p-8 rounded-3xl overflow-hidden group">
            {/* Background with academic pattern */}
            <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 via-[#e6dcf7]/5 to-blue-500/10 opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-2xl"></div>
            
            {/* Content with centered layout and floating elements */}
            <div className="relative text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-green-500/30 to-[#e6dcf7]/20 backdrop-blur-sm border border-green-500/30 group-hover:scale-110 transition-transform duration-500">
                    <FaGraduationCap className="text-5xl text-green-400" />
                  </div>
                  {/* Floating accent dots */}
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-[#e6dcf7] rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-green-400 rounded-full animate-pulse delay-1000"></div>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-[#e6dcf7] to-blue-400 bg-clip-text text-transparent">
                University of Tampa Projects
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Academic and research projects developed during my time at UT, including mobile apps and VR experiences
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {utampaWork.map((project) => (
              <ProjectCard key={project.title} project={project} onClick={handleOpen} />
            ))}
          </div>
        </div>

        {/* Personal Projects Section */}
        <div className="mb-20">
          <div className="relative mb-12 p-8 rounded-3xl overflow-hidden group">
            {/* Background with creative pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#e6dcf7]/15 via-pink-500/10 to-[#e6dcf7]/15 opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="absolute inset-0 opacity-40">
              <div className="absolute top-6 left-6 w-3 h-3 bg-[#e6dcf7] transform rotate-45 opacity-20"></div>
              <div className="absolute top-20 left-20 w-3 h-3 bg-[#e6dcf7] transform rotate-45 opacity-20"></div>
              <div className="absolute top-34 left-34 w-3 h-3 bg-[#e6dcf7] transform rotate-45 opacity-20"></div>
              <div className="absolute top-8 right-8 w-3 h-3 bg-[#e6dcf7] transform rotate-45 opacity-20"></div>
              <div className="absolute top-22 right-22 w-3 h-3 bg-[#e6dcf7] transform rotate-45 opacity-20"></div>
            </div>
            
            {/* Content with diagonal layout */}
            <div className="relative">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#e6dcf7]/40 to-pink-500/20 backdrop-blur-sm border border-[#e6dcf7]/30 group-hover:scale-110 transition-transform duration-500">
                    <FaUser className="text-6xl text-[#e6dcf7]" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#e6dcf7] to-pink-400 bg-clip-text text-transparent">
                    Personal Projects
                  </h2>
                  <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                    Self-initiated projects exploring new technologies and solving personal challenges
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalProjects.map((project) => (
              <ProjectCard key={project.title} project={project} onClick={handleOpen} />
            ))}
          </div>
        </div>

        {/* Educational Games Section */}
        <div className="mb-20">
          <div className="relative mb-12 p-8 rounded-3xl overflow-hidden group">
            {/* Background with puzzle pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 via-[#e6dcf7]/10 to-pink-500/10 opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-6 left-6 w-6 h-6 bg-[#e6dcf7] rounded-md opacity-20"></div>
              <div className="absolute top-6 left-20 w-6 h-6 bg-[#e6dcf7] rounded-md opacity-20"></div>
              <div className="absolute top-6 left-34 w-6 h-6 bg-[#e6dcf7] rounded-md opacity-20"></div>
              <div className="absolute top-20 left-6 w-6 h-6 bg-[#e6dcf7] rounded-md opacity-20"></div>
              <div className="absolute top-20 left-20 w-6 h-6 bg-[#e6dcf7] rounded-md opacity-20"></div>
              <div className="absolute top-20 left-34 w-6 h-6 bg-[#e6dcf7] rounded-md opacity-20"></div>
              <div className="absolute top-34 left-6 w-6 h-6 bg-[#e6dcf7] rounded-md opacity-20"></div>
              <div className="absolute top-34 left-20 w-6 h-6 bg-[#e6dcf7] rounded-md opacity-20"></div>
              <div className="absolute top-34 left-34 w-6 h-6 bg-[#e6dcf7] rounded-md opacity-20"></div>
            </div>
            
            {/* Content with grid layout */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="flex justify-center">
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-500/30 to-[#e6dcf7]/20 backdrop-blur-sm border border-pink-500/30 group-hover:scale-110 transition-transform duration-500">
                    <FaPuzzlePiece className="text-5xl text-pink-400" />
                  </div>
                </div>
                <div className="md:col-span-2 text-center md:text-left">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-[#e6dcf7] to-gray-300 bg-clip-text text-transparent">
                    Educational Games & Tools
                  </h2>
                  <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                    Interactive learning experiences and educational applications
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationalGames.map((project) => (
              <ProjectCard key={project.title} project={project} onClick={handleOpen} />
            ))}
          </div>
        </div>

        {/* School Projects Section */}
        <div className="mb-20">
          <div className="relative mb-12 p-8 rounded-3xl overflow-hidden group">
            {/* Background with academic pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-[#e6dcf7]/5 to-blue-500/10 opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-green-400/20 to-transparent rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full"></div>
            
            {/* Content with stacked layout */}
            <div className="relative text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-green-500/30 to-[#e6dcf7]/20 backdrop-blur-sm border border-green-500/30 group-hover:scale-110 transition-transform duration-500">
                    <FaGraduationCap className="text-5xl text-green-400" />
                  </div>
                  {/* Stacked accent elements */}
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#e6dcf7] rounded-full border-2 border-green-400"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-400 rounded-full border border-[#e6dcf7]"></div>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-[#e6dcf7] bg-clip-text text-transparent">
                Academic Coursework
              </h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Projects completed as part of university coursework in computer science
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schoolProjects.map((project) => (
              <ProjectCard key={project.title} project={project} onClick={handleOpen} />
            ))}
          </div>
        </div>



       






  


      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleClose}
      />
    </section>
  );
}
