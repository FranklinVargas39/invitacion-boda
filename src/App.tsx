import { useEffect, useId, useMemo, useRef, useState } from 'react'
import amorHuanchano from './assets/amor-huanchano.jpg'
import axcesoCodigo from './assets/axceso-codigo.jpg'
import caricatura from './assets/caricatura.jpg'
import duoArmonia from './assets/duo-armonia.jpg'
import iglesia from './assets/iglesia.jpg'
import italaque from './assets/italaque.jpg'
import kodicia from './assets/kodicia.jpg'
import novios from './assets/novios.jpg'
import type { CSSProperties, FormEvent, MouseEvent, ReactNode } from 'react'

/* =====================================================================
   ✏️  EDITA AQUÍ TUS DATOS
   ===================================================================== */
const mapsLink = (q: string) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q)

type EventInfo = {
  title: string
  date: string
  time: string
  place: string
  address: string
  mapQuery: string
  map: string
  image?: string
}

const WEDDING = {
  bride: 'Erick Ariel',
  groom: 'Susana Yovana',
  // Año, mes (0-11), día, hora, minuto  → sábado 24 de octubre de 2026, 08:45
  date: new Date(2026, 9, 24, 8, 45, 0),
  quote: 'Cada día a tu lado es un regalo precioso: compartir nuestra vida es descubrir juntos un amor que se hace más grande.',
  ceremony: {
    title: 'Ceremonia religiosa',
    date: 'Sábado 24 de octubre',
    time: '08:45',
    place: 'Parroquia “Apóstol San Pablo”',
    address: 'Zona Río Seco, Viviendas Mercado Carmen · El Alto',
    mapQuery: 'Parroquia Apóstol San Pablo, Río Seco, El Alto, Bolivia',
    map: mapsLink('Parroquia Apóstol San Pablo, Río Seco, El Alto, Bolivia'),
    image: iglesia,
  } as EventInfo,
  reception: {
    title: 'Recepción social',
    date: 'Sábado 24 de octubre',
    time: '16:00',
    place: 'Salón de Eventos “Máximo”',
    address: 'Calle Víctor Gutiérrez entre Calle Nisthaus y Fournier, Zona 16 de Julio · El Alto',
    mapQuery: 'Salón de Eventos Máximo, Calle Víctor Gutiérrez, Zona 16 de Julio, El Alto, Bolivia',
    map: mapsLink('Salón de Eventos Máximo, Calle Víctor Gutiérrez, Zona 16 de Julio, El Alto, Bolivia'),
  } as EventInfo,
  pickup: {
    title: 'Recojo de padrinos y conteo de regalos',
    date: 'Domingo 25 de octubre',
    time: '09:00',
    place: 'Salón de Eventos “Máximo”',
    address: 'Calle Víctor Gutiérrez entre Calle Nisthaus y Fournier, Zona 16 de Julio · El Alto',
    mapQuery: 'Salón de Eventos Máximo, Calle Víctor Gutiérrez, Zona 16 de Julio, El Alto, Bolivia',
    map: mapsLink('Salón de Eventos Máximo, Calle Víctor Gutiérrez, Zona 16 de Julio, El Alto, Bolivia'),
  } as EventInfo,
  // Pega aquí la URL de tu Apps Script (termina en /exec). Si está vacía, se usa WhatsApp.
  sheetsUrl: '',
  whatsapp: '59171242494', // número que recibe las confirmaciones (con código de país)
  rsvpDeadline: '20 de octubre',
  account: {
    bank: 'Banco Unión',
    holder: 'Erick Ariel & Susana Yovana',
    number: '000-0000000-0-00',
  },
  youtubeId: 'boA7r9_aTyk', // música: https://youtu.be/boA7r9_aTyk
  // Video de la invitación: ID del archivo de Google Drive (el archivo debe estar compartido como 'Cualquier persona con el enlace')
  video: { driveId: '1x0J4O5m91TFol7T7DY-Lw7ij9PJep0hs', youtubeId: '', mp4: '', poster: '' },
}

const SCHEDULE = [
  { time: '08:45', icon: '⛪', label: 'Ceremonia religiosa' },
  { time: '10:00', icon: '🚗', label: 'Paseo de los novios' },
  { time: '16:00', icon: '🏛️', label: 'Llegada de los novios al salón' },
  { time: '16:30', icon: '💃', label: 'Baile' },
  { time: '17:00', icon: '🥂', label: 'Brindis' },
  { time: '19:30', icon: '🍽️', label: 'Cena' },
  { time: '22:00', icon: '🎂', label: 'Torta' },
  { time: '00:00', icon: '💞', label: 'Felices por siempre' },
]

const PARENTS = [
  { title: 'Padres del novio', icon: '🤵', names: ['Sr. Primo Alcón Loayza', 'Sra. Amalia Cauna de Alcón'] },
  {
    title: 'Padres de la novia',
    icon: '👰',
    names: ['Sr. Constantino Saavedra Bustamante (+)', 'Sr. Epifanio Vargas Mamani', 'Sra. María Cristina Choque de Vargas'],
  },
]

const GODPARENTS = [
  { title: 'Padrinos de religión y civil', icon: '⛪', names: ['Sr. Justo Cahuapaza Condori', 'Sra. Lidia Vargas de Cahuapaza'] },
  { title: 'Padrinos de torta y conteo', icon: '🎂', names: ['Sr. Alejandro Ortíz Jove', 'Sra. Cristina Quispe de Ortíz'] },
  { title: 'Madrina de colitas', icon: '🎀', names: ['Srta. Thania Estefany Ortíz Quispe'] },
]

const BANDS = [
  { name: 'Axceso Forever & Agrupación Código', src: axcesoCodigo, span: 'col-span-2', h: 'h-64 md:h-80' },
  { name: 'Kodicia Internacional', src: kodicia, span: 'col-span-2', h: 'h-64 md:h-80' },
  { name: 'Amor Huanchaño · Sinfonía de los Andes', src: amorHuanchano, span: 'col-span-2', h: 'h-44 md:h-56' },
  { name: 'Dúo Armonía', src: duoArmonia, span: 'col-span-1', h: 'h-44 md:h-56' },
  { name: 'Italaque', src: italaque, span: 'col-span-1', h: 'h-44 md:h-56' },
]

const STORY = [
  { year: '2016', title: 'Nos conocimos', text: 'Una tarde cualquiera, una conversación que no quisimos terminar.' },
  { year: '2019', title: 'Nuestra primera aventura', text: 'Mochila, carretera y la certeza de que todo era mejor juntos.' },
  { year: '2024', title: 'Nos mudamos juntos', text: 'Dos vidas, un solo hogar, y un gato que decidió quién manda.' },
  { year: '2025', title: 'La pregunta', text: 'Un atardecer, una rodilla en el suelo y el sí más fácil de la historia.' },
]

const PALETTE = [
  { name: 'Vino', color: '#6b1f3a' },
  { name: 'Índigo', color: '#16163a' },
  { name: 'Rosa antiguo', color: '#e9b8bf' },
  { name: 'Dorado', color: '#c9a24b' },
  { name: 'Marfil', color: '#fbf8f3' },
]

const GALLERY = [
  { id: 1, src: novios, label: 'Los novios' },
  { id: 2, src: caricatura, label: 'Nuestro gran día' },
]
// Las fotos están en src/assets. Puedes agregar más elementos a este arreglo.

