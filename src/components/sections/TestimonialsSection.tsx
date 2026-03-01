'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import {
  fadeInUp,
  blurFadeIn,
  staggerContainer,
  staggerContainerSlow,
  cardFlipIn,
  scaleIn,
} from '@/lib/animationUtils'
import { SpotlightCard } from '@/components/animated/SpotlightCard'

const testimonials = [
  {
    quote:
      'NextX heeft onze complete online aanwezigheid opgezet. Van logo tot website, alles in twee weken geleverd. Echt indrukwekkend!',
    name: 'Maria Tjin-A-Lim',
    role: 'Eigenaar, Tjin Catering',
    stars: 5,
  },
  {
    quote:
      'Eindelijk een agency die begrijpt hoe de Surinaamse markt werkt. Betaalbaar, snel en altijd bereikbaar via WhatsApp.',
    name: 'Ravin Parbhudayal',
    role: 'Directeur, RP Trading',
    stars: 5,
  },
  {
    quote:
      'Onze webshop draait fantastisch. Het team denkt echt mee en geeft ook na oplevering nog support. Aanrader!',
    name: 'Sharmila Kasanmoenadi',
    role: 'Founder, Suri Style Boutique',
    stars: 5,
  },
] as const

function TestimonialsSectionFn() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden bg-[#050911]">
      {/* Subtle background grid */}
      <div className="absolute inset-0 bg-blueprint-grid pointer-events-none opacity-50" />
      {/* Aurora overlay */}
      <div className="aurora-bg absolute inset-0 pointer-events-none opacity-40" />
      {/* Dot pattern */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-dots opacity-20 pointer-events-none" />
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div variants={scaleIn} className="inline-flex badge bg-primary-muted text-primary border border-primary/30 mb-4">
            Klantervaring
          </motion.div>
          <motion.h2 variants={blurFadeIn} className="text-headline text-foreground mb-4">
            Wat onze klanten{" "}
            <span className="gradient-text-animated">zeggen</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Wij bouwen langdurige relaties met onze klanten. Hier zijn enkele
            ervaringen.
          </motion.p>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={cardFlipIn}
              className="group"
            >
              <SpotlightCard className="h-full hover-lift holo-card rounded-xl">
                <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden h-full flex flex-col">
                  {/* Hover glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 pointer-events-none transition-all duration-500 rounded-xl" />
                  {/* Animated SVG quote mark */}
                  <div className="relative mb-2">
                    <svg className="w-14 h-14 text-primary/30 icon-glow" viewBox="0 0 40 30" fill="none" aria-hidden="true">
                  <motion.path
                    d="M5 28 C 2 22, 2 16, 8 10 C 12 6, 16 5, 18 6 L 16 12 C 13 11, 11 13, 10 16 L 16 16 L 16 28 Z"
                    fill="currentColor"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    style={{ transformOrigin: '10px 18px' }}
                  />
                  <motion.path
                    d="M25 28 C 22 22, 22 16, 28 10 C 32 6, 36 5, 38 6 L 36 12 C 33 11, 31 13, 30 16 L 36 16 L 36 28 Z"
                    fill="currentColor"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                    style={{ transformOrigin: '30px 18px' }}
                  />
                </svg>
              </div>

              {/* Quote text */}
                  <motion.p
                    className="text-muted-foreground italic mb-6 text-sm leading-relaxed flex-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {testimonial.quote}
              </motion.p>

              {/* Stars — staggered */}
              <motion.div
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex gap-1 mb-4"
              >
                {Array.from({ length: testimonial.stars }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -20 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12, delay: i * 0.07 }}
                  >
                    <Star size={16} className="text-primary fill-primary" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Author */}
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-caption text-muted-foreground">{testimonial.role}</p>
              </div>

                  {/* Corner accent */}
                  <span className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-primary/40 group-hover:border-primary/80 transition-colors duration-300" />
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


export { TestimonialsSectionFn as TestimonialsSection }