'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

export interface Testimonial {
  name: string
  role: string
  text: string
  rating: number
  avatar: string
  date: string
}

interface Props {
  testimonials: Testimonial[]
  accentColor?: string
  title?: string
  subtitle?: string
}

function Stars({ count, color }: { count: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4"
          fill={i < Math.floor(count) ? color : i < count ? color : 'transparent'}
          stroke={i < count ? color : '#cbd5e1'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}

export default function TestimonialsSlider({ testimonials, accentColor = '#0ea5e9', title = 'Wat klanten zeggen', subtitle }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 340
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const avg = (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1)

  return (
    <section ref={sectionRef} className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            {subtitle && <span className="text-xs font-bold tracking-[0.2em] uppercase mb-3 block" style={{ color: accentColor }}>{subtitle}</span>}
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h2>
            <div className="flex items-center gap-3 mt-3">
              <Stars count={parseFloat(avg)} color={accentColor} />
              <span className="text-sm font-bold text-slate-700">{avg}</span>
              <span className="text-sm text-slate-400">· {testimonials.length} beoordelingen</span>
            </div>
          </motion.div>
          <div className="flex gap-2">
            <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-slate-400 transition-colors" aria-label="Vorige">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-slate-400 transition-colors" aria-label="Volgende">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-2 px-2 snap-x snap-mandatory">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="min-w-[300px] max-w-[340px] bg-white rounded-2xl p-6 border border-slate-200 flex-shrink-0 snap-start hover:shadow-lg transition-shadow"
            >
              <Quote className="w-8 h-8 mb-3 opacity-15" style={{ color: accentColor }} />
              <p className="text-sm text-slate-600 leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
              <Stars count={t.rating} color={accentColor} />
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                  <Image src={t.avatar} alt={t.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{t.name}</p>
                  <p className="text-xs text-slate-500 truncate">{t.role}</p>
                </div>
                <span className="text-[10px] text-slate-400 ml-auto whitespace-nowrap">{t.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
