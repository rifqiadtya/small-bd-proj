'use client'

import { useState, useEffect } from 'react'
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
    document.body.style.overflow = 'auto'
    fetchWishes()
    return () => { document.body.style.overflow = '' }
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
    <div className="min-h-screen bg-ivory">
      <div className="max-w-2xl mx-auto px-5 py-10 md:py-16">
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-5xl text-charcoal leading-tight mb-2">
            A Garland of Wishes
          </h1>
          <p className="font-sans text-sm md:text-base text-charcoal/40 max-w-md mx-auto">
            Leave a birthday wish for Annisa. Every message becomes a part of her memory.
          </p>
          <div className="w-10 h-px bg-gold/60 mx-auto mt-4" />
        </div>

        {myWish ? (
          <div className="p-5 rounded-sm bg-warmbeige/30 border border-softgray/15 mb-8 text-center max-w-md mx-auto">
            <span className="block font-sans text-[9px] tracking-[0.2em] uppercase text-gold/60 mb-2">
              You&apos;ve already wished
            </span>
            <p className="font-serif text-sm italic text-charcoal/50 leading-relaxed mb-2">
              &ldquo;{myWish.message}&rdquo;
            </p>
            <span className="font-sans text-[10px] text-charcoal/20">{timeAgo(myWish.created_at)}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-10">
            <input
              value={name}
              onChange={(e) => { setName(e.target.value); if (nameTaken) { setNameTaken(false); setMyWish(null) } }}
              placeholder="Your name"
              maxLength={60}
              className="w-full bg-transparent border-b border-softgray/30 px-0 py-3 font-serif text-lg text-charcoal/70 placeholder:text-charcoal/20 focus:outline-none focus:border-gold/40 transition-colors duration-500 resize-none mb-1"
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
              rows={3}
              maxLength={500}
              className="w-full bg-transparent border-b border-softgray/30 px-0 py-3 font-serif text-lg text-charcoal/70 placeholder:text-charcoal/20 focus:outline-none focus:border-gold/40 transition-colors duration-500 resize-none mb-4"
            />
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={!canSubmit}
                className="px-8 py-3 bg-charcoal text-ivory font-sans text-xs tracking-[0.2em] uppercase
                           disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {sending ? 'Sending...' : sent ? 'Sent!' : 'Send Wish'}
              </button>
              <span className="font-sans text-[9px] text-charcoal/15">{message.length}/500</span>
            </div>
          </form>
        )}

        <span className="block text-center font-sans text-[9px] tracking-[0.3em] uppercase text-charcoal/20 mb-4">
          {loading ? 'Loading...' : `${wishes.length} ${wishes.length === 1 ? 'Wish' : 'Wishes'}`}
        </span>

        {!loading && wishes.length === 0 ? (
          <p className="font-serif text-base italic text-charcoal/20 text-center py-8">
            No wishes yet. Be the first to leave one.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 max-w-2xl mx-auto">
            {wishes.map((w, i) => (
              <div
                key={w.id}
                className="p-4 rounded-sm bg-warmbeige/25 border border-softgray/15"
              >
                <div className="flex items-baseline justify-between gap-3 mb-1">
                  <span className="font-serif text-sm text-charcoal font-semibold">{w.name}</span>
                  <span className="font-sans text-[8px] text-charcoal/20 shrink-0">{timeAgo(w.created_at)}</span>
                </div>
                <p className="font-sans text-sm text-charcoal/50 leading-relaxed">{w.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
