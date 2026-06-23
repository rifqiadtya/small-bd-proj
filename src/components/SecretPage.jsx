'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SecretPage() {
  const [found, setFound] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [hoverCount, setHoverCount] = useState(0)

  useEffect(() => {
    const revealed = sessionStorage.getItem('annisa_secret_revealed')
    if (revealed) setFound(true)
  }, [])

  const handleDiscover = () => {
    if (found) {
      setShowModal(true)
      return
    }
    setHoverCount((c) => {
      const next = c + 1
      if (next >= 3) {
        setFound(true)
        sessionStorage.setItem('annisa_secret_revealed', 'true')
        setShowModal(true)
        return 0
      }
      return next
    })
  }

  return (
    <div className="w-full h-full bg-ivory flex items-center justify-center relative overflow-hidden">
      <div className="relative z-10 text-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="block font-sans text-[10px] tracking-[0.3em] uppercase text-charcoal/20 mb-4">
            Colophon
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-6">
            About This Magazine
          </h2>
        </motion.div>

        <motion.div
          className="max-w-lg mx-auto space-y-4 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="font-sans text-sm md:text-base leading-relaxed text-charcoal/50">
            This digital magazine was created for Annisa Safura&apos;s twenty-sixth birthday. Every element,
            the typography, the pacing, the silence between pages was designed to feel like a physical object
            existing in digital space.
          </p>
          <p className="font-sans text-sm md:text-base leading-relaxed text-charcoal/40">
            Set in Playfair Display and Inter. Built by Macos.
          </p>
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.span
            onClick={handleDiscover}
            className="inline-block font-serif text-xs italic text-charcoal/15 cursor-pointer select-none"
            whileHover={{ color: 'rgba(201, 169, 110, 0.6)' }}
            transition={{ duration: 0.3 }}
          >
            {found ? '✦' : '·'}
          </motion.span>
          <p className="font-sans text-[10px] text-charcoal/10 mt-2 tracking-widest uppercase">
            {found ? 'You found it.' : ''}
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-[400] flex items-center justify-center bg-charcoal/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-ivory max-w-lg mx-6 p-8 md:p-12 relative"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-charcoal/20 hover:text-charcoal/50 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="block font-sans text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-4">
                    Secret Page
                  </span>
                  <div className="w-8 h-px bg-gold/40 mx-auto mb-6" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                >
                  <p className="font-serif text-2xl md:text-3xl italic text-charcoal/70 leading-relaxed mb-6">
                    &ldquo;You are one of the best thing that has ever happened to me. Thank you for all the journey
                    we had together. Happy 26th!&rdquo;
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                >
                  <div className="w-8 h-px bg-gold/40 mx-auto mb-4" />
                  <span className="font-sans text-[10px] tracking-widest uppercase text-charcoal/20">
                    A secret message, just for you.
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
