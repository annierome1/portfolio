import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import { BiLogoGmail } from "react-icons/bi";

export default function Contact() {
  return (
    <section id="contact"> {/* Change the background color here */}
      <div className="container px-5 py-10 mx-auto flex justify-center items-center flex-wrap">
        <form
          netlify
          name="contact"
          className="flex flex-col w-full md:py-8 mt-8 md:mt-0 text-center">
          <h2 className="text-purple-100 sm:text-4xl text-3xl mb-1 font-medium title-font">
            Contact Me
          </h2>
          <div className="mt-8 flex justify-center space-x-4">
            <a href="https://github.com/annierome1" className="text-purple-100 hover:text-purple-300">
              <AiFillGithub size="2em" />
            </a>
            <a href="mailto:anniecrome1@gmail.com" className="text-purple-100 hover:text-purple-300">
              <BiLogoGmail size="2em" />
            </a>
            <a href="https://www.linkedin.com/in/annie-rome-835644209/" className="text-purple-100 hover:text-purple-300">
              <FaLinkedinIn size="2em" />
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
