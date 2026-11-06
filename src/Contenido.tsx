import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { Ambient, CoupleArt, FloralCorner, Petals } from './Arte'
import { Reveal, Tilt, Divider, SectionTitle, Seccion, Words, Lightbox, useReveal, useCountdown, useScrollVar, launchConfetti, downloadICS, card, btn } from './Ui'
import { WEDDING, IGLESIA, SALON, SCHEDULE, GODPARENTS, PARENTS, STORY, PALETTE, GALLERY, BANDS, PORTADA, FOTOS_IGLESIA, FOTOS_SALON } from './Datos'
import type { Ev } from './Datos'

/* =====================================================================
   1. PORTADA
   `entered` = true cuando la carta ya se fue: así los nombres aparecen con
   su animación justo cuando los ves (y no detrás de la carta).
   ===================================================================== */
export function Hero({ guest, entered }: { guest: string; entered: boolean }) {
  const [m, setM] = useState({ x: 0, y: 0 })
  const [sy, setSy] = useState(0)
  useEffect(() => {
    const f = () => setSy(Math.min(window.scrollY, 800))
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  const d = WEDDING.date
  const rn = entered ? 'reveal-name' : 'opacity-0'
  return (
    <header id="inicio" onMouseMove={(e) => setM({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })} className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-white via-hueso to-hielo/70 px-6 pb-24 pt-16 text-center">
      <Ambient butterflies={6} sparks={30} />
      <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] rounded-full bg-turquesa-soft/30 blur-3xl" style={{ transform: `translate(calc(-50% + ${m.x * 60}px), calc(-50% + ${m.y * 60}px))` }} aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center" style={{ transform: `translate(${m.x * -26}px, ${sy * 0.2}px)` }} aria-hidden>
        <CoupleArt className="aspect-[400/520] h-[90vh] max-w-none opacity-[0.22]" />
      </div>
      <Petals />
      <svg className="pointer-events-none absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] sm:inset-8 sm:h-[calc(100%-4rem)] sm:w-[calc(100%-4rem)]" aria-hidden>
        <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="6" fill="none" stroke="#1fb5ad" strokeOpacity="0.6" pathLength={1} strokeDasharray={1} strokeDashoffset={1} className={entered ? 'animate-draw' : ''} />
      </svg>
      <div className="pointer-events-none absolute inset-0" style={{ transform: `translateY(${sy * -0.1}px)` }} aria-hidden>
        <FloralCorner className="absolute left-0 top-0 w-36 sm:w-64" />
        <FloralCorner className="absolute right-0 top-0 w-36 -scale-x-100 sm:w-64" />
        <FloralCorner className="absolute bottom-0 left-0 w-36 -scale-y-100 sm:w-64" />
        <FloralCorner className="absolute bottom-0 right-0 w-36 rotate-180 sm:w-64" />
      </div>

      <div className="relative z-10" style={{ transform: `translate(${m.x * -14}px, ${m.y * -14}px)` }}>
        <div className={`${rn} mx-auto mb-6 h-40 w-40 animate-float rounded-full bg-gradient-to-br from-turquesa-soft via-white to-turquesa p-1.5 shadow-2xl shadow-turquesa-deep/30 sm:h-52 sm:w-52`} style={{ '--d': '0s' } as CSSProperties}>
          <img src={PORTADA} alt="Los novios" className="h-full w-full rounded-full object-cover" />
        </div>
        <p className={`${rn} font-display text-sm uppercase tracking-[0.5em] text-turquesa-deep`} style={{ '--d': '0.2s' } as CSSProperties}>¡Nos casamos!</p>
        <p className={`${rn} mx-auto mt-3 max-w-md font-display text-lg italic text-tinta/85 sm:text-xl`} style={{ '--d': '0.4s' } as CSSProperties}>{guest ? `${guest}, nos haría muy felices que nos acompañes` : 'Nos haría muy felices que nos acompañes'}</p>
        <h1 className="my-6 font-script text-7xl leading-[1.05] sm:text-9xl">
          <span className={`${rn} gold-text inline-block`} style={{ '--d': '0.7s' } as CSSProperties}>{WEDDING.novio}</span>
          <span className="my-2 block animate-float font-display text-4xl italic text-turquesa-deep sm:text-5xl">&</span>
          <span className={`${rn} gold-text inline-block`} style={{ '--d': '1.2s' } as CSSProperties}>{WEDDING.novia}</span>
        </h1>
        <div className={`${rn} mx-auto inline-flex items-stretch overflow-hidden rounded-full border border-turquesa/60 bg-white/70 backdrop-blur`} style={{ '--d': '1.7s' } as CSSProperties}>
          <span className="px-4 py-2 font-display text-base capitalize sm:px-6 sm:text-lg">{d.toLocaleDateString('es-BO', { weekday: 'long' })}</span>
          <span className="border-x border-turquesa/60 bg-turquesa/20 px-5 py-1 font-display text-3xl font-semibold text-turquesa-deep sm:text-4xl">{d.getDate()}</span>
          <span className="px-4 py-2 font-display text-base capitalize sm:px-6 sm:text-lg">{d.toLocaleDateString('es-BO', { month: 'long' })} {d.getFullYear()}</span>
        </div>
        <p className={`${rn} mt-4 font-display text-xl italic text-tinta/85`} style={{ '--d': '2s' } as CSSProperties}>{IGLESIA.time} de la mañana</p>
        <div className={`${rn} mt-8`} style={{ '--d': '2.2s' } as CSSProperties}><a href="#confirmar" className={btn}>Confirmar asistencia</a></div>
      </div>
      <a href="#cuenta" aria-label="Desliza hacia abajo" className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center text-turquesa-deep"><span className="font-body text-xs tracking-[0.3em]">DESLIZA HACIA ABAJO</span><span className="animate-hint text-3xl">⌄</span></a>
    </header>
  )
}

/** Cinta con los nombres y la fecha en movimiento */
export function Marquee() {
  const d = WEDDING.date
  const t = `${WEDDING.novio} & ${WEDDING.novia}  ♥  ${d.getDate()} · ${d.getMonth() + 1} · ${d.getFullYear()}  ♥  `
  return (
    <div className="overflow-hidden bg-turquesa-deep py-3 text-white" aria-hidden>
      <div className="marquee flex w-max whitespace-nowrap font-display text-2xl italic tracking-wider">
        {Array.from({ length: 8 }).map((_, i) => <span key={i} className="px-4">{t}</span>)}
      </div>
    </div>
  )
}

/* =====================================================================
   2. CUENTA REGRESIVA
   ===================================================================== */
function MiniCalendar() {
  const d = WEDDING.date
  const offset = (new Date(d.getFullYear(), d.getMonth(), 1).getDay() + 6) % 7
  const total = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
  const cells: (number | null)[] = [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)]
  return (
    <Reveal className="mx-auto mt-14 max-w-sm" from="rotate">
      <Tilt className="rounded-3xl bg-gradient-to-br from-turquesa-soft via-turquesa to-turquesa-deep p-[1.5px] shadow-xl">
        <div className="rounded-[calc(1.5rem-1px)] bg-white p-6">
          <p className="text-center font-script text-4xl capitalize text-turquesa-deep">{d.toLocaleDateString('es-BO', { month: 'long', year: 'numeric' })}</p>
          <div className="mt-4 grid grid-cols-7 gap-1 text-center font-body text-sm">
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((x, i) => <span key={i} className="py-1 text-tinta/70">{x}</span>)}
            {cells.map((c, i) => c === null ? <span key={i} /> : c === d.getDate() ? (
              <span key={i} className="relative flex aspect-square animate-pulse-ring items-center justify-center rounded-full bg-turquesa font-semibold text-white shadow-lg">{c}<span className="absolute -right-1 -top-2 text-xs text-turquesa-deep">♥</span></span>
            ) : <span key={i} className="flex aspect-square items-center justify-center text-tinta/85">{c}</span>)}
          </div>
        </div>
      </Tilt>
    </Reveal>
  )
}

