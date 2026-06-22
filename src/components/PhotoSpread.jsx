'use client'

import { motion } from 'framer-motion'

const PHOTOS = [
  {
    id: 1, src: '/images/photo-2.jpg',
    type: 'portrait', span: 'col-span-2 row-span-2',
    caption: 'Editorial portrait — natural light, candid composure.',
  },
  {
    id: 2, src: '/images/photo-3.jpg',
    type: 'landscape', span: 'col-span-2 row-span-2',
    caption: 'Environmental frame — a quiet moment in the afternoon.',
  },
  {
    id: 3, src: '/images/photo-4.jpg',
    type: 'portrait', span: 'col-span-1 row-span-2',
    caption: 'Detail study — texture and shadow interplay.',
  },
  {
    id: 4, src: '/images/photo-5.jpg',
    type: 'landscape', span: 'col-span-2 row-span-1',
    caption: 'Wide composition — space, light, and stillness.',
  },
  {
    id: 5, src: '/images/photo-6.jpg',
    type: 'portrait', span: 'col-span-1 row-span-2',
    caption: 'Close portrait — intimate and direct.',
  },
  {
    id: 6, src: '/images/photo-7.jpg',
    type: 'landscape', span: 'col-span-2 row-span-1',
    caption: 'Final frame — the closing image of the spread.',
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function PhotoSpread() {
  return (
    <div className="w-full h-full bg-ivory overflow-y-auto">
      <div className="min-h-full px-4 md:px-8 lg:px-12 py-8 md:py-10">
        <motion.div
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="block font-sans text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-charcoal/30 mb-2">
            Editorial Spread
          </span>
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-charcoal leading-tight">
            The Twenty-Sixth Issue
          </h2>
          <div className="w-10 h-px bg-gold/60 mt-3" />
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 auto-rows-[80px] md:auto-rows-[120px]"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {PHOTOS.map((photo) => (
            <motion.div
              key={photo.id}
              variants={item}
              className={`${photo.span} relative overflow-hidden group`}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover object-center"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-3"
                style={{
                  background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)',
                }}
              >
                <span className="font-sans text-[9px] md:text-[10px] text-white/70 tracking-wider">
                  {photo.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-5 md:mt-6 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          <span className="font-sans text-[9px] md:text-[10px] tracking-widest text-charcoal/20 uppercase">
            6 Frames
          </span>
          <div className="flex-1 h-px bg-softgray/25" />
          <span className="font-serif text-[10px] italic text-charcoal/20">
            Hover to reveal captions
          </span>
        </motion.div>
      </div>
    </div>
  )
}
