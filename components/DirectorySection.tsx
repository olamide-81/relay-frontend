'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Lock, ArrowRight, Sparkles } from 'lucide-react'
import { providers } from '@/data/providers'
import { categories } from '@/data/categories'

export function DirectorySection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeRegion, setActiveRegion] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = providers.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category.includes(activeCategory)
    const matchRegion = activeRegion === 'All' || p.region === activeRegion
    const q = searchQuery.toLowerCase()
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.region.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    return matchCat && matchRegion && matchQ
  })

  const showLockedRows = activeCategory === 'All' && activeRegion === 'All' && searchQuery === ''
  const mono = "'DM Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
  const triggerSearch = () => setSearchQuery((q) => `${q}`)
  const onRegionClick = (region: string) => setActiveRegion((prev) => (prev === region ? 'All' : region))

  return (
    <section
      style={{
        padding: '40px 0 90px',
        background: '#060606',
        borderBottom: '1px solid #111',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 40, marginBottom: 44 }}>
        <div>
          <p style={{ fontFamily: mono, fontSize: 12, fontWeight: 400, color: '#555555', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
            Search Directory
          </p>
          <h2 style={{ fontSize: 'clamp(34px, 4vw, 54px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#e8e8e8' }}>
            Start searching providers now.
          </h2>
        </div>
        <div style={{ maxWidth: 280, textAlign: 'right' }}>
          <p style={{ fontSize: 15, fontWeight: 300, color: '#888', lineHeight: 1.7 }}>
            Browse up to 40 providers now — 10 Africa, 10 Europe, 10 LATAM, 10 Global. Unlock access to search the full 200+ provider index.
          </p>
          <button type="button" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: '#0a0a0a', background: '#e8e8e8', border: '1px solid #d0d0d0', borderRadius: 5, padding: '9px 18px', cursor: 'pointer', marginTop: 16 }}>
            <Lock size={11} strokeWidth={2} />
            Unlock full directory
          </button>
        </div>
      </div>

      <div style={{ background: '#080808', border: '1px solid #111', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #0d0d0d', position: 'relative' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#161616' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#161616' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#161616' }} />
          </div>
          <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontFamily: mono, fontSize: 12, color: '#666', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Relay Search Console
          </span>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#2a2a2a' }} />
            <span style={{ fontFamily: mono, fontSize: 11, color: '#555' }}>Pro data locked</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 20px', borderBottom: '1px solid #0d0d0d', overflowX: 'auto', scrollbarWidth: 'none' }}>
          <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 500, padding: '5px 13px', borderRadius: 4, border: '1px solid #e8e8e8', background: '#e8e8e8', color: '#060606', whiteSpace: 'nowrap' }}>
            Visible now: 40 providers
          </span>
          <span style={{ width: 1, height: 14, background: '#131313', margin: '0 2px' }} />
          {['Africa', 'Europe', 'LATAM', 'Global'].map((r) => {
            const active = activeRegion === r
            return (
              <button key={r} type="button" onClick={() => onRegionClick(r)} style={{ fontFamily: mono, fontSize: 12, fontWeight: 400, padding: '5px 13px', borderRadius: 4, border: `1px solid ${active ? '#2a2a2a' : '#161616'}`, color: active ? '#aaa' : '#666', background: active ? '#141414' : 'transparent', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 120ms' }}>
                {r}: 10
              </button>
            )
          })}
          <span style={{ width: 1, height: 14, background: '#131313', margin: '0 2px' }} />
          <button type="button" style={{ fontFamily: mono, fontSize: 12, fontWeight: 400, padding: '5px 13px', borderRadius: 4, border: '1px solid #161616', color: '#666', background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <Lock size={9} />
            Unlock full directory: 200+
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '188px 1fr' }}>
          <aside style={{ borderRight: '1px solid #0d0d0d', padding: '18px 0' }}>
            <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#444', padding: '0 18px 10px' }}>Categories</p>
            {categories.map((category) => {
              const active = category.value === activeCategory
              return (
                <button key={category.value} type="button" onClick={() => setActiveCategory(category.value)} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 18px', cursor: 'pointer', transition: 'all 120ms', background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: active ? '#777' : '#222' }} />
                  <span style={{ fontSize: 15, fontWeight: active ? 500 : 300, color: active ? '#e0e0e0' : '#777' }}>{category.label}</span>
                </button>
              )
            })}
            <div style={{ borderTop: '1px solid #0d0d0d', margin: '14px 0' }} />
            <div style={{ padding: '8px 18px' }}>
              <p style={{ fontFamily: mono, fontSize: 16, fontWeight: 500, color: '#555', letterSpacing: '-0.03em' }}>200+</p>
              <p style={{ fontSize: 11, fontWeight: 300, color: '#555555', marginTop: 2 }}>Total providers</p>
            </div>
            <div style={{ padding: '8px 18px' }}>
              <p style={{ fontFamily: mono, fontSize: 16, fontWeight: 500, color: '#555', letterSpacing: '-0.03em' }}>40</p>
              <p style={{ fontSize: 11, fontWeight: 300, color: '#555555', marginTop: 2 }}>Countries</p>
            </div>
            <div style={{ padding: '8px 18px' }}>
              <p style={{ fontFamily: mono, fontSize: 16, fontWeight: 500, color: '#555', letterSpacing: '-0.03em' }}>12</p>
              <p style={{ fontSize: 11, fontWeight: 300, color: '#555555', marginTop: 2 }}>Categories</p>
            </div>
          </aside>

          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '34px 36px 1fr 96px 68px 24px', gap: '0 10px', padding: '11px 20px', borderBottom: '1px solid #0a0a0a', fontFamily: mono, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#333' }}>
              <span />
              <span />
              <span>Provider</span>
              <span>Category</span>
              <span>Region</span>
              <span />
            </div>

            <AnimatePresence initial={false}>
              {filtered.map((provider, idx) => (
                <motion.div key={provider.name} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18, ease: 'easeOut' }} style={{ display: 'grid', gridTemplateColumns: '34px 36px 1fr 96px 68px 24px', gap: '0 10px', alignItems: 'center', padding: '12px 20px', borderBottom: idx === filtered.length - 1 && !showLockedRows ? 'none' : '1px solid #090909', cursor: 'pointer', transition: 'background 100ms' }}>
                  <span style={{ fontFamily: mono, fontSize: 12, color: '#333', fontVariantNumeric: 'tabular-nums' }}>{String(idx + 1).padStart(2, '0')}</span>
                  <span style={{ width: 34, height: 34, borderRadius: 7, background: '#0e0e0e', border: '1px solid #181818', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 10, fontWeight: 500, color: '#484848' }}>{provider.initials}</span>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 15, fontWeight: 500, color: '#cccccc', letterSpacing: '-0.01em' }}>{provider.name}</p>
                    <p style={{ fontSize: 13, fontWeight: 300, color: '#777', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{provider.description}</p>
                  </div>
                  <span style={{ fontFamily: mono, fontSize: 11, color: '#666', border: '1px solid #181818', padding: '4px 9px', borderRadius: 3, width: 'fit-content' }}>{provider.category}</span>
                  <span style={{ fontFamily: mono, fontSize: 12, color: '#555' }}>{provider.region}</span>
                  <span style={{ display: 'flex', justifyContent: 'flex-end' }}><Lock size={11} stroke="#333" strokeWidth={1.8} /></span>
                </motion.div>
              ))}
            </AnimatePresence>

            {showLockedRows &&
              [
                { initials: '??', name: '██████████', cat: 'KYC', region: 'Europe' },
                { initials: '??', name: '████████', cat: 'FX', region: 'Global' },
                { initials: '??', name: '███████████', cat: 'Payouts', region: 'LATAM' },
              ].map((row, idx) => (
                <div key={`${row.name}-${idx}`} style={{ display: 'grid', gridTemplateColumns: '34px 36px 1fr 96px 68px 24px', gap: '0 10px', alignItems: 'center', padding: '12px 20px', borderBottom: idx === 2 ? 'none' : '1px solid #090909' }}>
                  <span style={{ fontFamily: mono, fontSize: 11, color: '#333', fontVariantNumeric: 'tabular-nums' }}>{String(filtered.length + idx + 1).padStart(2, '0')}</span>
                  <span style={{ width: 34, height: 34, borderRadius: 7, background: '#0e0e0e', border: '1px solid #181818', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: mono, fontSize: 10, fontWeight: 500, color: '#484848', opacity: 0.25 }}>{row.initials}</span>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: '#252525', letterSpacing: '-0.01em' }}>{row.name}</p>
                    <p style={{ fontSize: 11, fontWeight: 300, color: '#222', marginTop: 2 }}>Unlock to view</p>
                  </div>
                  <span style={{ fontFamily: mono, fontSize: 9, color: '#666', border: '1px solid #181818', padding: '3px 8px', borderRadius: 3, width: 'fit-content', opacity: 0.15 }}>{row.cat}</span>
                  <span style={{ fontFamily: mono, fontSize: 10, color: '#555', opacity: 0.15 }}>{row.region}</span>
                  <span style={{ display: 'flex', justifyContent: 'flex-end' }}><Lock size={11} stroke="#2a2a2a" strokeWidth={1.8} /></span>
                </div>
              ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #0e0e0e', padding: '14px 20px', position: 'sticky', bottom: 0, background: '#080808' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 14px', background: 'transparent', transition: 'border-color 200ms' }}>
            <Sparkles size={14} stroke="#888" strokeWidth={1.8} style={{ opacity: 0.5, flexShrink: 0 }} />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') triggerSearch()
              }}
              placeholder="Ask Relay AI: show compliant payout providers in Africa with strong uptime..."
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: '#d0d0d0', caretColor: '#555' }}
            />
            <button type="button" onClick={triggerSearch} style={{ width: 30, height: 30, borderRadius: '50%', background: '#e8e8e8', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'background 150ms' }}>
              <ArrowRight size={13} stroke="#060606" strokeWidth={2.5} />
            </button>
          </div>
          <p style={{ marginTop: 10, padding: '0 2px', fontSize: 11, fontWeight: 300, color: '#333', letterSpacing: '0.01em' }}>
            Free preview: search and filter visible providers. Unlock access for fee tables, rate comparisons, and full intelligence.
          </p>
        </div>
      </div>
    </section>
  )
}
