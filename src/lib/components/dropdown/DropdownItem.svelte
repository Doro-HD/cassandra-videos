<script lang="ts">
	import type { Snippet } from 'svelte';

	type TProps = {
		children: Snippet;
	};
	const { children }: TProps = $props();
</script>

<li>
	{@render children()}
</li>
