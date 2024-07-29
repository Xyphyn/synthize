import type { SPostFeed } from '$lib/client'
import type { Profile } from '$lib/profile/profile'

export async function getPostFeed(
  profiles: Profile[],
  complete?: (feed: SPostFeed & { profile: number }) => void
) {
  const feeds = await Promise.all(
    profiles.map((p) =>
      p.client.getPostFeed({}).then((feed) => {
        complete?.({
          ...feed,
          profile: p.id,
        })
        return {
          ...feed,
          profile: p.id,
        }
      })
    )
  )

  return feeds.flatMap((feed) =>
    feed.posts.map((p) => ({
      ...p,
      profile: feed.profile,
    }))
  )
}
