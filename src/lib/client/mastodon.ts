import { createRestAPIClient } from 'masto'
import { Client, type SGetPostFeed, type SPost, type SPostFeed } from '.'
import { webfingerToInstance } from './util'

export class MastodonApiAdapter extends Client {
  protected mastoClient

  constructor(instance: string, auth?: string) {
    super(instance)

    this.mastoClient = createRestAPIClient({
      url: instance,
    })
  }

  async getPostFeed(args: SGetPostFeed): Promise<SPostFeed> {
    const response = await this.mastoClient.v1.trends.statuses.list({
      limit: 20,
    })

    return {
      posts: response.map((status) => this.statusToPost(status)),
      api: 'mastodon',
    }
  }

  statusToPost(
    status: Awaited<
      ReturnType<
        MastodonApiAdapter['mastoClient']['v1']['trends']['statuses']['list']
      >
    >[number]
  ): SPost {
    return {
      content: status.content,
      author: {
        username: status.account.username,
        avatar: status.account.avatar,
        instance: webfingerToInstance(this.instance, status.account.acct),
      },
      published: new Date(status.createdAt),
      media: status.mediaAttachments.map((a) => ({
        url: a.url!,
        alt: a.description as string | undefined,
      })),
      api: 'mastodon',
    }
  }
}
