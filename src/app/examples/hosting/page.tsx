'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Server, HardDrive, Globe, Shield, Activity, Upload, Download, Clock, RefreshCw, ChevronRight, CheckCircle2, AlertTriangle, Loader2, Cpu, MemoryStick, Wifi, Gauge, Bell, X, HomeIcon } from 'lucide-react'
import { toast } from 'sonner'
import { CONTACT } from '@/lib/contact'
import Link from 'next/link'

/* ─── Logo ─── */
function HostingLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#0ea5e9" />
      <rect x="12" y="12" width="24" height="6" rx="2" fill="white" />
      <rect x="12" y="22" width="24" height="6" rx="2" fill="white" opacity="0.7" />
      <rect x="12" y="32" width="24" height="6" rx="2" fill="white" opacity="0.4" />
      <circle cx="32" cy="15" r="1.5" fill="#22c55e" />
      <circle cx="32" cy="25" r="1.5" fill="#22c55e" />
      <circle cx="32" cy="35" r="1.5" fill="#eab308" />
    </svg>
  )
}

const uptimeData = [
  { uur: '0:00', responstijd: 42, bezoekers: 18 }, { uur: '1:00', responstijd: 38, bezoekers: 12 },
  { uur: '2:00', responstijd: 35, bezoekers: 8 }, { uur: '3:00', responstijd: 34, bezoekers: 5 },
  { uur: '4:00', responstijd: 36, bezoekers: 7 }, { uur: '5:00', responstijd: 40, bezoekers: 14 },
  { uur: '6:00', responstijd: 48, bezoekers: 32 }, { uur: '7:00', responstijd: 55, bezoekers: 58 },
  { uur: '8:00', responstijd: 62, bezoekers: 85 }, { uur: '9:00', responstijd: 68, bezoekers: 105 },
  { uur: '10:00', responstijd: 72, bezoekers: 118 }, { uur: '11:00', responstijd: 78, bezoekers: 132 },
  { uur: '12:00', responstijd: 95, bezoekers: 145 }, { uur: '13:00', responstijd: 88, bezoekers: 138 },
  { uur: '14:00', responstijd: 82, bezoekers: 125 }, { uur: '15:00', responstijd: 76, bezoekers: 110 },
  { uur: '16:00', responstijd: 70, bezoekers: 98 }, { uur: '17:00', responstijd: 65, bezoekers: 88 },
  { uur: '18:00', responstijd: 58, bezoekers: 72 }, { uur: '19:00', responstijd: 63, bezoekers: 82 },
  { uur: '20:00', responstijd: 68, bezoekers: 90 }, { uur: '21:00', responstijd: 60, bezoekers: 65 },
  { uur: '22:00', responstijd: 52, bezoekers: 42 }, { uur: '23:00', responstijd: 45, bezoekers: 25 },
]

const services = [
  { name: 'Webserver (Nginx)', status: 'online' as const, uptime: '99.98%', icon: Globe, detail: 'v1.24.0 · 2 workers' },
  { name: 'Database (MySQL)', status: 'online' as const, uptime: '99.95%', icon: HardDrive, detail: '8.0.35 · 142 queries/s' },
  { name: 'SSL Certificaat', status: 'online' as const, uptime: 'Geldig tot 2026', icon: Shield, detail: "Let's Encrypt · RSA 2048" },
  { name: 'Mail Server (SMTP)', status: 'warning' as const, uptime: '98.2%', icon: Activity, detail: 'Queue: 12 berichten · hoge latency' },
  { name: 'CDN (Cloudflare)', status: 'online' as const, uptime: '100%', icon: Wifi, detail: 'Edge nodes: 4 · Cache hit: 94%' },
  { name: 'Backup Service', status: 'online' as const, uptime: 'Laatste: 3u geleden', icon: Upload, detail: 'Dagelijks om 03:00 · Retentie: 30d' },
]

const notifications = [
  { id: 1, type: 'warning', title: 'Mail Server hoge latency', desc: 'SMTP queue loopt op. 12 berichten wachtend.', time: '14 min geleden' },
  { id: 2, type: 'success', title: 'Automatische backup voltooid', desc: 'Dagelijkse backup succesvol · 2.4 GB', time: '3 uur geleden' },
  { id: 3, type: 'info', title: 'SSL certificaat vernieuwd', desc: "Let's Encrypt certificaat automatisch vernieuwd.", time: '2 dagen geleden' },
  { id: 4, type: 'success', title: 'Beveiligingsupdate geïnstalleerd', desc: 'Serverpakketten bijgewerkt, geen downtime.', time: '3 dagen geleden' },
]

