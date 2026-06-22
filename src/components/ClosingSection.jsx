'use client'

import { motion } from 'framer-motion'

export default function ClosingSection() {
  return (
    <div className="w-full h-full bg-ivory flex flex-col items-center justify-center relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vmin] h-[80vmin] rounded-full bg-gradient-to-br from-warmbeige/20 via-sage/5 to-dustrose/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-gold/5 blur-2xl" />
      </motion.div>

      <div className="relative z-10 text-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span
            className="block font-sans text-[10px] tracking-[0.4em] uppercase text-charcoal/20 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            — Fin —
          </motion.span>

          <motion.h1
            className="font-serif text-4xl md:text-6xl lg:text-8xl xl:text-9xl text-charcoal leading-[1.1] mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Happy 26th Birthday
          </motion.h1>

          <motion.h2
            className="font-serif text-5xl md:text-7xl lg:text-9xl xl:text-[8rem] text-charcoal/90 leading-[1.1] mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Annisa Safura
          </motion.h2>

          <motion.div
            className="w-16 h-px bg-gold/60 mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </motion.div>

        <motion.p
          className="font-serif text-lg md:text-xl lg:text-2xl italic text-charcoal/50 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          May the years ahead bring peace, growth, happiness, and beautiful surprises.
        </motion.p>

        <motion.div
          className="mt-12 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <div className="w-8 h-px bg-softgray/30" />
          <span className="font-serif text-xs italic text-charcoal/20">&infin;</span>
          <div className="w-8 h-px bg-softgray/30" />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-gold/40 to-transparent"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  )
}
