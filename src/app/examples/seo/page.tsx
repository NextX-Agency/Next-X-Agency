'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { DemoOutro } from '../_components/DemoOutro'

type Query = {
  query: string
  position: number
  change: number
  intent: 'Service' | 'Research' | 'Local'
  page: string
}

const queries: Query[] = [
  { query: 'web design suriname', position: 4, change: 3, intent: 'Service', page: '/websites' },
  { query: 'website design paramaribo', position: 7, change: -2, intent: 'Local', page: '/websites' },
  { query: 'seo agency suriname', position: 11, change: 4, intent: 'Service', page: '/seo' },
  { query: 'restaurant website paramaribo', position: 18, change: 8, intent: 'Local', page: '/examples' },
  { query: 'how to build a webshop', position: 21, change: -5, intent: 'Research', page: '/webshops' },
  { query: 'logo design suriname', position: 28, change: 1, intent: 'Service', page: '/branding' },
]

const pages = [
  { path: '/websites', title: 'Websites for businesses', clicks: '—', note: 'Shorten the title' },
  { path: '/seo', title: 'SEO for Surinamese businesses', clicks: '—', note: 'Needs a new intro' },
  { path: '/examples', title: 'Website examples', clicks: '—', note: 'Add internal links' },
  { path: '/contact', title: 'Contact NextX Agency', clicks: '—', note: 'All good' },
]

const issues = [
  { label: 'Titles', count: 2, tone: 'warn', detail: 'Pages with a title that is too long' },
  { label: 'Internal links', count: 4, tone: 'focus', detail: 'Chances to link to relevant examples' },
  { label: 'Crawling', count: 0, tone: 'good', detail: 'No blocked demo pages' },
]

