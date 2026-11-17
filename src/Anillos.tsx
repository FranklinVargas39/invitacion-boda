import { useId } from 'react'
import type { CSSProperties } from 'react'
import './Anillos.css'

/* Dos alianzas de oro macizo, como en la foto de referencia:
   - izquierda: alianza lisa
   - derecha: inclinada, apoyada sobre la otra, con fila de diamantes y un solitario.
   Cada aro tiene su propio movimiento (clases aro-mov-l / aro-mov-r en el CSS). */

type Props = { className?: string; groupL?: string; groupR?: string; gem?: boolean; sombra?: boolean }

/* id = sufijo de los degradados/filtros (definidos en <defs>), k = sufijo único del recorte de cada aro */
type AroProps = { id: string; k: string; R: number; q: number; h: number; gem?: boolean; delay: string }

/** Un aro visto en perspectiva. R = radio horizontal, q = radio vertical de la elipse, h = ancho de la banda */
function Aro({ id, k, R, q, h, gem = false, delay }: AroProps) {
  const ref = (n: string) => `url(#${n}${id})`
  const clip = `url(#cf${k})`
  const t = -h / 2
  const b = h / 2

  const frente = `M${-R} ${t} A${R} ${q} 0 0 0 ${R} ${t} L${R} ${b} A${R} ${q} 0 0 1 ${-R} ${b} Z`
  const pared = `M${-R} ${t} A${R} ${q} 0 0 1 ${R} ${t} L${R} ${b} A${R} ${q} 0 0 0 ${-R} ${b} Z`
  const bordeSup = `M${-R} ${t} A${R} ${q} 0 0 0 ${R} ${t}`
  const bordeInf = `M${-R} ${b} A${R} ${q} 0 0 0 ${R} ${b}`
  const bordeInfAtras = `M${-R} ${b} A${R} ${q} 0 0 1 ${R} ${b}`
  const canal = `M${-R} 0 A${R} ${q} 0 0 0 ${R} 0`

  // diamantes a lo largo del frente (perspectiva: más chicos hacia los lados)
  const ANG_SOL = 84
  const diamantes = Array.from({ length: 15 }, (_, i) => 12 + i * (156 / 14))
    .map((deg, i) => ({ deg, i }))
    .filter(({ deg }) => Math.abs(deg - ANG_SOL) > 9)
  const sx = R * Math.cos((ANG_SOL * Math.PI) / 180)
  const sy = q * Math.sin((ANG_SOL * Math.PI) / 180)

  return (
    <g>
      <clipPath id={`cf${k}`}><path d={frente} /></clipPath>

      {/* sombra proyectada sobre la superficie */}
      <path d={frente} transform="translate(-5 7)" fill="#000" opacity={0.3} filter={ref('bs')} />

      {/* pared interior (lo que se ve dentro del aro) */}
      <path d={pared} fill={ref('w')} />
      <path d={pared} fill={ref('wh')} />
      <path d={bordeInfAtras} fill="none" stroke="#fff0b0" strokeOpacity={0.85} strokeWidth={1.6} />

      {/* frente de la banda: oro macizo */}
      <path d={frente} fill="#c58f2a" />
      <path d={frente} fill={ref('m')} />
      <path d={frente} fill={ref('sv')} />

      <g clipPath={clip}>
        {/* reflejos de la banda abombada */}
        <path d={bordeSup} transform="translate(0 5)" fill="none" stroke="#fff" strokeOpacity={0.75} strokeWidth={3.2} strokeLinecap="round" filter={ref('bl')} />
        <path d={bordeInf} transform="translate(0 -4.5)" fill="none" stroke="#4a2e04" strokeOpacity={0.4} strokeWidth={3} filter={ref('bl')} />

        {/* canal con diamantes */}
        {gem && (
          <g>
            <path d={canal} fill="none" stroke="#5e3b06" strokeWidth={11} />
            <path d={canal} transform="translate(0 -5.6)" fill="none" stroke="#fff3c4" strokeOpacity={0.8} strokeWidth={1} />
            <path d={canal} transform="translate(0 5.6)" fill="none" stroke="#3c2503" strokeOpacity={0.7} strokeWidth={1} />
            {diamantes.map(({ deg, i }) => {
              const a = (deg * Math.PI) / 180
              const s = Math.sin(a)
              const rd = 4.6 * (0.4 + 0.6 * s)
              const rx = rd * (0.35 + 0.65 * s)
              return (
                <g key={i} transform={`translate(${R * Math.cos(a)} ${q * s})`}>
                  <g className="dia" style={{ '--d': `${i * 0.21}s` } as CSSProperties}>
                    <ellipse rx={rx + 1.2} ry={rd + 1.2} fill="#c9962f" />
                    <ellipse rx={rx} ry={rd} fill={ref('d')} />
                    <ellipse cx={-rx * 0.3} cy={-rd * 0.3} rx={rx * 0.35} ry={rd * 0.35} fill="#fff" opacity={0.95} />
                  </g>
                </g>
              )
            })}
          </g>
        )}

        {/* destello que recorre la banda */}
        <g transform="skewX(-22)">
          <rect className="aro-barrido" x={-R - 34} y={t - q - 4} width={24} height={h + 2 * q + 8} fill={ref('sw')} style={{ '--d': delay } as CSSProperties} />
        </g>
      </g>

      {/* cantos de la banda */}
      <path d={`M${-R} ${t} V${b}`} stroke="#4a2e04" strokeOpacity={0.55} strokeWidth={1.2} />
      <path d={`M${R} ${t} V${b}`} stroke="#4a2e04" strokeOpacity={0.55} strokeWidth={1.2} />
      <path d={bordeInf} fill="none" stroke="#4a2e04" strokeOpacity={0.7} strokeWidth={1.6} />

      {/* borde superior (cara plana del aro) */}
      <ellipse cx={0} cy={t} rx={R} ry={q} fill="none" stroke={ref('r')} strokeWidth={3.4} />
      <ellipse cx={0} cy={t} rx={R - 2.2} ry={q - 1.8} fill="none" stroke="#6a4308" strokeOpacity={0.45} strokeWidth={0.8} />

      {/* solitario */}
      {gem && (
        <g transform={`translate(${sx} ${sy})`}>
          <circle r={20} fill={ref('g')} className="gema-halo" />
          <ellipse rx={11} ry={10.4} fill="#c9962f" stroke="#fff0b0" strokeWidth={0.8} />
          <g stroke="#bfe9f4" strokeWidth={0.5} strokeLinejoin="round">
            <polygon className="faceta f1" points="-8.2,0 -3.3,-5.4 0,0" fill="#e8fbff" />
            <polygon className="faceta f2" points="-3.3,-5.4 3.3,-5.4 0,0" fill="#ffffff" />
            <polygon className="faceta f3" points="3.3,-5.4 8.2,0 0,0" fill="#cdeff7" />
            <polygon className="faceta f2" points="-8.2,0 0,0 0,7.8" fill="#8fd3e6" />
            <polygon className="faceta f1" points="8.2,0 0,0 0,7.8" fill="#6fc3dc" />
          </g>
          <g transform="translate(-3 -4)">
            <path className="destello" d="M0 -19 L2.8 -2.8 L19 0 L2.8 2.8 L0 19 L-2.8 2.8 L-19 0 L-2.8 -2.8Z" fill="#fff" />
          </g>
        </g>
      )}
    </g>
  )
}

