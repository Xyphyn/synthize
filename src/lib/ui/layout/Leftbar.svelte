<script lang="ts">
  import { Home, UserGroup } from 'svelte-hero-icons'
  import Button from '../button/Button.svelte'
  import SidebarButton from './SidebarButton.svelte'
  import Selection from '$lib/profile/ProfileSelection.svelte'
  import { profiles } from '$lib/profile/profile'

  let { class: className = '' }: { class?: string } = $props()
</script>

<nav class="flex flex-col text-base p-6 gap-2 {className}">
  <div class="mx-auto h-48 grid place-items-center">
    <Selection profiles={$profiles} />
  </div>
  <SidebarButton
    icon={{
      src: Home,
      mini: true,
      size: 24,
    }}
    href="/"
  >
    Home
  </SidebarButton>
  <SidebarButton
    icon={{
      src: UserGroup,
      mini: true,
      size: 24,
    }}
    href="/profiles"
  >
    Profiles
  </SidebarButton>
</nav>
