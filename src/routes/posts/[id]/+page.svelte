<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import YtiFrame from '$lib/components/YTIFrame.svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<Container>
	<h1 class="text-3xl font-bold">{data.post.title}</h1>

	{#snippet text()}
		{#each data.post.blocks as block}
			{#if block.type === 'text'}
				<p>{block.text}</p>
			{:else if block.type === 'youtube'}
				<YtiFrame videoID={block.vidioID} startTime={block.startTime} endTime={block.endTime}
				></YtiFrame>
			{/if}
		{/each}
	{/snippet}
</Container>
