<script lang="ts">
	import type { PageProps } from './$types';
	import Container from '$lib/components/Container.svelte';

	const { data }: PageProps = $props();
</script>

{#snippet card(title: string, description: string, link: string)}
	<div class="card w-96 bg-base-100 text-justify shadow-sm">
		<div class="card-body">
			<h2 class="card-title">{title}</h2>

			<p>
				{description}
			</p>

			<div class="card-actions justify-end">
				<a class="btn btn-primary" href="/posts/{link}">Read</a>
			</div>
		</div>
	</div>
{/snippet}

<Container>
	<h1 class="text-3xl font-bold">Posts</h1>

	{#each data.posts as post}
		{@render card(post.title, post.description, post.url)}
	{/each}
</Container>
