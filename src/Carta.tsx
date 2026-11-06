import { useEffect, useRef, useState } from 'react'
import { Ambient, CoupleArt } from './Arte'
import { WEDDING, PORTADA } from './Datos'

type Stage = 'sealed' | 'opening' | 'zooming' | 'ring' | 'leaving'

/** Dos anillos entrelazados (se usan dentro de la caja y al final en grande) */
function Rings() {
  return (
    <svg viewBox="0 0 200 110" className="h-full w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="rbG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" /><stop offset="0.45" stopColor="#7fd8d0" /><stop offset="1" stopColor="#0e8f8b" />
        </linearGradient>
      </defs>
      <circle cx="78" cy="62" r="40" fill="none" stroke="url(#rbG)" strokeWidth="8" />
      <circle cx="122" cy="62" r="40" fill="none" stroke="url(#rbG)" strokeWidth="8" />
      <path d="M68 16 L78 2 L88 16 L78 28 Z" fill="#fff" stroke="#7fd8d0" strokeWidth="1.5" />
    </svg>
  )
}

export default function Carta({ guest, onOpen, onClose }: { guest: string; onOpen: () => void; onClose: () => void }) {
  const [stage, setStage] = useState<Stage>('sealed')
  const timers = useRef<number[]>([])
  const later = (fn: () => void, ms: number) => void timers.current.push(window.setTimeout(fn, ms))

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = timers.current
    return () => {
      document.body.style.overflow = ''
      t.forEach(clearTimeout)
    }
  }, [])

  const abrir = () => {
    if (stage !== 'sealed') return
    onOpen()
    setStage('opening')
    later(() => setStage('zooming'), 2200)
    later(() => setStage('ring'), 2900) // caja de anillos
    later(() => setStage('leaving'), 7700) // se despide la animación
    later(onClose, 8800) // directo al inicio del contenido
  }

  const open = stage !== 'sealed'
  const showEnv = stage === 'sealed' || stage === 'opening' || stage === 'zooming'

  return (
    <div className={`carta-overlay fixed inset-0 z-[100] overflow-hidden bg-gradient-to-b from-white via-hueso to-hielo/70 ${stage === 'leaving' ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
      <Ambient butterflies={4} sparks={26} />

      {/* ---------- SOBRE CLÁSICO ---------- */}
      {showEnv && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="relative mb-10 px-6 text-center font-display text-2xl italic text-turquesa-deep">
            {guest ? `${guest}, tienes una invitación` : 'Tienes una invitación'}
          </p>
          <div className={`env relative aspect-[4/3] w-[min(86vw,440px)] ${stage === 'zooming' ? 'zoom' : ''}`} style={{ perspective: 1400 }}>
            <div className={`env-letter absolute inset-x-4 bottom-3 top-3 z-10 flex flex-col items-center justify-center rounded-sm bg-white text-center shadow-xl ${open ? 'up' : ''}`}>
              <CoupleArt variant="dark" className="aspect-[400/520] h-20 sm:h-28" />
              <span className="mt-1 px-3 font-script text-3xl leading-tight text-turquesa-deep sm:text-4xl">{WEDDING.novio} & {WEDDING.novia}</span>
              <span className="font-display text-sm italic text-tinta/80">se casan</span>
            </div>
            <div className="absolute inset-0 z-20 rounded-sm bg-gradient-to-br from-[#bfece7] to-turquesa-soft shadow-2xl" style={{ clipPath: 'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)' }} />
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-turquesa-deep/30 to-transparent" style={{ clipPath: 'polygon(0 100%, 50% 45%, 100% 100%)' }} />
            <div className={`env-flap absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-[#d8f4f0] to-turquesa-soft ${open ? 'open' : ''}`} style={{ zIndex: open ? 5 : 30 }} />
            <button
              onClick={abrir}
              aria-label="Abrir la carta"
              className={`seal absolute left-1/2 top-[48%] z-40 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-hielo bg-gradient-to-br from-turquesa to-turquesa-deep font-script text-2xl text-white shadow-lg hover:scale-110 ${stage === 'sealed' ? 'animate-pulse-ring cursor-pointer' : 'crack pointer-events-none'}`}
            >
              {WEDDING.novio[0]}{WEDDING.novia[0]}
            </button>
          </div>
          <p className={`relative mt-14 font-body text-sm tracking-widest text-tinta/80 transition-opacity duration-500 ${stage === 'sealed' ? 'animate-pulse' : 'opacity-0'}`}>
            Toca el sello para abrir la carta
          </p>
        </div>
      )}

      {/* ---------- CAJA DE ANILLOS ---------- */}
      {(stage === 'ring' || stage === 'leaving') && (
        <div className="rb-scene absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
          <div className="rb-photo absolute inset-0 bg-cover bg-center" style={PORTADA ? { backgroundImage: `url(${PORTADA})` } : { background: 'linear-gradient(160deg,#7fd8d0,#0e7c7b)' }} />
          <div className="rb-veil absolute inset-0 bg-gradient-to-b from-turquesa-deep/40 via-turquesa-deep/10 to-turquesa-deep/55" />
          <Ambient butterflies={3} sparks={22} />

          <div className="relative h-[300px] w-[260px]">
            <div className="rb-glow absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full" />
            <div className="rb-box absolute inset-0">
              <div className="rb-lid" />
              <div className="rb-rings"><Rings /></div>
              <div className="rb-base"><span className="rb-ribbon" /></div>
            </div>
            <div className="rb-rings-final"><Rings /></div>
          </div>

          <p className="rb-names relative mt-8 px-6 text-center font-script text-5xl text-white drop-shadow-lg sm:text-6xl">{WEDDING.novio} & {WEDDING.novia}</p>
        </div>
      )}
    </div>
  )
}