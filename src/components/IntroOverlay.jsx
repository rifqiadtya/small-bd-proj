'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const FlowerSVG = () => (
  <svg viewBox="0 0 200 240" fill="none" className="w-full h-full">
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Stem */}
      <path
        d="M100 138 C100 170, 96 200, 100 228"
        stroke="rgb(201, 169, 110)"
        strokeWidth="0.7"
        opacity="0.35"
      />
      {/* Left leaf */}
      <path
        d="M99 185 C86 180, 72 183, 67 190 C76 193, 89 190, 99 185Z"
        stroke="rgb(201, 169, 110)"
        strokeWidth="0.5"
        fill="none"
        opacity="0.3"
      />
      {/* Right leaf */}
      <path
        d="M101 195 C113 190, 128 193, 133 200 C123 203, 111 200, 101 195Z"
        stroke="rgb(201, 169, 110)"
        strokeWidth="0.5"
        fill="none"
        opacity="0.3"
      />
      {/* Petal top */}
      <path
        d="M100 135 C78 105, 93 63, 100 48 C107 63, 122 105, 100 135Z"
        stroke="rgb(201, 169, 110)"
        strokeWidth="0.7"
        fill="none"
      />
      {/* Petal top-right */}
      <path
        d="M100 135 C127 110, 157 100, 170 90 C160 106, 146 132, 100 135Z"
        stroke="rgb(201, 169, 110)"
        strokeWidth="0.7"
        fill="none"
      />
      {/* Petal bottom-right */}
      <path
        d="M100 140 C127 150, 153 155, 163 165 C147 166, 126 156, 100 140Z"
        stroke="rgb(201, 169, 110)"
        strokeWidth="0.7"
        fill="none"
      />
      {/* Petal bottom-left */}
      <path
        d="M100 140 C73 150, 47 155, 37 165 C53 166, 74 156, 100 140Z"
        stroke="rgb(201, 169, 110)"
        strokeWidth="0.7"
        fill="none"
      />
      {/* Petal top-left */}
      <path
        d="M100 135 C73 110, 43 100, 30 90 C40 106, 54 132, 100 135Z"
        stroke="rgb(201, 169, 110)"
        strokeWidth="0.7"
        fill="none"
      />
      {/* Center */}
      <circle cx="100" cy="137" r="3" stroke="rgb(201, 169, 110)" strokeWidth="0.7" fill="none" />
    </motion.g>
  </svg>
)

export default function IntroOverlay({ onOpen, onMaybeLater }) {
  const [phase, setPhase] = useState('enter')

  const handleOpen = () => {
    setPhase('exit')
    setTimeout(onOpen, 1000)
  }

  const handleMaybeLater = () => {
    setPhase('exit')
    setTimeout(onMaybeLater, 1000)
  }

  if (phase === 'gone') return null

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center"
      style={{ background: '#1A1A1A' }}
      initial={{ opacity: 1, scale: 1 }}
      animate={
        phase === 'exit'
          ? { opacity: 0, scale: 0.97 }
          : { opacity: 1, scale: 1 }
      }
      transition={{ duration: 1.0, ease: [0.65, 0, 0.35, 1] }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(201,169,110,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 w-full max-w-lg mx-auto px-8 text-center">
        {/* Flower */}
        <motion.div
          className="w-36 h-44 md:w-44 md:h-52 mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <FlowerSVG />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span
            className="block font-serif text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: 'rgba(201, 169, 110, 0.5)' }}
          >
            Your Digital Flower
          </span>

          <h1
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-3"
            style={{ color: '#E8E0D8' }}
          >
            For Annisa Safura
          </h1>

          <p
            className="font-serif text-base md:text-lg italic mb-10 leading-relaxed"
            style={{ color: 'rgba(232, 224, 216, 0.45)' }}
          >
            A small digital magazine created for your 26th birthday.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <motion.button
            onClick={handleOpen}
            className="group relative px-10 py-4 font-sans text-sm tracking-[0.2em] uppercase overflow-hidden"
            style={{ background: '#E8E0D8', color: '#1A1A1A' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Open It</span>
            <motion.div
              className="absolute inset-0"
              style={{ background: 'rgb(201, 169, 110)' }}
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </motion.button>

          <button
            onClick={handleMaybeLater}
            className="font-sans text-sm tracking-[0.2em] uppercase transition-colors duration-500"
            style={{ color: 'rgba(232, 224, 216, 0.4)' }}
            onMouseEnter={(e) => (e.target.style.color = 'rgba(232, 224, 216, 0.7)')}
            onMouseLeave={(e) => (e.target.style.color = 'rgba(232, 224, 216, 0.4)')}
          >
            Maybe Later
          </button>
        </motion.div>
      </div>

      {/* Bottom accent */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10"
          style={{ background: 'rgba(201, 169, 110, 0.2)' }}
        />
      </motion.div>
    </motion.div>
  )
}
