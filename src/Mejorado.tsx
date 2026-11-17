import { useState } from 'react'
import { Ambient } from './Arte'
import Anillos from './Anillos'
import { Reveal, Divider, SectionTitle, Seccion, Words, Lightbox, useReveal, btn } from './Ui'
import { WEDDING, VERSICULOS, IGLESIA, SALON, FOTOS_IGLESIA, FOTOS_SALON } from './Datos'

/* =====================================================================
   FRASE + VERSÍCULOS (Proverbios 18:22 y Eclesiastés 4:12)
   ===================================================================== */
export function Interlude() {
  const ref = useReveal<HTMLDivElement>()
  return (
    <Seccion className="bg-hueso px-6 py-28 text-center" back={<Ambient butterflies={3} sparks={22} />}>
      <div ref={ref} className="reveal in mx-auto mb-10 w-72 sm:w-96">
        <Anillos className="ring-glow w-full" groupL="ring-scroll ring-scroll-l" groupR="ring-scroll ring-scroll-r" sombra />
      </div>
      <Reveal className="mx-auto max-w-2xl">
        <p className="font-script text-5xl leading-tight sm:text-6xl"><Words text="Dos almas, un solo camino" wordClass="gold-text" step={140} /></p>
        <Divider />
      </Reveal>
      {VERSICULOS.map((v, i) => (
        <Reveal key={v.cita} delay={i * 120} from={i % 2 ? 'right' : 'left'} className="mx-auto mt-8 max-w-2xl">
          <div className="verso rounded-3xl border border-turquesa/30 bg-white/70 px-6 py-8 shadow-lg shadow-turquesa-deep/10 backdrop-blur sm:px-10">
            <p className="font-display text-xl italic leading-relaxed text-tinta/90 sm:text-2xl">“{v.texto}”</p>
            <p className="mt-4 font-body text-xs uppercase tracking-[0.35em] text-turquesa-deep sm:text-sm">{v.cita}</p>
          </div>
        </Reveal>
      ))}
      <Reveal className="mt-10"><p className="font-script text-4xl text-turquesa-deep">{WEDDING.novio} & {WEDDING.novia}</p></Reveal>
    </Seccion>
  )
}

/* =====================================================================
   ¿DÓNDE SERÁ?  (mapa corregido)
   Antes el <iframe> se volvía a crear (key) en cada clic. Ahora hay UN solo
   mapa por lugar, creados una única vez; al cambiar de botón solo se
   muestra uno y se oculta el otro. Nunca se abren mapas nuevos.
   ===================================================================== */
const LUGARES = [
  { key: 'iglesia', tab: 'Ceremonia', ev: IGLESIA, fotos: FOTOS_IGLESIA },
  { key: 'salon', tab: 'Recepción', ev: SALON, fotos: FOTOS_SALON },
]
const embed = (lat: number, lng: number) => `https://maps.google.com/maps?q=${lat},${lng}&hl=es&z=17&output=embed`

function FotosLugar({ fotos }: { fotos: { src: string; label: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  if (!fotos.length) return null
  return (
    <div className="border-t border-turquesa/20 p-5">
      <p className="mb-3 text-center font-display text-lg italic text-turquesa-deep">Fotos del lugar · toca para ampliar</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {fotos.map((f, i) => (
          <button key={i} onClick={() => setOpen(i)} aria-label={`Ampliar foto ${i + 1}`} className="group shine relative aspect-[4/3] overflow-hidden rounded-xl border-2 border-white shadow-md">
            <img src={f.src} alt={f.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </button>
        ))}
      </div>
      <Lightbox images={fotos} index={open} setIndex={setOpen} />
    </div>
  )
}

export function Where() {
  const [active, setActive] = useState(0)
  const p = LUGARES[active]
  return (
    <Seccion id="donde" className="paper bg-white px-6 py-24">
      <SectionTitle title="¿Dónde será?" subtitle="Elige el lugar para ver el mapa, las fotos y cómo llegar" />
      <Reveal className="mx-auto max-w-4xl" from="zoom">
        <div role="tablist" className="mx-auto mb-6 flex w-fit rounded-full border border-turquesa/40 bg-white p-1 shadow">
          {LUGARES.map((pl, i) => (
            <button key={pl.key} type="button" role="tab" aria-selected={active === i} onClick={() => setActive(i)} className={`rounded-full px-5 py-2 font-body text-sm transition-all ${active === i ? 'bg-turquesa text-white shadow' : 'text-tinta/85 hover:text-turquesa-deep'}`}>{pl.tab}</button>
          ))}
        </div>
        <div className="overflow-hidden rounded-3xl border border-turquesa/40 bg-white shadow-xl">
          <div className="relative h-80 bg-hielo/40 sm:h-[26rem]">
            {LUGARES.map((pl, i) => (
              <iframe
                key={pl.key}
                title={`Mapa: ${pl.ev.place}`}
                src={embed(pl.ev.lat, pl.ev.lng)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-hidden={active !== i}
                tabIndex={active === i ? 0 : -1}
                className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ${active === i ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
              />
            ))}
          </div>
          <div className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="font-display text-2xl text-turquesa-deep">{p.ev.place}</p>
              <p className="font-body text-sm text-tinta/80">{p.ev.date} · {p.ev.time}</p>
            </div>
            <a href={p.ev.map} target="_blank" rel="noreferrer" className={`${btn} shrink-0`}>Cómo llegar</a>
          </div>
          <FotosLugar key={p.key} fotos={p.fotos} />
        </div>
      </Reveal>
    </Seccion>
  )
}