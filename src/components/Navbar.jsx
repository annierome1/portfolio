import React from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <Link to="/">
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden">
            <img src="/assets/logo.jpg" alt="Logo" className="object-cover w-full h-full" />
          </div>
        </Link>
        <nav className="flex space-x-4 sm:space-x-6 text-purple-100">
          <Link to="/projects" className="text-sm sm:text-base hover:text-white transition-colors">Projects</Link>
          <Link to="/resume" className="text-sm sm:text-base hover:text-white transition-colors">Resume</Link>
        </nav>
      </div>
    </header>
  );
}
