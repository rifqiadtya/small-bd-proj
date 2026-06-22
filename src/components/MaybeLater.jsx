'use client'

import { motion } from 'framer-motion'

export default function MaybeLater({ onReturn }) {
  return (
    <motion.div
      className="fixed inset-0 z-[250] flex flex-col items-center justify-center bg-ivory"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
    >
      <motion.div
        className="text-center px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-charcoal mb-6 leading-tight">
          Until Another Time
        </h1>

        <p className="font-serif text-lg md:text-xl italic text-charcoal/50 mb-4">
          The pages will remain here, waiting.
        </p>

        <p className="font-sans text-sm text-charcoal/30 mb-12">
          Some stories can wait for the right moment.
        </p>

        <motion.button
          onClick={onReturn}
          className="px-10 py-4 border border-charcoal/20 text-charcoal/60 font-sans text-sm tracking-[0.2em] uppercase
                     hover:bg-charcoal hover:text-ivory transition-all duration-700"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Return
        </motion.button>
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 2 }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-warmbeige/30 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-dustrose/20 blur-3xl" />
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ opacity: [0.2, 0.6, 0.2], y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-serif text-xs italic text-charcoal/30">
          &mdash; &infin; &mdash;
        </span>
      </motion.div>
    </motion.div>
  )
}
