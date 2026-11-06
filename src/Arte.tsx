import { useId, useMemo } from 'react'
import type { CSSProperties } from 'react'

export function Flower({ x, y, s = 1, a = '#7fd8d0', b = '#fffaf0' }: { x: number; y: number; s?: number; a?: string; b?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map((r) => <ellipse key={r} cx="0" cy="-9" rx="7" ry="11" fill={a} opacity="0.92" transform={`rotate(${r})`} />)}
      {[36, 108, 180, 252, 324].map((r) => <ellipse key={r} cx="0" cy="-5" rx="5" ry="8" fill={b} opacity="0.95" transform={`rotate(${r})`} />)}
      <circle r="3.6" fill="#0e8f8b" />
    </g>
  )
}

/** Pareja bajo un arco de flores, con los anillos arriba */
export function CoupleArt({ className = '', variant = 'gold' }: { className?: string; variant?: 'gold' | 'dark' }) {
  const id = useId().replace(/:/g, '')
  const fill = variant === 'gold' ? `url(#g${id})` : '#0b6563'
  const ring = variant === 'gold' ? '#4cc9c0' : '#0e8f8b'
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
          <stop offset="0" stopColor="#7fd8d0" /><stop offset="0.5" stopColor="#1fb5ad" /><stop offset="1" stopColor="#0e7c7b" />
        </linearGradient>
      </defs>
      <path d="M50 505 L50 230 A150 150 0 0 1 350 230 L350 505" fill="none" stroke={fill} strokeOpacity="0.7" strokeWidth="2.5" />
      {arch.map((p) => <Flower key={p.i} x={p.x} y={p.y} s={p.i % 2 ? 0.8 : 1.05} a={p.i % 3 === 0 ? '#7fd8d0' : '#cdf1ec'} />)}
      <g transform="translate(0 40)" fill={fill}>
        <g className="couple-groom">
          <circle cx="150" cy="105" r="21" /><rect x="143" y="122" width="14" height="16" />
          <path d="M124 152 Q150 138 176 152 L184 240 L180 318 L180 470 L153 470 L150 345 L147 470 L120 470 L120 318 L116 240 Z" />
          <path d="M180 158 Q214 196 224 244 L214 250 Q204 214 176 186 Z" />
        </g>
        <g className="couple-bride">
          <path d="M262 102 C322 112 356 204 350 332 C346 424 336 470 336 470 L322 470 C326 402 324 304 302 224 C290 182 276 144 258 122 Z" opacity="0.55" />
          <circle cx="250" cy="116" r="20" /><circle cx="262" cy="100" r="9" /><rect x="244" y="134" width="12" height="12" />
          <path d="M234 146 Q250 138 268 146 L264 230 C298 262 326 360 338 470 L198 470 C208 360 228 262 236 230 Z" />
          <path d="M238 156 Q222 194 222 244 L232 248 Q234 204 248 164 Z" />
          <Flower x={224} y={256} s={0.7} /><Flower x={236} y={268} s={0.55} a="#1fb5ad" />
        </g>
      </g>
      <g className="rings-float">
        <circle cx="188" cy="104" r="15" fill="none" stroke={ring} strokeWidth="3.5" />
        <circle cx="212" cy="104" r="15" fill="none" stroke={ring} strokeWidth="3.5" />
        <path d="M188 82 l5 7 -5 7 -5 -7z" fill={ring} />
      </g>
      <ellipse cx="200" cy="514" rx="140" ry="5" fill={fill} opacity="0.25" />
    </svg>
  )
}

export function FloralCorner({ className = '' }: { className?: string }) {
  const leaves: [number, number, number][] = [[28, 22, 20], [52, 40, 50], [80, 58, 35], [100, 88, 70], [124, 112, 55], [146, 142, 80], [170, 168, 60]]
  return (
    <svg viewBox="0 0 220 220" className={`pointer-events-none ${className}`} aria-hidden>
      <path d="M0 8 C70 18 140 66 190 170" fill="none" stroke="#1fb5ad" strokeWidth="2" strokeOpacity="0.8" />
      {leaves.map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx="17" ry="6" fill={i % 2 ? '#5fb59a' : '#8fd1bb'} opacity="0.85" transform={`rotate(${r} ${x} ${y})`} />)}
      <Flower x={62} y={46} s={1.5} /><Flower x={118} y={88} s={1.2} a="#cdf1ec" /><Flower x={160} y={140} s={1} />
      <Flower x={18} y={40} s={0.7} a="#1fb5ad" b="#cdf1ec" /><Flower x={92} y={22} s={0.7} a="#cdf1ec" />
    </svg>
  )
}

/** Pétalos turquesa que caen suavemente */
export function Petals({ count = 18 }: { count?: number }) {
  const petals = useMemo(
    () => Array.from({ length: count }, (_, i) => ({ id: i, left: Math.random() * 100, size: 8 + Math.random() * 12, dur: 10 + Math.random() * 10, delay: -Math.random() * 18, drift: (Math.random() - 0.3) * 160, color: ['#7fd8d0', '#cdf1ec', '#4cc9c0', '#e6f8f5'][i % 4] })),
    [count],
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <span key={p.id} className="petal" style={{ left: `${p.left}%`, width: p.size, height: p.size, background: p.color, opacity: 0.75, '--dur': `${p.dur}s`, '--delay': `${p.delay}s`, '--drift': `${p.drift}px` } as CSSProperties} />
      ))}
    </div>
  )
}

/** Mariposas y brillos muy sutiles (se usa en la carta y en la web) */
export function Ambient({ butterflies = 5, sparks = 20 }: { butterflies?: number; sparks?: number }) {
  const b = useMemo(
    () => Array.from({ length: butterflies }, (_, i) => ({ id: i, left: 8 + Math.random() * 84, top: 55 + Math.random() * 40, size: 22 + Math.random() * 14, dur: 20 + Math.random() * 12, delay: -Math.random() * 20, x1: (Math.random() - 0.5) * 160, x2: (Math.random() - 0.5) * 160, x3: (Math.random() - 0.5) * 160, c: i % 2 ? '#1fb5ad' : '#3cc1b8' })),
    [butterflies],
  )
  const s = useMemo(() => Array.from({ length: sparks }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, dur: 3 + Math.random() * 4, delay: -Math.random() * 6 })), [sparks])
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {s.map((p) => <span key={p.id} className="spark" style={{ left: `${p.x}%`, top: `${p.y}%`, '--dur': `${p.dur}s`, '--delay': `${p.delay}s` } as CSSProperties} />)}
      {b.map((p) => (
        <svg key={p.id} viewBox="0 0 40 30" className="butterfly" style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, '--dur': `${p.dur}s`, '--delay': `${p.delay}s`, '--x1': `${p.x1}px`, '--x2': `${p.x2}px`, '--x3': `${p.x3}px` } as CSSProperties}>
          <g className="wing wing-l"><path d="M20 15 C12 0 0 2 2 12 C3 20 12 22 20 15Z" fill={p.c} opacity="0.85" /><path d="M20 15 C12 22 6 30 12 28 C18 27 20 20 20 15Z" fill="#cdf1ec" /></g>
          <g className="wing wing-r"><path d="M20 15 C28 0 40 2 38 12 C37 20 28 22 20 15Z" fill={p.c} opacity="0.85" /><path d="M20 15 C28 22 34 30 28 28 C22 27 20 20 20 15Z" fill="#cdf1ec" /></g>
          <rect x="19.2" y="9" width="1.6" height="14" rx="0.8" fill="#0b3b3a" />
        </svg>
      ))}
    </div>
  )
}