<script lang="ts">
	import { enhance } from '$app/forms';
	import { authClient } from '$lib/auth';
	import Modal from '$lib/components/Modal.svelte';

	const session = authClient.useSession();
</script>

<Modal>
	{#snippet trigger(show)}
		{#if $session.data}
			<div class="top-00 absolute right-10">
				<div class="tooltip tooltip-left" data-tip="Create post">
					<button class="btn btn-circle" aria-label="Create post" onclick={() => show()}>
						<span class="btn icon-[lucide--plus]"></span>
					</button>
				</div>
			</div>
		{/if}
	{/snippet}

	{#snippet content()}
		<h3 class="pb-2 text-xl font-bold">Create post</h3>

		<form
			id="create-post-form"
			method="POST"
			class="flex flex-col items-center gap-y-2"
			use:enhance
		>
			<input class="input" type="text" placeholder="Title" name="title" />

			<textarea class="textarea" placeholder="Description" name="description"></textarea>
		</form>
	{/snippet}

	{#snippet actions(close)}
		<button class="btn btn-error" onclick={() => close()}>Cancel</button>

		<button class="btn btn-primary" type="submit" form="create-post-form">Create</button>
	{/snippet}
</Modal>
