import type { SGetPostFeed, SPostFeed, SPost } from './types'

abstract class Client {
  protected instance: string

  constructor(instance: string) {
    this.instance = instance
  }

  abstract getPostFeed(args: SGetPostFeed): Promise<SPostFeed>
}

export type { SPost, SPostFeed, SGetPostFeed }
export { Client }
