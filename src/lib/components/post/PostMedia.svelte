<script lang="ts">
  import type { SMedia } from '$lib/client/types'
  import Button from '$lib/ui/button/Button.svelte'
  import { showImage } from '../ExpandableImage.svelte'

  let { media }: { media: SMedia } = $props()
</script>

<picture class="w-auto rounded-xl h-full">
  <button
    class="container mx-auto z-10 rounded-xl max-h-[60vh] relative overflow-hidden
    bg-slate-100 dark:bg-zinc-900"
    data-sveltekit-preload-data="off"
    aria-label={media.alt}
    onclick={() => showImage(media.url)}
    tabindex="0"
  >
    <img
      loading="lazy"
      src={media.url}
      class="-z-10 absolute top-0 left-0 w-full h-full object-cover blur-xl opacity-40"
      alt=""
    />
    <picture class="max-h-[inherit]">
      <img
        src={media.url}
        loading="lazy"
        class="max-h-[inherit] max-w-full h-auto z-30
              transition-opacity duration-300 object-contain mx-auto"
        width={512}
        height={300}
        alt={media.alt ?? ''}
      />
    </picture>
  </button>
</picture>
