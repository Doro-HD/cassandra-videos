<script lang="ts">
	import type { Snippet } from 'svelte';

	type TProps = {
		text: string;
		variant?: {
			direction: 'left';
		};
		children: Snippet;
	};
	const { text, variant, children }: TProps = $props();
</script>

<div class={['tooltip', { 'tooltip-left': variant?.direction === 'left' }]} data-tip={text}>
	{@render children()}
</div>
