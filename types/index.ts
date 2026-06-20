export type Category = 'news' | 'patch' | 'weekly_update' | 'easter_egg'

export type VehicleCategory = 'supercar' | 'muscle' | 'motorcycle' | 'truck' | 'suv' | 'van' | 'boat' | 'aircraft'

export type WeaponCategory = 'pistol' | 'smg' | 'rifle' | 'shotgun' | 'sniper' | 'melee' | 'heavy' | 'throwable'

export interface Article {
  id: string
  title: string
  slug: string
  content: string
  summary: string
  source_url?: string
  source_name?: string
  category: Category
  cover_image?: string
  published_at: string
}

export interface WeeklyUpdate {
  id: string
  week_start: string
  summary: string
  vehicles: { name: string; discount?: number; new?: boolean }[]
  events: { name: string; description: string; end_date?: string }[]
  bonuses: { name: string; multiplier: string }[]
  new_content: { name: string; type: string }[]
}

export interface VehicleStats {
  speed: number
  acceleration: number
  handling: number
  braking: number
  traction?: number
}

export interface Vehicle {
  id: string
  name: string
  category: VehicleCategory
  manufacturer: string
  price_story?: number
  price_online?: number
  stats: VehicleStats
  image_url?: string
  description?: string
  top_speed?: string
}

export interface WeaponStats {
  damage: number
  fire_rate: number
  accuracy: number
  range: number
  reload_speed?: number
}

export interface Weapon {
  id: string
  name: string
  category: WeaponCategory
  price?: number
  stats: WeaponStats
  image_url?: string
  description?: string
  ammo_capacity?: number
}
