import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import FormSubmit from "./FormSubmit.jsx";

export default function Contact() {
  return (
    <section id="contact">
      <div className="container px-5 py-10 mx-auto flex justify-center items-center flex-wrap">
        <div className="flex flex-col w-full md:py-8 mt-8 md:mt-0 text-center">
          <h2 className="text-purple-100 sm:text-4xl text-3xl mb-1 font-medium title-font">
            Contact Me
          </h2>
          
          {/* Contact Form */}
          <div className="flex flex-col w-full max-w-2xl mx-auto mt-8">
            <div className="bg-gradient-to-br from-[#192234]/50 to-[#1a2335]/50 rounded-2xl p-8 border border-[#e5dbf5]/20">
              <FormSubmit
                formType="contact"
                subject="Portfolio Contact"
                buttonText="Send Message"
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    rows="6"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                  />
                </div>
              </FormSubmit>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-12 flex justify-center space-x-4">
            <a href="https://github.com/annierome1" className="text-purple-100 hover:text-purple-300 transition-colors duration-200">
              <AiFillGithub size="2em" />
            </a>
            <a href="https://www.linkedin.com/in/annie-rome-835644209/" className="text-purple-100 hover:text-purple-300 transition-colors duration-200">
              <FaLinkedinIn size="2em" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
