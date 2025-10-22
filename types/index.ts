// Global TypeScript type definitions for Daffodil Studios

export interface Movie {
  id: string
  title: string
  description: string
  poster: string
  releaseDate: string
  genre: string[]
  duration: number
}

export interface Screening {
  id: string
  movieId: string
  date: string
  time: string
  location: string
  venue: string
  ticketPrice: number
  availableSeats: number
}

export interface Client {
  id: string
  name: string
  logo: string
  description?: string
}

export interface Service {
  id: number
  title: string
  description: string
  icon?: string
}

// Filter interfaces for components
export interface FilterData {
  selectedLocations: string[]
  sortByDate: string
}