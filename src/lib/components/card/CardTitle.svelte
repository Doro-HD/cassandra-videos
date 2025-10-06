<script lang="ts">
	import type { Snippet } from 'svelte';

	type TProps = {
		children: Snippet;
	};
	const { children }: TProps = $props();
</script>

<h2 class="card-title">{@render children()}</h2>