export function Countdown() {
  const t = useCountdown(WEDDING.date)
  const items = [['Días', t.days], ['Horas', t.hours], ['Minutos', t.minutes], ['Segundos', t.seconds]] as const
  return (
    <Seccion id="cuenta" className="paper bg-white px-6 py-24">
      <SectionTitle title="Falta muy poco" subtitle={t.done ? '¡Hoy es el gran día!' : 'Cada segundo nos acerca al sí'} />
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-5 sm:grid-cols-4">
        {items.map(([l, v], i) => (
          <Reveal key={l} delay={i * 120} from="flip">
            <Tilt className="rounded-2xl bg-gradient-to-br from-turquesa-soft via-turquesa to-turquesa-deep p-[1.5px] shadow-lg shadow-turquesa-deep/10">
              <div className="rounded-[calc(1rem-1px)] bg-white p-6 text-center">
                <div key={v} className="animate-pop font-display text-5xl font-semibold text-turquesa-deep sm:text-6xl">{String(v).padStart(2, '0')}</div>
                <div className="mt-2 font-body text-sm uppercase tracking-widest text-tinta/80">{l}</div>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
      <MiniCalendar />
      <Reveal className="mt-10 text-center"><button onClick={downloadICS} className="rounded-full border border-turquesa-deep px-8 py-3 font-body text-sm text-turquesa-deep transition-all hover:bg-turquesa-deep hover:text-white">Agregar a mi calendario</button></Reveal>
    </Seccion>
  )
}

/* =====================================================================
   3. FRASE: los anillos se juntan a medida que bajas
   ===================================================================== */
export function Interlude() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <Seccion className="bg-hueso px-6 py-28 text-center" back={<Ambient butterflies={3} sparks={22} />}>
      <div ref={ref} className="reveal in mx-auto mb-10 w-72 sm:w-96">
        <svg viewBox="0 0 300 150" className="ring-glow w-full overflow-visible" aria-hidden>
          <defs><linearGradient id="ringG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7fd8d0" /><stop offset="0.5" stopColor="#1fb5ad" /><stop offset="1" stopColor="#0e7c7b" /></linearGradient></defs>
          <g className="ring-scroll ring-scroll-l">
            <circle cx="115" cy="80" r="52" fill="none" stroke="url(#ringG)" strokeWidth="7" />
            <path d="M105 27 L115 12 L125 27 L115 38 Z" fill="#fff" stroke="#1fb5ad" />
          </g>
          <g className="ring-scroll ring-scroll-r">
            <circle cx="185" cy="80" r="52" fill="none" stroke="url(#ringG)" strokeWidth="7" />
          </g>
        </svg>
      </div>
      <Reveal className="mx-auto max-w-2xl">
        <p className="font-script text-5xl leading-tight sm:text-6xl"><Words text="Dos almas, un solo camino" wordClass="gold-text" step={140} /></p>
        <Divider />
        <p className="font-display text-xl italic text-tinta/90 sm:text-2xl">“<Words text={WEDDING.frase} step={45} />”</p>
        <p className="mt-6 font-script text-3xl text-turquesa-deep">{WEDDING.novio} & {WEDDING.novia}</p>
      </Reveal>
    </Seccion>
  )
}

/* =====================================================================
   4. HISTORIA: la línea se dibuja y los puntos se encienden al bajar
   ===================================================================== */
function Dot() {
  const ref = useReveal<HTMLSpanElement>()
  return <span ref={ref} className="story-dot absolute left-4 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-turquesa bg-white sm:left-1/2" />
}

export function Story() {
  const line = useRef<HTMLDivElement>(null)
  useScrollVar(line)
  return (
    <Seccion id="historia" className="paper bg-white px-6 py-24">
      <SectionTitle title="Nuestra historia" subtitle="Algunos momentos que nos trajeron hasta aquí" />
      <div ref={line} className="relative mx-auto max-w-3xl">
        <div className="absolute bottom-0 left-4 top-0 w-px bg-turquesa/20 sm:left-1/2" aria-hidden />
        <div className="story-line absolute bottom-0 left-4 top-0 w-[2px] bg-gradient-to-b from-turquesa-soft via-turquesa to-turquesa-deep sm:left-1/2" aria-hidden />
        {STORY.map((s, i) => {
          const right = i % 2 === 1
          return (
            <div key={s.title} className="relative mb-14 pl-12 sm:pl-0">
              <Dot />
              <Reveal from={right ? 'right' : 'left'} className={`sm:w-1/2 ${right ? 'sm:ml-auto sm:pl-12' : 'sm:pr-12 sm:text-right'}`}>
                <div className="rounded-2xl border border-turquesa/20 bg-white p-6 shadow-lg shadow-turquesa-deep/10 transition-transform duration-300 hover:-translate-y-1">
                  <span className="font-script text-4xl text-turquesa-deep">{s.year}</span>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-turquesa-deep">{s.title}</h3>
                  <p className="mt-2 font-body text-tinta/85">{s.text}</p>
                </div>
              </Reveal>
            </div>
          )
        })}
      </div>
    </Seccion>
  )
}

/* =====================================================================
   5. LUGARES (con sus fotos) y MAPA
   Fotos: src/assets/iglesia/  y  src/assets/salon/
   ===================================================================== */
type Foto = { src: string; label: string }

function LugarCard({ ev, fotos, carpeta, delay, from }: { ev: Ev; fotos: Foto[]; carpeta: string; delay: number; from: 'left' | 'right' }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <Reveal delay={delay} from={from}>
      <Tilt className={card}>
        <div className="icon-pop animate-float mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-hielo/60 text-3xl">{ev.icon}</div>
        <h3 className="font-script text-4xl leading-tight text-turquesa-deep">{ev.title}</h3>
        <p className="mt-3 font-display text-lg italic text-tinta/85">{ev.date}</p>
        <p className="font-display text-5xl font-semibold">{ev.time}</p>
        <p className="mt-3 font-display text-xl">{ev.place}</p>
        {fotos.length > 0 ? (
          <button onClick={() => setOpen(0)} aria-label={`Ver fotos de ${ev.place}`} className="group relative mx-auto mt-4 block w-full overflow-hidden rounded-2xl shadow-lg">
            <img src={fotos[0].src} alt={ev.place} loading="lazy" referrerPolicy="no-referrer" className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <span className="absolute bottom-2 right-2 rounded-full bg-black/55 px-3 py-1 font-body text-xs text-white backdrop-blur">📷 {fotos.length} {fotos.length === 1 ? 'foto' : 'fotos'}</span>
          </button>
        ) : (
          import.meta.env.DEV && <p className="mt-4 rounded-xl border border-dashed border-turquesa/50 p-3 font-body text-xs text-turquesa-deep">📷 Agrega enlaces de fotos en <code>{carpeta}</code></p>
        )}
        <a href={ev.map} target="_blank" rel="noreferrer" className={`${btn} mt-6`}>Ver en el mapa</a>
      </Tilt>
      <Lightbox images={fotos} index={open} setIndex={setOpen} />
    </Reveal>
  )
}

