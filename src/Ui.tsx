/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { CSSProperties, MouseEvent, ReactNode, RefObject, TouchEvent } from 'react'
import { WEDDING, IGLESIA } from './Datos'
import { Flower } from './Arte'

/* =====================================================================
   HOOKS
   ===================================================================== */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

/** Escribe en el elemento la variable CSS --p (0 → 1) según cuánto lo has recorrido con el scroll.
 *  No vuelve a renderizar React: las animaciones usan var(--p) directamente en el CSS. */
export function useScrollVar<T extends HTMLElement>(ref: RefObject<T | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      el.style.setProperty('--p', Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height))).toFixed(3))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [ref])
}

export function useCountdown(target: Date) {
  const calc = () => {
    const d = Math.max(0, target.getTime() - Date.now())
    return { days: Math.floor(d / 864e5), hours: Math.floor((d / 36e5) % 24), minutes: Math.floor((d / 6e4) % 60), seconds: Math.floor((d / 1e3) % 60), done: d === 0 }
  }
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return t
}

/* =====================================================================
   EFECTOS Y UTILIDADES
   ===================================================================== */
export function launchConfetti() {
  const canvas = document.createElement('canvas')
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')!
  const colors = ['#1fb5ad', '#7fd8d0', '#0e7c7b', '#cdf1ec', '#ffffff', '#e0644f']
  const parts = Array.from({ length: 180 }, () => ({ x: canvas.width / 2, y: canvas.height * 0.65, vx: (Math.random() - 0.5) * 16, vy: -Math.random() * 18 - 4, size: Math.random() * 8 + 4, rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.4, color: colors[Math.floor(Math.random() * colors.length)], heart: Math.random() > 0.7 }))
  let frames = 0
  const tick = () => {
    frames++
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    parts.forEach((p) => {
      p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.rot += p.vr
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.color
      ctx.globalAlpha = Math.max(0, 1 - frames / 200)
      if (p.heart) { ctx.font = `${p.size * 2}px serif`; ctx.fillText('♥', 0, 0) } else ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
      ctx.restore()
    })
    if (frames < 200) requestAnimationFrame(tick)
    else canvas.remove()
  }
  tick()
}

export function downloadICS() {
  const d = WEDDING.date
  const fmt = (x: Date) => x.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', `DTSTART:${fmt(d)}`, `DTEND:${fmt(new Date(d.getTime() + 8 * 36e5))}`, `SUMMARY:Boda de ${WEDDING.novio} y ${WEDDING.novia}`, `LOCATION:${IGLESIA.place}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  a.download = 'boda.ics'
  a.click()
}

/* =====================================================================
   REVEAL: aparición al bajar (con varias formas de entrar)
   ===================================================================== */
type From = 'up' | 'left' | 'right' | 'zoom' | 'flip' | 'rotate' | 'blur'
const DIR: Record<From, string> = { up: '', left: 'reveal-left', right: 'reveal-right', zoom: 'reveal-zoom', flip: 'reveal-flip', rotate: 'reveal-rotate', blur: 'reveal-blur' }

export function Reveal({ children, className = '', delay = 0, from = 'up' }: { children: ReactNode; className?: string; delay?: number; from?: From }) {
  const ref = useReveal<HTMLDivElement>()
  return <div ref={ref} className={`reveal ${DIR[from]} ${className}`} style={{ '--delay': `${delay}ms` } as CSSProperties}>{children}</div>
}

/** Texto cuyas palabras suben una por una (dentro de un <Reveal>) */
export function Words({ text, wordClass = '', step = 90 }: { text: string; wordClass?: string; step?: number }) {
  return (
    <span aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden>
          <span className={`word ${wordClass}`} style={{ '--i': i, '--step': `${step}ms` } as CSSProperties}>{w}</span>{' '}
        </span>
      ))}
    </span>
  )
}

