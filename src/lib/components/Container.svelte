<script lang="ts">
	import type { Snippet } from 'svelte';

	type TProps = {
		text?: Snippet;
		children: Snippet;
	};
	const { text, children }: TProps = $props();
</script>

<div class="flex w-full flex-col items-center gap-y-6 text-center">
	{@render children()}

	{#if text}
		<div class="w-5xl space-y-6 text-justify">
			{@render text()}
		</div>
	{/if}
</div>
