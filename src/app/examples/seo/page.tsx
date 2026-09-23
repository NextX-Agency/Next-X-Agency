'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { DemoOutro } from '../_components/DemoOutro'

type Query = {
  query: string
  position: number
  change: number
  intent: 'Dienst' | 'Oriëntatie' | 'Lokaal'
  page: string
}

const queries: Query[] = [
  { query: 'webdesign suriname', position: 4, change: 3, intent: 'Dienst', page: '/websites' },
  { query: 'website laten maken paramaribo', position: 7, change: -2, intent: 'Lokaal', page: '/websites' },
  { query: 'seo bureau suriname', position: 11, change: 4, intent: 'Dienst', page: '/seo' },
  { query: 'restaurant website paramaribo', position: 18, change: 8, intent: 'Lokaal', page: '/voorbeelden' },
  { query: 'webshop laten maken', position: 21, change: -5, intent: 'Oriëntatie', page: '/webshops' },
  { query: 'logo ontwerp suriname', position: 28, change: 1, intent: 'Dienst', page: '/branding' },
]

const pages = [
  { path: '/websites', title: 'Websites voor bedrijven', clicks: '—', note: 'Titel inkorten' },
  { path: '/seo', title: 'SEO voor Surinaamse bedrijven', clicks: '—', note: 'Nieuwe intro nodig' },
  { path: '/voorbeelden', title: 'Voorbeelden van websites', clicks: '—', note: 'Interne links toevoegen' },
  { path: '/contact', title: 'Contact met NextX Agency', clicks: '—', note: 'In orde' },
]

const issues = [
  { label: 'Titels', count: 2, tone: 'warn', detail: 'Pagina’s met een te lange titel' },
  { label: 'Interne links', count: 4, tone: 'focus', detail: 'Kansen naar relevante voorbeelden' },
  { label: 'Crawlen', count: 0, tone: 'good', detail: 'Geen geblokkeerde demo-pagina’s' },
]

