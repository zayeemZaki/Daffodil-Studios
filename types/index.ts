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

// Press releases are authored as an ordered list of blocks so the markup lives
// in one component instead of being duplicated for every release.
export type PressReleaseBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string; attribution: string }
  | { type: 'heading'; text: string }
  | { type: 'note'; text: string }
  | { type: 'links'; items: { prefix?: string; label: string; url: string }[] }

export interface PressRelease {
  id: number
  title: string
  dateline: string
  blocks: PressReleaseBlock[]
}