export default function Anillos({ className = '', groupL = 'anillo-izq', groupR = 'anillo-der', gem = true, sombra = false }: Props) {
  const id = useId().replace(/:/g, '')
  const u = (n: string) => `${n}${id}`

  return (
    <svg viewBox="0 0 320 200" className={`overflow-visible ${className}`} role="img" aria-label="Anillos de matrimonio">
      <defs>
        {/* metal de la banda (de lado a lado) */}
        <linearGradient id={u('m')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6e4708" /><stop offset="0.08" stopColor="#b98424" /><stop offset="0.22" stopColor="#f6cf68" />
          <stop offset="0.34" stopColor="#fff4c2" /><stop offset="0.46" stopColor="#e9b94a" /><stop offset="0.62" stopColor="#c58f2a" />
          <stop offset="0.8" stopColor="#f3cd5f" /><stop offset="0.92" stopColor="#b88626" /><stop offset="1" stopColor="#5c3a06" />
        </linearGradient>
        {/* pared interior */}
        <linearGradient id={u('w')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a5009" /><stop offset="0.55" stopColor="#d9a93d" /><stop offset="1" stopColor="#fbe598" />
        </linearGradient>
        <linearGradient id={u('wh')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.45" /><stop offset="0.25" stopColor="#000" stopOpacity="0" />
          <stop offset="0.75" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity="0.4" />
        </linearGradient>
        {/* borde superior */}
        <linearGradient id={u('r')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff6d2" /><stop offset="0.35" stopColor="#e2b44f" /><stop offset="0.6" stopColor="#fff0b0" /><stop offset="1" stopColor="#9a6f17" />
        </linearGradient>
        {/* volumen vertical */}
        <linearGradient id={u('sv')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" /><stop offset="0.35" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.75" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity="0.28" />
        </linearGradient>
        {/* barrido de luz */}
        <linearGradient id={u('sw')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset="0.5" stopColor="#fff" stopOpacity="0.85" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        {/* diamantes */}
        <radialGradient id={u('d')}>
          <stop offset="0" stopColor="#fff" /><stop offset="0.55" stopColor="#e9f9ff" /><stop offset="1" stopColor="#9fd8ea" />
        </radialGradient>
        <radialGradient id={u('g')}>
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" /><stop offset="1" stopColor="#bfefff" stopOpacity="0" />
        </radialGradient>
        <filter id={u('bl')} x="-10%" y="-40%" width="120%" height="180%"><feGaussianBlur stdDeviation="0.9" /></filter>
        <filter id={u('bs')} x="-30%" y="-30%" width="160%" height="170%"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>

      {sombra && <ellipse cx="160" cy="182" rx="118" ry="7" fill="#000" opacity="0.22" filter={`url(#${u('bs')})`} />}

      {/* aro izquierdo: lisa, ligeramente girada */}
      <g className={groupL}>
        <g className="aro-mov aro-mov-l">
          <g transform="translate(100 116) rotate(-3)">
            <Aro id={id} k={`L${id}`} R={62} q={26} h={40} delay="0s" />
          </g>
        </g>
      </g>

      {/* aro derecho: inclinado, apoyado sobre el otro, con diamantes */}
      <g className={groupR}>
        <g className="aro-mov aro-mov-r">
          <g transform="translate(214 92) rotate(16)">
            <Aro id={id} k={`R${id}`} R={58} q={24} h={38} gem={gem} delay="2.4s" />
          </g>
        </g>
      </g>
    </svg>
  )
}