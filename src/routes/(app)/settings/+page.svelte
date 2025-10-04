<script>
	import { authClient } from '$lib/auth';
	import Container from '$lib/components/Container.svelte';

	function addPasskey() {
		authClient.passkey.addPasskey();
	}
</script>

<Container>
	<h1 class="text-3xl font-bold">Settings</h1>

	{#snippet text()}
		<div class="space-y-2">
			<h2 class="text-xl">Security</h2>

			<hr />

			<button class="btn" onclick={addPasskey}>Add passkey</button>
		</div>
	{/snippet}
</Container>
