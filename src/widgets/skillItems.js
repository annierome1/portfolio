import React, { useState, useEffect, useRef } from "react";
import skillIcons from "./skillIcons";

export default function SkillItem({ skillName }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Set mobile flag based on window width.
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  let tooltipStyle = {};
  if (isMobile && containerRef.current) {
    const rect = containerRef.current.getBoundingClientRect();
    tooltipStyle = {
      top: `${rect.bottom + 10}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: "translateX(-50%)",
    };
  } else {
    tooltipStyle = {
      top: `${mousePos.y + 10}px`,
      left: `${mousePos.x + 15}px`,
    };
  }

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center"
      // Desktop mouse events.
      onMouseEnter={(e) => {
        setIsHovered(true);
        setMousePos({ x: e.clientX, y: e.clientY });
      }}
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      onMouseLeave={() => setIsHovered(false)}
      // Mobile touch events.
      onTouchStart={(e) => {
        const touch = e.touches[0];
        setIsHovered(true);
        setMousePos({ x: touch.clientX, y: touch.clientY });
      }}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        setMousePos({ x: touch.clientX, y: touch.clientY });
      }}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Skill Icon */}
      <div
        className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full 
          bg-gray-700 transition-all duration-300 ease-in-out ${
            isHovered ? "shadow-[0_0_20px_rgba(255,255,255,0.8)]" : ""
          }`}
      >
        {skillIcons[skillName] || <span className="text-white">{skillName}</span>}
      </div>

      {/* Tooltip */}
      {isHovered && (
        <div
          className="fixed bg-gray-900 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-lg pointer-events-none z-50"
          style={{
            ...tooltipStyle,
            whiteSpace: "nowrap",
          }}
        >
          {skillName}
        </div>
      )}
    </div>
  );
}
