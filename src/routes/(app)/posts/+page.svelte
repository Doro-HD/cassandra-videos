<script lang="ts">
	import type { PageProps } from './$types';
	import Container from '$lib/components/Container.svelte';
	import { Card } from '$lib/components';
	import PostForm from './PostForm.svelte';

	const { data }: PageProps = $props();
</script>

<PostForm></PostForm>

<Container>
	<h1 class="text-3xl font-bold">Posts</h1>

	{#await data.posts then posts}
		{#each posts as post}
			<Card.Root>
				{#snippet header()}
					<Card.Title>
						{post.title}
					</Card.Title>
				{/snippet}

				{#snippet content()}
					<p>{post.description}</p>
				{/snippet}

				{#snippet footer()}
					<Card.Actions>
						<a class="btn btn-primary" href="/posts/{post.id}">Read</a>
					</Card.Actions>
				{/snippet}
			</Card.Root>
		{/each}
	{/await}
</Container>
