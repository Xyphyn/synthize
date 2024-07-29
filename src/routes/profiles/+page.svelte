<script lang="ts">
  import { LemmyApiAdapter } from '$lib/client/lemmy'
  import { MastodonApiAdapter } from '$lib/client/mastodon'
  import { profiles } from '$lib/profile/profile'
  import Header from '$lib/ui/Header.svelte'
  import Material from '$lib/ui/Material.svelte'
</script>

<Header>Profiles</Header>
<div
  class="grid grid-cols-1 sm:grid-cols-2
md:grid-cols-3 lg:grid-cols-4 gap-4"
>
  {#each $profiles.profiles as profile}
    <Material class="flex flex-col" color="default">
      <img
        alt="Profile client"
        src={profile.client instanceof LemmyApiAdapter
          ? '/img/lemmy.svg'
          : '/img/mastodon.svg'}
        width="48"
        height="48"
        class="p-2 rounded-full bg-blue-50 h-12 w-12
        self-center"
      />
    </Material>
  {/each}
</div>
