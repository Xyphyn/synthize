<script lang="ts">
  import { LemmyApiAdapter } from '$lib/client/lemmy'
  import type { ProfileData } from './profile'

  let { profiles }: { profiles: ProfileData } = $props()
</script>

<div class="flex flex-row">
  {#each profiles.profiles as profile}
    <img
      src={profile.client instanceof LemmyApiAdapter
        ? '/img/lemmy.svg'
        : '/img/mastodon.svg'}
      width="40"
      height="40"
      alt=""
      class="bg-slate-50 dark:bg-zinc-900 rounded-full ring-[4px]
      {profiles.selected.includes(profile.id)
        ? 'ring-primary-900 dark:ring-primary-100'
        : 'ring-slate-50 dark:ring-zinc-900'}"
    />
  {/each}
</div>