/** Separador con tres flores que se abren al aparecer */
export function Divider() {
  return (
    <div className="my-5 flex items-center justify-center gap-2" aria-hidden>
      <span className="grow-line h-px w-14 origin-right bg-gradient-to-r from-transparent to-turquesa sm:w-20" />
      <svg viewBox="0 0 120 40" className="h-10 w-32 overflow-visible">
        <g className="bloom" style={{ '--b': '0ms' } as CSSProperties}><g className="bloom-spin"><Flower x={18} y={20} s={0.65} /></g></g>
        <g className="bloom" style={{ '--b': '180ms' } as CSSProperties}><g className="bloom-spin"><Flower x={60} y={20} s={1} a="#1fb5ad" /></g></g>
        <g className="bloom" style={{ '--b': '360ms' } as CSSProperties}><g className="bloom-spin"><Flower x={102} y={20} s={0.65} /></g></g>
      </svg>
      <span className="grow-line h-px w-14 origin-left bg-gradient-to-l from-transparent to-turquesa sm:w-20" />
    </div>
  )
}

export function SectionTitle({ title, subtitle, dark = false }: { title: string; subtitle?: string; dark?: boolean }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-xl text-center">
      <h2 className="font-script text-5xl sm:text-6xl"><Words text={title} wordClass={dark ? 'text-white drop-shadow-md' : 'gold-text'} /></h2>
      <Divider />
      {subtitle && <p className={`font-display text-xl italic ${dark ? 'text-white/90' : 'text-tinta/85'}`}><Words text={subtitle} step={40} /></p>}
    </Reveal>
  )
}

export function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [style, setStyle] = useState<CSSProperties>({})
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    setStyle({ transform: `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.03)` })
  }
  return <div onMouseMove={onMove} onMouseLeave={() => setStyle({ transform: 'none' })} style={{ ...style, transition: 'transform 0.25s ease-out' }} className={className}>{children}</div>
}

export const card = 'shine h-full rounded-3xl border border-turquesa/40 bg-white p-8 text-center shadow-xl shadow-turquesa-deep/10'
export const btn = 'inline-block rounded-full bg-gradient-to-r from-turquesa to-turquesa-deep px-6 py-2.5 font-body text-sm text-white transition-all hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquesa'

/* =====================================================================
   SECCIÓN: ordena fondo, flores laterales y contenido (ya no hace falta
   ningún truco de CSS en cada <section>)
   ===================================================================== */
export function SideFlora() {
  return (
    <>
      <div className="flora flora-l" aria-hidden />
      <div className="flora flora-r" aria-hidden />
    </>
  )
}

export function Seccion({ id, className = '', back, flora = true, children }: { id?: string; className?: string; back?: ReactNode; flora?: boolean; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)
  useScrollVar(ref)
  return (
    <section id={id} ref={ref} className={`relative overflow-hidden ${className}`}>
      {back}
      {flora && <SideFlora />}
      <div className="relative z-10">{children}</div>
    </section>
  )
}

/* =====================================================================
   BARRAS FIJAS
   ===================================================================== */
export function Nav() {
  const links = [['inicio', 'Inicio'], ['historia', 'Historia'], ['donde', 'Lugar'], ['programa', 'Programa'], ['galeria', 'Fotos'], ['confirmar', 'Confirmar']]
  const [show, setShow] = useState(false)
  const [active, setActive] = useState('inicio')
  useEffect(() => {
    const f = () => setShow(window.scrollY > 500)
    f()
    window.addEventListener('scroll', f, { passive: true })
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-40% 0px -55% 0px' })
    links.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => { window.removeEventListener('scroll', f); io.disconnect() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <nav aria-label="Secciones" className={`fixed left-1/2 top-4 z-[75] hidden -translate-x-1/2 gap-1 rounded-full border border-turquesa/40 bg-white/90 p-1.5 shadow-xl backdrop-blur-md transition-all duration-500 md:flex ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-20 opacity-0'}`}>
      {links.map(([id, l]) => <a key={id} href={`#${id}`} className={`rounded-full px-4 py-1.5 font-body text-sm transition-colors ${active === id ? 'bg-turquesa text-white' : 'text-tinta/90 hover:bg-turquesa/15'}`}>{l}</a>)}
    </nav>
  )
}

export function ScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const f = () => { const h = document.documentElement.scrollHeight - window.innerHeight; setP(h > 0 ? window.scrollY / h : 0) }
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return <div className="fixed left-0 top-0 z-[80] h-1 w-full origin-left bg-gradient-to-r from-turquesa-soft via-turquesa to-turquesa-deep" style={{ transform: `scaleX(${p})` }} />
}

export function FloatingButtons({ playing, toggle }: { playing: boolean; toggle: () => void }) {
  const share = () => window.open(`https://wa.me/?text=${encodeURIComponent(`¡Estás invitado a la boda de ${WEDDING.novio} y ${WEDDING.novia}! ${window.location.href}`)}`, '_blank')
  const base = 'flex h-12 w-12 items-center justify-center rounded-full border border-turquesa/60 bg-white text-xl text-turquesa-deep shadow-xl transition-all hover:scale-110 hover:bg-turquesa hover:text-white'
  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col gap-3">
      <button onClick={share} className={base} aria-label="Compartir por WhatsApp">↗</button>
      <button onClick={toggle} className={`${base} ${playing ? 'animate-pulse-ring' : ''}`} aria-label={playing ? 'Pausar música' : 'Reproducir música'}>{playing ? '❚❚' : '♪'}</button>
    </div>
  )
}

