# NepCoin – React + TypeScript + Vite (MV3) Full Source Code

Below is the **complete, production-ready Chrome extension** source for **NepCoin** (live crypto prices in Nepali with NPR), built with **React + TypeScript + Vite + Tailwind**. Copy these files into a fresh folder and run the commands shown at the bottom.

---

## 📁 Project Structure

```
nepcoin-react-vite/
├─ manifest.json
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ tsconfig.json
├─ vite.config.ts
├─ popup.html
├─ options.html
├─ public/
│  └─ assets/
│     └─ icons/
│        ├─ icon16.png
│        ├─ icon32.png
│        ├─ icon48.png
│        └─ icon128.png
├─ scripts/
│  ├─ prepare-dist.cjs
│  └─ zip-dist.cjs
└─ src/
   ├─ background.ts
   ├─ utils.ts
   ├─ styles/
   │  └─ index.css
   ├─ popup/
   │  ├─ main.tsx
   │  └─ ui/
   │     └─ App.tsx
   └─ options/
      ├─ main.tsx
      └─ ui/
         └─ Options.tsx
```

> Note: Replace the **placeholder icons** with your real icons (same filenames/sizes).

---

## 🔧 Root Config Files

### `package.json`

```json
{
  "name": "nepcoin-extension",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "postbuild": "node scripts/prepare-dist.cjs",
    "zip": "node scripts/zip-dist.cjs"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/chrome": "^0.0.268",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.3.1",
    "archiver": "^6.0.2",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.41",
    "tailwindcss": "^3.4.10",
    "typescript": "^5.5.0",
    "vite": "^5.4.0"
  }
}
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["chrome"]
  },
  "include": ["src"]
}
```

### `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: 'popup.html',
        options: 'options.html',
        background: 'src/background.ts',
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === 'background') return '[name].js' // keep at dist root
          return 'assets/[name].js'
        },
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]'
      }
    }
  }
})
```

### `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./popup.html', './options.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: []
}
```

### `postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 🧩 Chrome Extension Files

### `manifest.json`

```json
{
  "manifest_version": 3,
  "name": "NepCoin – Nepali Crypto Prices",
  "version": "1.0.0",
  "description": "Live crypto prices in Nepali (नेपाली) and NPR with a sleek React UI.",
  "action": { "default_title": "NepCoin", "default_popup": "popup.html" },
  "icons": {
    "16": "assets/icons/icon16.png",
    "32": "assets/icons/icon32.png",
    "48": "assets/icons/icon48.png",
    "128": "assets/icons/icon128.png"
  },
  "permissions": ["storage", "alarms"],
  "host_permissions": ["https://api.coingecko.com/*"],
  "background": { "service_worker": "background.js", "type": "module" },
  "options_page": "options.html"
}
```

### `popup.html`

```html
<!doctype html>
<html lang="ne">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>NepCoin</title>
    <link rel="stylesheet" href="/src/styles/index.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/popup/main.tsx"></script>
  </body>
</html>
```

### `options.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>NepCoin Options</title>
    <link rel="stylesheet" href="/src/styles/index.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/options/main.tsx"></script>
  </body>
</html>
```

---

## 🧠 Shared Utils & Styles

### `src/utils.ts`

```ts
export const nepaliDigits = ['०','१','२','३','४','५','६','७','८','९']

export function toNepaliNumerals(input: string | number): string {
  return String(input).replace(/\d/g, d => nepaliDigits[Number(d)])
}

export function formatNPR(amount?: number): string {
  if (!amount && amount !== 0) return '—'
  try {
    const formatted = new Intl.NumberFormat('ne-NP', { style: 'currency', currency: 'NPR', maximumFractionDigits: 0 }).format(amount)
    return toNepaliNumerals(formatted)
  } catch {
    return 'रु ' + toNepaliNumerals(Math.round(amount).toString())
  }
}

export const DEFAULT_COINS = ['bitcoin','ethereum','solana'] as const
export type CoinId = typeof DEFAULT_COINS[number] | string

