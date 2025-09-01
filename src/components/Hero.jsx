import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedinIn } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";

export default function Hero() {
  return (
    <section
      className="
        relative h-screen

        flex flex-col items-center justify-center
        overflow-hidden text-center
      "
    >

      {/* headline + subheadline */}
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-purple-100 mb-6 px-4 
                       drop-shadow-lg">
          Dev & Design
        </h1>
        <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-md px-4 text-center
                      bg-gray-900/30 backdrop-blur-sm rounded-2xl py-4 mx-4
                      border border-purple-500/20 shadow-lg">
          Creating thoughtful interfaces with full‑stack precision and AI insight.
        </p>
      </div>

      {/* buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 px-4">
        <Link
          to="/projects"
          className="
            bg-gradient-to-r from-purple-100 to-purple-200 text-gray-900
            font-semibold px-6 py-3
            rounded-full
            hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25
            transition-all duration-300
            text-center
            w-full sm:w-auto
            border border-purple-300/30
          "
        >
          Projects
        </Link>
        <Link
          to="/resume"
          className="
            border-2 border-purple-100 text-purple-100
            font-semibold px-6 py-3
            rounded-full
            hover:bg-purple-100 hover:text-gray-900 hover:shadow-lg hover:shadow-purple-500/25
            transition-all duration-300
            text-center
            w-full sm:w-auto
            backdrop-blur-sm bg-gray-900/20
          "
        >
          Resume
        </Link>
      </div>

      {/* Social Links - Mobile Only */}
      <div className="relative z-10 flex md:hidden justify-center space-x-6 mt-12">
        <a 
          href="https://github.com/annierome1" 
          className="text-purple-100 hover:text-purple-300 transition-all duration-300
                     hover:scale-110 hover:drop-shadow-lg hover:drop-shadow-purple-500/50
                     p-3 rounded-full hover:bg-gray-900/30 backdrop-blur-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillGithub size="2em" />
        </a>
        <a 
          href="https://www.linkedin.com/in/annie-rome-835644209/" 
          className="text-purple-100 hover:text-purple-300 transition-all duration-300
                     hover:scale-110 hover:drop-shadow-lg hover:drop-shadow-purple-500/50
                     p-3 rounded-full hover:bg-gray-900/30 backdrop-blur-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn size="2em" />
        </a>
      </div>
    </section>
  );
}
