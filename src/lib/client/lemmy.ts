import { Client, type SGetPostFeed, type SPost, type SPostFeed } from '.'
import { webfingerToInstance } from './util'
import { LemmyHttp, type PostView } from 'lemmy-js-client'

export class LemmyApiAdapter extends Client {
  protected lemmyClient

  constructor(instance: string, auth?: string) {
    super(instance)

    this.lemmyClient = new LemmyHttp(instance)
  }

  async getPostFeed(args: SGetPostFeed): Promise<SPostFeed> {
    const response = await this.lemmyClient.getPosts({
      limit: 20,
    })

    return {
      posts: response.posts.map((post) => this.postToSPost(post)),
      api: 'mastodon',
    }
  }

  isImage(url: string | undefined) {
    try {
      if (!url) return false

      return /\.(jpeg|jpg|gif|png|svg|bmp|webp)$/i.test(new URL(url).pathname)
    } catch (err) {
      return false
    }
  }

  isVideo(url: string | undefined) {
    try {
      if (!url) return false

      return /\.(mp4|mov|webm|mkv)$/i.test(new URL(url).pathname)
    } catch (err) {
      return false
    }
  }

  mediaType(url?: string): 'image' | 'iframe' | 'embed' | 'none' {
    if (url) {
      if (this.isImage(url)) return 'image'
      if (this.isVideo(url)) return 'iframe'
      return 'embed'
    }

    return 'none'
  }

  postToSPost(post: PostView): SPost {
    return {
      content: post.post.body ?? '',
      title: post.post.name,
      author: {
        username: post.creator.name,
        avatar: post.creator.avatar,
        instance: new URL(post.creator.actor_id).hostname,
      },
      media:
        this.mediaType(post.post.url) == 'image'
          ? [
              {
                url: post.post.url!,
                alt: post.post.alt_text,
              },
            ]
          : [],
      published: new Date(post.post.published),
      api: 'lemmy',
    }
  }
}