export const COIN_META: Record<string, { name: string; symbol: string }> = {
  bitcoin:  { name: 'Bitcoin',  symbol: 'BTC' },
  ethereum: { name: 'Ethereum', symbol: 'ETH' },
  solana:   { name: 'Solana',   symbol: 'SOL' },
  ripple:   { name: 'Ripple',   symbol: 'XRP' },
  cardano:  { name: 'Cardano',  symbol: 'ADA' },
  dogecoin: { name: 'Dogecoin', symbol: 'DOGE' },
}
```

### `src/styles/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { color-scheme: dark; }
body { @apply bg-slate-900 text-slate-100; }
.card { @apply bg-slate-800/80 rounded-2xl p-4 shadow; }
.btn  { @apply bg-amber-400 text-slate-900 font-semibold px-3 py-1.5 rounded-lg; }
.muted{ @apply text-slate-400 text-sm; }
```

---

## 🛡️ Background Service Worker

### `src/background.ts`

```ts
const COINS_KEY = 'selectedCoins'
const DATA_KEY = 'marketData'
const UPDATED_AT_KEY = 'updatedAt'
const DEFAULT_COINS = ['bitcoin','ethereum','solana']

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get([COINS_KEY], res => {
    if (!res[COINS_KEY]) chrome.storage.local.set({ [COINS_KEY]: DEFAULT_COINS })
  })
  chrome.alarms.create('fetchPrices', { periodInMinutes: 1 })
  fetchAndStore().catch(console.error)
})

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'fetchPrices') fetchAndStore().catch(console.error)
})

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.type === 'FETCH_NOW') {
    fetchAndStore()
      .then(() => sendResponse({ ok: true }))
      .catch(e => sendResponse({ ok: false, error: String(e) }))
    return true
  }
  return false
})

async function fetchAndStore() {
  const { [COINS_KEY]: coins = DEFAULT_COINS } = await chrome.storage.local.get([COINS_KEY])
  if (!Array.isArray(coins) || coins.length === 0) return
  const ids = coins.join(',')
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(ids)}&vs_currencies=npr`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch prices: ' + res.status)
  const json = await res.json()
  const updatedAt = Date.now()
  await chrome.storage.local.set({ [DATA_KEY]: json, [UPDATED_AT_KEY]: updatedAt })
}
```

---

## 🧩 Popup (React UI)

### `src/popup/main.tsx`

```ts
import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './ui/App'

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
```

### `src/popup/ui/App.tsx`

```tsx
import React, { useEffect, useState } from 'react'
import { COIN_META, formatNPR, toNepaliNumerals } from '../../utils'

type MarketData = Record<string, { npr: number }>

export const App: React.FC = () => {
  const [data, setData] = useState<MarketData>({})
  const [coins, setCoins] = useState<string[]>([])
  const [updatedAt, setUpdatedAt] = useState<number | null>(null)

  useEffect(() => {
    chrome.storage.local.get(['marketData','selectedCoins','updatedAt'], (res) => {
      setData(res.marketData || {})
      setCoins(res.selectedCoins || [])
      setUpdatedAt(res.updatedAt || null)
    })
    const listener = (changes: any, area: string) => {
      if (area !== 'local') return
      if (changes.marketData || changes.selectedCoins) {
        setData(changes.marketData?.newValue ?? {})
        if (changes.selectedCoins) setCoins(changes.selectedCoins.newValue || [])
      }
      if (changes.updatedAt) setUpdatedAt(changes.updatedAt.newValue)
    }
    chrome.storage.onChanged.addListener(listener)
    return () => chrome.storage.onChanged.removeListener(listener)
  }, [])

  const refresh = () => chrome.runtime.sendMessage({ type: 'FETCH_NOW' })

  const rel = (() => {
    if (!updatedAt) return '—'
    const diff = Math.floor((Date.now() - updatedAt) / 1000)
    if (diff < 60) return `${toNepaliNumerals(diff)} सेकेन्ड पहिले`
    if (diff < 3600) return `${toNepaliNumerals(Math.floor(diff/60))} मिनेट पहिले`
    return `${toNepaliNumerals(Math.floor(diff/3600))} घण्टा पहिले`
  })()

  const list = (coins.length ? coins : Object.keys(data))

  return (
    <div className="w-[360px] p-4 space-y-3">
      <div className="flex items-center gap-3">
        <img src="/assets/icons/icon48.png" className="w-10 h-10" />
        <div>
          <h1 className="text-lg font-bold">NepCoin</h1>
          <p className="muted">क्रिप्टो मूल्य नेपालीमा</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button className="btn" onClick={refresh}>↻ Refresh</button>
        <a className="underline" href="options.html" target="_blank">Options</a>
      </div>

      <div className="card divide-y divide-white/10">
        {list.map((id) => {
          const meta = COIN_META[id] || { name: id, symbol: id.slice(0,3).toUpperCase() }
          const npr = (data as any)?.[id]?.npr
          return (
            <div key={id} className="flex items-center justify-between py-2">
              <div className="font-semibold">
                {meta.name} <span className="text-slate-400 text-xs">• {meta.symbol}</span>
              </div>
              <div className="font-bold tabular-nums">{formatNPR(npr)}</div>
            </div>
          )
        })}
      </div>

      <div className="text-right muted">अपडेट: {rel}</div>
    </div>
  )
}
```

