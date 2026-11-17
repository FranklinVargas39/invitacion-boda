import { useCallback, useEffect, useRef, useState } from 'react'

/* Reproductor de música de fondo con la API oficial de YouTube.
   Antes se mandaban comandos a un iframe de 1px fuera de la pantalla y YouTube
   lo bloqueaba (o ignoraba los comandos) → quedaba en silencio.
   Ahora: reproductor de 220×220 (fuera de la vista), se espera a que esté listo,
   se reproduce desde el toque del usuario y se detectan los errores. */

type YTPlayer = { playVideo(): void; pauseVideo(): void; unMute(): void; setVolume(v: number): void; destroy(): void }
type YTApi = { Player: new (el: HTMLElement, opts: unknown) => YTPlayer }
declare global {
  interface Window { YT?: YTApi; onYouTubeIframeAPIReady?: () => void }
}

let apiPromise: Promise<YTApi> | null = null
const cargarApi = (): Promise<YTApi> => {
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      if (window.YT?.Player) return resolve(window.YT)
      const previo = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => { previo?.(); resolve(window.YT as YTApi) }
      const s = document.createElement('script')
      s.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(s)
    })
  }
  return apiPromise
}

export function useMusica(id: string) {
  const host = useRef<HTMLDivElement>(null)
  const player = useRef<YTPlayer | null>(null)
  const listo = useRef(false)
  const quiere = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState<number | null>(null)

  useEffect(() => {
    let vivo = true
    void cargarApi().then((YT) => {
      if (!vivo || !host.current) return
      const el = document.createElement('div')
      host.current.appendChild(el)
      player.current = new YT.Player(el, {
        width: 220,
        height: 220,
        videoId: id,
        playerVars: { controls: 0, playsinline: 1, loop: 1, playlist: id, rel: 0, modestbranding: 1, disablekb: 1, origin: window.location.origin },
        events: {
          onReady: () => {
            listo.current = true
            if (quiere.current) { player.current?.unMute(); player.current?.playVideo() }
          },
          onStateChange: (e: { data: number }) => setPlaying(e.data === 1 || e.data === 3),
          onError: (e: { data: number }) => { console.warn('YouTube no pudo reproducir la música. Código:', e.data, '(101/150 = el video no permite incrustarse)'); setError(e.data) },
        },
      })
    })
    return () => {
      vivo = false
      listo.current = false
      player.current?.destroy()
      player.current = null
    }
  }, [id])

  // Se llama desde un toque del usuario (el sello de la carta o el botón ♪)
  const play = useCallback(() => {
    quiere.current = true
    const p = player.current
    if (p && listo.current) { p.unMute(); p.setVolume(80); p.playVideo() }
  }, [])
  const pause = useCallback(() => { quiere.current = false; player.current?.pauseVideo() }, [])
  const toggle = useCallback(() => (playing ? pause() : play()), [playing, play, pause])

  return { host, playing, play, toggle, error }
}