export function Details() {
  return (
    <Seccion className="paper bg-hueso px-6 py-24">
      <SectionTitle title="Dónde y cuándo" subtitle="Te esperamos con los brazos abiertos" />
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        <LugarCard ev={IGLESIA} fotos={FOTOS_IGLESIA} carpeta="URLS_IGLESIA (Datos.ts)" delay={0} from="left" />
        <LugarCard ev={SALON} fotos={FOTOS_SALON} carpeta="URLS_SALON (Datos.ts)" delay={150} from="right" />
      </div>
    </Seccion>
  )
}

function FotosLugar({ fotos, carpeta }: { fotos: Foto[]; carpeta: string }) {
  const [open, setOpen] = useState<number | null>(null)
  if (!fotos.length) return import.meta.env.DEV ? <p className="border-t border-turquesa/20 p-4 text-center font-body text-xs text-turquesa-deep">📷 Agrega enlaces de fotos en <code>{carpeta}</code></p> : null
  return (
    <div className="border-t border-turquesa/20 p-5">
      <p className="mb-3 text-center font-display text-lg italic text-turquesa-deep">Fotos del lugar · toca para ampliar</p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {fotos.map((f, i) => (
          <button key={i} onClick={() => setOpen(i)} aria-label={`Ampliar foto ${i + 1}`} className="group shine relative aspect-square overflow-hidden rounded-xl border-2 border-white shadow-md">
            <img src={f.src} alt={f.label} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </button>
        ))}
      </div>
      <Lightbox images={fotos} index={open} setIndex={setOpen} />
    </div>
  )
}

