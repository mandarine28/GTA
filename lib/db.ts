import { supabase } from './supabase'
import type { Article, Vehicle, Weapon } from '@/types'

// ── ARTICLES ──────────────────────────────────────────────────────

export async function getArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false })

  if (error || !data) return []
  return data as Article[]
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data as Article
}

// ── VEHICLES ──────────────────────────────────────────────────────

function mapVehicle(row: Record<string, unknown>): Vehicle {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    category: row.category as Vehicle['category'],
    manufacturer: row.manufacturer as string,
    price_online: row.price_online as number | undefined,
    top_speed: row.top_speed as string | undefined,
    description: row.description as string | undefined,
    stats: {
      speed: row.stat_speed as number,
      acceleration: row.stat_acceleration as number,
      handling: row.stat_handling as number,
      braking: row.stat_braking as number,
    },
  }
}

export async function getVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('name')

  if (error || !data) return []
  return data.map(mapVehicle)
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return mapVehicle(data)
}

// ── WEAPONS ───────────────────────────────────────────────────────

function mapWeapon(row: Record<string, unknown>): Weapon {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as Weapon['category'],
    price: row.price as number | undefined,
    ammo_capacity: row.ammo_capacity as number | undefined,
    description: row.description as string | undefined,
    stats: {
      damage: row.stat_damage as number,
      fire_rate: row.stat_fire_rate as number,
      accuracy: row.stat_accuracy as number,
      range: row.stat_range as number,
      reload_speed: row.stat_reload_speed as number,
    },
  }
}

export async function getWeapons(): Promise<Weapon[]> {
  const { data, error } = await supabase
    .from('weapons')
    .select('*')
    .order('name')

  if (error || !data) return []
  return data.map(mapWeapon)
}
