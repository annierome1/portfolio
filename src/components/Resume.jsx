// src/components/Resume.jsx
import React from 'react';
import { FaInfoCircle, FaDownload } from 'react-icons/fa';
import '../styles/Resume.css';
import resumeFile from '../assets/AnnieRome.pdf';

export default function Resume() {
  return (
    <section id="resume" className="relative pt-16 scroll-mt-16">
      <div className="px-5 py-10 text-purple-100 w-full">
        {/* Title */}
        <h1 className="text-4xl font-medium title-font mb-4 text-center">
          My Resume
        </h1>

        {/* Tooltip */}
        <div className="text-center mb-4">
          <div className="tooltip inline-block">
            <FaInfoCircle className="text-purple-100 cursor-pointer" />
            <span className="tooltiptext">
              This resume was generated with ResuBuild
            </span>
          </div>
        </div>

        {/* Download button */}
        <div className="text-center mb-6">
          <a
            href={resumeFile}
            download="AnnieRome_resume.pdf"
            className="inline-flex items-center px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
          >
            <FaDownload className="mr-2" />
            Download Resume
          </a>
        </div>

        {/* PDF viewer */}
        <div className="flex justify-center">
                <div className="w-[80vw] h-[120vh] border-4 border-gray-900 rounded-lg overflow-hidden">
            <iframe
                src={`${resumeFile}#zoom=page-width`}
                title="Resume"
                className="w-full h-full"
                style={{ border: 'none' }}
            />
            </div>
        </div>
      </div>
    </section>
  );
}
