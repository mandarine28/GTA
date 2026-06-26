import { createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'
import path from 'path'

const BASE = 'https://gta.wiki/images/'
const OUT = 'public/images/regions'

const downloads = [
  // Vice City
  { url: 'ViceCity-GTAVI-Montage.jpg', dest: 'vice-city/montage.jpg' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-ViceCity-SS1.jpg', dest: 'vice-city/ss1.jpg' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-ViceCity-SS4.jpg', dest: 'vice-city/ss2.jpg' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-ViceCity-SS7.jpg', dest: 'vice-city/ss3.jpg' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-ViceCity-SS8.jpg', dest: 'vice-city/ss4.jpg' },
  // Leonida Keys
  { url: 'LeonidaKeys-GTAVI-CroppedPostcard.png', dest: 'leonida-keys/postcard.png' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-LeonidaKeys-SS1.jpg', dest: 'leonida-keys/ss1.jpg' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-LeonidaKeys-SS2.jpg', dest: 'leonida-keys/ss2.jpg' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-LeonidaKeys-SS3.jpg', dest: 'leonida-keys/ss3.jpg' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-LeonidaKeys-SS4.jpg', dest: 'leonida-keys/ss4.jpg' },
  // Grassrivers
  { url: 'Grassrivers-GTAVI-CroppedPostcard.png', dest: 'grassrivers/postcard.png' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-Grassrivers-SS1.jpg', dest: 'grassrivers/ss1.jpg' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-Grassrivers-SS2.jpg', dest: 'grassrivers/ss2.jpg' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-Grassrivers-SS3.jpg', dest: 'grassrivers/ss3.jpg' },
  { url: 'Artwork-Grassrivers-BG-GTAVI.jpg', dest: 'grassrivers/artwork.jpg' },
  // Port Gellhorn
  { url: 'PortGellhorn-GTAVI-CroppedPostcard.png', dest: 'port-gellhorn/postcard.png' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-PortGellhorn-SS1.jpg', dest: 'port-gellhorn/ss1.jpg' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-PortGellhorn-SS2.jpg', dest: 'port-gellhorn/ss2.jpg' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-PortGellhorn-SS3.jpg', dest: 'port-gellhorn/ss3.jpg' },
  // Ambrosia
  { url: 'Ambrosia-GTAVI-CroppedPostcard.png', dest: 'ambrosia/postcard.png' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-Ambrosia-SS1.jpg', dest: 'ambrosia/ss1.jpg' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-Ambrosia-SS2.jpg', dest: 'ambrosia/ss2.jpg' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-Ambrosia-SS3.jpg', dest: 'ambrosia/ss3.jpg' },
  // Mont Kalaga
  { url: 'MountKalaga-GTAVI-CroppedPostcard.png', dest: 'mont-kalaga/postcard.png' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-MountKalaga-SS1.jpg', dest: 'mont-kalaga/ss1.jpg' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-MountKalaga-SS2.jpg', dest: 'mont-kalaga/ss2.jpg' },
  { url: 'OfficialScreenshots-GTAVI-PromotionalWebsite-MountKalaga-SS3.jpg', dest: 'mont-kalaga/ss3.jpg' },
  { url: 'Artwork-MountKalaga-BG-GTAVI.jpg', dest: 'mont-kalaga/artwork.jpg' },
]

async function download(url, dest) {
  const res = await fetch(BASE + url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  })
  if (!res.ok) { console.warn(`SKIP ${url} → ${res.status}`); return false }
  const out = createWriteStream(path.join(OUT, dest))
  await pipeline(res.body, out)
  return true
}

let ok = 0, skip = 0
for (const d of downloads) {
  process.stdout.write(`  ${d.dest} ... `)
  const success = await download(d.url, d.dest)
  if (success) { console.log('✓'); ok++ } else { skip++ }
}
console.log(`\nDone: ${ok} downloaded, ${skip} skipped`)
