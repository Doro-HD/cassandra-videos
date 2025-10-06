<script lang="ts">
	import { Card } from '$lib/components';
	import YTIFrame from '$lib/components/YTIFrame.svelte';
	import NumberInput from './NumberInput.svelte';
	import DeleteBlockButton from './DeleteBlockButton.svelte';

	type TProps = {
		isEditing: boolean;
		videoID: string;
		startTimeMin: number;
		startTimeSec: number;
		endTimeMin: number;
		endTimeSec: number;
		onDelete: () => void;
	};
	let {
		isEditing,
		videoID = $bindable(),
		startTimeMin = $bindable(),
		startTimeSec = $bindable(),
		endTimeMin = $bindable(),
		endTimeSec = $bindable(),
		onDelete
	}: TProps = $props();
</script>

{#if isEditing}
	<Card.Root class="group">
		{#snippet header()}
			<div class="relative">
				<Card.Title>Youtube video</Card.Title>

				<DeleteBlockButton buttonVariant={{ size: 'xs' }} onclick={onDelete}></DeleteBlockButton>
			</div>
		{/snippet}

		{#snippet content()}
			<input class="input w-full" type="text" placeholder="Video ID" bind:value={videoID} />

			<h1>Start time</h1>
			<hr />
			<div class="flex gap-x-2">
				<NumberInput label="Min" bind:value={startTimeMin}></NumberInput>

				<NumberInput label="Sec" bind:value={startTimeSec} max={59}></NumberInput>
			</div>

			<h1>End time</h1>
			<hr />
			<div class="flex gap-x-2">
				<NumberInput label="Min" value={endTimeMin}></NumberInput>

				<NumberInput label="Sec" value={endTimeSec} max={59}></NumberInput>
			</div>
		{/snippet}
	</Card.Root>
{:else}
	<YTIFrame
		{videoID}
		startTime={startTimeMin * 60 + startTimeSec}
		endTime={endTimeMin * 60 + endTimeSec}
	></YTIFrame>
{/if}
