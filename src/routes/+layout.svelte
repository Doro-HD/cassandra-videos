<script lang="ts">
	import '../app.css';
	import Navbar from './Navbar.svelte';

	let { children } = $props();
</script>

<header>
	<Navbar></Navbar>
</header>

<main class="pt-8">
	{@render children?.()}
</main>
