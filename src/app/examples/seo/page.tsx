'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { TrendingUp, TrendingDown, Eye, MousePointerClick, Globe, Search, ArrowUpRight, ArrowDownRight, Download, Calendar, ExternalLink, ChevronUp, ChevronDown, Target, Zap } from 'lucide-react'
import { toast } from 'sonner'

/* ─── Logo ─── */
function SeoLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="12" fill="#059669" />
      <path d="M14 34L20 24L26 28L34 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="34" r="2" fill="white" />
      <circle cx="34" cy="14" r="2" fill="white" />
    </svg>
  )
}

const trafficData = [
  { maand: 'Jan', organisch: 1200, betaald: 400 },
  { maand: 'Feb', organisch: 1450, betaald: 380 },
  { maand: 'Mrt', organisch: 1780, betaald: 420 },
  { maand: 'Apr', organisch: 2100, betaald: 390 },
  { maand: 'Mei', organisch: 2650, betaald: 410 },
  { maand: 'Jun', organisch: 3200, betaald: 450 },
  { maand: 'Jul', organisch: 3800, betaald: 470 },
  { maand: 'Aug', organisch: 4200, betaald: 440 },
  { maand: 'Sep', organisch: 4800, betaald: 480 },
  { maand: 'Okt', organisch: 5400, betaald: 500 },
  { maand: 'Nov', organisch: 6100, betaald: 520 },
  { maand: 'Dec', organisch: 6800, betaald: 540 },
]

const positionData = [
  { week: 'W1', positie: 42 }, { week: 'W4', positie: 38 }, { week: 'W8', positie: 29 },
  { week: 'W12', positie: 21 }, { week: 'W16', positie: 15 }, { week: 'W20', positie: 9 },
  { week: 'W24', positie: 6 }, { week: 'W28', positie: 4 }, { week: 'W32', positie: 3 },
]

type Keyword = { keyword: string; positie: number; verandering: number; volume: number; url: string }

const keywords: Keyword[] = [
  { keyword: 'webdesign suriname', positie: 1, verandering: 3, volume: 880, url: '/diensten/webdesign' },
  { keyword: 'website laten maken paramaribo', positie: 2, verandering: 5, volume: 590, url: '/diensten/websites' },
  { keyword: 'seo bureau suriname', positie: 3, verandering: 8, volume: 320, url: '/diensten/seo' },
  { keyword: 'e-commerce suriname', positie: 4, verandering: 2, volume: 410, url: '/diensten/webshop' },
  { keyword: 'online marketing paramaribo', positie: 5, verandering: -1, volume: 260, url: '/diensten/marketing' },
  { keyword: 'logo ontwerp suriname', positie: 7, verandering: 4, volume: 480, url: '/diensten/branding' },
  { keyword: 'hosting suriname', positie: 8, verandering: 12, volume: 350, url: '/diensten/hosting' },
  { keyword: 'responsive website kosten', positie: 11, verandering: 6, volume: 210, url: '/prijzen' },
  { keyword: 'social media management sr', positie: 14, verandering: -2, volume: 180, url: '/diensten/social' },
  { keyword: 'wordpress developer suriname', positie: 18, verandering: 9, volume: 140, url: '/diensten/wordpress' },
]

const periods = ['30 dagen', '60 dagen', '90 dagen']

