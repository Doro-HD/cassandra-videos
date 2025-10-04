<script lang="ts">
	import { authClient } from '$lib/auth';
	import Modal from '$lib/components/Modal.svelte';
	import { createPost } from './data.remote';

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

		<form id="create-post-form" class="flex flex-col items-center gap-y-2" {...createPost}>
			<input class="input" type="text" placeholder="Title" name="title" />

			<textarea class="textarea" placeholder="Description" name="description"></textarea>
		</form>
	{/snippet}

	{#snippet actions(close)}
		<button class="btn btn-error" onclick={() => close()}>Cancel</button>

		<button class="btn btn-primary" type="submit" form="create-post-form">Create</button>
	{/snippet}
</Modal>
