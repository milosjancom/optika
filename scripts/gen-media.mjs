// Generates placeholder product imagery (SVG) for the design preview.
// In production these come from Payload's Media collection.
import { mkdirSync, writeFileSync } from 'node:fs'

const OUT = new URL('../public/media/', import.meta.url)
mkdirSync(OUT, { recursive: true })

const TILE = '#ecebe7'
const TEE_TILE = '#efefed'
const TILE2 = '#e3e1db'

const FRAME = {
  black: { fill: '#1a1a1a', hi: '#3a3a3a' },
  tortoise: { fill: 'url(#tort)', hi: '#8a5a2b' },
  crystal: { fill: 'rgba(255,255,255,0.35)', hi: '#ffffff', stroke: '#b9b6ae' },
  honey: { fill: '#a8733a', hi: '#c99459' },
  olive: { fill: '#4b5240', hi: '#6a725c' },
  silver: { fill: '#a9aaa6', hi: '#d8d9d5' },
}

const defs = `
<defs>
  <pattern id="tort" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
    <rect width="60" height="60" fill="#5a3418"/>
    <ellipse cx="14" cy="18" rx="12" ry="7" fill="#8f5a26" opacity=".9"/>
    <ellipse cx="44" cy="40" rx="10" ry="6" fill="#2b170a" opacity=".85"/>
    <ellipse cx="38" cy="12" rx="6" ry="4" fill="#b07a3a" opacity=".7"/>
    <ellipse cx="10" cy="48" rx="7" ry="4" fill="#3a200d" opacity=".8"/>
  </pattern>
  <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#2a2a28" stop-opacity=".92"/>
    <stop offset="1" stop-color="#5a5650" stop-opacity=".8"/>
  </linearGradient>
  <linearGradient id="clear" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity=".55"/>
    <stop offset=".5" stop-color="#fff" stop-opacity=".08"/>
    <stop offset="1" stop-color="#fff" stop-opacity=".3"/>
  </linearGradient>
  <radialGradient id="light" cx=".35" cy=".25" r=".9">
    <stop offset="0" stop-color="#fff" stop-opacity=".55"/>
    <stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </radialGradient>
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="14"/></filter>
  <linearGradient id="fold" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#000" stop-opacity=".10"/>
    <stop offset=".18" stop-color="#000" stop-opacity="0"/>
    <stop offset=".82" stop-color="#000" stop-opacity="0"/>
    <stop offset="1" stop-color="#000" stop-opacity=".10"/>
  </linearGradient>
  <linearGradient id="drape" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity=".10"/>
    <stop offset="1" stop-color="#000" stop-opacity=".08"/>
  </linearGradient>
</defs>`

// Lens outlines centred on (0,0), roughly 230 wide
const LENS = {
  round: `<circle r="112"/>`,
  square: `<rect x="-125" y="-95" width="250" height="190" rx="34"/>`,
  panto: `<path d="M-120 -70 C-120 -105 -80 -108 0 -108 C80 -108 122 -100 122 -60 C122 30 80 102 0 102 C-80 102 -120 30 -120 -70Z"/>`,
  cateye: `<path d="M-128 -60 C-120 -100 -40 -96 30 -98 C90 -100 132 -118 136 -84 C140 -10 92 92 -2 92 C-90 92 -134 10 -128 -60Z"/>`,
  aviator: `<path d="M-122 -88 C-60 -102 60 -102 120 -92 C130 40 70 112 0 112 C-70 112 -126 40 -122 -88Z"/>`,
}

