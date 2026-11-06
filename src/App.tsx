import { useEffect, useMemo, useRef, useState } from 'react'
import Carta from './Carta'
import { ScrollProgress, Nav, FloatingButtons } from './Ui'
import { WEDDING } from './Datos'
import { Hero, Marquee, Countdown, Interlude, Story, Details, Where, Schedule, Padrinos, DressCode, Gallery, Bands, Gifts, Rsvp, Footer } from './Contenido'

export default function App() {
  // Enlace personalizado: https://tu-sitio.com/?invitado=Familia%20Pérez
  const guest = useMemo(() => new URLSearchParams(window.location.search).get('invitado') ?? '', [])
  const ytRef = useRef<HTMLIFrameElement>(null)
  const [playing, setPlaying] = useState(false)
  const [cartaCerrada, setCartaCerrada] = useState(false)
  const [heroListo, setHeroListo] = useState(false) // la portada anima sus nombres cuando la carta se despide

  const cmd = (func: string) => ytRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args: '' }), '*')
  const play = () => { cmd('unMute'); cmd('playVideo'); setPlaying(true) }
  const toggle = () => { if (playing) { cmd('pauseVideo'); setPlaying(false) } else play() }

  // Se llama al abrir la carta: la animación de la carta dura ~7,7 s antes de despedirse
  const alAbrir = () => {
    play()
    window.setTimeout(() => setHeroListo(true), 7700)
  }

  // Destellos sutiles que siguen al mouse y estrellitas al hacer clic (solo con mouse)
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
      <iframe ref={ytRef} title="Música de la invitación" aria-hidden tabIndex={-1} className="pointer-events-none fixed -left-[9999px] top-0 h-px w-px opacity-0" src={`https://www.youtube.com/embed/${WEDDING.youtubeId}?enablejsapi=1&loop=1&playlist=${WEDDING.youtubeId}&controls=0&playsinline=1`} allow="autoplay; encrypted-media" />
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
        <Gifts />
        <Rsvp guest={guest} />
      </main>
      <Footer />
    </>
  )
}