// pages/Projects.js
import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaBuilding, FaGraduationCap, FaPuzzlePiece, FaUser, FaBriefcase, FaCode, FaGamepad, FaMobile, FaCube, FaBook } from 'react-icons/fa';
import { projects } from '../data/data';
import { motion } from 'framer-motion';

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

function ProjectModal({ project, isOpen, onClose }) {
  const modalRoot = useModalRoot();
  const [mounted, setMounted] = useState(false);

  // Ensure client render before using portal
  useEffect(() => setMounted(true), []);

  if (!mounted || !modalRoot || !isOpen || !project) return null;

  const modal = (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 z-[2147483646] bg-[#192234]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div
        className="fixed z-[2147483647] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu w-full max-w-6xl max-h-[95vh] bg-gradient-to-br from-[#192234] to-[#1a2335] rounded-3xl border border-[#e5dbf5]/20 shadow-2xl shadow-[#e5dbf5]/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative p-8 bg-gradient-to-br from-[#192234] via-[#e5dbf5]/10 to-[#1a2335] border-b border-[#e5dbf5]/20">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-[#e5dbf5] hover:text-[#e5dbf5]/80
                       focus:outline-none transition-all duration-200 hover:scale-110
                       p-3 rounded-full hover:bg-[#e5dbf5]/10 backdrop-blur-sm"
            aria-label="Close"
          >
            <FaTimes size={25} />
          </button>

          {/* Project Title and Category */}
          <div className="text-center max-w-4xl mx-auto">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              project.category === 'Full-Stack' ? 'bg-[#e5dbf5]/20 text-[#e5dbf5] border border-[#e5dbf5]/30' :
              project.category === 'Personal' ? 'bg-[#e5dbf5]/20 text-[#e5dbf5] border border-[#e5dbf5]/30' :
              project.category === 'School' ? 'bg-[#e5dbf5]/20 text-[#e5dbf5] border border-[#e5dbf5]/30' :
              project.category === 'Mobile App' ? 'bg-[#e5dbf5]/20 text-[#e5dbf5] border border-[#e5dbf5]/30' :
              project.category === 'Educational Game' ? 'bg-[#e5dbf5]/20 text-[#e5dbf5] border border-[#e5dbf5]/30' :
              'bg-[#e5dbf5]/20 text-[#e5dbf5] border border-[#e5dbf5]/30'
            }`}>
              {project.category}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#e5dbf5]">
              {project.title}
            </h2>
            {project.subtitle && (
              <p className="text-xl text-[#e5dbf5]/80 max-w-3xl mx-auto leading-relaxed">
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
                  <h3 className="text-xl font-semibold text-[#e5dbf5] flex items-center">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#e5dbf5] to-blue-400 rounded-full mr-3"></div>
                    About
                  </h3>
                  <p className="text-[#e5dbf5]/80 leading-relaxed">{project.description}</p>
                </div>
              )}

              {/* Functions/Features */}
              {project.functions && project.functions.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-[#e5dbf5] flex items-center">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#e5dbf5] to-blue-400 rounded-full mr-3"></div>
                    Features
                  </h3>
                  <div className="space-y-2">
                    {project.functions.map((fn, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-[#e5dbf5] rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-[#e5dbf5]/80 text-sm">{fn}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-[#e5dbf5] flex items-center">
                  <div className="w-1 h-6 bg-gradient-to-b from-[#e5dbf5] to-blue-400 rounded-full mr-3"></div>
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech.name}
                      className="px-3 py-1 bg-[#e5dbf5]/10 text-[#e5dbf5] rounded-lg border border-[#e5dbf5]/20 text-sm"
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
                    className="inline-flex items-center justify-center bg-[#e5dbf5]/10 hover:bg-[#e5dbf5]/20 text-[#e5dbf5] px-4 py-2 rounded-lg transition-colors duration-200 border border-[#e5dbf5]/30 hover:border-[#e5dbf5]/50"
                  >
                    <FaGithub className="mr-2" /> Code
                  </button>
                )}
                {project.link && (
                  <button
                    onClick={() => window.open(project.link, '_blank')}
                    className="inline-flex items-center justify-center bg-[#e5dbf5] hover:bg-[#e5dbf5]/90 text-[#192234] px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    <FaExternalLinkAlt className="mr-2" /> Demo
                  </button>
                )}
              </div>
            </div>

            {/* Right: Media Display Only */}
            {(project.embedUrl || project.photo) && (
              <div className="flex items-center justify-center">
                {project.embedUrl ? (
                  /* Video Content with iPhone Frame */
                  <div className="w-full max-w-sm mx-auto">
                    {/* iPhone Frame */}
                    <div className="relative mx-auto w-64 h-[32rem] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                      {/* Screen Bezel */}
                      <div className="w-full h-full bg-gray-800 rounded-[2.5rem] p-1">
                        {/* Screen */}
                        <div className="w-full h-full bg-black rounded-[2.25rem] overflow-hidden relative">
                          {/* Notch */}
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-900 rounded-b-2xl z-10"></div>
                          
                          {/* Video Content */}
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
                      
                      {/* Home Indicator */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full"></div>
                    </div>
                  </div>
                ) : (
                  /* Image Content */
                  <div className="w-full max-w-lg">
                    <img
                      src={project.photo}
                      alt={`${project.title} screenshot`}
                      className="w-full h-auto max-h-96 rounded-xl shadow-lg border border-[#e5dbf5]/20"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modal, modalRoot);
}

// Project Card Component
const ProjectCard = ({ project, setSelectedProject }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group cursor-pointer"
      onClick={() => setSelectedProject(project)}
    >
      <div className="bg-gradient-to-br from-[#192234] to-[#1a2335] rounded-2xl p-6 border border-[#e5dbf5]/20 hover:border-[#e5dbf5]/40 transition-all duration-300 backdrop-blur-sm hover:shadow-2xl hover:shadow-[#e5dbf5]/10">
        {/* Project Image/Video Preview */}
        <div className="relative mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-[#e5dbf5]/5 to-[#e5dbf5]/10">
          {project.embedUrl ? (
            <img
              src={project.previewImage}
              alt={`${project.title} preview`}
              className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-[#192234]/20 to-[#1a2335]/20"
            />
          ) : project.photo ? (
            <img
              src={project.photo}
              alt={`${project.title} screenshot`}
              className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-[#192234]/20 to-[#1a2335]/20"
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl text-[#e5dbf5]/40 mb-2">💻</div>
                <p className="text-[#e5dbf5]/40 text-sm">No preview</p>
              </div>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              project.category === 'Full-Stack' ? 'bg-[#e5dbf5]/20 text-[#e5dbf5] border border-[#e5dbf5]/30' :
              project.category === 'Personal' ? 'bg-[#e5dbf5]/20 text-[#e5dbf5] border border-[#e5dbf5]/30' :
              project.category === 'School' ? 'bg-[#e5dbf5]/20 text-[#e5dbf5] border border-[#e5dbf5]/30' :
              project.category === 'Mobile App' ? 'bg-[#e5dbf5]/20 text-[#e5dbf5] border border-[#e5dbf5]/30' :
              project.category === 'Educational Game' ? 'bg-[#e5dbf5]/20 text-[#e5dbf5] border border-[#e5dbf5]/30' :
              'bg-[#e5dbf5]/20 text-[#e5dbf5] border border-[#e5dbf5]/30'
            }`}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Project Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#e5dbf5] group-hover:text-[#e5dbf5]/90 transition-colors duration-200">
            {project.title}
          </h3>
          
          {project.subtitle && (
            <p className="text-[#e5dbf5]/70 text-sm leading-relaxed">
              {project.subtitle}
            </p>
          )}

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
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
  const threeDProjects = useMemo(() => projects.filter(p => p.category === '3D Development'), []);

  return (
    <section id="projects" className="py-20  min-h-screen">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#e5dbf5] mb-6">
            My Projects
          </h2>
          <p className="text-xl text-[#e5dbf5]/70 max-w-3xl mx-auto leading-relaxed">
            A collection of my work across different domains, from client projects to personal experiments
          </p>
        </div>

        {/* Client Work Section */}
        {clientWork.length > 0 && (
          <div className="mb-20">
            <div className="mb-12 flex justify-center">
              <div className="w-4/5 max-w-4xl inline-flex items-center space-x-4 p-6 bg-gradient-to-r from-[#e5dbf5]/10 to-[#e5dbf5]/5 rounded-2xl border border-[#e5dbf5]/20 backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-to-br from-[#e5dbf5] to-[#e5dbf5]/80 rounded-xl flex items-center justify-center">
                  <FaBriefcase className="text-[#192234] text-xl" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-[#e5dbf5]">Client Work</h3>
                  <p className="text-[#e5dbf5]/70 text-sm">Professional websites and applications</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#192234]/50 to-[#1a2335]/50 rounded-3xl p-8 border border-[#e5dbf5]/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {clientWork.map((project) => (
                  <ProjectCard key={project.id} project={project} setSelectedProject={setSelectedProject} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* University of Tampa Section */}
        {utampaWork.length > 0 && (
          <div className="mb-20">
            <div className="mb-12 flex justify-center">
              <div className="w-4/5 max-w-4xl inline-flex items-center space-x-4 p-6 bg-gradient-to-r from-[#e5dbf5]/10 to-[#e5dbf5]/5 rounded-2xl border border-[#e5dbf5]/20 backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-to-br from-[#e5dbf5] to-[#e5dbf5]/80 rounded-xl flex items-center justify-center">
                  <FaGraduationCap className="text-[#192234] text-xl" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-[#e5dbf5]">University of Tampa</h3>
                  <p className="text-[#e5dbf5]/70 text-sm">Academic and research projects</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1a2335]/50 to-[#192234]/50 rounded-3xl p-8 border border-[#e5dbf5]/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {utampaWork.map((project) => (
                  <ProjectCard key={project.id} project={project} setSelectedProject={setSelectedProject} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Personal Projects Section */}
        {personalProjects.length > 0 && (
          <div className="mb-20">
            <div className="mb-12 flex justify-center">
              <div className="w-4/5 max-w-4xl inline-flex items-center space-x-4 p-6 bg-gradient-to-r from-[#e5dbf5]/10 to-[#e5dbf5]/5 rounded-2xl border border-[#e5dbf5]/20 backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-to-br from-[#e5dbf5] to-[#e5dbf5]/80 rounded-xl flex items-center justify-center">
                  <FaCode className="text-[#192234] text-xl" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-[#e5dbf5]">Personal Projects</h3>
                  <p className="text-[#e5dbf5]/70 text-sm">Creative coding experiments</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#192234]/50 to-[#1a2335]/50 rounded-3xl p-8 border border-[#e5dbf5]/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {personalProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} setSelectedProject={setSelectedProject} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Educational Games Section */}
        {educationalGames.length > 0 && (
          <div className="mb-20">
            <div className="mb-12 flex justify-center">
              <div className="w-4/5 max-w-4xl inline-flex items-center space-x-4 p-6 bg-gradient-to-r from-[#e5dbf5]/10 to-[#e5dbf5]/5 rounded-2xl border border-[#e5dbf5]/20 backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-to-br from-[#e5dbf5] to-[#e5dbf5]/80 rounded-xl flex items-center justify-center">
                  <FaGamepad className="text-[#192234] text-xl" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-[#e5dbf5]">Educational Games</h3>
                  <p className="text-[#e5dbf5]/70 text-sm">Learning through play</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1a2335]/50 to-[#192234]/50 rounded-3xl p-8 border border-[#e5dbf5]/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {educationalGames.map((project) => (
                  <ProjectCard key={project.id} project={project} setSelectedProject={setSelectedProject} />
                ))}
              </div>
            </div>
          </div>
        )}


        {/* School Projects Section */}
        {schoolProjects.length > 0 && (
          <div className="mb-20">
            <div className="mb-12 flex justify-center">
              <div className="w-4/5 max-w-4xl inline-flex items-center space-x-4 p-6 bg-gradient-to-r from-[#e5dbf5]/10 to-[#e5dbf5]/5 rounded-2xl border border-[#e5dbf5]/20 backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-to-br from-[#e5dbf5] to-[#e5dbf5]/80 rounded-xl flex items-center justify-center">
                  <FaBook className="text-[#192234] text-xl" />
                </div>
                <div className="text-left">
                  <h3 className="text-3xl font-bold text-[#e5dbf5]">School Projects</h3>
                  <p className="text-[#e5dbf5]/70 text-sm">Class assignments and coursework</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#192234]/50 to-[#1a2335]/50 rounded-3xl p-8 border border-[#e5dbf5]/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {schoolProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} setSelectedProject={setSelectedProject} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
