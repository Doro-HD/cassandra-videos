<script lang="ts">
	import type { Snippet } from 'svelte';

	type TProps = {
		class?: string;
		header?: Snippet;
		content: Snippet;
		footer?: Snippet;
	};
	const { class: className, header, content, footer }: TProps = $props();
</script>

<div class={['card w-96 bg-base-100 text-justify shadow-sm', className]}>
	<div class="card-body">
		{#if header}
			<header>
				{@render header()}
			</header>
		{/if}

		<main>
			{@render content()}
		</main>

		{#if footer}
			<footer>
				{@render footer()}
			</footer>
		{/if}
	</div>
</div>
