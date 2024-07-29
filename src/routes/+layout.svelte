<script lang="ts">
  import ExpandableImage from '$lib/components/ExpandableImage.svelte'
import Leftbar from '$lib/ui/layout/Leftbar.svelte'
import '../app.css'

  let { children } = $props()
</script>

<ExpandableImage />

<div class="layout font-nunito">
  <Leftbar class="sticky top-0 h-max" />
<main class="p-6 w-full bg-slate-50 dark:bg-zinc-900 space-y-4">
  {@render children()}
</main>
<div />
</div>
<style>
  .layout {
    display: grid;
    grid-template-columns: 1fr;
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (min-width: 1024px) {
    .layout {
      grid-template-columns: 1fr 2fr 1fr;
    }
  }
</style>