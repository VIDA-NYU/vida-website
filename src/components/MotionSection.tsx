"use client";

import { motion } from "framer-motion";

export function MotionSection() {
  return (
    <motion.section
      className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 p-[1px] shadow-lg"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="flex flex-col gap-2 rounded-2xl bg-zinc-950/95 px-6 py-5 text-zinc-100">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
          VIDA Research Lab
        </p>
        <h2 className="text-xl font-semibold tracking-tight">
          Multimodal, interactive research experiences.
        </h2>
        <p className="mt-1 text-sm text-zinc-300">
          This section is powered by Framer Motion. Scroll to see subtle entrance
          animations and modern micro-interactions.
        </p>
      </div>
    </motion.section>
  );
}
