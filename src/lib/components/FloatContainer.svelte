<script lang="ts">
	import type { Snippet } from 'svelte';

	type TProps = {
		children: Snippet;
	};
	const { children }: TProps = $props();
</script>

<div class="absolute top-0 right-10 flex flex-col gap-y-2">
	{@render children()}
</div>
