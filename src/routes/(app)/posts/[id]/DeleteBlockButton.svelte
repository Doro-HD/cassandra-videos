<script lang="ts">
	import { Button, type ButtonProps } from '$lib/components/button';
	import Tooltip from '$lib/components/Tooltip.svelte';

	type TProps = {
		buttonVariant?: Omit<ButtonProps['variant'], 'color'>;
		onclick: () => void;
	};
	const { buttonVariant, onclick }: TProps = $props();
</script>

<div class="absolute top-1/2 right-0 hidden -translate-y-1/2 group-hover:block">
	<Tooltip text="Delete">
		<Button {onclick} variant={{ ...buttonVariant, color: 'error' }}>
			<span class="icon-[lucide--x]"></span>
		</Button>
	</Tooltip>
</div>
