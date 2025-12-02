"use client";

import { motion } from "framer-motion";

const nodes = [
  { x: "10%", y: "18%", delay: 0 },
  { x: "22%", y: "42%", delay: 1.2 },
  { x: "35%", y: "28%", delay: 2.4 },
  { x: "48%", y: "60%", delay: 0.8 },
  { x: "62%", y: "36%", delay: 1.8 },
  { x: "74%", y: "20%", delay: 3.1 },
  { x: "82%", y: "55%", delay: 2.1 },
  { x: "18%", y: "70%", delay: 3.6 },
  { x: "42%", y: "78%", delay: 1.4 },
  { x: "68%", y: "72%", delay: 2.8 },
];

export function DynamicBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_top,_rgba(56,189,248,0.4),transparent_60%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.28),transparent_55%)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,rgba(148,163,184,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.24)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <motion.div
        className="absolute inset-[-40%]"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute left-1/4 top-0 h-80 w-80 rounded-full bg-sky-500/18 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-cyan-400/16 blur-3xl" />
        <div className="absolute left-1/3 bottom-0 h-64 w-64 rounded-full bg-emerald-400/16 blur-3xl" />
      </motion.div>

      <motion.div
        className="absolute inset-x-0 top-[-20%] h-32 bg-gradient-to-b from-sky-400/25 via-sky-400/5 to-transparent"
        animate={{ y: ["-20%", "120%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {nodes.map((node, index) => (
        <motion.div
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full bg-sky-300/80 shadow-[0_0_18px_rgba(56,189,248,0.9)]"
          style={{ left: node.x, top: node.y }}
          initial={{ opacity: 0.15, scale: 0.7 }}
          animate={{ opacity: [0.15, 1, 0.2], scale: [0.7, 1.15, 0.9] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: node.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
