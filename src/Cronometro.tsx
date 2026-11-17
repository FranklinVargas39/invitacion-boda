import { Fragment, useId } from 'react'
import type { CSSProperties } from 'react'
import { Icono } from './Iconos'
import { Reveal, Tilt, SectionTitle, Seccion, useCountdown, downloadICS } from './Ui'
import { WEDDING } from './Datos'
import './Cronometro.css'

/* Desde cuándo se "llena" el reloj: la arena de arriba empieza a caer ese día y
   termina de caer justo el día de la boda. Cámbialo si quieres otro periodo. */
const INICIO = new Date(2026, 8, 12)

const VIDRIO = 'M64 38 H176 C176 100 134 138 124 176 V184 C134 222 176 260 176 322 H64 C64 260 106 222 116 184 V176 C106 138 64 100 64 38 Z'

/** Reloj de arena: `f` = fracción de arena que aún queda arriba (1 = lleno, 0 = vacío) */
function RelojArena({ f, done }: { f: number; done: boolean }) {
  const id = useId().replace(/:/g, '')
  const u = (n: string) => `${n}${id}`
  const ref = (n: string) => `url(#${u(n)})`

  const ys = 176 - f * 124 // superficie de la arena de arriba
  const h = (1 - f) * 112 // altura del montículo de abajo
  const yP = 322 - h
  const yE = 322 - h * 0.55
  const fluye = !done && f > 0.002
  const superficie = `M40 ${ys} Q120 ${ys + 9} 200 ${ys}`
  const monticulo = `M40 330 V${yE} C90 ${yE} 104 ${yP + 6} 120 ${yP} C136 ${yP + 6} 150 ${yE} 200 ${yE} V330 Z`

  return (
    <svg viewBox="0 -6 240 360" className="reloj-svg" role="img" aria-label="Reloj de arena">
      <defs>
        <linearGradient id={u('o')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f8ecbd" /><stop offset="0.3" stopColor="#d9b862" /><stop offset="0.55" stopColor="#a67c1f" /><stop offset="0.8" stopColor="#e6cf94" /><stop offset="1" stopColor="#8f6a17" />
        </linearGradient>
        <linearGradient id={u('a')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6e7b0" /><stop offset="0.5" stopColor="#d9b862" /><stop offset="1" stopColor="#a67c1f" />
        </linearGradient>
        <linearGradient id={u('v')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" /><stop offset="0.45" stopColor="#7fd8d0" stopOpacity="0.1" /><stop offset="1" stopColor="#ffffff" stopOpacity="0.35" />
        </linearGradient>
        <clipPath id={u('c')}><path d={VIDRIO} /></clipPath>
      </defs>

      <ellipse cx="120" cy="350" rx="92" ry="4" fill="#0b3b3a" opacity="0.18" />

      {/* columnas doradas */}
      <rect x="47" y="38" width="7" height="284" rx="3.5" fill={ref('o')} />
      <rect x="186" y="38" width="7" height="284" rx="3.5" fill={ref('o')} />
      <rect x="49" y="40" width="1.6" height="280" rx="0.8" fill="#fff" opacity="0.55" />
      <rect x="188" y="40" width="1.6" height="280" rx="0.8" fill="#fff" opacity="0.55" />

      {/* arena dentro del cristal */}
      <g clipPath={ref('c')}>
        <path d={`${superficie} V182 H40 Z`} fill={ref('a')} />
        <path d={superficie} fill="none" stroke="#fff4cf" strokeOpacity="0.7" strokeWidth="1" />
        <path d={monticulo} fill={ref('a')} />
        {fluye && (
          <>
            <line className="arena-hilo" x1="120" x2="120" y1="178" y2={yP} stroke="#e6cf94" strokeWidth="1.4" />
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={i} className="arena-grano" cx="120" cy="178" r="1.2" fill="#f6e7b0" style={{ '--fall': `${yP - 178}px`, '--d': `${i * 0.18}s`, '--x': `${(i % 2 ? 1 : -1) * (i % 3)}px` } as CSSProperties} />
            ))}
          </>
        )}
      </g>

      {/* cristal con reflejos */}
      <path d={VIDRIO} fill={ref('v')} stroke="#1fb5ad" strokeOpacity="0.6" strokeWidth="2" />
      <path d="M74 52 C74 98 106 132 113 160" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="3" strokeLinecap="round" />
      <path d="M75 310 C77 272 100 242 111 218" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M167 62 C166 96 152 120 142 140" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />

      {/* tapas doradas */}
      <rect x="40" y="14" width="160" height="24" rx="7" fill={ref('o')} />
      <rect x="45" y="17" width="150" height="3" rx="1.5" fill="#fff" opacity="0.6" />
      <rect x="48" y="38" width="144" height="5" rx="2.5" fill="#8f6a17" opacity="0.85" />
      <rect x="40" y="322" width="160" height="24" rx="7" fill={ref('o')} />
      <rect x="45" y="325" width="150" height="3" rx="1.5" fill="#fff" opacity="0.6" />
      <rect x="48" y="317" width="144" height="5" rx="2.5" fill="#8f6a17" opacity="0.85" />
      {/* remate */}
      <path d="M120 -6 L128 5 L120 16 L112 5Z" fill={ref('o')} />
      <circle cx="120" cy="5" r="1.8" fill="#fff" opacity="0.8" />
    </svg>
  )
}

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
              <span key={i} className="relative flex aspect-square animate-pulse-ring items-center justify-center rounded-full bg-turquesa font-semibold text-white shadow-lg">{c}<Icono name="corazon" className="absolute -right-2 -top-2.5 h-4 w-4" grosor={2} /></span>
            ) : <span key={i} className="flex aspect-square items-center justify-center text-tinta/85">{c}</span>)}
          </div>
        </div>
      </Tilt>
    </Reveal>
  )
}

