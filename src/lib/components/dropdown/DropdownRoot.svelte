<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '$lib/components/button/Button.svelte';
	import type { ButtonProps } from '../button';

	type TProps = {
		id?: string;
		triggerContent: Snippet;
		triggerVariant?: ButtonProps['variant'];
		content: Snippet<[() => void]>;
	};
	const { id, triggerContent, triggerVariant, content }: TProps = $props();

	let popover: HTMLElement;

	const popoverID = id ?? crypto.randomUUID();

	function close() {
		popover.hidePopover();
	}
</script>

<Button variant={triggerVariant} popovertarget={popoverID} style="anchor-name:--{popoverID}">
	{@render triggerContent()}
</Button>

<ul
	{@attach (element) => {
		popover = element;
	}}
	id={popoverID}
	class="menu dropdown w-52 space-y-2 rounded-box bg-base-100 shadow-sm"
	popover
	style="position-anchor:--{popoverID}"
>
	{@render content(close)}
</ul>
