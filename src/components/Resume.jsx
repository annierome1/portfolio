// src/components/Resume.jsx
import React from 'react';
import { FaInfoCircle, FaDownload } from 'react-icons/fa';
import '../styles/Resume.css';
import resumeFile from '../assets/AnnieRome.pdf';

export default function Resume() {
  return (
    <section id="resume" className="min-h-screen">
      <div className="px-4 pt-10 sm:pt-14 pb-24 sm:pb-32 text-purple-100 w-full">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-medium title-font mb-4 text-center">
          My Resume
        </h1>

        {/* Tooltip */}
        <div className="text-center mb-6">
          <div className="tooltip inline-block">
            <FaInfoCircle className="text-purple-100 cursor-pointer" />
            <span className="tooltiptext">
              This resume was generated with ResuBuild
            </span>
          </div>
        </div>

        {/* Mobile view - shown on small screens */}
        <div className="block md:hidden">
          {/* Download section */}
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-300 text-center mb-4">
            </p>
            <a
              href={resumeFile}
              download="AnnieRome_resume.pdf"
              className="w-full inline-flex items-center justify-center px-6 py-4 bg-purple-100 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-purple-200 transition duration-300"
            >
              <FaDownload className="mr-2" />
              Download Resume PDF
            </a>
          </div>
          
          {/* Mobile resume options */}
          <div className="space-y-4">
            {/* Option 1: Direct PDF link */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-100 mb-2">View Full Resume</h3>
              <p className="text-sm text-gray-300 mb-3">
                Opens the full PDF in a new tab for better viewing
              </p>
              <a
                href={resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-4 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Open PDF in New Tab
              </a>
            </div>
            
            {/* Option 2: Embedded PDF with better mobile handling */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-100 mb-2">Quick Preview</h3>
              <p className="text-sm text-gray-300 mb-3">
                Scrollable preview below (may not work on all devices)
              </p>
              <div className="w-full h-[60vh] border border-gray-600 rounded-lg overflow-hidden">
                <iframe
                  src={`${resumeFile}#zoom=page-width&toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                  title="Resume Preview"
                  className="w-full h-full"
                  style={{ border: 'none' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop view - shown on medium screens and up */}
        <div className="hidden md:block">
          {/* Download button for desktop */}
          <div className="text-center mb-6">
            <a
              href={resumeFile}
              download="AnnieRome_resume.pdf"
              className="inline-flex items-center px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
            >
              <FaDownload className="mr-2" />
              Download Resume
            </a>
          </div>
          
          {/* Desktop PDF viewer */}
          <div className="flex justify-center">
            <div className="w-[80vw] max-w-4xl h-[120vh] border-4 border-gray-900 rounded-lg overflow-hidden">
              <iframe
                src={`${resumeFile}#zoom=page-width`}
                title="Resume - Desktop View"
                className="w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