export function Countdown() {
  const t = useCountdown(WEDDING.date)
  const objetivo = WEDDING.date.getTime()
  // cuánta arena queda arriba (se recalcula cada segundo porque useCountdown vuelve a renderizar)
  const f = Math.min(1, Math.max(0, (objetivo - Date.now()) / (objetivo - INICIO.getTime())))
  const items = [['Días', t.days], ['Horas', t.hours], ['Minutos', t.minutes], ['Segundos', t.seconds]] as const
  const d = WEDDING.date
  const fecha = `${d.toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  const chispas = [{ l: '14%', t: '18%', d: '0s' }, { l: '86%', t: '28%', d: '0.8s' }, { l: '8%', t: '62%', d: '1.6s' }, { l: '92%', t: '70%', d: '2.2s' }, { l: '24%', t: '90%', d: '1.1s' }, { l: '78%', t: '8%', d: '2.8s' }]

  return (
    <Seccion id="cuenta" className="paper bg-white px-6 py-24">
      <SectionTitle title="Falta muy poco" subtitle={t.done ? '¡Hoy es el gran día!' : 'Cada segundo nos acerca al sí'} />

      <div className="rt-layout">
        <Reveal from="zoom" className="rt-izq">
          <div className="reloj-escena">
            <div className="reloj-halo" aria-hidden />
            {chispas.map((c, i) => <i key={i} className="rt-chispa" style={{ left: c.l, top: c.t, '--d': c.d } as CSSProperties} aria-hidden />)}
            <RelojArena f={f} done={t.done} />
          </div>
        </Reveal>

        <Reveal delay={150} className="rt-der">
          <div className="rt-panel">
            <span className="sr-only">Faltan {t.days} días, {t.hours} horas, {t.minutes} minutos y {t.seconds} segundos.</span>
            <div className="rt-fila" aria-hidden>
              {items.map(([l, v], i) => (
                <Fragment key={l}>
                  <div className="rt-unidad">
                    <span key={v} className="rt-num">{String(v).padStart(2, '0')}</span>
                    <span className="rt-et">{l}</span>
                  </div>
                  {i < items.length - 1 && <span className="rt-sep"><i /><i /></span>}
                </Fragment>
              ))}
            </div>
            <div className="rt-filete" aria-hidden />
            <p className="rt-fecha capitalize">{fecha}</p>
          </div>
        </Reveal>
      </div>

      <MiniCalendar />
      <Reveal className="mt-10 text-center"><button onClick={downloadICS} className="rounded-full border border-turquesa-deep px-8 py-3 font-body text-sm text-turquesa-deep transition-all hover:bg-turquesa-deep hover:text-white">Agregar a mi calendario</button></Reveal>
    </Seccion>
  )
}