/*
  Brand tiers for the Brendovi menu and page. In Payload: a `brands`
  collection (name, slug, tier, description, logo upload).
  Logos: drop official files into public/brands/<slug>.svg (or .png);
  until then the name is set in type.
*/
import assets from './assets.json'
import { slugify } from './data'

export type Tier = { id: string; title: string; intro: string; brands: { name: string; text: string }[] }

export const tiers: Tier[] = [
  {
    id: 'luksuz',
    title: 'Vrhunski luksuzni i dizajnerski',
    intro: 'Modne kuće i manji ateljei, za one koji žele da se naočare primete.',
    brands: [
      { name: 'Tom Ford', text: 'Odvažni, elegantni okviri i klasičan detalj u obliku slova „T”.' },
      { name: 'Oliver Peoples', text: 'Retro, sofisticiran stil i vrhunska ručna izrada.' },
      { name: 'Gucci', text: 'Smeo italijanski dizajn i prepoznatljiv brending.' },
      { name: 'Prada', text: 'Savremeni trendovi i čiste, prepoznatljive linije.' },
      { name: 'Jacques Marie Mage', text: 'Ekskluzivni ručno rađeni okviri iz limitiranih serija.' },
    ],
  },
  {
    id: 'inzenjering',
    title: 'Izdržljivost i inženjering',
    intro: 'Laki, fleksibilni okviri bez šrafova koji traju godinama.',
    brands: [
      { name: 'Lindberg', text: 'Ultra-laki titanijum, bez šrafova, skoro neuništiv.' },
      { name: 'ic! berlin', text: 'Tanak čelični lim i šarke bez šrafova.' },
      { name: 'Mykita', text: 'Lagani okviri iz Berlina, velika fleksibilnost.' },
      { name: 'Persol', text: 'Italijanska legenda sa fleksibilnim drškama i vrhunskim staklima.' },
    ],
  },
  {
    id: 'svakodnevni',
    title: 'Svakodnevni i sportski',
    intro: 'Klasici i tehnologija stakala za svaki dan i sport.',
    brands: [
      { name: 'Ray-Ban', text: 'Neprikosnoveni klasici: Aviator, Wayfarer, Clubmaster.' },
      { name: 'Oakley', text: 'Standard za sportske naočare i tehnologiju stakala.' },
      { name: 'Maui Jim', text: 'Polarizovana stakla koja pojačavaju boje i kontrast.' },
    ],
  },
  {
    id: 'kuca',
    title: 'Naša linija',
    intro: 'Okviri koje biramo i potpisujemo sami.',
    brands: [{ name: 'Dođi i vidi', text: 'Naša kuća linija od bio-acetata i titanijuma.' }],
  },
]

export function brandLogo(name: string): string | undefined {
  return (assets.brands as Record<string, string>)[slugify(name)]
}
