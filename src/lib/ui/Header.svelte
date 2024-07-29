<script lang="ts">
  import type { Snippet } from "svelte"

  let { children, class: className = '', ...props }: { children: Snippet, class?: string, [key: string]: any } = $props()
</script>

<h1 {...props} class="font-bold text-2xl flex items-center {className}">
  {@render children()}
</h1>