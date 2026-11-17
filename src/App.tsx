import { useEffect, useMemo, useState } from 'react'
import Carta from './Carta'
import { ScrollProgress, Nav, FloatingButtons } from './Ui'
import { WEDDING } from './Datos'
import { useMusica } from './Musica'
import { Hero, Marquee, Story, Details, Schedule, Padrinos, DressCode, Gallery, Bands, Rsvp, Footer } from './Contenido'
import { Interlude, Where } from './Mejorado'
import './Mejoras.css'
import './Dorado.css'
import './Sueve.css'
import { Countdown } from './Cronometro'

export default function App() {
  // Enlace personalizado: https://tu-sitio.com/?invitado=Familia%20Pérez
  const guest = useMemo(() => new URLSearchParams(window.location.search).get('invitado') ?? '', [])
  const [cartaCerrada, setCartaCerrada] = useState(false)
  const [heroListo, setHeroListo] = useState(false)

  const { host, playing, play, toggle, error } = useMusica(WEDDING.youtubeId)

  const alAbrir = () => {
    play()
    window.setTimeout(() => setHeroListo(true), 7700)
  }

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
    const move = (e: MouseEvent) => {
      const now = performance.now()
      if (now - last < 70) return
      last = now
      spawn('sparkle', e.clientX, e.clientY, { '--dx': `${(Math.random() - 0.5) * 30}px` })
    }
    const click = (e: MouseEvent) => {
      for (let i = 0; i < 6; i++) spawn('star-burst', e.clientX, e.clientY, { '--dx': `${(Math.random() - 0.5) * 140}px`, '--dy': `${-30 - Math.random() * 90}px` })
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('click', click)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('click', click) }
  }, [])

  return (
    <>
      {!cartaCerrada && <Carta guest={guest} onOpen={alAbrir} onClose={() => { setCartaCerrada(true); setHeroListo(true); window.scrollTo(0, 0) }} />}
      <ScrollProgress />
      <Nav />
      {/* reproductor de música (fuera de la vista, pero de tamaño real para que YouTube no lo bloquee) */}
      <div ref={host} aria-hidden className="pointer-events-none fixed -left-[300px] bottom-0 h-[220px] w-[220px] overflow-hidden" />
      {import.meta.env.DEV && error !== null && <p className="fixed bottom-20 left-4 z-[200] max-w-xs rounded-xl bg-coral px-4 py-3 font-body text-sm text-white shadow-xl">La música no se puede reproducir (código {error}). Si es 101 o 150, ese video no permite incrustarse: usa otro en youtubeId (Datos.ts).</p>}
      <FloatingButtons playing={playing} toggle={toggle} />
      <main>
        <Hero guest={guest} entered={heroListo} />
        <Marquee />
        <Countdown />
        <Interlude />
        <Story />
        <Details />
        <Where />
        <Schedule />
        <Padrinos />
        <DressCode />
        <Gallery />
        <Bands />
        <Rsvp guest={guest} />
      </main>
      <Footer />
    </>
  )
}