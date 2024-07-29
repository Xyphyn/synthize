import type { Client } from '$lib/client'
import { LemmyApiAdapter } from '$lib/client/lemmy'
import { MastodonApiAdapter } from '$lib/client/mastodon'
import { derived, writable, type Readable } from 'svelte/store'

export interface Profile {
  client: Client
  id: number
  instance: string
}

export interface ProfileData {
  profiles: Profile[]
  selected: number[]
}

export let profiles = writable<ProfileData>({
  profiles: [
    {
      instance: 'https://lemm.ee',
      client: new LemmyApiAdapter('https://lemm.ee'),
      id: 4,
    },
    {
      instance: 'https://mastodon.social',
      client: new MastodonApiAdapter('https://mastodon.social'),
      id: 0,
    },
    {
      instance: 'https://mas.to',
      client: new MastodonApiAdapter('https://mas.to'),
      id: 1,
    },
    {
      instance: 'https://mastodon.world',
      client: new MastodonApiAdapter('https://mastodon.world'),
      id: 2,
    },
  ],
  selected: [0, 1, 4],
})

export let selectedProfiles: Readable<Profile[]> = derived(profiles, (data) =>
  data.profiles.filter((p) => data.selected.includes(p.id))
)
