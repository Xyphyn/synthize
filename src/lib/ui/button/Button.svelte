<script context="module" lang="ts">
  export type ButtonColor = keyof typeof buttonColor
  export type ButtonAlignment = keyof typeof buttonAlignment
  export type ButtonShadow = keyof typeof buttonShadow

  export const buttonAlignment = {
    left: 'justify-start text-left',
    center: 'justify-center text-center',
    right: 'justify-end text-right',
  }

  export const buttonColor = {
    primary: `border border-transparent bg-primary-900 text-white
		 dark:bg-primary-100 dark:text-black hover:brightness-125 dark:hover:brightness-90 active:brightness-90
		 active:dark:brightness-75`,

    secondary: `border border-slate-200 border-b-slate-300 dark:border-zinc-800 dark:border-t-zinc-700 bg-white dark:bg-zinc-900
		hover:bg-slate-100 hover:dark:bg-zinc-800 hover:dark:border-zinc-700 hover:dark:border-zinc-700 active:dark:bg-zinc-900 active:bg-slate-200`,

    tertiary:
      'border border-transparent bg-transparent hover:bg-slate-100 hover:dark:bg-zinc-800 dark:text-zinc-200',

    danger:
      'border border-red-500 bg-red-500 hover:text-red-500 hover:bg-transparent text-white',
    'danger-subtle': 'text-red-500 hover:bg-red-500 hover:!text-inherit',

    'success-subtle': 'text-green-500 hover:bg-green-500 hover:!text-inherit',

    'warning-subtle': 'text-yellow-500 hover:bg-yellow-500 hover:!text-inherit',

    ghost: `border border-slate-200 dark:border-zinc-800 bg-transparent
		hover:bg-slate-100 hover:dark:bg-zinc-800 hover:dark:border-zinc-700 dark:text-zinc-400 hover:text-inherit
		hover:dark:text-inherit`,

    elevated: `bg-slate-100 dark:bg-zinc-800 border border-slate-200
	 dark:border-zinc-700 hover:bg-zinc-200 hover:dark:bg-zinc-700 hover:border-slate-300
	 hover:dark:border-zinc-600`,

    elevatedLow: `bg-slate-100 dark:bg-zinc-900 border border-slate-200
	dark:border-zinc-800 hover:bg-slate-200 hover:dark:bg-zinc-800 hover:border-slate-300
	hover:dark:border-zinc-700`,

    none: '',
  }

  export const buttonShadow = {
    sm: 'shadow-sm',
    none: 'shadow-none',
  }

  export type ButtonSize = keyof typeof buttonSize

  export const buttonSize = {
    sm: 'px-2 py-0.5 h-6',
    md: 'px-3 py-1 h-8',
    lg: 'px-4 py-1.5 h-10',
    xl: 'px-6 py-2.5 h-12',
    'square-sm': 'w-6 h-6',
    'square-md': 'w-8 h-8',
    'square-lg': 'w-10 h-10',
    'square-xl': 'w-12 h-12',
    custom: '',
  }
</script>

<script lang="ts">
  import type { Snippet } from "svelte"
  import { Icon, type IconSource } from 'svelte-hero-icons'

  type ButtonRoundness = 'pill' | 'xl' | 'lg' | 'md' | 'none'

  const buttonRounding = {
    pill: 
      'rounded-full',
    xl:'rounded-xl',
    lg: 'rounded-lg',
    md: 'rounded-md',
    none: ''
  }

  let {
    color = 'secondary',
    size = 'md',
    rounding = 'lg',
    alignment = 'center',
    shadow = 'none',
    loading = false,
    icon,
    href,
    onclick,
    class: className = '',
    children,
    ...props
  }: {
    color?: ButtonColor
    size?: ButtonSize
    rounding?: ButtonRoundness
    alignment?: ButtonAlignment
    shadow?: ButtonShadow
    loading?: boolean
    icon?: {
      src: IconSource,
      size?: number,
      mini?: boolean
    },
    href?: string
    onclick?: (e: Event) => any
    class?: string,
    children?: Snippet
  } = $props()
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  role={href ? 'link' : 'button'}
  {...props}
  {href}
  class="
      {buttonColor[color]}
      {buttonSize[size]}
      {buttonRounding[rounding]}
			{buttonShadow[shadow]}
      transition-all duration-100 disabled:text-inherit font-medium cursor-pointer
      {className}
     {loading
    ? color == 'primary'
      ? '!bg-transparent !text-inherit'
      : ''
    : ''}"
>
  <div
    class="flex flex-row items-center h-full gap-1.5 {buttonAlignment[alignment]}"
  >
    {#if icon}
      <Icon src={icon.src} size={(icon.size ?? 16).toString()} mini={icon.mini ?? true} />
    {/if}
    {#if children}
      {@render children()}
    {/if}
  </div>
</svelte:element>

<!--
  @component
  
  @slot `prefix` -- Will be replaced if `loading` is `true`.
  @slot `suffix`
-->
