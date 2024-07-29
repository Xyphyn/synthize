<script lang="ts">
  import { page } from '$app/stores'
  import Button from '$lib/ui/button/Button.svelte'
  import type { ComponentProps, Snippet } from 'svelte'

  let { href, children, ...props }: { href: string, children: Snippet } = $props()
</script>

<Button
{...props}
  {href}
  size="custom"
  rounding="xl"
  alignment="left"
  color={$page.url.pathname == href ? 'primary' : 'tertiary'}
  class="text-base px-4 h-11"
>
  {@render children()}
</Button>