function glasses({ shape, color, sun = false, bg = TILE, view = 'front' }) {
  const f = FRAME[color]
  const lens = LENS[shape]
  const thick = color === 'silver' ? 9 : 22
  const stroke = f.stroke ? `stroke="${f.stroke}" stroke-width="2"` : ''
  const lensFill = sun ? 'url(#sun)' : 'url(#clear)'
  const one = (x, flip) => `
    <g transform="translate(${x} 0) ${flip ? 'scale(-1 1)' : ''}">
      <g fill="none" stroke="${f.fill === 'rgba(255,255,255,0.35)' ? '#cfccc4' : f.fill}" stroke-width="${thick}" stroke-linejoin="round">${lens}</g>
      ${f.stroke ? `<g fill="none" stroke="${f.stroke}" stroke-width="1.5" transform="scale(1.09)">${lens}</g><g fill="none" stroke="${f.stroke}" stroke-width="1.5" transform="scale(.91)">${lens}</g>` : ''}
      <g fill="${lensFill}" transform="scale(.94)">${lens}</g>
      <g fill="none" stroke="${f.hi}" stroke-width="3" opacity=".55" transform="scale(1.02) translate(-4 -4)">${lens}</g>
    </g>`
  const frame = `
    <g ${stroke}>
      ${one(-150, true)}
      ${one(150, false)}
      <path d="M-30 -48 Q0 -70 30 -48" fill="none" stroke="${f.fill === 'rgba(255,255,255,0.35)' ? '#cfccc4' : f.fill}" stroke-width="${thick * 0.75}" stroke-linecap="round"/>
      <path d="M-282 -50 L-310 -58" stroke="${f.fill === 'rgba(255,255,255,0.35)' ? '#cfccc4' : f.fill}" stroke-width="${thick}" stroke-linecap="round"/>
      <path d="M282 -50 L310 -58" stroke="${f.fill === 'rgba(255,255,255,0.35)' ? '#cfccc4' : f.fill}" stroke-width="${thick}" stroke-linecap="round"/>
    </g>`
  const vb = view === 'detail' ? '120 330 560 460' : '0 0 800 1000'
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="800" height="1000" preserveAspectRatio="xMidYMid slice">${defs}
  <rect x="0" y="0" width="800" height="1000" fill="${bg}"/>
  <rect x="0" y="0" width="800" height="1000" fill="url(#light)"/>
  <ellipse cx="400" cy="640" rx="290" ry="26" fill="#000" opacity=".14" filter="url(#soft)"/>
  <g transform="translate(400 540) scale(1.02)">${frame}</g>
</svg>`
}

const SHIRT = {
  white: { fill: '#f6f4ef', rib: '#e7e4dc' },
  black: { fill: '#1d1d1d', rib: '#2c2c2c' },
  grey: { fill: '#a3a29e', rib: '#93928e' },
  navy: { fill: '#1f2a43', rib: '#2a3653' },
  ecru: { fill: '#e6ddc8', rib: '#d8ceb6' },
  olive: { fill: '#5a5f48', rib: '#4d523d' },
}

function tshirt({ color, bg = TEE_TILE, view = 'front', print = false }) {
  const c = SHIRT[color]
  const body = `M-120 -300 C-80 -282 -40 -276 0 -276 C40 -276 80 -282 120 -300 L250 -250 L318 -96 L232 -60 L210 -112 L214 310 C120 326 -120 326 -214 310 L-210 -112 L-232 -60 L-318 -96 L-250 -250 Z`
  const neck = `M-92 -292 C-60 -232 60 -232 92 -292`
  const vb = view === 'detail' ? '220 140 360 300' : '0 0 800 1000'
  const printMark = print
    ? `<g transform="translate(0 -120)" fill="none" stroke="${color === 'black' || color === 'navy' ? '#e8e4da' : '#1d1d1d'}" stroke-width="3">
         <circle r="34"/><path d="M-34 0 H34 M0 -34 V34" stroke-width="1.5"/>
         <text y="70" text-anchor="middle" font-family="Helvetica, Arial" font-size="14" letter-spacing="4" fill="${color === 'black' || color === 'navy' ? '#e8e4da' : '#1d1d1d'}" stroke="none">No. 01</text>
       </g>`
    : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="800" height="1000" preserveAspectRatio="xMidYMid slice">${defs}
  <rect x="0" y="0" width="800" height="1000" fill="${bg}"/>
  <rect x="0" y="0" width="800" height="1000" fill="url(#light)"/>
  <g transform="translate(400 500)">
    <path d="${body}" fill="#000" opacity=".12" filter="url(#soft)" transform="translate(6 14)"/>
    <path d="${body}" fill="${c.fill}" stroke="${color === 'white' || color === 'ecru' ? '#d6d2c8' : 'none'}" stroke-width="1.5"/>
    <path d="${body}" fill="url(#fold)"/>
    <path d="${body}" fill="url(#drape)"/>
    <path d="M-210 -112 C-200 -40 -206 120 -214 310" stroke="#000" stroke-opacity=".06" stroke-width="10" fill="none"/>
    <path d="M210 -112 C200 -40 206 120 214 310" stroke="#000" stroke-opacity=".06" stroke-width="10" fill="none"/>
    <path d="${neck}" fill="none" stroke="${c.rib}" stroke-width="18" stroke-linecap="round"/>
    <path d="M-100 -296 C-64 -222 64 -222 100 -296" fill="none" stroke="#000" stroke-opacity=".08" stroke-width="2"/>
    <path d="M-232 -60 L-318 -96" stroke="${c.rib}" stroke-width="8"/>
    <path d="M232 -60 L318 -96" stroke="${c.rib}" stroke-width="8"/>
    ${printMark}
  </g>
</svg>`
}

const write = (name, svg) => writeFileSync(new URL(name, OUT), svg)

// Eyewear: every shape in every frame colour
const SHAPES = ['round', 'square', 'panto', 'cateye', 'aviator']
for (const shape of SHAPES) {
  for (const color of Object.keys(FRAME)) {
    write(`eye-${shape}-${color}-1.svg`, glasses({ shape, color }))
    write(`eye-${shape}-${color}-2.svg`, glasses({ shape, color, bg: TILE2, view: 'detail' }))
    write(`eye-${shape}-${color}-sun.svg`, glasses({ shape, color, sun: true, bg: '#e9e4da' }))
  }
}

// Editorial / hero
write('hero-eyewear.svg', glasses({ shape: 'panto', color: 'tortoise', sun: true, bg: '#dcd6ca' }))
write('hero-optical.svg', glasses({ shape: 'round', color: 'crystal', bg: '#e6e8e6' }))
write('editorial-1.svg', glasses({ shape: 'round', color: 'crystal', bg: '#cfd2c9' }))
write('editorial-sun.svg', glasses({ shape: 'aviator', color: 'silver', sun: true, bg: '#d8d3c8' }))

console.log('media written')
