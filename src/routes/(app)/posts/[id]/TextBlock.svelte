<script lang="ts">
	import DeleteBlockButton from './DeleteBlockButton.svelte';

	type TProps = {
		text: string;
		isEditing: boolean;
		onDelete: () => void;
	};
	let { text = $bindable(), onDelete, isEditing }: TProps = $props();
</script>

<div class="flex w-full text-start">
	<div class="group relative w-full pe-15">
		{#if isEditing}
			<DeleteBlockButton onclick={onDelete}></DeleteBlockButton>
			<textarea class="textarea h-30 w-full" bind:value={text}></textarea>
		{:else}
			<p>{text}</p>
		{/if}
	</div>
</div>
