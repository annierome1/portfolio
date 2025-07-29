import React from "react";
import webPic from '../assets/web_pic.jpg';


export default function AboutMe() {
  return (

    <section className="py-20 flex justify-center">
      <div className="max-w-3xl grid md:grid-cols-2 gap-10 items-center px-6">
        <div>
          <img
            src={webPic} // Ensure this path is correct
            alt="Annie Rome headshot"
            className="rounded-2xl shadow-2xl object-cover w-full h-full"
          />
        </div>
        <div className="text-white space-y-4">
          <h2 className="text-4xl font-bold text-purple-300">About Me</h2>
          <p className="text-gray-300 leading-relaxed">
            I’m Annie—a full‑stack engineer with a double major in CS and Psychology,
            building seamless web experiences and human‑centered AI tools.
          </p>
        </div>
      </div>
    </section>
  );
}
