export interface SGetPostFeed {}

export interface SPostFeed {
  posts: SPost[]
  api: API
}

export interface SAuthor {
  username: string
  avatar?: string
  instance: string
}

interface SSubmission {
  published: Date
  api: API
}

export type SPost = {
  title?: string
  content: string
  author: SAuthor
  api: API
  published: Date
  media: SMedia[]
} & SSubmission

export type SMedia = {
  url: string
  alt?: string
}

export type API = 'lemmy' | 'mastodon'