export default function SeoDashboardPage() {
  const [view, setView] = useState<'overview' | 'keywords' | 'pages' | 'technical' | 'actions'>('overview')
  const [query, setQuery] = useState('')
  const [period, setPeriod] = useState('28 days')
  const [done, setDone] = useState<string[]>([])

  const visibleQueries = useMemo(() => queries.filter(item => item.query.includes(query.toLowerCase())), [query])
  const toggleDone = (item: string) => setDone(current => current.includes(item) ? current.filter(value => value !== item) : [...current, item])

  return (
    <>
      <div className="seo-shell">
        <header className="seo-topline">
          <Link href="/examples/seo" className="seo-brand" aria-label="SEO Dashboard overview">
            <span className="seo-mark" aria-hidden="true">↗</span>
            <span>signal / seo</span>
          </Link>
          <span className="seo-account">Sample environment <i aria-hidden="true" /></span>
        </header>

        <div className="seo-layout">
          <aside className="seo-sidebar" aria-label="SEO Dashboard navigation">
            <p className="seo-kicker">WORKSPACE</p>
            <nav>
              {[
                ['overview', 'Overview'],
                ['keywords', 'Keywords'],
                ['pages', 'Pages'],
                ['technical', 'Technical issues'],
                ['actions', 'Actions'],
              ].map(([value, label]) => (
                <button key={value} type="button" className={view === value ? 'seo-nav-active' : ''} onClick={() => setView(value as typeof view)}>
                  <span>{label}</span><span aria-hidden="true">{view === value ? '•' : '↗'}</span>
                </button>
              ))}
            </nav>
            <div className="seo-sidebar-note">
              <span>DATASET</span>
              <strong>Sample data</strong>
              <p>These values illustrate the interface. No external SEO integration is active.</p>
            </div>
          </aside>

          <main className="seo-content">
            <div className="seo-heading-row">
              <div>
                <p className="seo-kicker">SEO / CLIENT PORTAL</p>
                <h1>{view === 'overview' ? 'What needs attention?' : view === 'keywords' ? 'Keywords we track' : view === 'pages' ? 'Pages in view' : view === 'technical' ? 'Technical issues' : 'Actions for this month'}</h1>
                <p className="seo-intro">A compact workspace for decisions, not for impressive charts.</p>
              </div>
              <div className="seo-period" role="group" aria-label="Period">
                {['7 days', '28 days', '90 days'].map(option => <button key={option} type="button" className={period === option ? 'seo-period-active' : ''} onClick={() => setPeriod(option)}>{option}</button>)}
              </div>
            </div>

            {view === 'overview' && <>
              <div className="seo-attention">
                <div><span className="seo-kicker">SUMMARY / {period}</span><h2>Four things to pick up today.</h2></div>
                <p>Search demand is clearer than last month. The biggest gains now are in better page titles, internal links and three pages that still feel thin.</p>
              </div>
              <div className="seo-grid-three">
                {issues.map(issue => <article className={`seo-issue ${issue.tone}`} key={issue.label}><span>{issue.label}</span><strong>{issue.count}</strong><p>{issue.detail}</p></article>)}
              </div>
              <div className="seo-split">
                <article className="seo-panel">
                  <div className="seo-panel-head"><div><span className="seo-kicker">MOVEMENT</span><h2>Search demand per week</h2></div><span className="seo-legend"><i /> visibility</span></div>
                  <div className="seo-bars" aria-label="Illustrative chart of visibility per week">
                    {[42, 48, 45, 59, 62, 70, 66, 78, 82, 88, 91, 95].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
                  </div>
                  <div className="seo-axis"><span>W1</span><span>W4</span><span>W8</span><span>W12</span></div>
                </article>
                <article className="seo-panel seo-next">
                  <span className="seo-kicker">NEXT DECISION</span><h2>Make /websites more specific.</h2><p>The page shows up for relevant searches but still shares too little context with the keyword.</p><button type="button" onClick={() => setView('actions')}>View action <span aria-hidden="true">↗</span></button>
                </article>
              </div>
            </>}

            {(view === 'keywords' || view === 'overview') && <section className="seo-panel seo-table-panel">
              <div className="seo-panel-head"><div><span className="seo-kicker">KEYWORDS</span><h2>{view === 'overview' ? 'What do visitors come for?' : 'All tracked keywords'}</h2></div><label className="seo-search"><span className="sr-only">Filter keywords</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Filter keywords" /><span aria-hidden="true">⌕</span></label></div>
              <div className="seo-table-wrap"><table><thead><tr><th>Keyword</th><th>Position</th><th>Change</th><th>Intent</th><th>Page</th></tr></thead><tbody>{visibleQueries.map(item => <tr key={item.query}><td><strong>{item.query}</strong></td><td className="seo-position">{item.position}</td><td className={item.change >= 0 ? 'seo-up' : 'seo-down'}>{item.change >= 0 ? '+' : ''}{item.change}</td><td><span className="seo-tag">{item.intent}</span></td><td><code>{item.page}</code></td></tr>)}</tbody></table></div>
              {visibleQueries.length === 0 && <p className="seo-empty">No keyword found. Try a shorter filter.</p>}
            </section>}

            {view === 'pages' && <section className="seo-panel seo-table-panel"><div className="seo-panel-head"><div><span className="seo-kicker">PAGES</span><h2>Where can the content be sharper?</h2></div></div><div className="seo-table-wrap"><table><thead><tr><th>Page</th><th>Title</th><th>Clicks</th><th>Note</th></tr></thead><tbody>{pages.map(page => <tr key={page.path}><td><code>{page.path}</code></td><td><strong>{page.title}</strong></td><td>{page.clicks}</td><td>{page.note}</td></tr>)}</tbody></table></div></section>}

            {view === 'technical' && <section className="seo-panel seo-technical"><div className="seo-panel-head"><div><span className="seo-kicker">TECHNICAL ISSUES</span><h2>Small blockers, clearly ranked.</h2></div></div>{['Shorten the meta title of /websites', 'Add four internal links to examples', 'Check that new pages have a description', 'Exclude concept demos from indexing'].map((item, index) => <div className="seo-check-row" key={item}><span className={`seo-status seo-status-${index === 3 ? 'good' : index === 0 ? 'warn' : 'open'}`}>{index === 3 ? 'OK' : index === 0 ? 'CHECK' : 'OPEN'}</span><strong>{item}</strong><span className="seo-muted">{index === 3 ? 'Configured' : 'Manual check'}</span></div>)}</section>}

            {view === 'actions' && <section className="seo-panel seo-actions"><div className="seo-panel-head"><div><span className="seo-kicker">ACTION LIST</span><h2>From insight to next step.</h2></div><span className="seo-muted">{done.length} / 3 done</span></div>{['Rewrite the /websites intro around the search demand', 'Add a link from the examples to SEO', 'Check the title and description of /seo'].map(item => <label className={`seo-action-row ${done.includes(item) ? 'is-done' : ''}`} key={item}><input type="checkbox" checked={done.includes(item)} onChange={() => toggleDone(item)} /><span>{item}</span><small>This month</small></label>)}</section>}

            <p className="seo-footnote">Sample environment · period: {period} · figures and pages are illustrative.</p>
          </main>
        </div>
      </div>
      <DemoOutro />
      <style jsx>{`
        .seo-shell{background:#f3f4f1;color:#202622;min-height:calc(100vh - 49px);font-family:var(--font-demo-product),Arial,sans-serif}.seo-topline{height:64px;border-bottom:1px solid #d9ded8;display:flex;align-items:center;justify-content:space-between;padding:0 clamp(20px,4vw,56px);background:#f8f9f6}.seo-brand{display:flex;gap:10px;align-items:center;color:#202622;font-weight:700;letter-spacing:-.03em}.seo-mark{display:grid;place-items:center;width:26px;height:26px;background:#1f6d57;color:#fff;border-radius:6px;font-size:18px}.seo-account{font:11px var(--font-demo-industrial),monospace;color:#718077;letter-spacing:.08em;text-transform:uppercase}.seo-account i{display:inline-block;width:7px;height:7px;background:#3e9b6a;border-radius:50%;margin-left:8px}.seo-layout{display:grid;grid-template-columns:220px minmax(0,1fr);max-width:1480px;margin:0 auto}.seo-sidebar{border-right:1px solid #d9ded8;min-height:850px;padding:40px 20px;display:flex;flex-direction:column}.seo-kicker{font:10px var(--font-demo-industrial),monospace;letter-spacing:.14em;color:#738078;margin:0 0 12px;text-transform:uppercase}.seo-sidebar nav{display:grid;gap:4px}.seo-sidebar nav button{border:0;background:transparent;display:flex;align-items:center;justify-content:space-between;padding:11px 10px;text-align:left;color:#64716a;font-size:13px;cursor:pointer}.seo-sidebar nav button:hover,.seo-sidebar nav button.seo-nav-active{color:#1f6d57;background:#e3ebe4}.seo-sidebar nav button span:last-child{font-size:15px}.seo-sidebar-note{border-top:1px solid #d9ded8;margin-top:auto;padding-top:18px}.seo-sidebar-note span{font:10px var(--font-demo-industrial),monospace;letter-spacing:.12em;color:#879188}.seo-sidebar-note strong{display:block;font-size:13px;margin-top:10px}.seo-sidebar-note p{font-size:11px;line-height:1.6;color:#758178;margin:7px 0 0}.seo-content{padding:52px clamp(24px,5vw,82px) 56px;max-width:1160px;width:100%}.seo-heading-row{display:flex;justify-content:space-between;gap:30px;align-items:flex-end;margin-bottom:38px}.seo-heading-row h1{font-size:clamp(28px,4vw,48px);letter-spacing:-.07em;line-height:.95;margin:0 0 14px;font-weight:600}.seo-intro{color:#6f7a72;margin:0;font-size:14px}.seo-period{border-bottom:1px solid #bfc9c0;display:flex;gap:16px;white-space:nowrap}.seo-period button{background:transparent;border:0;border-bottom:2px solid transparent;color:#728078;padding:9px 0;font-size:12px;cursor:pointer}.seo-period button.seo-period-active{color:#1f6d57;border-bottom-color:#1f6d57}.seo-attention{background:#1f6d57;color:#f5f6f0;padding:26px 30px;display:flex;justify-content:space-between;gap:32px;align-items:flex-end;margin-bottom:14px}.seo-attention .seo-kicker{color:#b9d5c4}.seo-attention h2{font-size:23px;letter-spacing:-.04em;margin:0}.seo-attention p{font-size:13px;line-height:1.65;max-width:390px;margin:0;color:#d5e5da}.seo-grid-three{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:14px}.seo-issue{border:1px solid #d9ded8;background:#f8f9f6;padding:17px;display:grid;grid-template-columns:1fr auto;gap:6px}.seo-issue span{font:10px var(--font-demo-industrial),monospace;letter-spacing:.12em;color:#718077;text-transform:uppercase}.seo-issue strong{font:27px var(--font-demo-industrial),monospace;font-weight:500;grid-row:span 2}.seo-issue p{margin:0;color:#6f7a72;font-size:12px}.seo-issue.warn strong{color:#bd6e37}.seo-issue.good strong{color:#2f8b64}.seo-split{display:grid;grid-template-columns:1.5fr 1fr;gap:14px;margin-bottom:14px}.seo-panel{background:#f8f9f6;border:1px solid #d9ded8;padding:23px}.seo-panel-head{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin-bottom:20px}.seo-panel h2{font-size:18px;letter-spacing:-.04em;margin:0;font-weight:600}.seo-legend{font-size:11px;color:#718077}.seo-legend i{display:inline-block;width:8px;height:8px;background:#5ba47e;margin-right:6px}.seo-bars{height:145px;display:flex;align-items:flex-end;gap:7px;border-bottom:1px solid #d9ded8;background:repeating-linear-gradient(to bottom,transparent 0 35px,#e6ebe5 36px)}.seo-bars span{background:#5ba47e;flex:1;min-width:5px}.seo-axis{display:flex;justify-content:space-between;font:10px var(--font-demo-industrial),monospace;color:#8a958d;margin-top:9px}.seo-next{background:#e8efe9;border-color:#c4d4c7}.seo-next h2{font-size:25px;max-width:260px;margin:22px 0 12px}.seo-next p{font-size:13px;color:#65736a;line-height:1.6;max-width:290px}.seo-next button{border:0;background:#202d27;color:#fff;padding:10px 14px;font-size:12px;cursor:pointer;margin-top:10px}.seo-table-panel{padding-bottom:10px}.seo-search{border:1px solid #cad3cc;background:#fff;display:flex;align-items:center;padding:0 10px}.seo-search input{border:0;outline:0;background:transparent;padding:8px 5px;width:130px;font-size:11px}.seo-search span{color:#6f7a72}.seo-table-wrap{overflow-x:auto}table{border-collapse:collapse;width:100%;font-size:12px}th{text-align:left;font:10px var(--font-demo-industrial),monospace;letter-spacing:.1em;color:#8a958d;text-transform:uppercase;font-weight:400;padding:0 10px 12px}td{border-top:1px solid #e1e5e0;padding:13px 10px;color:#6b776f;white-space:nowrap}td strong{color:#28332d;font-weight:500}.seo-position{font-family:var(--font-demo-industrial),monospace;color:#28332d}.seo-up{color:#2f8b64}.seo-down{color:#b96448}.seo-tag{font-size:10px;border:1px solid #c9d7cd;padding:4px 7px;color:#4c705b}.seo-table-panel code,.seo-technical code{font:11px var(--font-demo-industrial),monospace;color:#567061}.seo-empty{color:#6f7a72;font-size:13px}.seo-technical,.seo-actions{padding-bottom:8px}.seo-check-row,.seo-action-row{display:grid;grid-template-columns:70px 1fr 150px;align-items:center;gap:16px;padding:16px 0;border-top:1px solid #e1e5e0;font-size:13px}.seo-check-row:first-of-type,.seo-action-row:first-of-type{border-top:0}.seo-status{font:9px var(--font-demo-industrial),monospace;letter-spacing:.08em}.seo-status-warn{color:#b96a36}.seo-status-open{color:#557b61}.seo-status-good{color:#2f8b64}.seo-muted{font-size:11px;color:#89938b}.seo-action-row{grid-template-columns:22px 1fr auto;cursor:pointer}.seo-action-row input{accent-color:#2f8b64;width:16px;height:16px}.seo-action-row.is-done span{text-decoration:line-through;color:#879188}.seo-footnote{font:10px var(--font-demo-industrial),monospace;color:#8a958d;margin:18px 0 0}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}@media(max-width:800px){.seo-layout{display:block}.seo-sidebar{min-height:auto;border-right:0;border-bottom:1px solid #d9ded8;padding:18px 20px}.seo-sidebar nav{display:flex;overflow:auto}.seo-sidebar nav button{white-space:nowrap}.seo-sidebar-note{display:none}.seo-content{padding:34px 20px}.seo-heading-row{display:block}.seo-period{margin-top:24px;width:max-content}.seo-attention{display:block}.seo-attention p{margin-top:16px}.seo-grid-three,.seo-split{grid-template-columns:1fr}.seo-panel{padding:18px}.seo-check-row{grid-template-columns:62px 1fr}.seo-check-row .seo-muted{grid-column:2}.seo-table-panel .seo-panel-head{display:block}.seo-search{margin-top:16px;width:max-content}.seo-search input{width:190px}.seo-topline{padding:0 20px}.seo-account{font-size:9px}}
        @media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important}}
      `}</style>
    </>
  )
}
