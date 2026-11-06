/* =====================================================================
   TODOS LOS DATOS EDITABLES DE LA INVITACIÓN
   ===================================================================== */
/* eslint-disable react-refresh/only-export-components */
import caricatura from './assets/caricatura.jpeg'
import novios from './assets/novios.jpeg'
import novios1 from './assets/novios1.jpeg'
import novios2 from './assets/novios2.jpeg'

export const WEDDING = {
  novio: 'Ruddy',
  novia: 'Cinthia',
  date: new Date(2026, 11, 12, 10, 0, 0), // 12 de diciembre de 2026, 10:00
frase: 'Y si alguno prevaleciere contra uno, dos le resistirán; y cordón de tres dobleces no se rompe pronto ECLESIASTES 4:12',
  sheetsUrl: '', // URL de tu Apps Script (/exec). Vacía = se envía por WhatsApp
  whatsapp: '59162482430', // ⚠️ cambia por el número que recibe las confirmaciones
  rsvpDeadline: '5 de diciembre',
  youtubeId: 'z3bF6Op-2Ok', // música de fondo
  account: { bank: 'Banco BCP', holder: 'Ruddy & Cinthia', number: '201-51445792-3-27' },
}

export type Ev = { title: string; icon: string; date: string; time: string; place: string; lat: number; lng: number; map: string; note?: string; image?: string }
export const IGLESIA: Ev = { title: 'Ceremonia religiosa', icon: '⛪', date: 'Sábado 12 de diciembre', time: '10:00', place: 'MEB Iglesia Nueva Jerusalén', lat: -16.4837918, lng: -68.1833025, map: 'https://maps.app.goo.gl/gdKRkJrn2FRc17pi9' }
export const SALON: Ev = { title: 'Recepción social', icon: '🥂', date: 'Sábado 12 de diciembre', time: '16:00', place: 'Salón de Eventos Cisne Blanco', lat: -16.4818303, lng: -68.1825116, map: 'https://maps.app.goo.gl/Ehv3sxJ4za8tosn89' }

export const SCHEDULE = [
  { time: '10:00', icon: '⛪', label: 'Ceremonia religiosa' },
  { time: '11:30', icon: '🚗', label: 'Paseo de los novios' },
  { time: '16:00', icon: '🏛️', label: 'Llegada al salón' },
  { time: '16:30', icon: '💃', label: 'Baile' },
  { time: '17:00', icon: '🥂', label: 'Brindis' },
  { time: '19:30', icon: '🍽️', label: 'Cena' },
  { time: '22:00', icon: '🎂', label: 'Torta' },
  { time: '00:00', icon: '💞', label: 'Felices por siempre' },
]

export const GODPARENTS = [
  { title: 'Consejeros', icon: '⛪', names: ['Pastor Jose Castro', 'Amanda de Castro'] },
  { title: 'Padrinos de torta', icon: '🎂', names: ['Pastor Juan Choque', 'Diana Choque'] },
]

export const PARENTS = [
  { title: 'Padres del novio', icon: '🤵', names: ['Epifanio Vargas Mamani', 'Maria Cristina Vargas Mamani'] },
  { title: 'Padres de la novia', icon: '👰', names: ['Rosa Calsina Pari', 'Hugo +'] },
]