/* =====================================================================
   HOOKS Y UTILIDADES
   ===================================================================== */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

function Reveal({
  children,
  className = '',
  delay = 0,
  from = 'up',
}: {
  children: ReactNode
  className?: string
  delay?: number
  from?: 'up' | 'left' | 'right'
}) {
  const ref = useReveal<HTMLDivElement>()
  const dir = from === 'left' ? 'reveal-left' : from === 'right' ? 'reveal-right' : ''
  return (
    <div ref={ref} className={`reveal ${dir} ${className}`} style={{ '--delay': `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  )
}

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now())
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      done: diff === 0,
    }
  }
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return t
}

function launchConfetti() {
  const canvas = document.createElement('canvas')
  canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')!
  const colors = ['#c9a24b', '#e6cf94', '#6b1f3a', '#e9b8bf', '#fbf8f3', '#24244f']
  const parts = Array.from({ length: 180 }, () => ({
    x: canvas.width / 2,
    y: canvas.height * 0.65,
    vx: (Math.random() - 0.5) * 16,
    vy: -Math.random() * 18 - 4,
    size: Math.random() * 8 + 4,
    rot: Math.random() * 6.28,
    vr: (Math.random() - 0.5) * 0.4,
    color: colors[Math.floor(Math.random() * colors.length)],
    heart: Math.random() > 0.7,
  }))
  let frames = 0
  const tick = () => {
    frames++
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    parts.forEach((p) => {
      p.vy += 0.35
      p.x += p.vx
      p.y += p.vy
      p.rot += p.vr
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color
      ctx.globalAlpha = Math.max(0, 1 - frames / 200)
      if (p.heart) {
        ctx.font = `${p.size * 2}px serif`
        ctx.fillText('♥', 0, 0)
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
      }
      ctx.restore()
    })
    if (frames < 200) requestAnimationFrame(tick)
    else canvas.remove()
  }
  tick()
}

function downloadICS() {
  const d = WEDDING.date
  const fmt = (x: Date) => x.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const end = new Date(d.getTime() + 8 * 3600000)
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Boda//ES',
    'BEGIN:VEVENT',
    `DTSTART:${fmt(d)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:Boda de ${WEDDING.bride} y ${WEDDING.groom}`,
    `LOCATION:${WEDDING.ceremony.place}, ${WEDDING.ceremony.address}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  const a = document.createElement('a')
  a.href = url
  a.download = 'boda.ics'
  a.click()
  URL.revokeObjectURL(url)
}

/* =====================================================================
   COMPONENTES VISUALES
   ===================================================================== */
function Petals({ count = 22 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 14,
        dur: 9 + Math.random() * 10,
        delay: -Math.random() * 18,
        drift: (Math.random() - 0.3) * 160,
        color: ['#e9b8bf', '#f4dfe1', '#c9a24b', '#fbf8f3'][i % 4],
      })),
    [count],
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              opacity: 0.8,
              '--dur': `${p.dur}s`,
              '--delay': `${p.delay}s`,
              '--drift': `${p.drift}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}

function Stars() {
  const stars = useMemo(
    () => Array.from({ length: 40 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, d: Math.random() * 3 })),
    [],
  )
  return (
    <div className="absolute inset-0" aria-hidden>
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute h-1 w-1 animate-twinkle rounded-full bg-gold-soft"
          style={{ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${s.d}s` }}
        />
      ))}
    </div>
  )
}

function Divider({ dark = false }: { dark?: boolean }) {
  const line = dark ? 'from-transparent to-gold-soft/70' : 'from-transparent to-gold'
  return (
    <div className="my-6 flex items-center justify-center gap-3" aria-hidden>
      <span className={`h-px w-20 bg-gradient-to-r ${line}`} />
      <span className="text-xs text-gold">◆</span>
      <span className="text-lg text-gold">♥</span>
      <span className="text-xs text-gold">◆</span>
      <span className={`h-px w-20 bg-gradient-to-l ${line}`} />
    </div>
  )
}

function SectionTitle({ title, subtitle, dark = false }: { title: string; subtitle?: string; dark?: boolean }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-xl text-center">
      <h2 className={`font-script text-5xl sm:text-6xl ${dark ? 'text-gold-soft' : 'text-wine'}`}>{title}</h2>
      <Divider dark={dark} />
      {subtitle && (
        <p className={`font-display text-xl italic ${dark ? 'text-ivory/80' : 'text-ink/70'}`}>{subtitle}</p>
      )}
    </Reveal>
  )
}

function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const [style, setStyle] = useState<CSSProperties>({})
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    setStyle({ transform: `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.03)` })
  }
  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => setStyle({ transform: 'perspective(900px) rotateX(0) rotateY(0) scale(1)' })}
      style={{ ...style, transition: 'transform 0.25s ease-out' }}
      className={className}
    >
      {children}
    </div>
  )
}

/* =====================================================================
   ARTE: PAREJA, FLORES, ONDAS, LUCES
   ===================================================================== */
function Flower({ x, y, s = 1, a = '#e9b8bf', b = '#fbf8f3' }: { x: number; y: number; s?: number; a?: string; b?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="0" cy="-9" rx="7" ry="11" fill={a} opacity="0.92" transform={`rotate(${r})`} />
      ))}
      {[36, 108, 180, 252, 324].map((r) => (
        <ellipse key={r} cx="0" cy="-5" rx="5" ry="8" fill={b} opacity="0.95" transform={`rotate(${r})`} />
      ))}
      <circle r="3.6" fill="#c9a24b" />
    </g>
  )
}

