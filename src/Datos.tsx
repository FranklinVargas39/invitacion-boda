/* =====================================================================
   TODOS LOS DATOS EDITABLES DE LA INVITACIÓN
   Todas las imágenes son LOCALES (src/assets). Ya no hay enlaces en línea.
   Los "icon" son nombres de icono de Iconos.tsx (ya no hay emojis):
   iglesia, copas, auto, salon, musica, cena, torta, anillos, novio, novia
   ===================================================================== */
/* eslint-disable react-refresh/only-export-components */
import novios1 from './assets/novios1.jpeg'
import foto1 from './assets/foto1.jpg'
import foto2 from './assets/foto2.jpg'
import foto3 from './assets/foto3.jpg'
import adm1 from './assets/adm1.jpg'
import adm2 from './assets/adm2.jpg'
import adm3 from './assets/adm3.jpg'
import manoVideo from './assets/Mano2.mp4' // si tu video es .webm o .mov, cambia la extensión aquí

export const WEDDING = {
  novio: 'Ruddy',
  novia: 'Cinthia',
  date: new Date(2026, 11, 12, 10, 0, 0), // 12 de diciembre de 2026, 10:00
  frase: 'Y si alguno prevaleciere contra uno, dos le resistirán; y cordón de tres dobleces no se rompe pronto',
  sheetsUrl: '', // URL de tu Apps Script (/exec). Vacía = se envía por WhatsApp
  whatsapp: '59162482430',
  rsvpDeadline: '5 de diciembre',
  youtubeId: 'xdfik2FRhck', // música de fondo
  account: { bank: 'Banco BCP', holder: 'Ruddy & Cinthia', number: '201-51445792-3-27' },
}

/* VIDEO de fondo de la portada y del pie (sin audio) */
export const VIDEO_FONDO: string = manoVideo

/* Versículos que se muestran en la sección de la frase */
export const VERSICULOS = [
  { texto: 'El que halla esposa halla el bien, Y alcanza la benevolencia de Jehová.', cita: 'Proverbios 18:22' },
  { texto: WEDDING.frase + '.', cita: 'Eclesiastés 4:12' },
]

export type Ev = { title: string; icon: string; date: string; time: string; place: string; lat: number; lng: number; map: string; note?: string; image?: string }
export const IGLESIA: Ev = { title: 'Ceremonia religiosa', icon: 'iglesia', date: 'Sábado 12 de diciembre', time: '10:00', place: 'MEB Iglesia Nueva Jerusalén', lat: -16.4837918, lng: -68.1833025, map: 'https://maps.app.goo.gl/gdKRkJrn2FRc17pi9' }
export const SALON: Ev = { title: 'Recepción social', icon: 'copas', date: 'Sábado 12 de diciembre', time: '16:00', place: 'Salón de Eventos Cisne Blanco', lat: -16.4818303, lng: -68.1825116, map: 'https://maps.app.goo.gl/Ehv3sxJ4za8tosn89' }

export const SCHEDULE = [
  { time: '10:00', icon: 'iglesia', label: 'Ceremonia religiosa' },
  { time: '11:30', icon: 'auto', label: 'Paseo de los novios' },
  { time: '16:00', icon: 'salon', label: 'Llegada al salón' },
  { time: '16:30', icon: 'musica', label: 'Baile' },
  { time: '17:00', icon: 'copas', label: 'Brindis' },
  { time: '20:30', icon: 'cena', label: 'Cena' },
  { time: '22:00', icon: 'torta', label: 'Torta' },
  { time: '00:00', icon: 'anillos', label: 'Felices por siempre' },
]

export const GODPARENTS = [
  { title: 'Consejeros civil y religioso', icon: 'iglesia', names: ['Pr. Jose Antonio Castro Zapata', 'Amanda Oraqueni de Castro'] },
  { title: 'Padrinos de torta', icon: 'torta', names: ['Pr. Juan Choque Huarachi', 'Diana Carolina Choque Cori (Hija)'] },
]

export const PARENTS = [
  { title: 'Padres del novio', icon: 'novio', names: ['Epifanio Vargas Mamani', 'Maria Cristina Choque de Vargas'] },
  { title: 'Padres de la novia', icon: 'novia', names: ['Hugo Quisbert Aparicio +', 'Rosa Calsina Pari'] },
]

export const STORY = [
  { year: '2024', title: 'Dios cruzó nuestros caminos', text: 'Sin imaginarlo, Dios tenía preparado un encuentro que cambiaría nuestras vidas para siempre.' },
  { year: '2024', title: 'Creciendo en amor y fe', text: 'Entre sonrisas, oraciones y momentos especiales, descubrimos que juntos podíamos caminar de la mano de Dios.' },
  { year: '2024', title: 'Un mismo propósito', text: 'Nuestros corazones comenzaron a soñar con un futuro, poniendo cada paso en las manos del Señor.' },
  { year: '2025', title: 'Un sí ante Dios', text: 'Con amor, fe y gratitud, decidimos unir nuestras vidas y construir juntos una historia bajo su bendición.' },
]

export const PALETTE = [
  { name: 'Turquesa', color: '#1fb5ad' },
  { name: 'Aguamarina', color: '#7fd8d0' },
  { name: 'Menta', color: '#cdf1ec' },
  { name: 'Coral', color: '#e0644f' },
  { name: 'Blanco', color: '#ffffff' },
]

/* ---------------------------------------------------------------------
   Utilidad: lee todas las fotos de una carpeta, en orden alfabético
   --------------------------------------------------------------------- */
type Foto = { src: string; label: string }
const ordenar = (m: Record<string, string>, label: string): Foto[] =>
  Object.keys(m)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((k) => ({ src: m[k], label }))

/* GALERÍA: además de estas, cualquier foto en  src/assets/galeria/  aparece sola */
const galeria = import.meta.glob('./assets/galeria/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: 'default' }) as Record<string, string>
export const GALLERY = [
  { src: novios1, label: 'Los novios' },


  { src: foto1, label: 'Nuestro camino' },
  { src: foto2, label: 'Nuestra historia' },
  { src: foto3, label: 'Nuestros sueños' },
  ...ordenar(galeria, 'Nuestros momentos'),
].map((g, i) => ({ id: i, ...g }))

/* FOTOS DE LOS LUGARES (locales): se toman solas de  src/assets/
   iglesia*.jpg  → ceremonia   |   Cisne*.jpg  → salón de eventos */
const fIglesia = import.meta.glob('./assets/iglesia*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: 'default' }) as Record<string, string>
const fSalon = import.meta.glob('./assets/[Cc]isne*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: 'default' }) as Record<string, string>
export const FOTOS_IGLESIA: Foto[] = ordenar(fIglesia, IGLESIA.place)
export const FOTOS_SALON: Foto[] = ordenar(fSalon, SALON.place)

/* FOTO DE FONDO de la animación de los anillos y de la portada */
const portadas = import.meta.glob('./assets/portada.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }) as Record<string, string>
export const PORTADA: string = Object.values(portadas)[0] ?? novios1

/* QUIENES AMENIZARÁN (fotos locales adm1, adm2, adm3) */
export const BANDS = [
  { name: 'Ministerio de Alabanza "ADMIRABLE"', url: adm1 },
  { name: 'Un ministerio con Excelencia!', url: adm2 },
  { name: 'Exaltando a Dios', url: adm3 },
]