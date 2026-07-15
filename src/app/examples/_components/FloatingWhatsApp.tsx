'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FloatingWhatsAppProps {
  phone: string
  message?: string
  company?: string
}

export default function FloatingWhatsApp({ phone, message = 'Hallo, ik heb een vraag!', company = 'Ons team' }: FloatingWhatsAppProps) {
  const [open, setOpen] = useState(false)
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            className="w-72 rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden"
          >
            <div className="bg-[#075e54] px-4 py-3 text-white">
              <p className="text-sm font-bold">{company}</p>
              <p className="text-xs text-white/70">Meestal antwoord binnen 1 uur</p>
            </div>
            <div className="p-4 bg-[#ece5dd]">
              <div className="bg-white rounded-lg p-3 shadow-sm text-sm text-slate-700 max-w-[85%]">
                Hallo! Hoe kunnen we u helpen?
              </div>
            </div>
            <div className="p-3 bg-white border-t border-slate-100">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#25d366] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#1fb855] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Start Gesprek
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Sluit WhatsApp chat' : 'Open WhatsApp chat'}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg shadow-green-500/30 hover:bg-[#1fb855] hover:scale-105 transition-all duration-200"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  )
}
