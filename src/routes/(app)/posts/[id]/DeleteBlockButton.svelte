<script lang="ts">
	import { Button } from '$lib/components/button';
	import Tooltip from '$lib/components/Tooltip.svelte';

	type TProps = {
		onclick: () => void;
	};
	const { onclick }: TProps = $props();
</script>

<div class="absolute top-1/2 right-0 -translate-y-1/2">
	<Tooltip text="Delete">
		<Button {onclick} variant={{ color: 'error' }}>
			<span class="icon-[lucide--x]"></span>
		</Button>
	</Tooltip>
</div>
