<script lang="ts" context="module">
  import { pushState } from '$app/navigation'

  export function showImage(url: string, alt: string = '') {
    pushState('', {
      openImage: url,
    })
  }
</script>

<script lang="ts">
  import { page } from '$app/stores'
  import Button from '$lib/ui/button/Button.svelte'
  import { XMark } from 'svelte-hero-icons'
  import { backOut } from 'svelte/easing'
  import { fade, scale } from 'svelte/transition'
</script>

{#if $page.state.openImage || '' != ''}
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-positive-tabindex -->
  <div
    class="!isolate fixed top-0 left-0 w-screen h-screen overflow-auto bg-black/50
    flex flex-col z-[200] overscroll-contain"
    transition:fade={{ duration: 150 }}
    on:click={() => history.back()}
  >
    <Button
      size="square-md"
      class="fixed z-[110] top-0 right-0 m-4"
      icon={{
        src: XMark,
      }}
    ></Button>
    <img
      width={400}
      height={400}
      src={$page.state.openImage}
      class="w-full object-contain max-w-screen-md mx-auto my-auto overscroll-contain bg-white dark:bg-zinc-900"
      transition:scale={{ start: 0.95, easing: backOut, duration: 250 }}
      alt=""
    />
  </div>
{/if}
