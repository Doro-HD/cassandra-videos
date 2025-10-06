<script lang="ts">
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { Button } from '$lib/components/button';
	import Modal from '$lib/components/Modal.svelte';

	type TProps = {
		formID: string;
		closeEditor: () => void;
	};
	const { formID, closeEditor }: TProps = $props();

	let isDiscardWarningOpen = $state(false);
</script>

<Modal isOpen={isDiscardWarningOpen}>
	{#snippet content()}
		<h3 class="pb-2 text-xl font-bold">Discard changes</h3>
	{/snippet}

	{#snippet actions()}
		<Button onclick={() => (isDiscardWarningOpen = false)}>Continue editing</Button>

		<Button
			variant={{ color: 'error' }}
			onclick={() => {
				isDiscardWarningOpen = false;
				closeEditor();
			}}
		>
			Discard changes
		</Button>
	{/snippet}
</Modal>

<Tooltip text="Save changes" variant={{ direction: 'left' }}>
	<Button
		variant={{ color: 'success', shape: { circle: true } }}
		aria-label="Save changes"
		type="submit"
		form={formID}
	>
		<span class="icon-[lucide--check]"></span>
	</Button>
</Tooltip>

<Tooltip text="Discard changes" variant={{ direction: 'left' }}>
	<Button
		variant={{ color: 'error', shape: { circle: true } }}
		aria-label="Discard changes"
		onclick={() => (isDiscardWarningOpen = true)}
	>
		<span class="icon-[lucide--x]"></span>
	</Button>
</Tooltip>