/** Pareja de novios uniéndose bajo un arco de flores, con los anillos arriba */
function CoupleArt({ className = '', variant = 'gold' }: { className?: string; variant?: 'gold' | 'wine' }) {
  const id = useId().replace(/:/g, '')
  const fill = variant === 'gold' ? `url(#g${id})` : '#6b1f3a'
  const ring = variant === 'gold' ? '#f0dc9c' : '#c9a24b'
  const arch = useMemo(() => {
    const pts: { x: number; y: number; i: number }[] = []
    for (let i = 0; i <= 12; i++) {
      const th = Math.PI + (Math.PI * i) / 12
      pts.push({ x: 200 + 150 * Math.cos(th), y: 230 + 150 * Math.sin(th), i })
    }
    for (let j = 0; j < 5; j++) {
      pts.push({ x: 50, y: 275 + j * 55, i: 100 + j })
      pts.push({ x: 350, y: 275 + j * 55, i: 200 + j })
    }
    return pts
  }, [])
  return (
    <svg viewBox="0 0 400 520" className={className} role="img" aria-label="Novios uniéndose en matrimonio">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0dc9c" />
          <stop offset="0.5" stopColor="#c9a24b" />
          <stop offset="1" stopColor="#8a6a1c" />
        </linearGradient>
      </defs>
      {/* Arco de boda */}
      <path d="M50 505 L50 230 A150 150 0 0 1 350 230 L350 505" fill="none" stroke={fill} strokeOpacity="0.7" strokeWidth="2.5" />
      {arch.map((p) => (
        <Flower key={p.i} x={p.x} y={p.y} s={p.i % 2 ? 0.8 : 1.05} a={p.i % 3 === 0 ? '#e9b8bf' : '#f4dfe1'} />
      ))}
      {/* Novios */}
      <g transform="translate(0 40)" fill={fill}>
        <g className="couple-groom">
          <circle cx="150" cy="105" r="21" />
          <rect x="143" y="122" width="14" height="16" />
          <path d="M124 152 Q150 138 176 152 L184 240 L180 318 L180 470 L153 470 L150 345 L147 470 L120 470 L120 318 L116 240 Z" />
          <path d="M180 158 Q214 196 224 244 L214 250 Q204 214 176 186 Z" />
        </g>
        <g className="couple-bride">
          <path d="M262 102 C322 112 356 204 350 332 C346 424 336 470 336 470 L322 470 C326 402 324 304 302 224 C290 182 276 144 258 122 Z" opacity="0.55" />
          <circle cx="250" cy="116" r="20" />
          <circle cx="262" cy="100" r="9" />
          <rect x="244" y="134" width="12" height="12" />
          <path d="M234 146 Q250 138 268 146 L264 230 C298 262 326 360 338 470 L198 470 C208 360 228 262 236 230 Z" />
          <path d="M238 156 Q222 194 222 244 L232 248 Q234 204 248 164 Z" />
          <Flower x={224} y={256} s={0.7} />
          <Flower x={236} y={268} s={0.55} a="#c9a24b" />
        </g>
      </g>
      {/* Anillos */}
      <g className="rings-float">
        <circle cx="188" cy="104" r="15" fill="none" stroke={ring} strokeWidth="3.5" />
        <circle cx="212" cy="104" r="15" fill="none" stroke={ring} strokeWidth="3.5" />
        <path d="M188 82 l5 7 -5 7 -5 -7z" fill={ring} />
      </g>
      {[[120, 70], [285, 85], [95, 160], [310, 175]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 7} L${x + 2} ${y - 2} L${x + 7} ${y} L${x + 2} ${y + 2} L${x} ${y + 7} L${x - 2} ${y + 2} L${x - 7} ${y} L${x - 2} ${y - 2}Z`} fill="#fff" className="svg-center animate-twinkle" style={{ animationDelay: `${i * 0.7}s` }} />
      ))}
      <ellipse cx="200" cy="514" rx="140" ry="5" fill={fill} opacity="0.25" />
    </svg>
  )
}

/** Esquina floral decorativa (rosas y hojas) */
function FloralCorner({ className = '' }: { className?: string }) {
  const leaves: [number, number, number][] = [[28, 22, 20], [52, 40, 50], [80, 58, 35], [100, 88, 70], [124, 112, 55], [146, 142, 80], [170, 168, 60]]
  return (
    <svg viewBox="0 0 220 220" className={`pointer-events-none ${className}`} aria-hidden>
      <path d="M0 8 C70 18 140 66 190 170" fill="none" stroke="#c9a24b" strokeWidth="2" strokeOpacity="0.8" />
      {leaves.map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="17" ry="6" fill={i % 2 ? '#7d9a82' : '#9db5a0'} opacity="0.85" transform={`rotate(${r} ${x} ${y})`} />
      ))}
      <Flower x={62} y={46} s={1.5} />
      <Flower x={118} y={88} s={1.2} a="#f4dfe1" />
      <Flower x={160} y={140} s={1} />
      <Flower x={18} y={40} s={0.7} a="#c9a24b" b="#f0dc9c" />
      <Flower x={92} y={22} s={0.7} a="#f4dfe1" />
    </svg>
  )
}

function Wave({ bg, fill }: { bg: string; fill: string }) {
  return (
    <div className={`${bg} -mb-px leading-[0]`} aria-hidden>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className={`block h-10 w-full fill-current sm:h-16 ${fill}`}>
        <path d="M0 45 C180 95 360 5 540 40 C720 75 900 10 1080 40 C1260 70 1350 55 1440 35 L1440 90 L0 90 Z" />
      </svg>
    </div>
  )
}

function Bokeh({ count = 14 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 20 + Math.random() * 60,
        dur: 12 + Math.random() * 14,
        delay: -Math.random() * 20,
      })),
    [count],
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((b) => (
        <span
          key={b.id}
          className="bokeh"
          style={{ left: `${b.left}%`, bottom: -80, width: b.size, height: b.size, '--dur': `${b.dur}s`, '--delay': `${b.delay}s` } as CSSProperties}
        />
      ))}
    </div>
  )
}

function Nav() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const f = () => setShow(window.scrollY > 500)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  const links = [
    ['#inicio', 'Inicio'],
    ['#historia', 'Historia'],
    ['#donde', 'Lugar'],
    ['#cronograma', 'Programa'],
    ['#galeria', 'Fotos'],
    ['#confirmar', 'Confirmar'],
  ]
  return (
    <nav
      aria-label="Secciones"
      className={`fixed left-1/2 top-4 z-[75] hidden -translate-x-1/2 gap-1 rounded-full border border-gold/40 bg-ink/80 p-1.5 shadow-2xl backdrop-blur-md transition-all duration-500 md:flex ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-20 opacity-0'
      }`}
    >
      {links.map(([href, label]) => (
        <a key={href} href={href} className="rounded-full px-4 py-1.5 font-body text-sm text-ivory/80 transition-colors hover:bg-gold hover:text-ink">
          {label}
        </a>
      ))}
    </nav>
  )
}

function MiniCalendar() {
  const d = WEDDING.date
  const first = new Date(d.getFullYear(), d.getMonth(), 1)
  const offset = (first.getDay() + 6) % 7
  const total = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
  const cells: (number | null)[] = [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)]
  return (
    <Reveal className="mx-auto mt-14 max-w-sm">
      <Tilt className="rounded-3xl bg-gradient-to-br from-gold-soft via-gold to-wine/70 p-[1.5px] shadow-xl">
        <div className="rounded-[calc(1.5rem-1px)] bg-white p-6">
          <p className="text-center font-script text-4xl capitalize text-wine">
            {d.toLocaleDateString('es-BO', { month: 'long', year: 'numeric' })}
          </p>
          <div className="mt-4 grid grid-cols-7 gap-1 text-center font-body text-sm">
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((x, i) => (
              <span key={i} className="py-1 text-ink/40">
                {x}
              </span>
            ))}
            {cells.map((c, i) =>
              c === null ? (
                <span key={i} />
              ) : c === d.getDate() ? (
                <span key={i} className="relative flex aspect-square animate-pulse-ring items-center justify-center rounded-full bg-wine font-semibold text-ivory shadow-lg">
                  {c}
                  <span className="absolute -right-1 -top-2 text-xs text-gold">♥</span>
                </span>
              ) : (
                <span key={i} className="flex aspect-square items-center justify-center text-ink/70">
                  {c}
                </span>
              ),
            )}
          </div>
        </div>
      </Tilt>
    </Reveal>
  )
}

function Interlude() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section id="amor" className="relative overflow-hidden bg-ink px-6 py-28 text-center text-ivory">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(107_31_58/0.6),transparent_65%)]" aria-hidden />
      <Stars />
      <Petals count={14} />
      <div ref={ref} className="rings relative mx-auto mb-10 w-72 sm:w-96">
        <svg viewBox="0 0 300 150" className="w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="ringG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f0dc9c" />
              <stop offset="0.5" stopColor="#c9a24b" />
              <stop offset="1" stopColor="#8a6a1c" />
            </linearGradient>
          </defs>
          <g className="ring-l">
            <circle cx="115" cy="80" r="52" fill="none" stroke="url(#ringG)" strokeWidth="7" />
            <path d="M105 27 L115 12 L125 27 L115 38 Z" fill="#fff" opacity="0.95" />
          </g>
          <g className="ring-r">
            <circle cx="185" cy="80" r="52" fill="none" stroke="url(#ringG)" strokeWidth="7" />
          </g>
        </svg>
      </div>
      <Reveal className="relative mx-auto max-w-2xl">
        <p className="font-script text-5xl leading-tight sm:text-6xl">
          <span className="gold-text">Dos almas, un solo camino</span>
        </p>
        <Divider dark />
        <p className="font-display text-xl italic text-ivory/85 sm:text-2xl">“{WEDDING.quote}”</p>
        <p className="mt-6 font-script text-3xl text-gold-soft">
          {WEDDING.bride} & {WEDDING.groom}
        </p>
      </Reveal>
    </section>
  )
}

function VideoSection({ onPlay }: { onPlay: () => void }) {
  const { driveId, youtubeId, mp4, poster } = WEDDING.video
  const [started, setStarted] = useState(false)
  const driveRef = useRef<HTMLIFrameElement>(null)
  const has = Boolean(driveId || youtubeId || mp4)
  const dev = Boolean((import.meta as unknown as { env?: { DEV?: boolean } }).env?.DEV)

  // Si el visitante toca dentro del reproductor de Drive, se pausa la música de fondo
  useEffect(() => {
    if (!driveId) return
    const onBlur = () => {
      if (document.activeElement === driveRef.current) onPlay()
    }
    window.addEventListener('blur', onBlur)
    return () => window.removeEventListener('blur', onBlur)
  }, [driveId, onPlay])

  if (!has && !dev) return null
  const start = () => {
    setStarted(true)
    onPlay()
  }
  return (
    <>
      <Wave bg="bg-petal" fill="text-ink" />
      <section id="video" className="relative overflow-hidden bg-ink px-6 py-24 text-ivory">
        <Stars />
        <div className="relative">
          <SectionTitle dark title="Nuestro video" subtitle="Un pequeño vistazo a nuestra historia de amor" />
          <Reveal className="mx-auto max-w-4xl">
            <div className="rounded-[28px] bg-gradient-to-br from-gold-soft via-gold to-[#8a6a1c] p-1.5 shadow-[0_0_60px_rgb(201_162_75/0.35)]">
              <div className="relative aspect-video overflow-hidden rounded-[22px] bg-ink-soft">
                {driveId ? (
                  <iframe
                    ref={driveRef}
                    title="Video de los novios"
                    src={`https://drive.google.com/file/d/${driveId}/preview`}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : started && youtubeId ? (
                  <iframe
                    title="Video de los novios"
                    src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : started && mp4 ? (
                  <video src={mp4} poster={poster || undefined} controls autoPlay playsInline className="absolute inset-0 h-full w-full bg-black object-contain" />
                ) : (
                  <button
                    onClick={has ? start : undefined}
                    aria-label="Reproducir video"
                    className="group absolute inset-0 flex items-center justify-center bg-cover bg-center"
                    style={poster ? { backgroundImage: `url(${poster})` } : undefined}
                  >
                    <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <span className="relative flex h-24 w-24 animate-pulse-ring items-center justify-center rounded-full bg-gold pl-1 text-4xl text-ink shadow-2xl transition-transform duration-300 group-hover:scale-110">
                      ▶
                    </span>
                    {!has && (
                      <span className="absolute bottom-6 px-6 text-center font-body text-sm text-ivory/80">
                        Agrega tu video en WEDDING.video (Drive, YouTube o MP4).
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <Wave bg="bg-ink" fill="text-ivory" />
    </>
  )
}

/* =====================================================================
   1. SOBRE DE ENTRADA
   ===================================================================== */
function EnvelopeIntro({ guest, onOpen }: { guest: string; onOpen: () => void }) {
  const [opened, setOpened] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = gone ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [gone])

  const open = () => {
    if (opened) return
    setOpened(true)
    onOpen()
    setTimeout(() => setLeaving(true), 2100)
    setTimeout(() => setGone(true), 3200)
  }

  if (gone) return null
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink transition-opacity duration-1000 ${
        leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <Stars />
      <p className="relative mb-10 px-6 text-center font-display text-xl italic text-gold-soft">
        {guest ? `${guest}, tienes una invitación` : 'Tienes una invitación'}
      </p>

      <div className="relative aspect-[4/3] w-[min(86vw,440px)]" style={{ perspective: 1200 }}>
        {/* Carta */}
        <div
          className={`absolute inset-x-4 bottom-3 top-3 z-10 flex flex-col items-center justify-center rounded-md bg-ivory text-center shadow-xl transition-transform duration-1000 delay-700 ${
            opened ? '-translate-y-24 sm:-translate-y-32' : ''
          }`}
        >
          <CoupleArt variant="wine" className="aspect-[400/520] h-20 sm:h-28" />
          <span className="mt-1 px-3 font-script text-3xl leading-tight text-wine sm:text-4xl">
            {WEDDING.bride} & {WEDDING.groom}
          </span>
          <span className="mt-1 font-display text-sm italic text-ink/70">se casan</span>
        </div>
        {/* Cuerpo del sobre */}
        <div className="absolute inset-0 z-20 rounded-md bg-wine shadow-2xl" style={{ clipPath: 'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)' }} />
        <div className="absolute inset-0 z-20 rounded-md bg-gradient-to-t from-black/30 to-transparent" style={{ clipPath: 'polygon(0 100%, 50% 45%, 100% 100%)' }} />
        {/* Solapa */}
        <div
          className="envelope-flap absolute inset-x-0 top-0 z-30 h-[55%] bg-gradient-to-b from-[#8a2a4c] to-wine"
          style={{ transform: opened ? 'rotateX(180deg)' : 'rotateX(0)', zIndex: opened ? 5 : 30 }}
        />
        {/* Sello de cera */}
        <button
          onClick={open}
          aria-label="Abrir invitación"
          className={`absolute left-1/2 top-[48%] z-40 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-gold-soft bg-gradient-to-br from-gold to-[#8a6a1c] font-script text-2xl text-ivory shadow-lg transition-all duration-500 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
            opened ? 'pointer-events-none scale-0 opacity-0' : 'animate-pulse-ring'
          }`}
        >
          {WEDDING.bride[0]}
          {WEDDING.groom[0]}
        </button>
      </div>

      <p className={`relative mt-14 font-body text-sm tracking-widest text-ivory/60 transition-opacity duration-500 ${opened ? 'opacity-0' : 'animate-pulse'}`}>
        Toca el sello para abrir
      </p>
    </div>
  )
}

/* =====================================================================
   2. HERO
   ===================================================================== */
function Hero({ guest }: { guest: string }) {
  const [m, setM] = useState({ x: 0, y: 0 })
  const [sy, setSy] = useState(0)
  const onMove = (e: MouseEvent<HTMLElement>) =>
    setM({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })
  useEffect(() => {
    const f = () => setSy(Math.min(window.scrollY, 800))
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  const d = WEDDING.date
  const weekday = d.toLocaleDateString('es-BO', { weekday: 'long' })
  const month = d.toLocaleDateString('es-BO', { month: 'long' })

  return (
    <header
      id="inicio"
      onMouseMove={onMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-ink via-ink-soft to-wine px-6 pb-24 pt-16 text-center"
    >
      <Stars />
      <Bokeh />
      <div
        className="absolute left-1/2 top-1/2 h-[75vmin] w-[75vmin] rounded-full bg-gold/15 blur-3xl"
        style={{ transform: `translate(calc(-50% + ${m.x * 60}px), calc(-50% + ${m.y * 60}px))` }}
        aria-hidden
      />

      {/* Pareja de fondo uniéndose bajo el arco */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center" style={{ transform: `translate(${m.x * -26}px, ${sy * 0.2}px)` }} aria-hidden>
        <CoupleArt className="aspect-[400/520] h-[92vh] max-w-none opacity-[0.28]" />
      </div>

      <Petals />

      {/* Marco decorativo */}
      <svg className="pointer-events-none absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] sm:inset-8 sm:h-[calc(100%-4rem)] sm:w-[calc(100%-4rem)]" aria-hidden>
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="6"
          fill="none"
          stroke="#c9a24b"
          strokeOpacity="0.6"
          strokeWidth="1"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          className="animate-draw"
        />
      </svg>

      {/* Esquinas florales */}
      <FloralCorner className="absolute left-0 top-0 w-36 sm:w-64" />
      <FloralCorner className="absolute right-0 top-0 w-36 -scale-x-100 sm:w-64" />
      <FloralCorner className="absolute bottom-0 left-0 w-36 -scale-y-100 sm:w-64" />
      <FloralCorner className="absolute bottom-0 right-0 w-36 rotate-180 sm:w-64" />

      <div className="relative z-10 text-ivory" style={{ transform: `translate(${m.x * -14}px, ${m.y * -14}px)` }}>
        <p className="reveal-name font-display text-sm uppercase tracking-[0.5em] text-gold-soft" style={{ '--d': '0.1s' } as CSSProperties}>
          ¡Nos casamos!
        </p>
        <p className="mx-auto mt-3 max-w-md font-display text-lg italic text-ivory/80 sm:text-xl">
          {guest ? `${guest}, nos haría muy felices que nos acompañes` : 'Nos haría muy felices que nos acompañes'}
        </p>
        <h1 className="my-6 font-script text-7xl leading-[1.05] sm:text-9xl">
          <span className="reveal-name gold-text inline-block" style={{ '--d': '0.5s' } as CSSProperties}>
            {WEDDING.bride}
          </span>
          <span className="my-2 block animate-float font-display text-4xl italic text-gold-soft sm:text-5xl">&</span>
          <span className="reveal-name gold-text inline-block" style={{ '--d': '1s' } as CSSProperties}>
            {WEDDING.groom}
          </span>
        </h1>

        <div className="reveal-name mx-auto inline-flex items-stretch overflow-hidden rounded-full border border-gold/60 bg-ink/30 text-ivory backdrop-blur" style={{ '--d': '1.5s' } as CSSProperties}>
          <span className="px-4 py-2 font-display text-base capitalize sm:px-6 sm:text-lg">{weekday}</span>
          <span className="border-x border-gold/60 bg-gold/25 px-5 py-1 font-display text-3xl font-semibold sm:text-4xl">{d.getDate()}</span>
          <span className="px-4 py-2 font-display text-base capitalize sm:px-6 sm:text-lg">
            {month} {d.getFullYear()}
          </span>
        </div>

        <div className="mt-10">
          <a
            href="#confirmar"
            className="inline-block rounded-full border border-gold bg-gold/10 px-8 py-3 font-body text-sm tracking-widest text-gold-soft backdrop-blur transition-all duration-300 hover:bg-gold hover:text-ink hover:shadow-[0_0_30px_rgb(201_162_75/0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            Confirmar asistencia
          </a>
        </div>
      </div>

      <a href="#cuenta-regresiva" aria-label="Bajar" className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-3xl text-gold-soft">
        ⌄
      </a>
    </header>
  )
}

/* =====================================================================
   3. CUENTA REGRESIVA
   ===================================================================== */
function Countdown() {
  const t = useCountdown(WEDDING.date)
  const items = [
    { label: 'Días', value: t.days },
    { label: 'Horas', value: t.hours },
    { label: 'Minutos', value: t.minutes },
    { label: 'Segundos', value: t.seconds },
  ]
  return (
    <section id="cuenta-regresiva" className="paper bg-ivory px-6 py-24">
      <SectionTitle title="Falta muy poco" subtitle={t.done ? '¡Hoy es el gran día!' : 'Cada segundo nos acerca al sí'} />
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-5 sm:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 120}>
            <Tilt className="rounded-2xl bg-gradient-to-br from-gold-soft via-gold to-wine/70 p-[1.5px] shadow-lg shadow-wine/10">
              <div className="rounded-[calc(1rem-1px)] bg-white p-6 text-center">
                <div key={it.value} className="animate-pop font-display text-5xl font-semibold text-wine sm:text-6xl">
                  {String(it.value).padStart(2, '0')}
                </div>
                <div className="mt-2 font-body text-sm uppercase tracking-widest text-ink/60">{it.label}</div>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
      <MiniCalendar />
    </section>
  )
}

/* =====================================================================
   4. HISTORIA
   ===================================================================== */
function Story() {
  return (
    <section id="historia" className="relative overflow-hidden paper bg-petal px-6 py-24">
      <SectionTitle title="Nuestra historia" subtitle="Algunos momentos que nos trajeron hasta aquí" />
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-transparent via-gold to-transparent sm:left-1/2" aria-hidden />
        {STORY.map((s, i) => {
          const right = i % 2 === 1
          return (
            <div key={s.year} className="relative mb-14 pl-12 sm:pl-0">
              <span className="absolute left-4 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-gold bg-ivory shadow-[0_0_0_6px_rgb(201_162_75/0.2)] sm:left-1/2" />
              <Reveal from={right ? 'right' : 'left'} className={`sm:w-1/2 ${right ? 'sm:ml-auto sm:pl-12' : 'sm:pr-12 sm:text-right'}`}>
                <div className="rounded-2xl bg-white p-6 shadow-lg shadow-wine/10 transition-transform duration-300 hover:-translate-y-1">
                  <span className="font-script text-4xl text-gold">{s.year}</span>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-wine">{s.title}</h3>
                  <p className="mt-2 font-body text-ink/70">{s.text}</p>
                </div>
              </Reveal>
            </div>
          )
        })}
      </div>
    </section>
  )
}

/* =====================================================================
   5. DETALLES DEL EVENTO
   ===================================================================== */
function EventCard({ ev, icon, delay }: { ev: EventInfo; icon: string; delay: number }) {
  return (
    <Reveal delay={delay}>
      <Tilt className="h-full rounded-3xl border border-gold/40 bg-white p-8 text-center shadow-xl shadow-wine/10">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blush text-3xl">{icon}</div>
        <h3 className="font-script text-4xl leading-tight text-wine">{ev.title}</h3>
        <p className="mt-3 font-display text-lg italic text-ink/70">{ev.date}</p>
        <p className="font-display text-4xl font-semibold text-ink">{ev.time}</p>
        <p className="mt-3 font-display text-xl text-ink">{ev.place}</p>
        <p className="font-body text-sm text-ink/60">{ev.address}</p>
        {ev.image && <img src={ev.image} alt={ev.place} loading="lazy" className="mx-auto mt-4 h-28 w-full rounded-2xl object-cover" />}
        <a
          href={ev.map}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block rounded-full bg-wine px-6 py-2.5 font-body text-sm text-ivory transition-all hover:bg-ink hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine"
        >
          Ver en el mapa
        </a>
      </Tilt>
    </Reveal>
  )
}

function Details() {
  return (
    <section id="detalles" className="paper bg-ivory px-6 py-24">
      <SectionTitle title="Dónde y cuándo" subtitle="Te esperamos con los brazos abiertos" />
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <EventCard ev={WEDDING.ceremony} icon="⛪" delay={0} />
        <EventCard ev={WEDDING.reception} icon="🥂" delay={150} />
        <EventCard ev={WEDDING.pickup} icon="🎁" delay={300} />
      </div>
      <Reveal className="mt-12 text-center">
        <button
          onClick={downloadICS}
          className="rounded-full border border-wine px-8 py-3 font-body text-sm text-wine transition-all hover:bg-wine hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine"
        >
          Agregar a mi calendario
        </button>
      </Reveal>
    </section>
  )
}

function Where() {
  const places = [
    { key: 'ceremonia', tab: 'Ceremonia', ev: WEDDING.ceremony, note: '' },
    { key: 'recepcion', tab: 'Recepción y recojo', ev: WEDDING.reception, note: 'El domingo 25 a las 09:00 también será aquí el recojo de padrinos y conteo de regalos.' },
  ]
  const [active, setActive] = useState(0)
  const p = places[active]
  return (
    <section id="donde" className="paper bg-petal px-6 py-24">
      <SectionTitle title="¿Dónde será?" subtitle="Elige el lugar para ver el mapa y cómo llegar" />
      <Reveal className="mx-auto max-w-4xl">
        <div role="tablist" className="mx-auto mb-6 flex w-fit rounded-full border border-gold/40 bg-white p-1 shadow">
          {places.map((pl, i) => (
            <button
              key={pl.key}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2 font-body text-sm transition-all ${active === i ? 'bg-wine text-ivory shadow' : 'text-ink/70 hover:text-wine'}`}
            >
              {pl.tab}
            </button>
          ))}
        </div>
        <div className="overflow-hidden rounded-3xl border border-gold/40 bg-white shadow-xl">
          <iframe
            key={p.key}
            title={`Mapa: ${p.ev.place}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(p.ev.mapQuery)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full animate-pop border-0 sm:h-[26rem]"
          />
          <div className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-display text-2xl text-wine">{p.ev.place}</p>
              <p className="font-body text-sm text-ink/60">{p.ev.address}</p>
              {p.note && <p className="mt-2 font-body text-sm text-ink/70">{p.note}</p>}
            </div>
            <a
              href={p.ev.map}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-full bg-wine px-6 py-2.5 font-body text-sm text-ivory transition-all hover:bg-ink hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine"
            >
              Cómo llegar
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Schedule() {
  return (
    <section id="cronograma" className="paper bg-ivory px-6 py-24">
      <SectionTitle title="Cronograma de nuestra boda" subtitle="Sábado 24 de octubre" />
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-5 md:grid-cols-4">
        {SCHEDULE.map((s, i) => (
          <Reveal key={s.label} delay={(i % 4) * 100}>
            <Tilt className="h-full rounded-2xl border border-gold/40 bg-white p-6 text-center shadow-lg shadow-wine/5">
              <div className="text-4xl">{s.icon}</div>
              <p className="mt-3 font-display text-3xl font-semibold text-wine">{s.time}</p>
              <p className="mt-1 font-body text-sm text-ink/70">{s.label}</p>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function PeopleCard({ title, icon, names, delay }: { title: string; icon: string; names: string[]; delay: number }) {
  return (
    <Reveal delay={delay}>
      <Tilt className="h-full rounded-3xl border border-gold/40 bg-white p-8 text-center shadow-xl shadow-wine/10">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blush text-2xl">{icon}</div>
        <h3 className="font-script text-3xl leading-tight text-wine">{title}</h3>
        <ul className="mt-4 space-y-2">
          {names.map((n) => (
            <li key={n} className="font-display text-lg text-ink">
              {n}
            </li>
          ))}
        </ul>
      </Tilt>
    </Reveal>
  )
}

function Padrinos() {
  return (
    <section id="padrinos" className="paper bg-petal px-6 py-24">
      <SectionTitle title="Con la bendición de Dios y nuestros padres" />
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        {PARENTS.map((p, i) => (
          <PeopleCard key={p.title} {...p} delay={i * 150} />
        ))}
      </div>
      <div className="mt-24">
        <SectionTitle title="Nuestros padrinos" subtitle="Gracias por acompañarnos en este camino" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        {GODPARENTS.map((p, i) => (
          <PeopleCard key={p.title} {...p} delay={i * 150} />
        ))}
      </div>
    </section>
  )
}

/* =====================================================================
   6. CÓDIGO DE VESTIMENTA
   ===================================================================== */
function DressCode() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-24 text-ivory">
      <Stars />
      <div className="relative">
        <SectionTitle dark title="Código de vestimenta" subtitle="Formal. Si puedes, inspírate en nuestra paleta" />
        <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-6">
          {PALETTE.map((c, i) => (
            <Reveal key={c.name} delay={i * 100}>
              <div className="group text-center">
                <div
                  className="mx-auto h-20 w-20 rounded-full border-2 border-gold-soft/50 shadow-lg transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-110"
                  style={{ background: c.color }}
                />
                <p className="mt-3 font-display text-lg italic">{c.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-10 max-w-md text-center font-body text-sm text-ivory/70">
          Pedimos evitar el blanco total, reservado para la novia.
        </Reveal>
      </div>
    </section>
  )
}

/* =====================================================================
   7. GALERÍA CON LIGHTBOX
   ===================================================================== */
function Gallery() {
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((o) => (o === null ? o : (o + 1) % GALLERY.length))
      if (e.key === 'ArrowLeft') setOpen((o) => (o === null ? o : (o - 1 + GALLERY.length) % GALLERY.length))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <section id="galeria" className="paper bg-petal px-6 py-24">
      <SectionTitle title="Nuestros momentos" subtitle="Toca una foto para verla en grande" />
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        {GALLERY.map((g, i) => (
          <Reveal key={g.id} delay={i * 120}>
            <button
              onClick={() => setOpen(i)}
              className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine"
            >
              <img src={g.src} alt={g.label} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-black/50 p-3 font-display text-lg italic text-ivory transition-transform duration-300 group-hover:translate-y-0">
                {g.label}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <button className="absolute right-5 top-4 text-4xl text-ivory" onClick={() => setOpen(null)} aria-label="Cerrar">
            ×
          </button>
          <button
            className="absolute left-3 z-10 text-5xl text-ivory/80 hover:text-gold sm:left-8"
            onClick={(e) => {
              e.stopPropagation()
              setOpen((open - 1 + GALLERY.length) % GALLERY.length)
            }}
            aria-label="Anterior"
          >
            ‹
          </button>
          <img
            key={open}
            src={GALLERY[open].src}
            alt={GALLERY[open].label}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full animate-pop rounded-2xl object-contain shadow-2xl"
          />
          <button
            className="absolute right-3 z-10 text-5xl text-ivory/80 hover:text-gold sm:right-8"
            onClick={(e) => {
              e.stopPropagation()
              setOpen((open + 1) % GALLERY.length)
            }}
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>
      )}
    </section>
  )
}

function Bands() {
  return (
    <section id="amenizados" className="relative overflow-hidden bg-ink px-6 py-24 text-ivory">
      <Stars />
      <div className="relative">
        <SectionTitle dark title="Estaremos amenizados por" subtitle="Música para bailar toda la noche" />
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {BANDS.map((b, i) => (
            <Reveal key={b.name} delay={(i % 3) * 120} className={b.span}>
              <div className="group relative overflow-hidden rounded-2xl border border-gold-soft/30 shadow-xl">
                <img src={b.src} alt={b.name} loading="lazy" className={`w-full object-cover object-top transition-transform duration-700 group-hover:scale-110 ${b.h}`} />
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 p-3 text-center font-display text-lg italic text-ivory transition-transform duration-300 group-hover:translate-y-0">
                  {b.name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =====================================================================
   8. REGALOS
   ===================================================================== */
function Gifts() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(WEDDING.account.number)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* el portapapeles no está disponible */
    }
  }
  return (
    <section id="regalos" className="paper bg-ivory px-6 py-24">
      <SectionTitle title="Mesa de regalos" subtitle="Tu presencia es nuestro mejor regalo. Si deseas hacernos uno, aquí está nuestra cuenta" />
      <Reveal className="mx-auto max-w-md">
        <Tilt className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-wine to-ink p-8 text-ivory shadow-2xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-2xl" aria-hidden />
          <p className="font-display text-xl italic text-gold-soft">{WEDDING.account.bank}</p>
          <p className="mt-6 font-mono text-2xl tracking-wider">{WEDDING.account.number}</p>
          <p className="mt-6 font-body text-sm text-ivory/70">{WEDDING.account.holder}</p>
          <button
            onClick={copy}
            className="relative mt-6 rounded-full bg-gold px-6 py-2.5 font-body text-sm font-medium text-ink transition-all hover:bg-gold-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            {copied ? 'Número copiado' : 'Copiar número de cuenta'}
          </button>
        </Tilt>
      </Reveal>
    </section>
  )
}

/* =====================================================================
   9. CONFIRMAR ASISTENCIA (RSVP)
   ===================================================================== */
function Rsvp({ guest }: { guest: string }) {
  const [form, setForm] = useState({ name: guest, attending: 'si', guests: 1, menu: 'tradicional', message: '' })
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (form.name.trim().length < 3) {
      setError('Escribe tu nombre completo para poder identificarte.')
      return
    }
    setError('')
    const asiste = form.attending === 'si'

    if (WEDDING.sheetsUrl) {
      // Guarda la respuesta en la hoja de Google
      setSending(true)
      try {
        await fetch(WEDDING.sheetsUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            nombre: form.name.trim(),
            asistencia: asiste ? 'Sí' : 'No',
            personas: asiste ? form.guests : 0,
            menu: asiste ? form.menu : '',
            mensaje: form.message.trim(),
          }),
        })
      } catch {
        setSending(false)
        setError('No pudimos guardar tu respuesta. Revisa tu conexión e inténtalo de nuevo.')
        return
      }
      setSending(false)
    } else {
      // Sin hoja configurada: respaldo por WhatsApp
      const text = asiste
        ? `Hola, soy ${form.name}. ¡Confirmo mi asistencia a la boda! Seremos ${form.guests} persona(s). Menú: ${form.menu}. ${form.message}`
        : `Hola, soy ${form.name}. Lamentablemente no podré asistir a la boda. ${form.message}`
      window.open(`https://wa.me/${WEDDING.whatsapp}?text=${encodeURIComponent(text)}`, '_blank')
    }

    setSent(true)
    if (asiste) launchConfetti()
  }

  const field =
    'w-full rounded-xl border border-gold/40 bg-white px-4 py-3 font-body text-ink outline-none transition-all focus:border-wine focus:ring-4 focus:ring-wine/10'

  return (
    <section id="confirmar" className="relative overflow-hidden paper bg-petal px-6 py-24">
      <SectionTitle title="¿Nos acompañas?" subtitle={`Confírmanos antes del ${WEDDING.rsvpDeadline}`} />
      <Reveal className="mx-auto max-w-xl">
        {sent ? (
          <div className="animate-pop rounded-3xl bg-white p-10 text-center shadow-xl">
            <p className="font-script text-5xl text-wine">{form.attending === 'si' ? '¡Gracias!' : 'Te extrañaremos'}</p>
            <p className="mt-4 font-display text-xl text-ink/80">
              {form.attending === 'si' ? 'Tu confirmación llegó. Nos vemos pronto para celebrar.' : 'Gracias por avisarnos. Te llevamos en el corazón.'}
            </p>
            <button onClick={() => setSent(false)} className="mt-6 font-body text-sm text-wine underline underline-offset-4">
              Editar mi respuesta
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-6 rounded-3xl bg-white/80 p-8 shadow-xl backdrop-blur">
            <label className="block">
              <span className="mb-2 block font-body text-sm text-ink/70">Nombre completo</span>
              <input className={field} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Ej. María Fernández" />
            </label>

            <fieldset>
              <legend className="mb-2 font-body text-sm text-ink/70">¿Asistirás?</legend>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: 'si', t: 'Sí, ahí estaré' },
                  { v: 'no', t: 'No podré ir' },
                ].map((o) => (
                  <button
                    type="button"
                    key={o.v}
                    onClick={() => set('attending', o.v)}
                    aria-pressed={form.attending === o.v}
                    className={`rounded-xl border px-4 py-3 font-body transition-all ${
                      form.attending === o.v ? 'border-wine bg-wine text-ivory shadow-lg' : 'border-gold/40 bg-white text-ink hover:border-wine'
                    }`}
                  >
                    {o.t}
                  </button>
                ))}
              </div>
            </fieldset>

            {form.attending === 'si' && (
              <div className="grid animate-pop gap-6 sm:grid-cols-2">
                <div>
                  <span className="mb-2 block font-body text-sm text-ink/70">Número de personas</span>
                  <div className="flex items-center justify-between rounded-xl border border-gold/40 bg-white px-3 py-2">
                    <button type="button" onClick={() => set('guests', Math.max(1, form.guests - 1))} className="h-9 w-9 rounded-full bg-blush text-xl text-wine" aria-label="Menos">
                      −
                    </button>
                    <span className="font-display text-2xl">{form.guests}</span>
                    <button type="button" onClick={() => set('guests', Math.min(6, form.guests + 1))} className="h-9 w-9 rounded-full bg-blush text-xl text-wine" aria-label="Más">
                      +
                    </button>
                  </div>
                </div>
                <label className="block">
                  <span className="mb-2 block font-body text-sm text-ink/70">Menú</span>
                  <select className={field} value={form.menu} onChange={(e) => set('menu', e.target.value)}>
                    <option value="tradicional">Tradicional</option>
                    <option value="vegetariano">Vegetariano</option>
                    <option value="infantil">Infantil</option>
                  </select>
                </label>
              </div>
            )}

            <label className="block">
              <span className="mb-2 block font-body text-sm text-ink/70">Un mensaje para los novios (opcional)</span>
              <textarea className={field} rows={3} value={form.message} onChange={(e) => set('message', e.target.value)} />
            </label>

            {error && (
              <p role="alert" className="rounded-lg bg-wine/10 px-4 py-3 font-body text-sm text-wine">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full disabled:cursor-wait disabled:opacity-70 bg-gradient-to-r from-wine to-ink py-4 font-body font-medium tracking-wide text-ivory shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine"
            >
              {sending ? 'Guardando…' : 'Confirmar asistencia'}
            </button>
          </form>
        )}
      </Reveal>
    </section>
  )
}

/* =====================================================================
   10. LIBRO DE VISITAS
   ===================================================================== */
function GuestBook() {
  const [msgs, setMsgs] = useState([
    { id: 1, name: 'Tía Carmen', text: '¡Los queremos muchísimo! Será una fiesta inolvidable.' },
    { id: 2, name: 'Los primos', text: 'Ya estamos ensayando el baile 💃' },
  ])
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  const add = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return
    setMsgs((m) => [{ id: Date.now(), name: name.trim(), text: text.trim() }, ...m])
    setName('')
    setText('')
  }

  return (
    <section id="libro" className="paper bg-ivory px-6 py-24">
      <SectionTitle title="Libro de visitas" subtitle="Déjanos unas palabras" />
      <div className="mx-auto max-w-2xl">
        <form onSubmit={add} className="mb-10 grid gap-3 sm:grid-cols-[1fr_2fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" className="rounded-xl border border-gold/40 bg-white px-4 py-3 font-body outline-none focus:border-wine focus:ring-4 focus:ring-wine/10" />
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Tu mensaje" className="rounded-xl border border-gold/40 bg-white px-4 py-3 font-body outline-none focus:border-wine focus:ring-4 focus:ring-wine/10" />
          <button className="rounded-xl bg-wine px-6 py-3 font-body text-ivory transition-colors hover:bg-ink">Publicar</button>
        </form>
        <ul className="space-y-4">
          {msgs.map((m) => (
            <li key={m.id} className="animate-pop rounded-2xl border border-gold/30 bg-white p-5 shadow-md">
              <p className="font-display text-xl text-ink">{m.text}</p>
              <p className="mt-2 font-script text-2xl text-wine">— {m.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* =====================================================================
   BARRA DE PROGRESO, MÚSICA, COMPARTIR, FOOTER
   ===================================================================== */
function ScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setP(h > 0 ? window.scrollY / h : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="fixed left-0 top-0 z-[80] h-1 origin-left bg-gradient-to-r from-gold via-gold-soft to-wine" style={{ transform: `scaleX(${p})`, width: '100%' }} />
}

function FloatingButtons({ playing, toggle }: { playing: boolean; toggle: () => void }) {
  const share = () => {
    const text = `¡Estás invitado a la boda de ${WEDDING.bride} y ${WEDDING.groom}! ${window.location.href}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }
  const base =
    'flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-ink/90 text-xl text-gold-soft shadow-xl backdrop-blur transition-all hover:scale-110 hover:bg-wine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'
  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col gap-3">
      <button onClick={share} className={base} aria-label="Compartir por WhatsApp">
        ↗
      </button>
      <button onClick={toggle} className={`${base} ${playing ? 'animate-pulse-ring' : ''}`} aria-label={playing ? 'Pausar música' : 'Reproducir música'}>
        {playing ? '❚❚' : '♪'}
      </button>
    </div>
  )
}

function Footer() {
  const tag = `#${WEDDING.bride.split(' ')[0]}Y${WEDDING.groom.split(' ')[0]}`
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-ink to-wine px-6 pt-20 text-center text-ivory">
      <Stars />
      <Petals count={10} />
      <p className="relative font-display text-xl italic text-gold-soft">Con todo nuestro amor</p>
      <p className="relative my-4 font-script text-6xl sm:text-7xl">
        <span className="gold-text">
          {WEDDING.bride} & {WEDDING.groom}
        </span>
      </p>
      <p className="relative font-body text-sm text-ivory/60">
        {WEDDING.date.toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
      <p className="relative mt-5 font-display text-2xl tracking-widest text-gold-soft">{tag}</p>
      <div className="relative mt-10 flex justify-center">
        <CoupleArt className="aspect-[400/520] h-72 opacity-80 sm:h-96" />
      </div>
    </footer>
  )
}

/* =====================================================================
   APP
   ===================================================================== */
export default function App() {
  // Personaliza el enlace: https://tu-sitio.com/?invitado=Familia%20Pérez
  const guest = useMemo(() => new URLSearchParams(window.location.search).get('invitado') ?? '', [])
  const ytRef = useRef<HTMLIFrameElement>(null)
  const [playing, setPlaying] = useState(false)

  // Controla el reproductor oculto de YouTube con la API de iframe
  const ytCommand = (func: string) =>
    ytRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args: '' }), '*')

  const play = () => {
    ytCommand('unMute')
    ytCommand('playVideo')
    setPlaying(true)
  }
  const toggle = () => {
    if (playing) {
      ytCommand('pauseVideo')
      setPlaying(false)
    } else play()
  }
  const pauseMusic = () => {
    ytCommand('pauseVideo')
    setPlaying(false)
  }

  // Destellos que siguen al mouse y corazones al hacer clic (solo con mouse)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    let last = 0
    const spawn = (cls: string, x: number, y: number, vars: Record<string, string>) => {
      const el = document.createElement('span')
      el.className = cls
      el.style.left = `${x}px`
      el.style.top = `${y}px`
      Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v))
      document.body.appendChild(el)
      setTimeout(() => el.remove(), 1000)
    }
    const move = (e: { clientX: number; clientY: number }) => {
      const now = performance.now()
      if (now - last < 60) return
      last = now
      spawn('sparkle', e.clientX, e.clientY, { '--dx': `${(Math.random() - 0.5) * 30}px` })
    }
    const click = (e: { clientX: number; clientY: number }) => {
      for (let i = 0; i < 7; i++) {
        spawn('heart-burst', e.clientX, e.clientY, { '--dx': `${(Math.random() - 0.5) * 150}px`, '--dy': `${-40 - Math.random() * 100}px` })
      }
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('click', click)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('click', click)
    }
  }, [])

  return (
    <>
      <EnvelopeIntro guest={guest} onOpen={play} />
      <ScrollProgress />
      <Nav />
      <iframe
        ref={ytRef}
        title="Música de la invitación"
        aria-hidden
        tabIndex={-1}
        className="pointer-events-none fixed -left-[9999px] top-0 h-px w-px opacity-0"
        src={`https://www.youtube.com/embed/${WEDDING.youtubeId}?enablejsapi=1&loop=1&playlist=${WEDDING.youtubeId}&controls=0&playsinline=1`}
        allow="autoplay; encrypted-media"
      />
      <FloatingButtons playing={playing} toggle={toggle} />
      <main>
        <Hero guest={guest} />
        <Wave bg="bg-wine" fill="text-ivory" />
        <Countdown />
        <Wave bg="bg-ivory" fill="text-ink" />
        <Interlude />
        <Wave bg="bg-ink" fill="text-petal" />
        <Story />
        <VideoSection onPlay={pauseMusic} />
        <Details />
        <Where />
        <Schedule />
        <Padrinos />
        <Wave bg="bg-petal" fill="text-ink" />
        <DressCode />
        <Wave bg="bg-ink" fill="text-petal" />
        <Gallery />
        <Wave bg="bg-petal" fill="text-ink" />
        <Bands />
        <Wave bg="bg-ink" fill="text-ivory" />
        <Gifts />
        <Rsvp guest={guest} />
        <GuestBook />
        <Wave bg="bg-ivory" fill="text-ink" />
      </main>
      <Footer />
    </>
  )
} 