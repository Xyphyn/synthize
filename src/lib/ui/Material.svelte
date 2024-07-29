<script lang="ts">
  import type { Snippet } from "svelte"

  const materialColor = {
    default: 'bg-white dark:bg-zinc-800',
    transparent: '',
  }

  let { color = 'default', class: className = '', children, ...props }: {
    color?: keyof typeof materialColor,
    class?: string,
    children: Snippet
  } = $props()
</script>

<div {...props} class="{materialColor[color]} rounded-lg p-4 {className}">
  {@render children()}
</div>
