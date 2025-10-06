<script lang="ts">
	import type { ButtonProps } from './index';
	const {
		variant,
		style,
		popovertarget,
		'aria-label': ariaLabel,
		type,
		form,
		onclick,
		children
	}: ButtonProps = $props();
</script>

<button
	{type}
	{form}
	{style}
	{popovertarget}
	aria-label={ariaLabel}
	class={[
		'btn',
		{
			'btn-success': variant?.color === 'success',
			'btn-error': variant?.color === 'error',
			'btn-circle': variant?.shape?.circle,
			'btn-xs': variant?.size === 'xs',
			'btn-sm': variant?.size === 'sm',
			'btn-md': variant?.size === 'md',
			'btn-lg': variant?.size === 'lg',
			'btn-xl': variant?.size === 'xl'
		}
	]}
	{onclick}
>
	{@render children()}
</button>
