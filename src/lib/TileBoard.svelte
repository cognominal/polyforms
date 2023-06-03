<script lang="ts">
	import { calcPolyominos } from '$lib/polyform';
	import type { TileInfo, Int } from '$lib/polyform';
	import Polyform from './Polyform.svelte';
	export let tiles: Int[][][];
	export let cellSize = 8;
</script>

<div>
	{#each tiles as tile}
		<Polyform {tile} {cellSize}/>
	{/each}
</div>

<style>
</style>
