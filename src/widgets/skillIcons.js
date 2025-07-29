import { SiPython, SiCplusplus, SiReact, SiDjango, SiUnrealengine, SiUnity, SiPostman, SiGit, SiBlender, SiMysql, SiPostgresql, SiMongodb, SiFastapi, SiSanity } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import { VscAzureDevops } from "react-icons/vsc";
import { FaNodeJs, FaJava, FaSwift, FaHtml5, FaCss3Alt, FaVrCardboard, FaAws, FaAngular } from "react-icons/fa";
import { RiTailwindCssFill, RiNextjsFill } from "react-icons/ri";
import pinecone_logo from "../assets/pinecone-icon-seeklogo.svg"; // Ensure the path is correct
import { ReactSVG } from 'react-svg';
import React from 'react';

// Skill icons mapped with proper colors and sizes
const skillIcons = {
  JavaScript: <IoLogoJavascript className="text-yellow-400 w-12 h-12" />,
  Python: <SiPython className="text-blue-400 w-12 h-12" />,
  Java: <FaJava className="text-red-600 w-12 h-12" />,
  "C++": <SiCplusplus className="text-blue-600 w-12 h-12" />,
  Swift: <FaSwift className="text-orange-500 w-12 h-12" />,
  HTML: <FaHtml5 className="text-orange-600 w-12 h-12" />,
  CSS: <FaCss3Alt className="text-blue-600 w-12 h-12" />,
  React: <SiReact className="text-cyan-500 w-12 h-12" />,
  Django: <SiDjango className="text-green-700 w-12 h-12" />,
  Blender: <SiBlender className="text-orange-600 w-12 h-12" />,
  "Unreal Engine": <SiUnrealengine className="text-black w-12 h-12" />,
  Unity: <SiUnity className="text-black w-12 h-12" />,
  Postman: <SiPostman className="text-orange-600 w-12 h-12" />,
  MySQL: <SiMysql className="text-blue-600 w-12 h-12" />,
  PostgreSQL: <SiPostgresql className="text-blue-500 w-12 h-12" />,
  "Node.js": <FaNodeJs className="text-green-500 w-12 h-12" />,
  Git: <SiGit className="text-orange-600 w-12 h-12" />,
  VR: <FaVrCardboard className="text-orange-600 w-12 h-12" />,
  AzureDevOps: <VscAzureDevops className="text-blue-500 w-12 h-12" />,
  MongoDB: <SiMongodb className="text-green-500 w-12 h-12" />,
  AWS: <FaAws className="text-blue-500 w-12 h-12" />,
  Postman: <SiPostman className="text-orange-500 w-12 h-12"/>,
  Pinecone: <img src={pinecone_logo} className=" w-12 h-12"/>,
  Tailwind: <RiTailwindCssFill className="text-[rgb(15,188,245)] w-12 h-12"/>,
  FastAPI: <SiFastapi  className="text-gray-500 w-12 h-12"/>,
  Angular: <FaAngular className = "text-red-500 w-12 h-12"/>,
  Sanity: <SiSanity className = "text-black w-12 h-12"/>,
  NextJS: <RiNextjsFill className = "text-black w-12 h-12"/>
};

export default skillIcons;
