<script lang="ts">
	import { calcPolyominos, GridMode } from '$lib/polyform';
	import type { TileInfo, Int, PBoard, FloatingTile } from '$lib/polyform';
	import Polyform from './Polyform.svelte';
	import Grid from './Grid.svelte';
	export let pboard: PBoard;
	import type { TileDropInfo } from '$lib/polyform';
	import { dropzone } from '$lib/dnd'
	import '$lib/global.css';

	function on_dropzone(dataAsText: string , e: MouseEvent ) {
		let data = JSON.parse(dataAsText);
		console.log("on_dropzone", data, e);
		let floatingTile : FloatingTile = {
			oidx: { tileI: data.tileI, orientI: 0 },
			pos: {
				x: e.clientX,
				y: e.clientY
			}
		}
		pboard.floatingTiles.push(floatingTile);
		pboard.tilesLeft[data.tileI]--;
		pboard = pboard
		
	}


</script>


<div class="bboard" use:dropzone={{ on_dropzone }}>
	{#each pboard.floatingTiles as ftile, i}
		<Polyform {pboard} {ftile} />
	{/each}
	<!-- {#each pboard.laidTiles as ltile, i}

	{/each} -->

	<!-- <Grid mode={GridMode.Play} squareSize={8} matrix={pBoard.board} /> -->
</div>

<style>
	.bboard {
		width: 100px;
		height: 100px;
		background-color: lightgray;
		position: relative;
	}
	:global(.dropZone) {
		outline: 0.1rem solid var(--sk-theme-1);
		outline-offset: 0.25rem;
	}

	:global(.dropZone) * {
		pointer-events: none;
	}	




</style>