export default function SeoDashboardPage() {
  const [view, setView] = useState<'overzicht' | 'zoektermen' | 'pagina\'s' | 'techniek' | 'acties'>('overzicht')
  const [query, setQuery] = useState('')
  const [period, setPeriod] = useState('28 dagen')
  const [done, setDone] = useState<string[]>([])

  const visibleQueries = useMemo(() => queries.filter(item => item.query.includes(query.toLowerCase())), [query])
  const toggleDone = (item: string) => setDone(current => current.includes(item) ? current.filter(value => value !== item) : [...current, item])

  return (
    <>
      <div className="seo-shell">
        <header className="seo-topline">
          <Link href="/examples/seo" className="seo-brand" aria-label="SEO Dashboard overzicht">
            <span className="seo-mark" aria-hidden="true">↗</span>
            <span>signal / seo</span>
          </Link>
          <span className="seo-account">Voorbeeldomgeving <i aria-hidden="true" /></span>
        </header>

        <div className="seo-layout">
          <aside className="seo-sidebar" aria-label="SEO Dashboard navigatie">
            <p className="seo-kicker">WERKRUIMTE</p>
            <nav>
              {[
                ['overzicht', 'Overzicht'],
                ['zoektermen', 'Zoektermen'],
                ['pagina\'s', 'Pagina\'s'],
                ['techniek', 'Technische punten'],
                ['acties', 'Acties'],
              ].map(([value, label]) => (
                <button key={value} type="button" className={view === value ? 'seo-nav-active' : ''} onClick={() => setView(value as typeof view)}>
                  <span>{label}</span><span aria-hidden="true">{view === value ? '•' : '↗'}</span>
                </button>
              ))}
            </nav>
            <div className="seo-sidebar-note">
              <span>DATASET</span>
              <strong>Voorbeelddata</strong>
              <p>Deze waarden illustreren de interface. Er is geen externe SEO-koppeling actief.</p>
            </div>
          </aside>

          <main className="seo-content">
            <div className="seo-heading-row">
              <div>
                <p className="seo-kicker">SEO / KLANTPORTAAL</p>
                <h1>{view === 'overzicht' ? 'Wat verdient aandacht?' : view === 'zoektermen' ? 'Zoektermen die we volgen' : view === 'pagina\'s' ? 'Pagina’s in beeld' : view === 'techniek' ? 'Technische punten' : 'Acties voor deze maand'}</h1>
                <p className="seo-intro">Een compacte werkruimte voor beslissingen, niet voor indrukwekkende grafieken.</p>
              </div>
              <div className="seo-period" role="group" aria-label="Periode">
                {['7 dagen', '28 dagen', '90 dagen'].map(option => <button key={option} type="button" className={period === option ? 'seo-period-active' : ''} onClick={() => setPeriod(option)}>{option}</button>)}
              </div>
            </div>

            {view === 'overzicht' && <>
              <div className="seo-attention">
                <div><span className="seo-kicker">SAMENVATTING / {period}</span><h2>Vier dingen om vandaag op te pakken.</h2></div>
                <p>De zoekvraag is duidelijker dan vorige maand. De grootste winst zit nu in betere paginatitels, interne links en drie pagina’s die nog dun aanvoelen.</p>
              </div>
              <div className="seo-grid-three">
                {issues.map(issue => <article className={`seo-issue ${issue.tone}`} key={issue.label}><span>{issue.label}</span><strong>{issue.count}</strong><p>{issue.detail}</p></article>)}
              </div>
              <div className="seo-split">
                <article className="seo-panel">
                  <div className="seo-panel-head"><div><span className="seo-kicker">BEWEGING</span><h2>Zoekvraag per week</h2></div><span className="seo-legend"><i /> zichtbaarheid</span></div>
                  <div className="seo-bars" aria-label="Illustratieve grafiek van zichtbaarheid per week">
                    {[42, 48, 45, 59, 62, 70, 66, 78, 82, 88, 91, 95].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
                  </div>
                  <div className="seo-axis"><span>W1</span><span>W4</span><span>W8</span><span>W12</span></div>
                </article>
                <article className="seo-panel seo-next">
                  <span className="seo-kicker">VOLGENDE BESLISSING</span><h2>Maak /websites specifieker.</h2><p>De pagina verschijnt op relevante vragen, maar deelt nog te weinig context met de zoekterm.</p><button type="button" onClick={() => setView('acties')}>Bekijk actie <span aria-hidden="true">↗</span></button>
                </article>
              </div>
            </>}

            {(view === 'zoektermen' || view === 'overzicht') && <section className="seo-panel seo-table-panel">
              <div className="seo-panel-head"><div><span className="seo-kicker">ZOEKTERMEN</span><h2>{view === 'overzicht' ? 'Waar komen bezoekers voor?' : 'Alle gevolgde termen'}</h2></div><label className="seo-search"><span className="sr-only">Zoekterm filteren</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Filter zoekterm" /><span aria-hidden="true">⌕</span></label></div>
              <div className="seo-table-wrap"><table><thead><tr><th>Zoekterm</th><th>Positie</th><th>Verandering</th><th>Intentie</th><th>Pagina</th></tr></thead><tbody>{visibleQueries.map(item => <tr key={item.query}><td><strong>{item.query}</strong></td><td className="seo-position">{item.position}</td><td className={item.change >= 0 ? 'seo-up' : 'seo-down'}>{item.change >= 0 ? '+' : ''}{item.change}</td><td><span className="seo-tag">{item.intent}</span></td><td><code>{item.page}</code></td></tr>)}</tbody></table></div>
              {visibleQueries.length === 0 && <p className="seo-empty">Geen zoekterm gevonden. Probeer een kortere filter.</p>}
            </section>}

            {view === 'pagina\'s' && <section className="seo-panel seo-table-panel"><div className="seo-panel-head"><div><span className="seo-kicker">PAGINA’S</span><h2>Waar kan de inhoud scherper?</h2></div></div><div className="seo-table-wrap"><table><thead><tr><th>Pagina</th><th>Titel</th><th>Clicks</th><th>Notitie</th></tr></thead><tbody>{pages.map(page => <tr key={page.path}><td><code>{page.path}</code></td><td><strong>{page.title}</strong></td><td>{page.clicks}</td><td>{page.note}</td></tr>)}</tbody></table></div></section>}

            {view === 'techniek' && <section className="seo-panel seo-technical"><div className="seo-panel-head"><div><span className="seo-kicker">TECHNISCHE PUNTEN</span><h2>Kleine blokkades, helder gerangschikt.</h2></div></div>{['Metatitel van /websites inkorten', 'Vier interne links toevoegen naar voorbeelden', 'Controleren of nieuwe pagina’s een beschrijving hebben', 'Indexering van conceptdemo’s uitsluiten'].map((item, index) => <div className="seo-check-row" key={item}><span className={`seo-status seo-status-${index === 3 ? 'good' : index === 0 ? 'warn' : 'open'}`}>{index === 3 ? 'OK' : index === 0 ? 'LET OP' : 'OPEN'}</span><strong>{item}</strong><span className="seo-muted">{index === 3 ? 'Ingesteld' : 'Handmatige controle'}</span></div>)}</section>}

            {view === 'acties' && <section className="seo-panel seo-actions"><div className="seo-panel-head"><div><span className="seo-kicker">ACTIELIJST</span><h2>Van inzicht naar volgende stap.</h2></div><span className="seo-muted">{done.length} / 3 klaar</span></div>{['Schrijf de intro van /websites opnieuw rond de zoekvraag', 'Voeg een link toe van de voorbeelden naar SEO', 'Controleer de titel en beschrijving van /seo'].map(item => <label className={`seo-action-row ${done.includes(item) ? 'is-done' : ''}`} key={item}><input type="checkbox" checked={done.includes(item)} onChange={() => toggleDone(item)} /><span>{item}</span><small>Deze maand</small></label>)}</section>}

            <p className="seo-footnote">Voorbeeldomgeving · periode: {period} · cijfers en pagina’s zijn illustratief.</p>
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
