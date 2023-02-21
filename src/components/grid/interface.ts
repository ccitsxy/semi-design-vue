export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'

export type Gutter = number | Partial<Record<Breakpoint, number>>

export type ColSize = {
  span?: number
  order?: number
  offset?: number
  push?: number
  pull?: number
}
