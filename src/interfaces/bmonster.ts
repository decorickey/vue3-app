export interface Performer {
  id: number
  name: string
}

export interface Schedule {
  studio: string
  startAt: string
  performer: string
  program: string
  url: string
}
