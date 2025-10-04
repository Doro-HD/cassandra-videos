<script lang="ts">
	type TProps = {
		label: string;
		value: number;
		max?: number;
	};
	let { label, value = $bindable(), max }: TProps = $props();
</script>

<label class="input">
	<span class="label">{label}</span>
	<input type="number" min="0" {max} bind:value />
</label>
