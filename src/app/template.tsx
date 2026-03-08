"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Gradient sweep line across top */}
      <motion.div
        className="fixed top-16 left-0 right-0 h-0.5 gradient-bg z-50 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 1, 0] }}
        transition={{ duration: 0.6, times: [0, 0.4, 0.8, 1], ease: "easeInOut" }}
      />
      {/* Content fade in */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}
