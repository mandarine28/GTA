import { groq } from 'next-sanity'
import { client } from './client'
import type { Article, Vehicle, Weapon } from '@/types'
import type { CharacterData } from '@/lib/characters'

// ── ARTICLES ──────────────────────────────────────────────────────

const articleFields = groq`
  "id": _id,
  title,
  "slug": slug.current,
  content,
  summary,
  source_url,
  source_name,
  category,
  cover_image,
  "published_at": coalesce(published_at, _createdAt)
`

export async function getArticles(): Promise<Article[]> {
  return client.fetch(
    groq`*[_type == "article"] | order(published_at desc) { ${articleFields} }`,
    {},
    { next: { revalidate: 60 } }
  )
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return client.fetch(
    groq`*[_type == "article" && slug.current == $slug][0] { ${articleFields} }`,
    { slug },
    { next: { revalidate: 60 } }
  )
}

// ── CHARACTERS ────────────────────────────────────────────────────

const characterFields = groq`
  "slug": slug.current,
  name,
  role,
  roleLabel,
  accentColor,
  "coverImage": select(
    defined(coverImage.asset) => coverImage.asset->url,
    slug.current == "jason-duval" => '/images/characters/jason-duval.png',
    slug.current == "lucia-caminos" => '/images/characters/lucia-caminos.png',
    '/images/gameplay1.jpg'
  ),
  gender,
  age,
  origin,
  lead,
  histoire,
  personnalite,
  traits,
  citations,
  "mediaImages": mediaImages[].asset->url,
  order
`

export async function getCharacters(): Promise<CharacterData[]> {
  return client.fetch(
    groq`*[_type == "character"] | order(order asc, name asc) { ${characterFields} }`,
    {},
    { next: { revalidate: 300 } }
  )
}

export async function getCharacterBySlug(slug: string): Promise<CharacterData | null> {
  return client.fetch(
    groq`*[_type == "character" && slug.current == $slug][0] { ${characterFields} }`,
    { slug },
    { next: { revalidate: 300 } }
  )
}

export async function getCharacterSlugs(): Promise<string[]> {
  const results = await client.fetch<{ slug: string }[]>(
    groq`*[_type == "character"] { "slug": slug.current }`,
    {},
    { next: { revalidate: 300 } }
  )
  return results.map(r => r.slug)
}

// ── VEHICLES ──────────────────────────────────────────────────────

const vehicleFields = groq`
  "id": _id,
  "slug": slug.current,
  name,
  category,
  manufacturer,
  price_story,
  price_online,
  top_speed,
  description,
  "image_url": image_url.asset->url,
  stats
`

export async function getVehicles(): Promise<Vehicle[]> {
  return client.fetch(
    groq`*[_type == "vehicle"] | order(name asc) { ${vehicleFields} }`,
    {},
    { next: { revalidate: 300 } }
  )
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  return client.fetch(
    groq`*[_type == "vehicle" && slug.current == $slug][0] { ${vehicleFields} }`,
    { slug },
    { next: { revalidate: 300 } }
  )
}

// ── WEAPONS ───────────────────────────────────────────────────────

const weaponFields = groq`
  "id": _id,
  "slug": slug.current,
  name,
  category,
  price,
  ammo_capacity,
  description,
  "image_url": image_url.asset->url,
  stats
`

export async function getWeapons(): Promise<Weapon[]> {
  return client.fetch(
    groq`*[_type == "weapon"] | order(name asc) { ${weaponFields} }`,
    {},
    { next: { revalidate: 300 } }
  )
}

export async function getWeaponBySlug(slug: string): Promise<Weapon | null> {
  return client.fetch(
    groq`*[_type == "weapon" && slug.current == $slug][0] { ${weaponFields} }`,
    { slug },
    { next: { revalidate: 300 } }
  )
}
