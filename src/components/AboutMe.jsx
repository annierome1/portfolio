import React from "react";
import webPic from '../assets/web_pic.jpg';

export default function AboutMe() {
  return (
    <section className="pt-2 pb-6 sm:pt-4 sm:pb-8 md:py-20 flex justify-center px-4 sm:px-6">
      <div className="max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start md:items-center">
        <div className="order-2 md:order-1">
          <img
            src={webPic}
            alt="Annie Rome headshot"
            className="rounded-2xl shadow-2xl object-cover object-center w-90 h-96 sm:h-[28rem] md:h-full mx-auto"
          />
        </div>
        <div className="text-white space-y-3 sm:space-y-4 order-1 md:order-2 text-center md:text-left -mt-8 sm:-mt-12 md:pt-0">
          <h2 className="text-3xl sm:text-4xl font-bold text-purple-100">About Me</h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            I'm Annie—a full‑stack engineer with a double major in CS and Psychology,
            building seamless web experiences and human‑centered AI tools.
          </p>
        </div>
      </div>
    </section>
  );
}
