<script lang="ts">
	import type { Snippet } from 'svelte';

	type TProps = {
		children: Snippet;
	};
	const { children }: TProps = $props();
</script>

<div class="card-actions justify-end">
	{@render children()}
</div>