export const STORY = [
  { year: '2024', title: 'Nos conocimos', text: 'Una tarde cualquiera, una conversación que no quisimos terminar.' },
  { year: '2024', title: 'Nuestra primera aventura', text: 'Mochila, carretera y la certeza de que todo era mejor juntos.' },
  { year: '2024', title: 'Nos mudamos juntos', text: 'Dos vidas, un solo hogar.' },
  { year: '2025', title: 'La pregunta', text: 'Un atardecer y el sí más fácil de la historia.' },
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
   (01-foto.jpg, 02-foto.jpg …)
   --------------------------------------------------------------------- */
type Foto = { src: string; label: string }
const ordenar = (m: Record<string, string>, label: string): Foto[] =>
  Object.keys(m)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((k) => ({ src: m[k], label }))

/* 📸 GALERÍA GENERAL: pon todas tus fotos en  src/assets/galeria/  y aparecen solas */
const galeria = import.meta.glob('./assets/galeria/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: 'default' }) as Record<string, string>
export const GALLERY = [
  { src: novios, label: 'Los novios' },
  { src: caricatura, label: 'Nuestro gran día' },
  { src: novios1, label: 'Nuestro amor' },
  { src: novios2, label: 'Nuestros recuerdos' },
  ...ordenar(galeria, 'Nuestros momentos'),
].map((g, i) => ({ id: i, ...g }))

/* ⛪ FOTOS DE LA IGLESIA y 🏛️ FOTOS DEL LOCAL (salón): se manejan con ENLACES (URL).
   Pega un enlace por línea, entre comillas y separados por coma. Ejemplo:
     'https://mi-sitio.com/fotos/iglesia-1.jpg',
   Usa enlaces directos a la imagen (que terminen en .jpg, .png, .webp…). */
const URLS_IGLESIA: string[] = [
  // 'https://...',
  'https://scontent.flpb2-2.fna.fbcdn.net/v/t39.30808-6/467665403_552903970868393_6544183328931030169_n.jpg?stp=dst-jpg_tt6&cstp=mx640x1422&ctp=s640x1422&_nc_cat=105&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=75d36f&_nc_ohc=7tKnfg5qbqwQ7kNvwHpZXHt&_nc_oc=Adqj9VSTmTj03IQgx7JKQe1A1rzT6dGGeN7MMxxGY0xSEN_YBfj5xH9gOLfu-iyrYtQ&_nc_zt=23&_nc_ht=scontent.flpb2-2.fna&_nc_gid=-mEgtl06D5bVFqankDaHnA&_nc_ss=7b2a8&oh=00_AQRUCpXJCGMGPtWvMETeMHVW0535KFp2eWWa6HYS0I29Rw&oe=6AF31D2B'
]
const URLS_SALON: string[] = [
  // 'https://...',
  'https://scontent.flpb2-1.fna.fbcdn.net/v/t39.30808-6/306963972_422241723363344_5259234813071968133_n.jpg?stp=dst-jpg_tt6&cstp=mx1012x1000&ctp=s1012x1000&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=lGgqlJscpnUQ7kNvwGhLky2&_nc_oc=AdonSxUpTNTnQ1-xmz26BZgyu8yfpH-zlixODps5bEOLadFpEVopEyU7uggz8HYYPtQ&_nc_zt=23&_nc_ht=scontent.flpb2-1.fna&_nc_gid=GrNT5Oa_TcpETS4UP1WzNA&_nc_ss=7b2a8&oh=00_AQQUG4HFynIlq9fEjb3ttdFKOODF0ZlUzNFK-fcA-V6TYw&oe=6AF31592'
]
const desdeUrls = (urls: string[], label: string): Foto[] => urls.map((src) => ({ src, label }))
export const FOTOS_IGLESIA: Foto[] = desdeUrls(URLS_IGLESIA, IGLESIA.place)
export const FOTOS_SALON: Foto[] = desdeUrls(URLS_SALON, SALON.place)

/* 🖼️ FOTO DE FONDO de la animación de los anillos (desde src): guarda una foto como  src/assets/portada.jpg
   (si no existe, usa novios.jpeg) */
const portadas = import.meta.glob('./assets/portada.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }) as Record<string, string>
export const PORTADA: string = Object.values(portadas)[0] ?? novios1

/* 🎶 QUIENES AMENIZARÁN: la foto de cada agrupación va por ENLACE (url) */
export const BANDS = [
  { name: 'Ministerio de Alabanza "ADMIRABLE"', url: "https://scontent.flpb2-2.fna.fbcdn.net/v/t39.30808-6/454608715_1026705446130387_8427099910962723499_n.jpg?stp=dst-jpg_tt6&cstp=mx960x960&ctp=s960x960&_nc_cat=100&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=LVvUrsEScJMQ7kNvwHHgE-p&_nc_oc=Adq0gda7MeEyMNhPbtxAQOpbTNtlPX1sT5w2wu9V0v0j8Cy3fmG4Q22QQAvJbbzm4_A&_nc_zt=23&_nc_ht=scontent.flpb2-2.fna&_nc_gid=IxdDg3pYO33Kk_bCmYqiGg&_nc_ss=7b2a8&oh=00_AQSir7DHFCsddUDpedhPL5Vxu3I3A_TjB0ribepED0wmEA&oe=6AF2D890" },
  { name: 'Un ministerio con Excelencia!', url: "https://scontent.flpb2-1.fna.fbcdn.net/v/t39.30808-6/585795517_1446997410767853_4810073999923727552_n.jpg?stp=dst-jpg_tt6&cstp=mx960x655&ctp=s960x655&_nc_cat=111&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=oG0yvHjSs1gQ7kNvwHZIC9e&_nc_oc=AdpSQl9xsp9xgJMbedVSVI__yl9h9DdoSR0M2wx-2Qu7g25OgwIKn8QWDvuKMBFjBX0&_nc_zt=23&_nc_ht=scontent.flpb2-1.fna&_nc_gid=m5L7DYA8o8sLrVXg47ToWQ&_nc_ss=7b2a8&oh=00_AQRplt_4HkNHA71rn8YGDXfxybEzQ9QTVT7nvrNldAUO4Q&oe=6AF2DC2D" },
  { name: 'Exaltando a Dios', url: "https://scontent.flpb2-1.fna.fbcdn.net/v/t39.30808-6/587333736_1447189047415356_3993443450008348893_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1508&ctp=s2048x1508&_nc_cat=103&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=833d8c&_nc_ohc=JokGBE2_jdoQ7kNvwFHN6su&_nc_oc=AdrJDj7dMIEbrAZM40hHgnW9vXhFTY5WH1BfYYTPZ-KncKFCky47gQXY1G8yyakivYY&_nc_zt=23&_nc_ht=scontent.flpb2-1.fna&_nc_gid=dnEiFGUF1yH8SlAW84vSgg&_nc_ss=7b2a8&oh=00_AQSv72OUaHA5g9BI3cCzY63hxbZgXnXSBg7WGFdP0gHD5g&oe=6AF2BB2F" },
]