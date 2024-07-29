<script lang="ts">
  import type { SPost } from '$lib/client'
  import Markdown from '$lib/markdown/Markdown.svelte'
  import Material from '$lib/ui/Material.svelte'
  import Date from '$lib/util/Date.svelte'
  import Avatar from '../Avatar.svelte'
  import PostMedia from './PostMedia.svelte'

  let { post }: { post: SPost } = $props()
</script>

<div class="flex flex-col gap-1 rounded-">
  {#if post.author}
    <div class="flex gap-2 items-center">
      <Avatar url={post.author.avatar} width={28} />
      <div>
        <div class="text-xs font-medium flex items-center">
          {post.author.username}
          <span class="text-slate-600 dark:text-zinc-400">
            @{post.author.instance}
          </span>
        </div>
        <div class="text-xs">
          <Date date={post.published} />
        </div>
      </div>
    </div>
  {/if}
  {#if post.title}
    <span class="font-semibold text-lg">{post.title}</span>
  {/if}
  {#if post.content}
    <p class="text-base max-w-xl">
      {#if post.api == 'mastodon'}
        {@html post.content}
      {:else}
        <Markdown source={post.content} />
      {/if}
    </p>
  {/if}
  {#if post.media}
    {#each post.media as media}
      <PostMedia {media} />
    {/each}
  {/if}
</div>
