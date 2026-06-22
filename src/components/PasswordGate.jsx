'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [phase, setPhase] = useState('enter')
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.toLowerCase() === 'bismillah') {
      setPhase('exit')
      setTimeout(onUnlock, 800)
    } else {
      setError(true)
      setTimeout(() => setError(false), 600)
      setValue('')
      inputRef.current?.focus()
    }
  }

  if (phase === 'gone') return null

  return (
    <motion.div
      className="fixed inset-0 z-[250] flex items-center justify-center"
      style={{ background: '#1A1A1A' }}
      initial={{ opacity: 1 }}
      animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
    >
      <motion.div
        className="w-full max-w-sm mx-auto px-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span
          className="block font-serif text-xs tracking-[0.3em] uppercase mb-3"
          style={{ color: 'rgba(201, 169, 110, 0.5)' }}
        >
          Enter Password
        </span>
        <p
          className="font-sans text-sm mb-8 leading-relaxed"
          style={{ color: 'rgba(232, 224, 216, 0.4)' }}
        >
          This magazine is for invited readers. Enter the password to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            animate={error ? { x: [0, -8, 8, -6, 6, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <input
              ref={inputRef}
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Password"
              autoFocus
              className="w-full bg-transparent border-b px-0 py-3 font-serif text-lg text-center tracking-widest
                         focus:outline-none transition-colors duration-500"
              style={{
                color: '#E8E0D8',
                borderColor: error ? 'rgba(212, 169, 169, 0.5)' : 'rgba(201, 169, 110, 0.3)',
              }}
            />
          </motion.div>

          {error && (
            <p className="font-sans text-xs" style={{ color: 'rgba(212, 169, 169, 0.7)' }}>
              Incorrect password. Try again.
            </p>
          )}

          <motion.button
            type="submit"
            disabled={!value.trim()}
            className="px-10 py-3 font-sans text-sm tracking-[0.2em] uppercase w-full
                       disabled:opacity-20 disabled:cursor-not-allowed"
            style={{ background: '#E8E0D8', color: '#1A1A1A' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Unlock
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  )
}
