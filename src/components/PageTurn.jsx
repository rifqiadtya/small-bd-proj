'use client'

import { useState, useCallback, Children } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const D = 0.6
const EASE = [0.65, 0, 0.35, 1]

const variants = {
  enter: (dir) => ({
    x: dir > 0 ? '40%' : '-40%',
    scale: 0.92,
    opacity: 0,
    rotateY: dir > 0 ? 10 : -10,
    zIndex: 5,
  }),
  center: {
    x: '0%',
    scale: 1,
    opacity: 1,
    rotateY: 0,
    zIndex: 5,
  },
  exit: (dir) => ({
    x: dir > 0 ? '-40%' : '40%',
    scale: 0.92,
    opacity: 0,
    rotateY: dir > 0 ? -10 : 10,
    zIndex: 10,
  }),
}

export default function PageTurn({ children, onPageChange }) {
  const pages = Children.toArray(children)
  const total = pages.length
  const [[current, direction], setPage] = useState([0, 0])

  const goForward = useCallback(() => {
    if (current >= total - 1) return
    setPage([current + 1, 1])
    onPageChange?.(current + 1)
  }, [current, total, onPageChange])

  const goBackward = useCallback(() => {
    if (current <= 0) return
    setPage([current - 1, -1])
    onPageChange?.(current - 1)
  }, [current, onPageChange])

  return (
    <div
      style={{
        width: '100vw', height: '100vh',
        perspective: '1500px',
        overflow: 'hidden',
        position: 'relative',
        background: 'transparent',
      }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: D, ease: EASE }}
          style={{
            position: 'absolute', inset: 0,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            overflow: 'hidden',
          }}
        >
          {pages[current]}
        </motion.div>
      </AnimatePresence>

      {current > 0 && (
        <button onClick={goBackward} className="nav-btn" style={{ left: '24px' }} aria-label="Previous page">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18L9 12L15 6" />
          </svg>
        </button>
      )}
      {current < total - 1 && (
        <button onClick={goForward} className="nav-btn" style={{ right: '24px' }} aria-label="Next page">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18L15 12L9 6" />
          </svg>
        </button>
      )}

      <div style={{
        position: 'fixed', bottom: '32px', left: '50%',
        transform: 'translateX(-50%)', zIndex: 200,
        display: 'flex', gap: '8px', alignItems: 'center',
      }}>
        {pages.map((_, i) => (
          <div key={i} style={{
            width: i === current ? '24px' : '6px', height: '6px',
            borderRadius: '3px',
            background: i === current ? 'rgb(var(--color-gold))' : 'rgb(var(--color-softgray))',
            transition: 'all 0.5s ease',
          }} />
        ))}
      </div>
    </div>
  )
}