---

## ⚙️ Options (React UI)

### `src/options/main.tsx`

```ts
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Options } from './ui/Options'

const root = createRoot(document.getElementById('root')!)
root.render(<Options />)
```

### `src/options/ui/Options.tsx`

```tsx
import React, { useEffect, useState } from 'react'

const ALL = [
  ['bitcoin','Bitcoin (BTC)'],
  ['ethereum','Ethereum (ETH)'],
  ['solana','Solana (SOL)'],
  ['ripple','Ripple (XRP)'],
  ['cardano','Cardano (ADA)'],
  ['dogecoin','Dogecoin (DOGE)'],
] as const

export const Options: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([])
  const toggle = (id: string) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])

  useEffect(() => {
    chrome.storage.local.get(['selectedCoins'], res => {
      setSelected(res.selectedCoins || ['bitcoin','ethereum','solana'])
    })
  }, [])

  const save = () => {
    const val = selected.length ? selected : ['bitcoin','ethereum','solana']
    chrome.storage.local.set({ selectedCoins: val }, () => {
      const status = document.getElementById('status')
      if (status) {
        (status as HTMLElement).textContent = 'Saved ✔'
        setTimeout(() => { (status as HTMLElement).textContent = '' }, 1200)
      }
      chrome.runtime.sendMessage({ type: 'FETCH_NOW' })
    })
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">NepCoin Options</h1>
      <div className="card grid grid-cols-2 gap-2">
        {ALL.map(([id, label]) => (
          <label key={id} className="flex gap-2 items-center">
            <input type="checkbox" checked={selected.includes(id)} onChange={() => toggle(id)} />
            {label}
          </label>
        ))}
      </div>
      <button className="btn" onClick={save}>Save</button>
      <div id="status" className="muted" />
    </div>
  )
}
```

---

## 🧰 Build Scripts

### `scripts/prepare-dist.cjs`

```js
const fs = require('fs')
const path = require('path')

const dist = path.resolve(__dirname, '../dist')
const manifestSrc = path.resolve(__dirname, '../manifest.json')
const publicDir = path.resolve(__dirname, '../public')

// Ensure manifest exists in dist
fs.copyFileSync(manifestSrc, path.join(dist, 'manifest.json'))

// Copy public/** into dist (icons etc.)
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name)
    const d = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(s, d)
    else fs.copyFileSync(s, d)
  }
}
copyDir(publicDir, path.join(dist))
console.log('Prepared dist with manifest and public assets.')
```

### `scripts/zip-dist.cjs`

```js
const fs = require('fs')
const path = require('path')
const archiver = require('archiver')

const dist = path.resolve(__dirname, '../dist')
const out = fs.createWriteStream(path.resolve(__dirname, '../nepcoin-dist.zip'))
const archive = archiver('zip', { zlib: { level: 9 } })

archive.pipe(out)
archive.directory(dist, false)
archive.finalize()
```

---

## 🖼️ Icons (placeholders)

Create files at these paths (replace with your real PNGs):

* `public/assets/icons/icon16.png`
* `public/assets/icons/icon32.png`
* `public/assets/icons/icon48.png`
* `public/assets/icons/icon128.png`

> Any square PNGs work; recommended sizes are standard Chrome extension icon sizes.

---

## 🏃 Run & Build

```bash
# 1) Install deps
pnpm i  # or: npm i / yarn

# 2) Dev (popup/options HTML hot-reload)
pnpm dev

# 3) Production build + prepare dist
pnpm build && pnpm postbuild

# 4) Load in Chrome
# Open chrome://extensions → Enable Developer mode → Load unpacked → select ./dist

# 5) Optional: Create a zip for Web Store upload
pnpm zip
```

---

## ✅ Production Notes

* **MV3-compliant** background service worker using `chrome.alarms` and `chrome.storage`.
* **Network**: CoinGecko Simple Price API in NPR; add rate limiting/backoff if you scale.
* **UI**: Tailwind-based, dark theme, Nepali numerals and relative times.
* **Extensibility**: Add % change, market cap, or badge text via `chrome.action.setBadgeText`.

Need me to add **toolbar badge price**, **price alerts (notifications)**, or a **CI workflow** (GitHub Actions) to auto-build and attach a ZIP on every release? Say the word, I’ll extend this code. 🙌
