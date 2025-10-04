<script lang="ts">
	import { authClient, denyAuthorizedUsers } from '$lib/auth/index';
	import Container from '$lib/components/Container.svelte';

	denyAuthorizedUsers();

	let email = $state('');
	let password = $state('');

	async function signIn(e: SubmitEvent) {
		e.preventDefault();

		await authClient.signIn.email({ email, password });
	}
</script>

<Container>
	<form class="space-y-2" onsubmit={signIn}>
		<input class="input" type="text" placeholder="Email" bind:value={email} />
		<input class="input" type="password" placeholder="Password" bind:value={password} />

		<div class="flex justify-end">
			<button class="btn btn-primary" type="submit">Sign in</button>
		</div>
	</form>
</Container>
