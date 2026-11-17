import { useId } from 'react'
import type { ReactNode } from 'react'

/* =====================================================================
   ICONOS DE LÍNEA (SVG) — reemplazan a los emojis.
   Se dibujan en dorado (degradado) o con el color del texto (dorado={false}).
   ===================================================================== */
const TRAZOS: Record<string, ReactNode> = {
  iglesia: (<><path d="M12 2v4M10 4h4" /><path d="M6 21V11l6-5 6 5v10" /><path d="M3 21h18" /><path d="M10 21v-4a2 2 0 0 1 4 0v4" /></>),
  copas: (<><path d="M6 3h5l-.4 5a2.1 2.1 0 0 1-4.2 0L6 3z" /><path d="M8.5 10v8M6 18h5" /><path d="M13 3h5l-.4 5a2.1 2.1 0 0 1-4.2 0L13 3z" /><path d="M15.5 10v8M13 18h5" /></>),
  auto: (<><path d="M3 17v-4l2-4.5A2 2 0 0 1 6.8 7.5h10.4A2 2 0 0 1 19 8.5l2 4.5v4z" /><path d="M5 13h14" /><circle cx="7.5" cy="17" r="1.8" /><circle cx="16.5" cy="17" r="1.8" /></>),
  salon: (<><path d="M3 10l9-6 9 6" /><path d="M5 10v10M9 10v10M15 10v10M19 10v10" /><path d="M3 21h18" /></>),
  musica: (<><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></>),
  cena: (<><path d="M6 3v6a2 2 0 0 0 4 0V3" /><path d="M8 3v18" /><path d="M17 21V3c-2.2 1.2-3.5 4-3.5 8H17" /></>),
  torta: (<><path d="M4 20h16" /><path d="M5 20v-6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v6" /><path d="M8 13v-3h8v3" /><path d="M12 10V7" /><path d="M12 3.5c1 1 1 2 0 2.5-1-.5-1-1.5 0-2.5z" /></>),
  anillos: (<><circle cx="9" cy="15" r="5" /><circle cx="15" cy="15" r="5" /><path d="M9 3l2 2.5L9 8 7 5.5z" /></>),
  novio: (<><path d="M3 8l7 4-7 4z" /><path d="M21 8l-7 4 7 4z" /><rect x="10" y="10" width="4" height="4" rx="1" /></>),
  novia: (<><circle cx="12" cy="5" r="2.2" /><path d="M10 9h4l4 12H6z" /></>),
  camara: (<><path d="M3 8h4l1.5-2h7L17 8h4v12H3z" /><circle cx="12" cy="13.5" r="3.5" /></>),
  corazon: (<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />),
  compartir: (<><path d="M12 15V3M8 7l4-4 4 4" /><path d="M5 12v8h14v-8" /></>),
  pausa: (<path d="M8 5v14M16 5v14" />),
  abajo: (<path d="M6 9l6 6 6-6" />),
}

export function Icono({ name, className = 'h-6 w-6', dorado = true, grosor = 1.5 }: { name: string; className?: string; dorado?: boolean; grosor?: number }) {
  const id = 'oro' + useId().replace(/:/g, '')
  const trazo = TRAZOS[name]
  if (!trazo) return null
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke={dorado ? `url(#${id})` : 'currentColor'} strokeWidth={grosor} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {dorado && (
        <defs>
          <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22">
            <stop offset="0" stopColor="#8f6a17" /><stop offset="0.45" stopColor="#e0c36e" /><stop offset="1" stopColor="#b8902f" />
          </linearGradient>
        </defs>
      )}
      {trazo}
    </svg>
  )
}