<script lang="ts">
  import { circOut } from 'svelte/easing'
  import { spring, tweened } from 'svelte/motion'

  let { progress }: { progress: number } = $props()

  let lerpProgress = tweened(progress, { easing: circOut, duration: 500 })

  $effect(() => {
    lerpProgress.set(progress)
  })
</script>

<div
  style="height: 2px; width: {$lerpProgress * 100}%;"
  class="bg-primary-900 dark:bg-primary-100 rounded-full"
></div>