/* =====================================================================
   VISOR DE FOTOS
   Se dibuja con un "portal" directamente en <body>: se abre justo donde estás
   (centrado en la pantalla) y el fondo se ve borroso.
   Flechas, teclado, deslizar con el dedo y miniaturas.
   ===================================================================== */
export function Lightbox({ images, index, setIndex }: { images: { src: string; label: string }[]; index: number | null; setIndex: (i: number | null) => void }) {
  const startX = useRef(0)
  const n = images.length
  const open = index !== null

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  useEffect(() => {
    if (index === null) return
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null)
      if (e.key === 'ArrowRight') setIndex((index + 1) % n)
      if (e.key === 'ArrowLeft') setIndex((index - 1 + n) % n)
    }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [index, n, setIndex])

  if (index === null || !n) return null
  const go = (d: number) => setIndex((index + d + n) % n)
  const onEnd = (e: TouchEvent) => { const dx = e.changedTouches[0].clientX - startX.current; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1) }
  const arrow = 'absolute top-1/2 z-10 -translate-y-1/2 text-5xl text-white/85 transition-transform hover:scale-125 hover:text-turquesa-soft'

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visor de fotos"
      className="lb-in fixed inset-0 z-[90] flex flex-col items-center justify-center bg-turquesa-deep/35 p-4 backdrop-blur-2xl"
      onClick={() => setIndex(null)}
      onTouchStart={(e) => (startX.current = e.touches[0].clientX)}
      onTouchEnd={onEnd}
    >
      <p className="absolute left-5 top-5 rounded-full bg-black/30 px-3 py-1 font-body text-sm text-white">{index + 1} / {n}</p>
      <button className="absolute right-5 top-3 text-4xl text-white transition-transform hover:rotate-90" onClick={() => setIndex(null)} aria-label="Cerrar">×</button>
      {n > 1 && <button className={`${arrow} left-2 sm:left-8`} onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="Anterior">‹</button>}
      <img key={index} referrerPolicy="no-referrer" src={images[index].src} alt={images[index].label} onClick={(e) => e.stopPropagation()} className="lb-img max-h-[70vh] max-w-full rounded-2xl border-4 border-white object-contain shadow-2xl sm:max-h-[74vh]" />
      <p className="mt-4 font-display text-xl italic text-white drop-shadow">{images[index].label}</p>
      {n > 1 && <button className={`${arrow} right-2 sm:right-8`} onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="Siguiente">›</button>}
      {n > 1 && (
        <div className="no-scrollbar mt-3 flex max-w-full gap-2 overflow-x-auto px-2" onClick={(e) => e.stopPropagation()}>
          {images.map((g, k) => (
            <button key={k} onClick={() => setIndex(k)} aria-label={`Foto ${k + 1}`} className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${k === index ? 'border-white opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}>
              <img src={g.src} alt="" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body,
  )
}