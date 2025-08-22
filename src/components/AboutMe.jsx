import React from "react";
import webPic from '../assets/web_pic.jpg';

export default function AboutMe() {
  return (
    <section className="py-12 sm:py-16 md:py-20 flex justify-center px-4 sm:px-6">
      <div className="max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
        <div className="order-2 md:order-1">
          <img
            src={webPic}
            alt="Annie Rome headshot"
            className="rounded-2xl shadow-2xl object-cover w-full h-60 sm:h-80 md:h-full"
          />
        </div>
        <div className="text-white space-y-3 sm:space-y-4 order-1 md:order-2 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-purple-300">About Me</h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            I'm Annie—a full‑stack engineer with a double major in CS and Psychology,
            building seamless web experiences and human‑centered AI tools.
          </p>
        </div>
      </div>
    </section>
  );
}
