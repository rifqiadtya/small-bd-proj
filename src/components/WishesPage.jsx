'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'

function timeAgo(ts) {
  const diff = Date.now() - new Date(ts).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

const inputClasses =
  'w-full bg-transparent border-b border-softgray/30 px-0 py-2 font-serif text-base md:text-lg text-charcoal/70 placeholder:text-charcoal/20 focus:outline-none focus:border-gold/40 transition-colors duration-500 resize-none'

export default function WishesPage() {
  const [wishes, setWishes] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(true)
  const [nameTaken, setNameTaken] = useState(false)
  const [myWish, setMyWish] = useState(null)

  useEffect(() => {
    fetchWishes()
  }, [])

  async function fetchWishes() {
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) setWishes(data)
    setLoading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !message.trim() || sending) return
    const exists = wishes.some((w) => w.name.toLowerCase() === name.trim().toLowerCase())
    if (exists) {
      const found = wishes.find((w) => w.name.toLowerCase() === name.trim().toLowerCase())
      setNameTaken(true)
      setMyWish(found)
      return
    }
    setNameTaken(false)
    setMyWish(null)
    setSending(true)

    const { error } = await supabase.from('wishes').insert({
      name: name.trim(),
      message: message.trim(),
    })

    if (!error) {
      setName('')
      setMessage('')
      setSent(true)
      setTimeout(() => setSent(false), 2500)
      fetchWishes()
    }
    setSending(false)
  }

  const canSubmit = name.trim() && message.trim() && !sending

  return (
    <div className="h-full w-full overflow-y-auto bg-ivory px-5 md:px-12 lg:px-16 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-2xl"
      >
        <span className="block font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-charcoal/30 mb-2">
          For the Guestbook
        </span>
        <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-charcoal leading-tight mb-2">
          A Garland of Wishes
        </h2>
        <p className="font-sans text-sm md:text-base text-charcoal/40 leading-relaxed mb-4">
          Leave a birthday wish for Annisa. Every message becomes a part of her memory.
        </p>
        <div className="w-10 h-px bg-gold/60 mb-6" />
      </motion.div>

      {myWish ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-sm bg-warmbeige/30 border border-softgray/15 mb-6"
        >
          <span className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gold/60 mb-2">
            You&apos;ve already wished
          </span>
          <p className="font-serif text-sm italic text-charcoal/50 leading-relaxed mb-2">
            &ldquo;{myWish.message}&rdquo;
          </p>
          <span className="font-sans text-[10px] text-charcoal/20">
            {timeAgo(myWish.created_at)}
          </span>
        </motion.div>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <input
            value={name}
            onChange={(e) => { setName(e.target.value); if (nameTaken) { setNameTaken(false); setMyWish(null) } }}
            placeholder="Your name"
            maxLength={60}
            className={`${inputClasses} mb-1`}
          />
          {nameTaken && (
            <p className="font-sans text-[10px] text-dustrose mb-3">
              This name has already sent a wish.
            </p>
          )}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your wish..."
            rows={2}
            maxLength={500}
            className={`${inputClasses} mb-3`}
          />
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={!canSubmit}
              className="px-6 py-2.5 bg-charcoal text-ivory font-sans text-xs tracking-[0.2em] uppercase
                         disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending...' : sent ? 'Sent!' : 'Send Wish'}
            </button>
            <span className="font-sans text-[9px] text-charcoal/15">{message.length}/500</span>
          </div>
        </motion.form>
      )}

      <span className="block font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-charcoal/20 mb-4">
        {loading ? 'Loading...' : `${wishes.length} ${wishes.length === 1 ? 'Wish' : 'Wishes'}`}
      </span>

      {!loading && wishes.length === 0 ? (
        <p className="font-serif text-base italic text-charcoal/20 py-8">
          No wishes yet. Be the first to leave one.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {wishes.map((w, i) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.02, 0.4) }}
                className="p-4 rounded-sm bg-warmbeige/25 border border-softgray/15"
              >
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <span className="font-serif text-sm md:text-base text-charcoal font-semibold">
                    {w.name}
                  </span>
                  <span className="font-sans text-[8px] text-charcoal/20 shrink-0">
                    {timeAgo(w.created_at)}
                  </span>
                </div>
                <p className="font-sans text-sm md:text-[15px] text-charcoal/50 leading-relaxed">
                  {w.message}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
