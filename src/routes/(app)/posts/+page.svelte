<script lang="ts">
	import type { PageProps } from './$types';
	import Container from '$lib/components/Container.svelte';
	import Card from '$lib/components/Card.svelte';
	import PostForm from './PostForm.svelte';

	const { data }: PageProps = $props();
</script>

<PostForm></PostForm>

<Container>
	<h1 class="text-3xl font-bold">Posts</h1>

	{#await data.posts then posts}
		{#each posts as post}
			<Card title={post.title}>
				{#snippet content()}
					<p>{post.description}</p>
				{/snippet}

				{#snippet actions()}
					<a class="btn btn-primary" href="/posts/{post.id}">Read</a>
				{/snippet}
			</Card>
		{/each}
	{/await}
</Container>