export function Where() {
  const places = [
    { key: 'iglesia', tab: 'Ceremonia', ev: IGLESIA, fotos: FOTOS_IGLESIA, carpeta: 'URLS_IGLESIA (Datos.ts)' },
    { key: 'salon', tab: 'Recepción', ev: SALON, fotos: FOTOS_SALON, carpeta: 'URLS_SALON (Datos.ts)' },
  ]
  const [active, setActive] = useState(0)
  const p = places[active]
  return (
    <Seccion id="donde" className="paper bg-white px-6 py-24">
      <SectionTitle title="¿Dónde será?" subtitle="Elige el lugar para ver el mapa, las fotos y cómo llegar" />
      <Reveal className="mx-auto max-w-4xl" from="zoom">
        <div role="tablist" className="mx-auto mb-6 flex w-fit rounded-full border border-turquesa/40 bg-white p-1 shadow">
          {places.map((pl, i) => (
            <button key={pl.key} role="tab" aria-selected={active === i} onClick={() => setActive(i)} className={`rounded-full px-5 py-2 font-body text-sm transition-all ${active === i ? 'bg-turquesa text-white shadow' : 'text-tinta/85 hover:text-turquesa-deep'}`}>{pl.tab}</button>
          ))}
        </div>
        <div className="overflow-hidden rounded-3xl border border-turquesa/40 bg-white shadow-xl">
          <iframe key={p.key} title={`Mapa: ${p.ev.place}`} src={`https://www.google.com/maps?q=${p.ev.lat},${p.ev.lng}&z=17&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full animate-pop border-0 sm:h-[26rem]" />
          <div className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-display text-2xl text-turquesa-deep">{p.ev.place}</p>
            </div>
            <a href={p.ev.map} target="_blank" rel="noreferrer" className={`${btn} shrink-0`}>Cómo llegar</a>
          </div>
          <FotosLugar key={p.key} fotos={p.fotos} carpeta={p.carpeta} />
        </div>
      </Reveal>
    </Seccion>
  )
}

/* =====================================================================
   6. PROGRAMA, PADRINOS Y VESTIMENTA
   ===================================================================== */
export function Schedule() {
  const froms = ['zoom', 'flip', 'rotate', 'blur'] as const
  return (
    <Seccion id="programa" className="paper bg-hueso px-6 py-24">
      <SectionTitle title="Programa de nuestra boda" subtitle={IGLESIA.date} />
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-5 md:grid-cols-4">
        {SCHEDULE.map((s, i) => (
          <Reveal key={s.label} delay={(i % 4) * 100} from={froms[i % 4]}>
            <Tilt className="shine h-full rounded-2xl border border-turquesa/40 bg-white p-6 text-center shadow-lg shadow-turquesa-deep/5">
              <div className="icon-pop animate-float text-4xl" style={{ animationDelay: `${i * 0.35}s` }}>{s.icon}</div>
              <p className="mt-3 font-display text-3xl font-semibold text-turquesa-deep">{s.time}</p>
              <p className="mt-1 font-body text-sm text-tinta/85">{s.label}</p>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </Seccion>
  )
}

function PeopleCard({ title, icon, names, delay }: { title: string; icon: string; names: string[]; delay: number }) {
  return (
    <Reveal delay={delay} from="blur">
      <Tilt className={card}>
        <div className="icon-pop animate-float mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-hielo/70 text-2xl">{icon}</div>
        <h3 className="font-script text-3xl leading-tight text-turquesa-deep">{title}</h3>
        <ul className="mt-4 space-y-2">{names.map((n) => <li key={n} className="font-display text-lg">{n}</li>)}</ul>
      </Tilt>
    </Reveal>
  )
}

export function Padrinos() {
  return (
    <Seccion className="paper bg-white px-6 py-24">
      <SectionTitle title="Con la bendición de Dios y nuestros padres" />
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        {PARENTS.map((p, i) => <PeopleCard key={p.title} {...p} delay={i * 150} />)}
      </div>
      <div className="mt-24"><SectionTitle title="Nuestros padrinos" subtitle="Gracias por acompañarnos en este camino" /></div>
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        {GODPARENTS.map((p, i) => <PeopleCard key={p.title} {...p} delay={i * 150} />)}
      </div>
    </Seccion>
  )
}

export function DressCode() {
  return (
    <Seccion className="paper bg-hueso px-6 py-24">
      <SectionTitle title="Código de vestimenta" subtitle="Formal. Si puedes, inspírate en nuestra paleta" />
      <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-6">
        {PALETTE.map((c, i) => (
          <Reveal key={c.name} delay={i * 100} from="zoom">
            <div className="group text-center">
              <div className="mx-auto h-20 w-20 rounded-full border-2 border-turquesa-soft shadow-lg transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110" style={{ background: c.color }} />
              <p className="mt-3 font-display text-lg italic">{c.name}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mx-auto mt-10 max-w-md text-center font-body text-sm text-tinta/85">Pedimos evitar el blanco total, reservado para la novia.</Reveal>
    </Seccion>
  )
}

/* =====================================================================
   7. GALERÍA Y AMENIZADOS
   ===================================================================== */
export function Gallery() {
  const [open, setOpen] = useState<number | null>(null)
  const dirs = ['left', 'zoom', 'right', 'rotate', 'blur', 'flip'] as const
  return (
    <Seccion id="galeria" className="paper bg-white px-6 py-24">
      <SectionTitle title="Nuestros momentos" subtitle="Toca una foto para verla en grande" />
      <div className="mx-auto max-w-6xl columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {GALLERY.map((g, i) => (
          <Reveal key={g.id} from={dirs[i % dirs.length]} delay={(i % 3) * 120} className="break-inside-avoid">
            <button onClick={() => setOpen(i)} className="group shine relative block w-full overflow-hidden rounded-2xl border-4 border-white shadow-xl shadow-turquesa-deep/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquesa">
              <img src={g.src} alt={g.label} loading="lazy" className="par-img w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-turquesa-deep/90 to-transparent px-4 pb-3 pt-10 text-left font-display text-lg italic text-white">{g.label}</span>
            </button>
          </Reveal>
        ))}
      </div>
      <Lightbox images={GALLERY} index={open} setIndex={setOpen} />
    </Seccion>
  )
}

export function Bands() {
  const [open, setOpen] = useState<number | null>(null)
  const conFoto = BANDS.filter((b) => b.url)
  const n = BANDS.length
  return (
    <Seccion id="amenizados" className="bg-gradient-to-b from-turquesa-deep to-[#0b3b3a] px-6 py-24 text-white" back={<Ambient butterflies={2} sparks={28} />}>
      <SectionTitle dark title="Estaremos amenizados por" subtitle="Música para bailar toda la noche" />
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 md:grid-cols-6">
        {BANDS.map((b, i) => {
          const last = n % 2 === 1 && i === n - 1 // si es impar, la última ocupa todo el ancho
          const alto = last ? 'h-72 md:h-[30rem]' : 'h-72 md:h-[26rem]'
          return (
            <Reveal key={b.name} from={last ? 'zoom' : i % 2 ? 'right' : 'left'} delay={(i % 3) * 120} className={`col-span-2 ${last ? 'md:col-span-6' : 'md:col-span-3'}`}>
              {b.url ? (
                <button onClick={() => setOpen(conFoto.indexOf(b))} className="group shine relative block w-full rounded-3xl bg-gradient-to-br from-turquesa-soft via-white to-turquesa p-1.5 shadow-2xl transition-transform duration-500 hover:-translate-y-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  <div className="relative overflow-hidden rounded-[1.25rem]">
                    <img src={b.url} alt={b.name} loading="lazy" referrerPolicy="no-referrer" className={`w-full object-cover object-top transition-transform duration-[900ms] group-hover:scale-110 ${alto}`} />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 pb-4 pt-16 text-center">
                      <p className="font-display text-xl italic text-white sm:text-2xl">{b.name}</p>
                      <span className="mx-auto mt-2 block h-px w-12 bg-turquesa-soft transition-all duration-500 group-hover:w-28" />
                    </div>
                  </div>
                </button>
              ) : (
                <div className={`flex ${alto} flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-turquesa-soft via-turquesa to-turquesa-deep p-6 text-center shadow-2xl`}>
                  <span className="text-5xl">🎶</span>
                  <p className="mt-3 font-display text-2xl italic text-white sm:text-3xl">{b.name}</p>
                  {import.meta.env.DEV && <p className="mt-3 font-body text-xs text-white/85">Agrega el enlace de su foto en <code>BANDS (Datos.ts)</code></p>}
                </div>
              )}
            </Reveal>
          )
        })}
      </div>
      <Lightbox images={conFoto.map((b) => ({ src: b.url, label: b.name }))} index={open} setIndex={setOpen} />
    </Seccion>
  )
}

/* =====================================================================
   8. REGALOS Y CONFIRMACIÓN
   ===================================================================== */
export function Gifts() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(WEDDING.account.number); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* sin portapapeles */ }
  }
  return (
    <Seccion id="regalos" className="paper bg-hueso px-6 py-24">
      <SectionTitle title="Mesa de regalos" subtitle="Tu presencia es nuestro mejor regalo. Si deseas hacernos uno, aquí está nuestra cuenta" />
      <Reveal className="mx-auto max-w-md" from="rotate">
        <Tilt className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-turquesa to-turquesa-deep p-8 text-white shadow-2xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/25 blur-2xl" aria-hidden />
          <p className="relative font-display text-xl italic text-white">{WEDDING.account.bank}</p>
          <p className="relative mt-6 font-mono text-2xl tracking-wider">{WEDDING.account.number}</p>
          <p className="relative mt-6 font-body text-sm text-white/80">{WEDDING.account.holder}</p>
          <button onClick={copy} className="relative mt-6 rounded-full bg-white px-6 py-2.5 font-body text-sm font-medium text-turquesa-deep transition-all hover:bg-hielo">{copied ? 'Número copiado' : 'Copiar número de cuenta'}</button>
        </Tilt>
      </Reveal>
    </Seccion>
  )
}

export function Rsvp({ guest }: { guest: string }) {
  const [form, setForm] = useState({ name: guest, attending: 'si', guests: 1, menu: 'tradicional', message: '' })
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (form.name.trim().length < 3) return setError('Escribe tu nombre completo para poder identificarte.')
    setError('')
    const asiste = form.attending === 'si'
    if (WEDDING.sheetsUrl) {
      setSending(true)
      try {
        await fetch(WEDDING.sheetsUrl, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ nombre: form.name.trim(), asistencia: asiste ? 'Sí' : 'No', personas: asiste ? form.guests : 0, menu: asiste ? form.menu : '', mensaje: form.message.trim() }) })
      } catch {
        setSending(false)
        return setError('No pudimos guardar tu respuesta. Revisa tu conexión e inténtalo de nuevo.')
      }
      setSending(false)
    } else {
      const text = asiste ? `Hola, soy ${form.name}. ¡Confirmo mi asistencia a la boda! Seremos ${form.guests} persona(s). Menú: ${form.menu}. ${form.message}` : `Hola, soy ${form.name}. Lamentablemente no podré asistir a la boda. ${form.message}`
      window.open(`https://wa.me/${WEDDING.whatsapp}?text=${encodeURIComponent(text)}`, '_blank')
    }
    setSent(true)
    if (asiste) launchConfetti()
  }

  const field = 'w-full rounded-xl border border-turquesa/40 bg-white px-4 py-3 font-body outline-none transition-all focus:border-turquesa-deep focus:ring-4 focus:ring-turquesa/20'
  return (
    <Seccion id="confirmar" className="paper bg-white px-6 py-24">
      <SectionTitle title="¿Nos acompañas?" subtitle={`Confírmanos antes del ${WEDDING.rsvpDeadline}`} />
      <Reveal className="mx-auto max-w-xl" from="zoom">
        {sent ? (
          <div className="animate-pop rounded-3xl border border-turquesa/30 bg-white p-10 text-center shadow-xl">
            <p className="font-script text-5xl text-turquesa-deep">{form.attending === 'si' ? '¡Gracias!' : 'Te extrañaremos'}</p>
            <p className="mt-4 font-display text-xl text-tinta/90">{form.attending === 'si' ? 'Tu confirmación llegó. Nos vemos pronto para celebrar.' : 'Gracias por avisarnos. Te llevamos en el corazón.'}</p>
            <button onClick={() => setSent(false)} className="mt-6 font-body text-sm text-turquesa-deep underline underline-offset-4">Editar mi respuesta</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-6 rounded-3xl border border-turquesa/30 bg-white p-8 shadow-xl">
            <label className="block"><span className="mb-2 block font-body text-sm text-tinta/85">Nombre completo</span><input className={field} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Ej. María Fernández" /></label>
            <fieldset>
              <legend className="mb-2 font-body text-sm text-tinta/85">¿Asistirás?</legend>
              <div className="grid grid-cols-2 gap-3">
                {[{ v: 'si', t: 'Sí, ahí estaré' }, { v: 'no', t: 'No podré ir' }].map((o) => (
                  <button type="button" key={o.v} onClick={() => set('attending', o.v)} aria-pressed={form.attending === o.v} className={`rounded-xl border px-4 py-3 font-body transition-all ${form.attending === o.v ? 'border-turquesa-deep bg-turquesa text-white shadow-lg' : 'border-turquesa/40 bg-white hover:border-turquesa-deep'}`}>{o.t}</button>
                ))}
              </div>
            </fieldset>
            {form.attending === 'si' && (
              <div className="grid animate-pop gap-6 sm:grid-cols-2">
                <div>
                  <span className="mb-2 block font-body text-sm text-tinta/85">Número de personas</span>
                  <div className="flex items-center justify-between rounded-xl border border-turquesa/40 bg-white px-3 py-2">
                    <button type="button" onClick={() => set('guests', Math.max(1, form.guests - 1))} className="h-9 w-9 rounded-full bg-hielo/70 text-xl text-turquesa-deep" aria-label="Menos">−</button>
                    <span className="font-display text-2xl">{form.guests}</span>
                    <button type="button" onClick={() => set('guests', Math.min(6, form.guests + 1))} className="h-9 w-9 rounded-full bg-hielo/70 text-xl text-turquesa-deep" aria-label="Más">+</button>
                  </div>
                </div>
                <label className="block"><span className="mb-2 block font-body text-sm text-tinta/85">Menú</span>
                  <select className={field} value={form.menu} onChange={(e) => set('menu', e.target.value)}><option value="tradicional">Tradicional</option><option value="vegetariano">Vegetariano</option><option value="infantil">Infantil</option></select>
                </label>
              </div>
            )}
            <label className="block"><span className="mb-2 block font-body text-sm text-tinta/85">Un mensaje para los novios (opcional)</span><textarea className={field} rows={3} value={form.message} onChange={(e) => set('message', e.target.value)} /></label>
            {error && <p role="alert" className="rounded-lg bg-coral/10 px-4 py-3 font-body text-sm text-coral">{error}</p>}
            <button type="submit" disabled={sending} className="w-full rounded-full bg-gradient-to-r from-turquesa to-turquesa-deep py-4 font-body font-medium tracking-wide text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-wait disabled:opacity-70">{sending ? 'Guardando…' : 'Confirmar asistencia'}</button>
          </form>
        )}
      </Reveal>
    </Seccion>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-white to-hielo/70 px-6 pt-20 text-center">
      <Ambient butterflies={4} sparks={24} />
      <Petals count={8} />
      <Reveal className="relative" from="blur">
        <p className="font-display text-xl italic text-turquesa-deep">Con todo nuestro amor</p>
        <p className="my-4 font-script text-6xl sm:text-7xl"><span className="gold-text">{WEDDING.novio} & {WEDDING.novia}</span></p>
        <p className="font-body text-sm text-tinta/80">{WEDDING.date.toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        <p className="mt-5 font-display text-2xl tracking-widest text-turquesa-deep">#{WEDDING.novio}Y{WEDDING.novia}</p>
      </Reveal>
      <div className="relative mt-10 flex justify-center"><CoupleArt className="aspect-[400/520] h-72 opacity-90 sm:h-96" /></div>
    </footer>
  )
}