import type { Variants } from 'framer-motion'

// ── Entrance Variants ──────────────────────────────────────────────────────────

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }, // spring-like overshoot
  },
}

export const cardFlipIn: Variants = {
  hidden: { opacity: 0, rotateX: -18, y: 36, scale: 0.94 },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
}

export const navItemVariant: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

// ── SVG / Draw Variants ────────────────────────────────────────────────────────

export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.8, ease: 'easeInOut' }, opacity: { duration: 0.3 } },
  },
}

export const drawPathFast: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1, ease: 'easeInOut' }, opacity: { duration: 0.2 } },
  },
}

export const drawPathSlow: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 3, ease: 'easeInOut' }, opacity: { duration: 0.4 } },
  },
}

// ── Stagger Containers ─────────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
}

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.02 },
  },
}

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.22, delayChildren: 0.1 },
  },
}

// ── Floating / Looping ────────────────────────────────────────────────────────

export const floatY: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-6, 6, -6],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const pulseGlow: Variants = {
  initial: { opacity: 0.4, scale: 1 },
  animate: {
    opacity: [0.4, 0.9, 0.4],
    scale: [1, 1.08, 1],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
  },
}

// ── Text Reveal Variants ───────────────────────────────────────────────────────

/** Letter-by-letter container — wrap each letter in a motion.span with `letterChild` */
export const letterContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.032, delayChildren: 0.04 },
  },
}

export const letterChild: Variants = {
  hidden: { opacity: 0, y: 24, rotateX: -40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Word-by-word container */
export const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
}

export const wordChild: Variants = {
  hidden: { opacity: 0, y: 32, skewY: 4 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

// ── Blur / Glass Variants ──────────────────────────────────────────────────────

export const blurFadeIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 16 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

export const blurScaleIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(20px)', scale: 0.88 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 0.85, ease: [0.34, 1.56, 0.64, 1] },
  },
}

// ── Spring / Bounce ────────────────────────────────────────────────────────────

export const springPopIn: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  },
}

export const springSlideUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 320, damping: 28 },
  },
}

// ── Reveal from clip-path ──────────────────────────────────────────────────────

export const clipRevealUp: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export const clipRevealLeft: Variants = {
  hidden: { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

// ── Enhanced Floating ──────────────────────────────────────────────────────────

export const floatRotate: Variants = {
  initial: { y: 0, rotate: 0 },
  animate: {
    y: [-8, 8, -8],
    rotate: [-2, 2, -2],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const floatScale: Variants = {
  initial: { y: 0, scale: 1 },
  animate: {
    y: [-6, 6, -6],
    scale: [1, 1.04, 1],
    transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
  },
}

export const breatheGlow: Variants = {
  initial: { opacity: 0.15, scale: 1 },
  animate: {
    opacity: [0.15, 0.45, 0.15],
    scale: [1, 1.2, 1],
    transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
  },
}

// ── Card 3-D Hover (use as whileHover) ────────────────────────────────────────
// Usage: <motion.div whileHover={tiltHoverLeft.hover} ...>

export const cardHover3D = {
  rest: { rotateY: 0, rotateX: 0, scale: 1 },
  hover: { rotateY: 6, rotateX: -4, scale: 1.03, transition: { duration: 0.35, ease: 'easeOut' } },
}

// ── Stagger with fade-blur ─────────────────────────────────────────────────────

export const staggerBlur: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

// ── Shimmer line (for decorative elements) ────────────────────────────────────

export const shimmerLine: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

// ── Glow pulse (border/bg) ────────────────────────────────────────────────────

export const glowPulse: Variants = {
  initial: { boxShadow: '0 0 0px rgba(249,112,21,0)' },
  animate: {
    boxShadow: [
      '0 0 0px rgba(249,112,21,0)',
      '0 0 30px rgba(249,112,21,0.5)',
      '0 0 0px rgba(249,112,21,0)',
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
  },
}
