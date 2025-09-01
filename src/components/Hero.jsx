import React from "react";
import { Link } from "react-router-dom";

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
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-purple-100 mb-4 px-4">
        Dev & Design
      </h1>
      <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-md px-4 text-center">
        Creating thoughtful interfaces with full‑stack precision and AI insight.
      </p>

      {/* buttons */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 px-4">
        <Link
          to="/projects"
          className="
            bg-purple-100 text-gray-900
            font-semibold px-6 py-3
            rounded-full
            hover:scale-105
            transition
            text-center
            w-full sm:w-auto
          "
        >
          Projects
        </Link>
        <Link
          to="/resume"
          className="
            border border-purple-100 text-purple-100
            font-semibold px-6 py-3
            rounded-full
            hover:bg-purple-100 hover:text-gray-900
            transition
            text-center
            w-full sm:w-auto
          "
        >
          Resume
        </Link>
      </div>
    </section>
  );
}
