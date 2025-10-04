<script lang="ts">
	import type { PageProps } from './$types';
	import { invalidateAll } from '$app/navigation';

	import { type ArrayElement } from '$lib/util';
	import { authClient } from '$lib/auth';
	import Container from '$lib/components/Container.svelte';
	import * as Dropdown from '$lib/components/dropdown';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { Button } from '$lib/components/button/';
	import TextBlock from './TextBlock.svelte';
	import YTBlock from './YTBlock.svelte';
	import PostEditor from './PostEditor.svelte';
	import FloatContainer from '$lib/components/FloatContainer.svelte';
	import { updatePostBlocks } from './data.remote';

	type TExistingBlock = ArrayElement<typeof existingBlocks>;
	type TClientBlock = Omit<ArrayElement<typeof existingBlocks>, 'id'>;

	const { data }: PageProps = $props();
	let existingBlocks = $state(data.post.blocks);
	let newBlocks: TClientBlock[] = $state([]);
	const deletedBlocks: { id: string; order: number }[] = [];
	let highestOrder = data.post.highestOrder ?? 0;

	let isEditing = $state(false);
	const blocks = $derived([...existingBlocks, ...newBlocks]);

	const session = authClient.useSession();

	function addBlock(blockData: Pick<TClientBlock, 'data'>['data']) {
		const order = ++highestOrder;
		newBlocks.push({
			data: blockData,
			order,
			postID: data.post.id
		});
	}

	function addTextBlock() {
		addBlock({
			type: 'text',
			text: ''
		});
	}

	function addYoutubeBlock() {
		addBlock({
			type: 'youtube',
			vidioID: '',
			startTimeMin: 0,
			startTimeSec: 0,
			endTimeMin: 0,
			endTimeSec: 0
		});
	}

	async function updateBlocks() {
		updatePostBlocks({
			postId: data.post.id,
			title: data.post.title,
			blocks,
			deletedBlocks
		});
		invalidateAll();
	}

	async function deleteBlock(deletedBlock: { id?: string; order: number }) {
		const removeDeletedBlock = (block: TClientBlock) => block.order !== deletedBlock.order;
		const updateBlockOrder = <T extends TClientBlock | TExistingBlock>(block: T): T => {
			if (block.order > deletedBlock.order) {
				block.order -= 1;
			}

			return block;
		};

		if (!deletedBlock.id) {
			newBlocks = newBlocks.filter(removeDeletedBlock).map(updateBlockOrder);

			return;
		}

		deletedBlocks.push({ id: deletedBlock.id, order: deletedBlock.order });
		existingBlocks = existingBlocks.filter(removeDeletedBlock).map(updateBlockOrder);
	}
</script>

<div class="relative">
	{#if $session.data}
		<FloatContainer>
			{#if isEditing}
				<PostEditor onSave={updateBlocks} closeEditor={() => (isEditing = false)}></PostEditor>
			{:else}
				<Tooltip text="Edit post" variant={{ direction: 'left' }}>
					<Button
						variant={{ shape: { circle: true } }}
						aria-label="Edit post"
						onclick={() => (isEditing = true)}
					>
						<span class="icon-[lucide--pencil]"></span>
					</Button>
				</Tooltip>
			{/if}
		</FloatContainer>
	{/if}

	<Container>
		<h1 class="text-3xl font-bold">{data.post.title}</h1>

		{#snippet text()}
			{#each blocks as block (block.order)}
				{#if block.data.type === 'text'}
					<TextBlock bind:text={block.data.text} {isEditing} onDelete={() => deleteBlock(block)}
					></TextBlock>
				{:else if block.data.type === 'youtube'}
					<YTBlock
						{isEditing}
						onDelete={() => deleteBlock(block)}
						bind:videoID={block.data.vidioID}
						bind:startTimeMin={block.data.startTimeMin}
						bind:startTimeSec={block.data.startTimeSec}
						bind:endTimeMin={block.data.endTimeMin}
						bind:endTimeSec={block.data.endTimeSec}
					></YTBlock>
				{/if}
			{/each}
			{#if $session.data}
				{#if isEditing}
					<Dropdown.Root>
						{#snippet triggerContent()}
							Add block
						{/snippet}

						{#snippet content(close)}
							<Dropdown.Item>
								<Button
									onclick={() => {
										addTextBlock();
										close();
									}}>Text</Button
								>
							</Dropdown.Item>

							<Dropdown.Item>
								<Button
									onclick={() => {
										addYoutubeBlock();
										close();
									}}>Youtube video</Button
								>
							</Dropdown.Item>
						{/snippet}
					</Dropdown.Root>
				{/if}
			{/if}
		{/snippet}
	</Container>
</div>