export default function SeoDashboardPage() {
  const [period, setPeriod] = useState('90 dagen')
  const [sortBy, setSortBy] = useState<'positie' | 'verandering' | 'volume'>('positie')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const handleSort = (col: 'positie' | 'verandering' | 'volume') => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortBy(col); setSortDir(col === 'verandering' ? 'desc' : 'asc') }
  }

  const sorted = [...keywords].sort((a, b) => {
    const mul = sortDir === 'asc' ? 1 : -1
    return (a[sortBy] - b[sortBy]) * mul
  })

  const dataSlice = period === '30 dagen' ? trafficData.slice(-4) : period === '60 dagen' ? trafficData.slice(-8) : trafficData

  const stats = [
    { label: 'Organisch verkeer', value: '6.800', change: '+467%', up: true, icon: Eye, color: 'bg-green-50 text-green-600' },
    { label: 'Gem. positie', value: '3.2', change: '+92%', up: true, icon: Target, color: 'bg-blue-50 text-blue-600' },
    { label: 'Click-through rate', value: '8.4%', change: '+2.1%', up: true, icon: MousePointerClick, color: 'bg-violet-50 text-violet-600' },
    { label: 'Domain Authority', value: '42', change: '+18', up: true, icon: Zap, color: 'bg-amber-50 text-amber-600' },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ═══ HEADER ═══ */}
      <header className="sticky top-10 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SeoLogo size={28} />
            <div className="hidden sm:block">
              <span className="text-sm font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>SEO Dashboard</span>
              <span className="text-[10px] text-slate-400 block -mt-0.5">klantportaal — demo</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 rounded-lg p-0.5">
              {periods.map(p => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${period === p ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                  <Calendar className="w-3 h-3 inline mr-1" />{p}
                </button>
              ))}
            </div>
            <button onClick={() => toast.success('Rapport wordt gegenereerd...', { description: 'PDF wordt samengesteld en gemaild naar uw inbox.' })}
              className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors hidden sm:flex items-center gap-1">
              <Download className="w-3 h-3" /> Export
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* ═══ STATS ═══ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map(s => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center`}><s.icon className="w-4 h-4" /></div>
                <span className={`flex items-center gap-0.5 text-xs font-bold ${s.up ? 'text-green-500' : 'text-red-500'}`}>
                  {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{s.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'var(--font-heading)' }}>{s.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ═══ CHARTS ROW ═══ */}
        <div className="grid lg:grid-cols-5 gap-4">
          {/* Traffic chart */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Verkeer overzicht</h3>
                <p className="text-xs text-slate-400">Organisch vs betaald</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Organisch</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" /> Betaald</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 600, height: 256 }}>
                <BarChart data={dataSlice}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="maand" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                  <Bar dataKey="organisch" fill="#059669" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="betaald" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Position chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
            <div className="mb-4">
              <h3 className="font-bold text-slate-900 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Gem. positie trend</h3>
              <p className="text-xs text-slate-400">Lager = beter</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 400, height: 256 }}>
                <AreaChart data={positionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="week" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis fontSize={11} tickLine={false} axisLine={false} reversed />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="positie" stroke="#059669" fill="#059669" fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ═══ KEYWORDS TABLE ═══ */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Top zoekwoorden</h3>
              <p className="text-xs text-slate-400">{keywords.length} zoekwoorden worden getrackt</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input type="text" placeholder="Zoek keyword..." className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48" readOnly />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-100">
                  <th className="text-left py-3 px-5 font-medium">#</th>
                  <th className="text-left py-3 px-3 font-medium">Zoekwoord</th>
                  <th className="text-center py-3 px-3 font-medium cursor-pointer hover:text-slate-700" onClick={() => handleSort('positie')}>
                    Positie {sortBy === 'positie' && (sortDir === 'asc' ? <ChevronUp className="w-3 h-3 inline" /> : <ChevronDown className="w-3 h-3 inline" />)}
                  </th>
                  <th className="text-center py-3 px-3 font-medium cursor-pointer hover:text-slate-700" onClick={() => handleSort('verandering')}>
                    Δ Verandering {sortBy === 'verandering' && (sortDir === 'asc' ? <ChevronUp className="w-3 h-3 inline" /> : <ChevronDown className="w-3 h-3 inline" />)}
                  </th>
                  <th className="text-center py-3 px-3 font-medium cursor-pointer hover:text-slate-700" onClick={() => handleSort('volume')}>
                    Volume/mnd {sortBy === 'volume' && (sortDir === 'asc' ? <ChevronUp className="w-3 h-3 inline" /> : <ChevronDown className="w-3 h-3 inline" />)}
                  </th>
                  <th className="text-left py-3 px-3 font-medium">URL</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((kw, i) => (
                  <tr key={kw.keyword} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-5 text-xs text-slate-400">{i + 1}</td>
                    <td className="py-3 px-3 font-medium text-slate-900 flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-slate-300" />
                      {kw.keyword}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${kw.positie <= 3 ? 'bg-green-100 text-green-700' : kw.positie <= 10 ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                        {kw.positie}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${kw.verandering > 0 ? 'text-green-500' : kw.verandering < 0 ? 'text-red-500' : 'text-slate-400'}`}>
                        {kw.verandering > 0 ? <TrendingUp className="w-3 h-3" /> : kw.verandering < 0 ? <TrendingDown className="w-3 h-3" /> : null}
                        {kw.verandering > 0 ? '+' : ''}{kw.verandering}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center text-xs text-slate-600">{kw.volume.toLocaleString()}</td>
                    <td className="py-3 px-3">
                      <a href={`https://${kw.url}`} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 hover:underline inline-flex items-center gap-0.5">
                        {kw.url} <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ═══ ACTIONS ═══ */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: 'Technische SEO Audit', desc: 'Core Web Vitals, crawl errors, indexering status', btn: 'Start audit', action: 'Technische audit wordt uitgevoerd...' },
            { title: 'Content Optimalisatie', desc: 'AI-suggesties voor meta tags, headers en content gaps', btn: 'Analyseer content', action: 'Content analyse gestart, rapport komt per email...' },
            { title: 'Backlink Monitor', desc: 'Track nieuwe en verloren backlinks, DA/PA scores', btn: 'Bekijk backlinks', action: 'Backlink rapport wordt samengesteld...' },
          ].map(c => (
            <div key={c.title} className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col">
              <h3 className="font-bold text-slate-900 text-sm mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{c.title}</h3>
              <p className="text-xs text-slate-500 mb-4 flex-1">{c.desc}</p>
              <button onClick={() => toast.success(c.action)} className="w-full py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors">
                {c.btn}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-slate-900 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2"><SeoLogo size={20} /><span className="text-xs font-bold text-white">SEO Dashboard — Klantportaal Demo</span></div>
          <p className="text-xs text-slate-500">Powered by Next‑X Agency · Real-time data simulatie</p>
        </div>
      </footer>

    </div>
  )
}
