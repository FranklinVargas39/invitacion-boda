import { useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { Ambient, FloralCorner, Petals } from './Arte'
import Anillos from './Anillos'
import { WEDDING, PORTADA, IGLESIA } from './Datos'
import './Caja.css'

type Stage = 'sealed' | 'opening' | 'zooming' | 'ring' | 'leaving'

export default function Carta({ guest, onOpen, onClose }: { guest: string; onOpen: () => void; onClose: () => void }) {
  const [stage, setStage] = useState<Stage>('sealed')
  const timers = useRef<number[]>([])
  const tilt = useRef<HTMLDivElement>(null)
  const later = (fn: () => void, ms: number) => void timers.current.push(window.setTimeout(fn, ms))

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = timers.current
    return () => {
      document.body.style.overflow = ''
      t.forEach(clearTimeout)
    }
  }, [])

  // El sobre se inclina suavemente siguiendo el mouse / el dedo (efecto 3D real)
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (stage !== 'sealed' || !tilt.current) return
    const x = e.clientX / window.innerWidth - 0.5
    const y = e.clientY / window.innerHeight - 0.5
    tilt.current.style.setProperty('--rx', `${(-y * 14).toFixed(2)}deg`)
    tilt.current.style.setProperty('--ry', `${(x * 18).toFixed(2)}deg`)
  }

  const abrir = () => {
    if (stage !== 'sealed') return
    onOpen()
    tilt.current?.style.setProperty('--rx', '0deg')
    tilt.current?.style.setProperty('--ry', '0deg')
    setStage('opening')
    later(() => setStage('zooming'), 2300)
    later(() => setStage('ring'), 2900) // caja de anillos
    later(() => setStage('leaving'), 7700) // se despide la animación
    later(onClose, 8800) // directo al inicio del contenido
  }

  const open = stage !== 'sealed'
  const showEnv = stage === 'sealed' || stage === 'opening' || stage === 'zooming'
  const d = WEDDING.date
  const fecha = d.toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' })
  const fechaCorta = `${d.getDate()} · ${d.getMonth() + 1} · ${d.getFullYear()}`

  return (
    <div onPointerMove={onMove} className={`carta-overlay fixed inset-0 z-[100] overflow-hidden bg-gradient-to-b from-white via-hueso to-hielo/70 ${stage === 'leaving' ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
      <Ambient butterflies={4} sparks={26} />
      {showEnv && <Petals count={10} />}

      {/* ---------- SOBRE REALISTA ---------- */}
      {showEnv && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="relative mb-10 px-6 text-center font-display text-2xl italic text-turquesa-deep sm:text-3xl">
            {guest ? `${guest}, tienes una invitación` : 'Tienes una invitación'}
          </p>

          <div className={`sobre-escena ${open ? 'abierta' : ''} ${stage === 'zooming' ? 'zoom' : ''}`}>
            <div className="sobre-flota">
              <div className="sobre-sombra" />
              <div ref={tilt} className="sobre-tilt">
                <div className={`sobre ${open ? 'abierto' : ''}`}>
                  <div className="sobre-cuerpo" />

                  {/* Contenido de la carta */}
                  <div className="sobre-carta">
                    <FloralCorner className="absolute left-0 top-0 w-14 opacity-90 sm:w-20" />
                    <FloralCorner className="absolute right-0 top-0 w-14 -scale-x-100 opacity-90 sm:w-20" />
                    <FloralCorner className="absolute bottom-0 left-0 w-14 -scale-y-100 opacity-90 sm:w-20" />
                    <FloralCorner className="absolute bottom-0 right-0 w-14 rotate-180 opacity-90 sm:w-20" />
                    <span className="relative font-body text-[0.55rem] uppercase tracking-[0.45em] text-turquesa-deep sm:text-[0.65rem]">Invitación de boda</span>
                    <div className="carta-anillos relative"><Anillos /></div>
                    <span className="relative font-script text-[clamp(1.7rem,7.5vw,2.5rem)] leading-tight"><span className="gold-text">{WEDDING.novio} & {WEDDING.novia}</span></span>
                    <span className="relative font-display text-sm italic text-tinta/80 sm:text-base">se casan</span>
                    <span className="carta-filete" />
                    <span className="relative font-body text-[0.6rem] uppercase tracking-[0.3em] text-turquesa-deep sm:text-xs">{fecha}</span>
                    <span className="relative font-display text-xs italic text-tinta/70 sm:text-sm">{IGLESIA.time} · {IGLESIA.place}</span>
                  </div>

                  <div className="sobre-bolsillo" aria-hidden>
                    <i className="bolsillo-izq" /><i className="bolsillo-der" /><i className="bolsillo-inf" />
                  </div>

                  <div className="sobre-solapa" aria-hidden>
                    <div className="solapa-cara solapa-fuera" />
                    <div className="solapa-cara solapa-dentro" />
                  </div>

                  <button onClick={abrir} aria-label="Abrir la carta" className={`sello ${stage === 'sealed' ? 'sello-vivo' : ''}`}>
                    <span>{WEDDING.novio[0]}{WEDDING.novia[0]}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className={`relative mt-14 font-body text-sm tracking-widest text-tinta/80 transition-opacity duration-500 ${stage === 'sealed' ? 'animate-pulse' : 'opacity-0'}`}>
            Toca el sello para abrir la carta
          </p>
        </div>
      )}

      {/* ---------- CAJITA DE MADERA CON LOS ANILLOS ---------- */}
      {(stage === 'ring' || stage === 'leaving') && (
        <div className="rb-scene absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
          <div className="rb-photo absolute inset-0 bg-cover bg-center" style={PORTADA ? { backgroundImage: `url(${PORTADA})` } : { background: 'linear-gradient(160deg,#7fd8d0,#0e7c7b)' }} />
          <div className="rb-veil absolute inset-0 bg-gradient-to-b from-turquesa-deep/40 via-turquesa-deep/10 to-turquesa-deep/55" />
          <Ambient butterflies={3} sparks={22} />

          <div className="caja-escena">
            <div className="rb-glow absolute left-1/2 top-[52%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full" />

            <div className="caja-3d">
              <div className="caja-plano">
                <div className="caja-sombra" />

                {/* Base con interior de terciopelo y los anillos acostados */}
                <div className="caja-base caja-madera">
                  <div className="caja-base-frente caja-frente-madera" />
                  <div className="caja-pozo">
                    <span className="caja-ranura r1" />
                    <span className="caja-ranura r2" />
                    <span className="caja-aro a1" />
                    <span className="caja-aro a2" />
                  </div>
                </div>

                {/* Tapa con los nombres grabados en oro; se abre por la mitad */}
                <div className="caja-tapa">
                  <div className="caja-tapa-dentro caja-madera" />
                  <div className="caja-tapa-frente caja-frente-madera" />
                  <div className="caja-tapa-fuera caja-madera">
                    <span className="caja-monograma caja-grabado">{WEDDING.novio[0]} & {WEDDING.novia[0]}</span>
                    <span className="caja-nombres caja-grabado">{WEDDING.novio} & {WEDDING.novia}</span>
                    <span className="caja-fecha caja-grabado">{fechaCorta}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Anillos de oro que salen de la caja */}
            <div className="caja-anillos"><Anillos className="w-full" /></div>
          </div>

          <p className="rb-names relative mt-8 px-6 text-center font-script text-5xl text-white drop-shadow-lg sm:text-6xl">{WEDDING.novio} & {WEDDING.novia}</p>
        </div>
      )}
    </div>
  )
}