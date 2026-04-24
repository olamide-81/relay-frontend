'use client'

import { useEffect } from 'react'

export function LandingRuntime() {
  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })
      document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))
    } else {
      document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'))
    }

    const countEls = document.querySelectorAll<HTMLElement>('[data-count]')
    const animateCount = (el: HTMLElement) => {
      const target = Number.parseInt(el.getAttribute('data-count') || '', 10)
      if (!Number.isFinite(target)) return
      const suffix = el.getAttribute('data-suffix') || ''
      const duration = 1100
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        const val = Math.floor(target * eased)
        const unitSpan = el.querySelector('.unit')
        if (unitSpan && el.childNodes[0]) {
          el.childNodes[0].nodeValue = `${val}${suffix}`
        } else {
          el.textContent = `${val}${suffix}`
        }
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
    if ('IntersectionObserver' in window) {
      const countIo = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target as HTMLElement)
            countIo.unobserve(e.target)
          }
        })
      }, { threshold: 0.4 })
      countEls.forEach((el) => countIo.observe(el))
    }

    const tabs = document.querySelectorAll<HTMLElement>('.demo-tab')
    const pills = document.querySelectorAll<HTMLElement>('.demo-pill')
    const rows = document.querySelectorAll<HTMLElement>('#demoTable tbody tr')
    const search = document.getElementById('demoSearch') as HTMLInputElement | null
    const empty = document.getElementById('demoEmpty')
    const count = document.getElementById('demoCount')
    const state = { cat: 'all', region: 'all', q: '' }

    const apply = () => {
      let visible = 0
      rows.forEach((r) => {
        const cat = r.getAttribute('data-cat')
        const region = r.getAttribute('data-region')
        const name = r.getAttribute('data-name') || ''
        const okCat = state.cat === 'all' || cat === state.cat
        const okRegion = state.region === 'all' || region === state.region
        const okQ = !state.q || name.includes(state.q) || (r.textContent || '').toLowerCase().includes(state.q)
        const show = okCat && okRegion && okQ
        r.classList.toggle('hidden', !show)
        if (show) visible += 1
      })
      empty?.classList.toggle('hidden', visible !== 0)
      if (count) count.textContent = String(visible)
    }

    tabs.forEach((t) => t.addEventListener('click', () => {
      tabs.forEach((x) => x.classList.remove('active'))
      t.classList.add('active')
      state.cat = t.getAttribute('data-cat') || 'all'
      apply()
    }))
    pills.forEach((p) => p.addEventListener('click', () => {
      pills.forEach((x) => x.classList.remove('active'))
      p.classList.add('active')
      state.region = p.getAttribute('data-region') || 'all'
      apply()
    }))
    search?.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement
      state.q = target.value.trim().toLowerCase()
      apply()
    })

    document.querySelectorAll<HTMLElement>('.preview-tab').forEach((t) => {
      t.addEventListener('click', () => {
        document.querySelectorAll('.preview-tab').forEach((x) => x.classList.remove('active'))
        t.classList.add('active')
      })
    })
    document.querySelectorAll<HTMLElement>('.faq-q').forEach((q) => {
      q.addEventListener('click', () => q.parentElement?.classList.toggle('open'))
    })

    const form = document.getElementById('ctaForm') as HTMLFormElement | null
    form?.addEventListener('submit', (e) => {
      e.preventDefault()
      alert('Thanks! We will be in touch soon.')
      form.reset()
    })
  }, [])

  return null
}

