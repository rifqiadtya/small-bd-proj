'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'

export default function MemoryPage() {
  const [memory, setMemory] = useState('')
  const [saved, setSaved] = useState(null)
  const [showSaved, setShowSaved] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMemory()
  }, [])

  async function fetchMemory() {
    const { data, error } = await supabase
      .from('memories')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
    if (!error && data && data.length > 0) {
      setSaved(data[0].content)
      setShowSaved(true)
    }
    setLoading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!memory.trim() || submitting) return
    setSubmitting(true)

    const content = memory.trim()

    const { data: existing } = await supabase
      .from('memories')
      .select('id')
      .limit(1)

    if (existing && existing.length > 0) {
      await supabase
        .from('memories')
        .update({ content, updated_at: new Date().toISOString() })
        .eq('id', existing[0].id)
    } else {
      await supabase
        .from('memories')
        .insert({ content })
    }

    setSaved(content)
    setShowSaved(true)
    setSubmitting(false)
  }

  const handleEdit = () => {
    setShowSaved(false)
    setMemory(saved || '')
  }

  if (loading) {
    return (
      <div className="w-full h-full bg-ivory flex items-center justify-center">
        <span className="font-serif text-sm italic text-charcoal/20">Loading...</span>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-ivory flex items-center justify-center relative overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-1/3 right-0 w-1/4 h-1/2 bg-gradient-to-b from-dustrose/10 to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-3/4 h-1/4 bg-gradient-to-t from-sage/5 to-transparent" />
      </motion.div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 md:px-12">
        <AnimatePresence mode="wait">
          {showSaved ? (
            <motion.div
              key="saved"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-12 h-px bg-gold/60 mx-auto mb-6" />
                <span className="block font-sans text-[10px] tracking-[0.3em] uppercase text-charcoal/30 mb-4">
                  Remembered
                </span>
                <p className="font-serif text-xl md:text-2xl lg:text-3xl italic text-charcoal/70 leading-relaxed mb-8">
                  &ldquo;{saved}&rdquo;
                </p>
                <div className="w-12 h-px bg-gold/60 mx-auto mb-6" />
                <p className="font-sans text-sm text-charcoal/40 mb-8">
                  This moment has been kept. It will be here when you return.
                </p>
                <button
                  onClick={handleEdit}
                  className="font-sans text-xs tracking-[0.2em] uppercase text-charcoal/30 hover:text-charcoal/60 transition-colors duration-500"
                >
                  Write again
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="block font-sans text-[10px] tracking-[0.3em] uppercase text-charcoal/30 mb-3">
                  Interactive
                </span>
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-3">
                  A Page Reserved For You
                </h2>
                <p className="font-serif text-lg italic text-charcoal/40">
                  What is one thing you want to remember from this year?
                </p>
                <div className="w-12 h-px bg-gold/60 mt-4" />
              </motion.div>

              <form onSubmit={handleSubmit}>
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <textarea
                    value={memory}
                    onChange={(e) => setMemory(e.target.value)}
                    placeholder="Write something..."
                    rows={4}
                    maxLength={500}
                    className="w-full bg-transparent border-b border-softgray/40 px-0 py-4 font-serif text-lg md:text-xl text-charcoal/70
                               placeholder:text-charcoal/20 focus:outline-none focus:border-gold/50 transition-colors duration-500 resize-none"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-sans text-[10px] text-charcoal/20">
                      {memory.length}/500
                    </span>
                    {saved && (
                      <span className="font-sans text-[10px] text-charcoal/20">
                        Previously saved
                      </span>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <button
                    type="submit"
                    disabled={!memory.trim() || submitting}
                    className="group relative px-10 py-4 bg-charcoal text-ivory font-sans text-sm tracking-[0.2em] uppercase overflow-hidden
                               disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10">
                      {submitting ? 'Saving...' : 'Keep this moment'}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gold"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  </button>
                </motion.div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
