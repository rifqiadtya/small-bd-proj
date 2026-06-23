'use client'

import { motion } from 'framer-motion'

export default function MagazineCover() {
  return (
    <div className="w-full h-full bg-ivory flex items-center justify-center relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-warmbeige/40 via-warmbeige/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-sage/10 to-transparent" />
      </motion.div>

      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-stretch">
        <motion.div
          className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span
            className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-charcoal/30 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            A Digital Magazine — June 2026
          </motion.span>

          <div className="mb-4">
            <motion.h1
              className="font-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] text-charcoal leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Annisa
            </motion.h1>
            <motion.h2
              className="font-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] text-charcoal leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Safura
            </motion.h2>
          </div>

          <motion.div
            className="flex items-center gap-6 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <div className="w-12 h-px bg-gold" />
            <span className="font-serif text-lg md:text-xl italic text-charcoal/50">
              24 June &bull; 26
            </span>
          </motion.div>

          <motion.div
            className="mt-8 font-sans text-xs md:text-sm text-charcoal/30 max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            {/* This page is intentionally sparse. A cover needs no explanation. */}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 relative min-h-[40vh] md:min-h-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <div className="absolute inset-0 m-4 md:m-8 lg:m-12 overflow-hidden">
            <img
              src="/images/photo-1.jpg"
              alt="Annisa Safura — Cover Portrait"
              className="w-full h-full object-cover object-center"
              style={{
                objectPosition: `calc(50% + 0px) calc(50% + -100px)`,
                transform: `scale(1.1)`,
              }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 right-8 md:right-12 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-charcoal/20">
          Volume I &bull; No. 26
        </span>
      </motion.div>
    </div>
  )
}
