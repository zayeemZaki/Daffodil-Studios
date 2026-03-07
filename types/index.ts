// Global TypeScript type definitions for Daffodil Studios

// Filter interfaces for components
export interface FilterData {
  selectedLocations: string[]
  sortByDate: string
}

export interface PressItem {
  id: number
  publication: string
  title: string
  description: string
  url?: string
  image?: string
  type: 'article' | 'podcast'
}
