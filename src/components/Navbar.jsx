import React from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/">
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <img src="/assets/logo.jpg" alt="Logo" className="object-cover w-full h-full" />
          </div>
        </Link>
        <nav className="flex space-x-6 text-purple-100">
          <Link to="/projects" className="hover:text-white">Projects</Link>
          <Link to="/resume"   className="hover:text-white">Resume</Link>
        </nav>
      </div>
    </header>
  );
}
