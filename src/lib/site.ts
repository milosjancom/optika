/*
  Site navigation and footer, structured after vistaexpert.it.
  In Payload: the `header` global (navItems with mega-menu columns)
  and the `footer` global.
*/
import { brandNames, slugify } from './data'

export type MegaColumn = { title: string; links: { label: string; href: string }[] }
export type NavItem = {
  label: string
  href: string
  columns?: MegaColumn[]
  promo?: { title: string; caption: string; href: string; image: string }
  highlight?: boolean
}

const c = (handle: string, q?: string) => `/kolekcije/${handle}${q ? `?${q}` : ''}`

const genderCol = (h: string): MegaColumn => ({
  title: 'Pol',
  links: [
    { label: 'Muškarci', href: c(h, 'pol=muskarci') },
    { label: 'Žene', href: c(h, 'pol=zene') },
    { label: 'Unisex', href: c(h, 'pol=unisex') },
    { label: 'Deca', href: c(h, 'pol=deca') },
  ],
})

const shapeCol = (h: string): MegaColumn => ({
  title: 'Oblik',
  links: [
    { label: 'Okrugli', href: c(h, 'oblik=okrugli') },
    { label: 'Kvadratni', href: c(h, 'oblik=kvadratni') },
    { label: 'Panto', href: c(h, 'oblik=panto') },
    { label: 'Cat-eye', href: c(h, 'oblik=cat-eye') },
    { label: 'Pilot', href: c(h, 'oblik=pilot') },
  ],
})

const brandCol = (h: string): MegaColumn => ({
  title: 'Brend',
  links: [
    ...brandNames.map((b) => ({ label: b, href: c(h, `brend=${slugify(b)}`) })),
    { label: 'Prikaži sve', href: c(h) },
  ],
})

export const mainNav: NavItem[] = [
  {
    label: 'Sunčane naočare',
    href: c('suncane-naocare'),
    columns: [
      genderCol('suncane-naocare'),
      {
        title: 'Tip',
        links: [
          { label: 'Polarizovane', href: c('suncane-naocare', 'polarizovane=da') },
          { label: 'Sa dioptrijom', href: c('suncane-naocare', 'dioptrija=da') },
          { label: 'Novo', href: c('suncane-naocare', 'sort=najnovije') },
        ],
      },
      shapeCol('suncane-naocare'),
      brandCol('suncane-naocare'),
    ],
    promo: { title: 'Polarizovana stakla', caption: 'Manje odsjaja na vodi i putu', href: c('suncane-naocare', 'polarizovane=da'), image: '/media/editorial-sun.svg' },
  },
  {
    label: 'Naočare',
    href: c('naocare'),
    columns: [
      genderCol('naocare'),
      {
        title: 'Tip',
        links: [
          { label: 'Dioptrijske naočare', href: c('naocare') },
          { label: 'Naočare za čitanje', href: c('naocare', 'tip=citanje') },
          { label: 'Zaštita od plavog svetla', href: c('naocare', 'tip=plavo-svetlo') },
        ],
      },
      shapeCol('naocare'),
      brandCol('naocare'),
    ],
    promo: { title: 'Okvir koji volite. Sa vašom dioptrijom.', caption: 'Besplatan pregled vida uz svaki par', href: '/zakazi-pregled', image: '/media/editorial-1.svg' },
  },
  {
    label: 'Kontaktna sočiva',
    href: c('kontaktna-sociva'),
    columns: [
      {
        title: 'Sočiva',
        links: [
          { label: 'Jednodnevna', href: c('kontaktna-sociva') },
          { label: 'Dvonedeljna', href: c('kontaktna-sociva') },
          { label: 'Mesečna', href: c('kontaktna-sociva') },
          { label: 'Torična', href: c('kontaktna-sociva') },
        ],
      },
      {
        title: 'Nega',
        links: [
          { label: 'Rastvori', href: c('kontaktna-sociva') },
          { label: 'Kapi za oči', href: c('kontaktna-sociva') },
          { label: 'Kutijice', href: c('kontaktna-sociva') },
        ],
      },
    ],
  },
  {
    label: 'Dodaci',
    href: c('dodaci'),
    columns: [
      {
        title: 'Dodaci',
        links: [
          { label: 'Futrole', href: c('dodaci') },
          { label: 'Lančići', href: c('dodaci') },
          { label: 'Krpice i sprejevi', href: c('dodaci') },
          { label: 'Setovi za popravku', href: c('dodaci') },
        ],
      },
    ],
  },
  { label: 'Brendovi', href: '/brendovi' },
  { label: 'Akcija', href: c('akcija'), highlight: true },
]

export const announcements = [
  'Besplatan pregled vida uz svaki par naočara',
  'Besplatna dostava za porudžbine preko 10.000 RSD',
  'Optika u Beogradu od 1987.',
]

export const footerColumns: MegaColumn[] = [
  {
    title: 'Korisnička podrška',
    links: [
      { label: 'Porudžbine, dostava i povraćaj', href: '#' },
      { label: 'Načini plaćanja', href: '#' },
      { label: 'Odustanak od ugovora', href: '#' },
      { label: 'Kontakt', href: '#' },
      { label: 'Česta pitanja', href: '#' },
    ],
  },
  {
    title: 'Korisni linkovi',
    links: [
      { label: 'Zakažite pregled vida', href: '/zakazi-pregled' },
      { label: 'Vodič za dioptrijske naočare', href: '#' },
      { label: 'Kako pročitati recept za naočare', href: '#' },
      { label: 'Vodič za veličine', href: '#' },
      { label: 'Šta su polarizovana stakla', href: '#' },
    ],
  },
  {
    title: 'Dođi i vidi',
    links: [
      { label: 'O nama', href: '#' },
      { label: 'Naša radnja', href: '/zakazi-pregled' },
      { label: 'Opšti uslovi prodaje', href: '#' },
      { label: 'Politika privatnosti', href: '#' },
      { label: 'Kolačići', href: '#' },
    ],
  },
]

/* Collection handles → page config */
export const collections: Record<string, { title: string; intro: string; category?: string; saleOnly?: boolean; brand?: string; empty?: string }> = {
  'suncane-naocare': { title: 'Sunčane naočare', intro: 'Sunčane naočare za muškarce, žene i decu. Mnogi modeli mogu da dobiju i dioptrijska stakla.', category: 'suncane-naocare' },
  naocare: { title: 'Naočare', intro: 'Okviri za dioptrijske naočare. Izaberite okvir, a stakla vam izrađujemo u radnji.', category: 'naocare' },
  akcija: { title: 'Akcija', intro: 'Modeli na sniženju dok traju zalihe.', saleOnly: true },
  'kontaktna-sociva': { title: 'Kontaktna sočiva', intro: '', empty: 'Kontaktna sočiva uskoro i online. Do tada su dostupna u radnji.' },
  dodaci: { title: 'Dodaci', intro: '', empty: 'Dodaci uskoro i online. Do tada su dostupni u radnji.' },
  ...Object.fromEntries(brandNames.map((b) => [slugify(b), { title: b, intro: `Sunčane i dioptrijske naočare ${b}.`, brand: b }])),
}
