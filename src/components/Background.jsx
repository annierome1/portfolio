// src/components/Background.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const staticBubbles = [
  { size: 200, top: "10%", left: "15%", delay: 0 },
  { size: 150, top: "25%", right: "20%", delay: 2 },
  { size: 180, bottom: "20%", left: "25%", delay: 4 },
  { size: 120, bottom: "30%", right: "10%", delay: 1 },
];

export default function Background() {
  const [blots, setBlots] = useState([]);

  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Floating bubbles */}
      {staticBubbles.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            right: b.right,
            bottom: b.bottom,
            left: b.left,
            background: `
              radial-gradient(
                circle at 30% 30%,
                rgba(238,222,254,0.6) 0%,
                rgba(31,41,55,0.9) 100%
              )
            `,
            boxShadow: "0 8px 48px rgba(0,0,0,0.4)",
          }}
          animate={{
            x: [0, 50, 0, -50, 0],
            y: [0, -30, 40, -20, 0],
            opacity: [0.7, 1, 0.8, 1, 0.7],
          }}
          transition={{
            type: "tween",
            ease: "easeInOut",
            duration: 12 + i * 2,
            repeat: Infinity,
            repeatType: "loop",
            delay: b.delay,
          }}
        />
      ))}

      {/* Watercolor ripples */}
      {blots.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 300,
            height: 300,
            top: `${b.y}%`,
            left: `${b.x}%`,
            background: `
              radial-gradient(
                circle,
                rgba(238,222,254,0.5) 0%,
                rgba(238,222,254,0.2) 40%,
                transparent 70%
              )
            `,
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
