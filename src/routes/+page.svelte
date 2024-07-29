<script lang="ts">
  import Post from '$lib/components/post/Post.svelte'
  import { getPostFeed } from '$lib/feed/postfeed'
  import { profiles } from '$lib/profile/profile'
  import Progress from '$lib/ui/Progress.svelte'
  import { fly, slide } from 'svelte/transition'
  import { expoOut } from 'svelte/easing'
  import Header from '$lib/ui/Header.svelte'
  import Spinner from '$lib/ui/Spinner.svelte'

  let progress = $state(0)
  let posts = getPostFeed($profiles.profiles, () => {
    progress += 1 / $profiles.profiles.length
  })
</script>

<div class="h-8 grid w-full">
  {#if progress != 1}
    <div
      in:fly={{ y: -8, opacity: 0, delay: 200 }}
      out:fly={{ y: -8, opacity: 0, delay: 0 }}
      class="space-y-2 w-full"
      style="grid-row: 1; grid-column: 1;"
    >
      <div class="font-bold text-lg flex justify-between items-center">
        Updating <Spinner width={24} />
      </div>
      <div class="w-full h-4">
        <Progress {progress} />
      </div>
    </div>
  {:else}
    <div
      style="grid-row: 1; grid-column: 1;"
      in:fly={{ y: 8, opacity: 0, delay: 200 }}
      out:fly={{ y: 8, opacity: 0, delay: 0 }}
    >
      <Header>Frontpage</Header>
    </div>
  {/if}
</div>

{#await posts then posts}
  <div class="flex flex-col gap-4">
    {#each posts as post}
      <div class="px-0">
        <Post {post} />
      </div>
    {/each}
  </div>
{:catch err}
  <p>{err}</p>
{/await}
