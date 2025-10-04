<script lang="ts">
	import type { Snippet } from 'svelte';

	type TProps = {
		title: string;
		content: Snippet;
		actions?: Snippet;
	};
	const { title, content, actions }: TProps = $props();
</script>

<div class="card w-96 bg-base-100 text-justify shadow-sm">
	<div class="card-body">
		<h2 class="card-title">{title}</h2>

		{@render content()}

		<div class="card-actions justify-end">
			{#if actions}
				{@render actions()}
			{/if}
		</div>
	</div>
</div>