const plans = [
  { name: 'Basic Hosting', price: '$20', features: ['10 GB opslag', '100 GB bandbreedte', 'SSL inbegrepen', 'Dagelijkse back-ups', 'Uptime monitoring'], current: true },
  { name: 'Business Hosting', price: '$30', features: ['50 GB opslag', 'Onbeperkte bandbreedte', 'SSL + CDN inbegrepen', 'Dagelijkse back-ups', 'Voorrang bij support'], current: false },
]

const backups = [
  { date: '15 Dec 2025 · 03:00', size: '2.4 GB', type: 'Automatisch', status: 'success' },
  { date: '14 Dec 2025 · 03:00', size: '2.4 GB', type: 'Automatisch', status: 'success' },
  { date: '13 Dec 2025 · 14:22', size: '2.3 GB', type: 'Handmatig', status: 'success' },
  { date: '13 Dec 2025 · 03:00', size: '2.3 GB', type: 'Automatisch', status: 'success' },
  { date: '12 Dec 2025 · 03:00', size: '2.3 GB', type: 'Automatisch', status: 'failed' },
]

export default function HostingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [backupLoading, setBackupLoading] = useState(false)
  const [backupStage, setBackupStage] = useState('')
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [confirmRestart, setConfirmRestart] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [readNotifs, setReadNotifs] = useState<number[]>([])
  const [activeNav, setActiveNav] = useState('dashboard')
  const unreadCount = notifications.filter(n => !readNotifs.includes(n.id)).length

  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 1200); return () => clearTimeout(t) }, [])

  const handleBackup = () => {
    setBackupLoading(true)
    const stages = ['Verbinding maken...', 'Bestanden scannen...', 'Comprimeren...', 'Uploaden...', 'Verifiëren...']
    let i = 0
    setBackupStage(stages[0])
    const interval = setInterval(() => {
      i++
      if (i < stages.length) { setBackupStage(stages[i]) }
      else {
        clearInterval(interval)
        setBackupLoading(false)
        setBackupStage('')
        toast.success('Back-up aangemaakt (voorbeeld)', { description: 'In uw eigen paneel staat hier de nieuwe back-up met datum en omvang.' })
      }
    }, 800)
  }

  const handleRestart = () => {
    setConfirmRestart(false)
    toast.info('Herstart is uitgeschakeld in dit voorbeeld', { description: 'In uw eigen paneel start deze knop de server opnieuw op.' })
  }

  const cpuUsage = 34
  const ramUsage = 62
  const diskUsage = 48
  const bandwidthUsage = 27

  // Beheerpaneel: neutrale interfaceletter. Zet de kopletter voor deze hele
  // demo, zodat elk voorbeeld een eigen gezicht heeft in plaats van dat van
  // NextX.
  return (
    <div
      style={{ '--font-heading': 'var(--font-demo-product)' } as React.CSSProperties}
      className="min-h-screen bg-slate-50 pb-16 md:pb-0"
    >
      {/* ═══ HEADER ═══ */}
      <header className="sticky top-10 z-20 bg-slate-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HostingLogo size={28} />
            <div className="hidden sm:block">
              <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Hosting Panel</span>
              <span className="text-[10px] text-slate-400 block -mt-0.5">mijnbedrijf.sr</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Alle systemen online
            </span>
            {/* Notification bell */}
            <div className="relative">
              <button onClick={() => { setNotifOpen(!notifOpen); setReadNotifs(notifications.map(n => n.id)) }} className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors" aria-label="Notificaties">
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{unreadCount}</span>}
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50">
                    <div className="p-3 border-b border-slate-100 flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Notificaties</span>
                      <button onClick={() => setNotifOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.map(n => (
                        <div key={n.id} className="px-3 py-2.5 border-b border-slate-50 hover:bg-slate-50/50">
                          <div className="flex items-start gap-2">
                            <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.type === 'warning' ? 'bg-amber-400' : n.type === 'success' ? 'bg-green-400' : 'bg-sky-400'}`} />
                            <div>
                              <p className="text-xs font-bold text-slate-900">{n.title}</p>
                              <p className="text-[11px] text-slate-500">{n.desc}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={() => setShowUpgrade(true)} className="px-3 py-1.5 bg-sky-500 text-white text-xs font-bold rounded-lg hover:bg-sky-600 transition-colors hidden sm:block">
              Upgrade Plan
            </button>
          </div>
        </div>
      </header>

      {/* ═══ LOADING SKELETON ═══ */}
      {isLoading ? (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 animate-pulse">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[1,2,3,4].map(i => <div key={i} className="bg-white rounded-xl h-24 border border-slate-200" />)}
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {[1,2].map(i => <div key={i} className="bg-white rounded-xl h-64 border border-slate-200" />)}
          </div>
          <div className="bg-white rounded-xl h-48 border border-slate-200" />
        </div>
      ) : (

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* ═══ RESOURCE METERS ═══ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'CPU', value: cpuUsage, icon: Cpu, color: '#0ea5e9' },
            { label: 'RAM', value: ramUsage, icon: MemoryStick, color: '#8b5cf6' },
            { label: 'Opslag', value: diskUsage, icon: HardDrive, color: '#f59e0b' },
            { label: 'Bandbreedte', value: bandwidthUsage, icon: Gauge, color: '#10b981' },
          ].map(r => (
            <div key={r.label} className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <r.icon className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-700">{r.label}</span>
                </div>
                <span className="text-lg font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>{r.value}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${r.value}%` }} transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full" style={{ backgroundColor: r.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* ═══ CHARTS ═══ */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-900 text-sm mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Responstijd (ms)</h3>
            <p className="text-xs text-slate-400 mb-4">Afgelopen 24 uur · Gem. 62ms</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={uptimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="uur" fontSize={10} tickLine={false} axisLine={false} interval={3} />
                  <YAxis fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="responstijd" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-900 text-sm mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Bezoekers</h3>
            <p className="text-xs text-slate-400 mb-4">Afgelopen 24 uur · Totaal: 1.240</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={uptimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="uur" fontSize={10} tickLine={false} axisLine={false} interval={3} />
                  <YAxis fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="bezoekers" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ═══ SERVICES + ACTIONS ═══ */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Services Status</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {services.map(s => (
                <div key={s.name} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50/50 transition-colors">
                  <s.icon className="w-4 h-4 text-slate-400" />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-slate-900 block">{s.name}</span>
                    <span className="text-[11px] text-slate-400">{s.detail}</span>
                  </div>
                  <span className="text-xs text-slate-500 hidden sm:block">{s.uptime}</span>
                  <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${s.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.status === 'online' ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
                    {s.status === 'online' ? 'Online' : 'Aandacht'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={handleBackup} disabled={backupLoading}
              className="w-full bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow text-left disabled:opacity-70">
              <div className="flex items-center gap-3">
                {backupLoading ? <Loader2 className="w-5 h-5 text-sky-500 animate-spin" /> : <Upload className="w-5 h-5 text-sky-500" />}
                <div className="flex-1">
                  <p className="font-bold text-sm text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>
                    {backupLoading ? 'Backup bezig...' : 'Maak backup'}
                  </p>
                  <p className="text-xs text-slate-500">{backupStage || 'Handmatige server backup starten'}</p>
                </div>
              </div>
              {backupLoading && (
                <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-sky-500 rounded-full" initial={{ width: '5%' }} animate={{ width: '90%' }} transition={{ duration: 4, ease: 'linear' }} />
                </div>
              )}
            </button>
            <button onClick={() => setConfirmRestart(true)}
              className="w-full bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow text-left">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="font-bold text-sm text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Herstart server</p>
                  <p className="text-xs text-slate-500">~30 sec downtime</p>
                </div>
              </div>
            </button>
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-slate-400" />
                <p className="font-bold text-sm text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>Uptime</p>
              </div>
              <p className="text-3xl font-bold text-green-600" style={{ fontFamily: 'var(--font-heading)' }}>99.97%</p>
              <p className="text-xs text-slate-500 mt-1">Laatste 30 dagen · 13 min downtime</p>
            </div>
          </div>
        </div>

        {/* ═══ BACKUPS ═══ */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Recente backups</h3>
          </div>
          <div className="divide-y divide-slate-50">
            {backups.map((b, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 text-sm">
                {b.status === 'success' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-red-500" />}
                <span className="text-slate-900 flex-1">{b.date}</span>
                <span className="text-xs text-slate-500">{b.size}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${b.type === 'Handmatig' ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-600'}`}>{b.type}</span>
                <button onClick={() => toast.info(`Terugzetten van ${b.date} is uitgeschakeld in dit voorbeeld`)}
                  className="text-xs text-sky-600 hover:underline flex items-center gap-0.5">
                  <Download className="w-3 h-3" /> Restore
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      )} {/* end loading skeleton conditional */}

      {/* ═══ CONFIRM RESTART ═══ */}
      <AnimatePresence>
        {confirmRestart && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setConfirmRestart(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4 mx-auto">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 text-center mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Server herstarten?</h3>
              <p className="text-sm text-slate-500 text-center mb-6">Uw website zal ongeveer 30 seconden offline zijn. Alle actieve verbindingen worden verbroken.</p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmRestart(false)} className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">Annuleren</button>
                <button onClick={handleRestart} className="flex-1 py-2.5 bg-amber-500 text-white font-bold rounded-xl text-sm hover:bg-amber-600 transition-colors">Herstarten</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ UPGRADE MODAL ═══ */}
      <AnimatePresence>
        {showUpgrade && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowUpgrade(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
              <h3 className="text-xl font-bold text-slate-900 text-center mb-6" style={{ fontFamily: 'var(--font-heading)' }}>Kies uw plan</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {plans.map(p => (
                  <div key={p.name} className={`rounded-xl p-5 border-2 ${p.current ? 'border-sky-500 bg-sky-50' : 'border-slate-200'} relative`}>
                    {p.current && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-sky-500 text-white text-[10px] font-bold rounded-full">Huidig plan</span>}
                    <h4 className="font-bold text-slate-900 mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{p.name}</h4>
                    <p className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'var(--font-heading)' }}>{p.price}<span className="text-sm font-normal text-slate-500">/mnd</span></p>
                    <ul className="space-y-2 mb-4">
                      {p.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-xs text-slate-600"><CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />{f}</li>
                      ))}
                    </ul>
                    {p.current ? (
                      <span className="block w-full rounded-lg bg-slate-200 py-2 text-center text-sm font-bold text-slate-600">
                        Huidig plan
                      </span>
                    ) : (
                      <Link href={`/contact?dienst=${encodeURIComponent(p.name)}`}
                        className="flex w-full items-center justify-center rounded-lg bg-sky-500 py-2 text-sm font-bold text-white transition-colors hover:bg-sky-600">
                        Upgrade aanvragen <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3"><HostingLogo size={24} /><span className="font-bold text-white text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Hosting Panel</span></div>
              <p className="text-xs text-slate-400 leading-relaxed">Voorbeeld van een hostingpaneel zoals klanten dat van ons krijgen: status, verbruik en back-ups op één scherm.</p>
            </div>
            <div>
              <h4 className="font-bold text-white text-xs mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Diensten</h4>
              <div className="space-y-1.5 text-xs text-slate-400">
                <p>Webhosting</p><p>VPS Hosting</p><p>Domeinregistratie</p><p>SSL Certificaten</p><p>E-mail Hosting</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-xs mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Support</h4>
              <div className="space-y-1.5 text-xs text-slate-400">
                <p>Kennisbank</p><p>Ticket systeem</p><p>Status pagina</p><p>API Documentatie</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-xs mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Contact</h4>
              <div className="space-y-1.5 text-xs text-slate-400">
                <p>{CONTACT.location}</p><p>{CONTACT.email}</p><p>{CONTACT.phoneDisplay}</p>

              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[11px] text-slate-500">© {new Date().getFullYear()} Hosting Panel · Paramaribo, Suriname</p>
            <p className="text-[11px] text-slate-500">Powered by NextX Agency · Server data gesimuleerd</p>
          </div>
        </div>
      </footer>

      {/* ═══ MOBILE BOTTOM NAV ═══ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-slate-800 z-40 flex justify-around py-2">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
          { id: 'services', label: 'Services', icon: Server },
          { id: 'backups', label: 'Backups', icon: Upload },
          { id: 'plan', label: 'Plan', icon: Gauge },
        ].map(n => (
          <button key={n.id} onClick={() => { setActiveNav(n.id); if (n.id === 'plan') setShowUpgrade(true) }}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${activeNav === n.id ? 'text-sky-400' : 'text-slate-500'}`}>
            <n.icon className="w-5 h-5" />
            <span className="text-[10px] font-bold">{n.label}</span>
          </button>
        ))}
      </nav>

    </div>
  )
}
