<script lang="ts">
	import { calcPolyominos } from '$lib/polyform';
	import type { TileInfo, Int, PBoard } from '$lib/polyform';
	import Polyform from './Polyform.svelte';
	export let cellSize = 8;
	export let pboard: PBoard;
	let tiles = pboard.tilesInfo.map((ti) => ti.orients[0].matrix);

</script>

<div>
	{#each tiles as _, tileI}
		<Polyform {pboard} {tileI} {cellSize}/>
	{/each}
</div>

<style>
</style>
