<script lang="ts">
	import { authClient } from '$lib/auth/index';

	const session = authClient.useSession();

	function signOut() {
		authClient.signOut();
	}
</script>

<div class="sticky top-0 navbar flex justify-between bg-base-100 shadow-sm">
	<div>
		<a href="/" class="btn text-xl btn-ghost">Guava</a>

		<a href="/posts" class="btn btn-ghost">posts</a>
	</div>

	{#if $session.data}
		<div>
			<a href="/settings" class="btn btn-ghost">Settings</a>

			<button class="btn btn-ghost" onclick={signOut}>Sign out</button>
		</div>
	{:else}
		<a href="/sign-in" class="btn btn-ghost">admin</a>
	{/if}
</div>
