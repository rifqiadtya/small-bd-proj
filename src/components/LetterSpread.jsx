'use client'

import { motion } from 'framer-motion'

export default function LetterSpread() {
  return (
    <div className="w-full h-full bg-ivory overflow-y-auto">
      <div className="min-h-full px-6 md:px-16 lg:px-24 py-12 md:py-16 lg:py-20">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="block font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase text-charcoal/30 mb-4">
            Feature Story
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-charcoal leading-tight mb-2">
            Twenty-Six
          </h2>
          <div className="w-16 h-px bg-gold/60 mb-6" />
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="font-serif text-lg md:text-xl leading-relaxed text-charcoal/70 mb-6 italic">
              There are years that ask questions and years that answer them. Twenty-six arrives quietly, carrying both.
            </p>
            <p className="font-sans text-base md:text-[15px] leading-[1.8] text-charcoal/60 mb-6">
              So, twenty-six.
            </p>
            <p className="font-sans text-base md:text-[15px] leading-[1.8] text-charcoal/60 mb-6">
              It&rsquo;s a funny kind of age, isn&rsquo;t it? You&rsquo;re definitely not a kid anymore, but you&rsquo;re also not entirely sure you&rsquo;ve got this whole &ldquo;adulting&rdquo; thing completely figured out. And honestly? That is completely fine. This is usually the time when we start letting go of the pressure to be perfect and just focus on being okay with who we are.
            </p>
            <p className="font-sans text-base md:text-[15px] leading-[1.8] text-charcoal/60 mb-6">
              Thank you for navigating through the messiness of life, for growing through the quiet moments, and for making it this far just by being you. The world moves way too fast sometimes, but you&rsquo;ve managed to find your own rhythm.
            </p>
            <p className="font-sans text-base md:text-[15px] leading-[1.8] text-charcoal/60 mb-6">
              As you step into this new chapter, I hope you keep finding ways to grow. May you continue to improve yourself in whatever way feels right to you, whether it&rsquo;s learning something new, becoming kinder to yourself, or just getting a little better at handling life&rsquo;s curveballs.
            </p>
            <p className="font-sans text-base md:text-[15px] leading-[1.8] text-charcoal/60">
              Part of that growth is learning to sit with your feelings. I hope this year brings you a better grip on your emotions, giving you the space to pause before you react. Whenever anger knocks on the door, I hope you find the grace to filter your words, choosing peace over a quick reaction. There&rsquo;s no rush in any of this, because every small step counts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="bg-warmbeige/20 p-6 md:p-8 lg:p-10 rounded-sm mb-6">
              <span className="block font-serif text-xs tracking-[0.2em] uppercase text-gold/60 mb-3">
                A Note on this Page
              </span>
              <p className="font-sans text-sm leading-relaxed text-charcoal/50">
                Happy birthday, Annisa. Cheers to a peaceful mind, a healthy year, and the beautiful process of becoming who you&rsquo;re meant to be. Take it easy today.
              </p>
            </div>

            <div className="border-l-2 border-gold/30 pl-4 md:pl-6">
              <p className="font-serif text-base md:text-lg italic text-charcoal/50 leading-relaxed">
                &ldquo;I hope twenty-six treats you gently. Less overthinking, more breathing room, and plenty of those random, genuine moments that make you smile for no reason.&rdquo;
              </p>
              <span className="block font-sans text-[10px] tracking-widest uppercase text-charcoal/20 mt-3">
                — Have A Wonderful Day
              </span>
            </div>
          </motion.div>
        </div>


      </div>
    </div>
  )
}
