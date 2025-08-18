// src/components/Background.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Gentle wave background with subtle flowing patterns.
 * Creates a calming, minimal effect that's not distracting.
 */
export default function Background() {
  const wrapRef = useRef(null);
  const [dims, setDims] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [ripples, setRipples] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    const el = wrapRef.current;
    const measure = () => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      setDims({ w: r.width, h: r.height });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const onPointerDown = (e) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const xPct = ((e.clientX - r.left) / r.width) * 100;
    const yPct = ((e.clientY - r.top) / r.height) * 100;
    const id = ++idRef.current;
    setRipples((prev) => [...prev, { id, xPct, yPct }]);
    setTimeout(() => setRipples((prev) => prev.filter((p) => p.id !== id)), 1600);
  };

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      onMouseDown={onPointerDown}
    >
      {/* Gentle flowing waves */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: `
            radial-gradient(ellipse 800px 400px at 20% 30%, rgba(124, 58, 237, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 600px 300px at 80% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 500px 250px at 50% 50%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)
          `
        }}
        animate={{
          background: [
            `
              radial-gradient(ellipse 800px 400px at 20% 30%, rgba(124, 58, 237, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 600px 300px at 80% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 500px 250px at 50% 50%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)
            `,
            `
              radial-gradient(ellipse 800px 400px at 25% 35%, rgba(124, 58, 237, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 600px 300px at 75% 65%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 500px 250px at 55% 45%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)
            `,
            `
              radial-gradient(ellipse 800px 400px at 20% 30%, rgba(124, 58, 237, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 600px 300px at 80% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 500px 250px at 50% 50%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)
            `
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Subtle floating orbs */}
      <motion.div
        className="absolute w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
        style={{ left: '15%', top: '25%' }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
        style={{ right: '20%', bottom: '20%' }}
        animate={{
          y: [0, 15, 0],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />

      {/* Watercolor ripples */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 300,
            height: 300,
            left: `calc(${r.xPct}% - 150px)`,
            top: `calc(${r.yPct}% - 150px)`,
            background:
              "radial-gradient(circle, rgba(238,222,254,0.5) 0%, rgba(238,222,254,0.2) 40%, transparent 70%)",
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
