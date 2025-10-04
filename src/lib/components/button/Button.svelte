<script lang="ts">
	const {
		variant,
		style,
		popovertarget,
		'aria-label': ariaLabel,
		onclick,
		children
	}: TProps = $props();
</script>

<button
	{style}
	{popovertarget}
	aria-label={ariaLabel}
	class={[
		'btn',
		{
			'btn-success': variant?.color === 'success',
			'btn-error': variant?.color === 'error',
			'btn-circle': variant?.shape?.circle
		}
	]}
	{onclick}
>
	{@render children()}
</button>
