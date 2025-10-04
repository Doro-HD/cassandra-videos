<script lang="ts">
	import type { Snippet } from 'svelte';

	type TProps = {
		isOpen?: boolean;
		trigger?: Snippet<[() => void]>;
		content: Snippet;
		actions: Snippet<[() => void]>;
	};
	const { isOpen, trigger, content, actions }: TProps = $props();

	let dialog: HTMLDialogElement;

	function show() {
		dialog.showModal();
	}

	function close() {
		dialog.close();
	}
</script>

{#if trigger}
	{@render trigger(show)}
{/if}

<dialog
	{@attach (element) => {
		dialog = element;
	}}
	id="create-post-modal"
	class="modal"
	open={isOpen}
>
	<div class="modal-box text-center">
		{@render content()}

		<div class="modal-action">
			{@render actions(close)}
		</div>
	</div>
</dialog>
