export interface Province {
  id: number
  name: string
}

export interface Regency {
  id: number
  province_id: number
  name: string
}

export interface District {
  id: number
  regency_id: number
  name: string
}

export interface RegionsData {
  provinces: Province[]
  regencies: Regency[]
  districts: District[]
}

export interface Filters {
  province: number | null
  regency: number | null
  district: number | null
}

export interface LoaderData {
  provinces: Province[]
  regencies: Regency[]
  districts: District[]
  filters: Filters
}

export interface BreadcrumbItem {
  label: string
  active: boolean
}
