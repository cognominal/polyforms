<script lang="ts">
	import { calcPolyominos } from '$lib/polyform';
	import type { TileInfo, Int, PBoard } from '$lib/polyform';
	import Polyform from './Polyform.svelte';
	export let cellSize = 8;
	export let pBoard: PBoard;
	let tiles = pBoard.tilesInfo.map((ti) => ti.orients[0].matrix);

</script>

<div>
	{#each tiles as _, tileI}
		<Polyform {pBoard} {tileI} {cellSize}/>
	{/each}
</div>

<style>
</style>
