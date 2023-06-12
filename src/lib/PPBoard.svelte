<script lang="ts">
	import { calcPolyominos, GridMode } from '$lib/polyform';
	import type { TileInfo, Int, PBoard, FloatingTile } from '$lib/polyform';
	import Polyform from './Polyform.svelte';
	import Grid from './Grid.svelte';
	export let pboard: PBoard;
	import type { TileDropInfo } from '$lib/polyform';
	import { dropzone } from '$lib/dnd';
	import '$lib/global.css';
	import LaidTile from './LaidTile.svelte';

	export let squareSize = 15
	let w = pboard.board[0].length * squareSize;
	let h = pboard.board.length * squareSize;

	function on_dropzone(dataAsText: string, e: MouseEvent) {
		let data = JSON.parse(dataAsText);
		console.log('on_dropzone', data, e);
		let floatingTile: FloatingTile = {
			oidx: { tileI: data.tileI, orientI: 0 },
			pos: {
				x: e.clientX,
				y: e.clientY
			}
		};
		pboard.floatingTiles.push(floatingTile);
		pboard.tilesLeft[data.tileI]--;
		pboard = pboard;
	}


</script>

<div class="bboard" use:dropzone={{ on_dropzone }} 
style="--w:{w};--h:{h}">
<svg width={w} height={h} viewBox="0 0 {w} {h}">
	{#each pboard.floatingTiles as ftile, i}
		<Polyform {pboard} {ftile} />
	{/each}
	{#each pboard.laidTiles as ltile}
		<LaidTile {ltile} {squareSize} {pboard} />
	{/each}
</svg>

	<!-- <Grid mode={GridMode.Play} squareSize={8} matrix={pBoard.board} /> -->
</div>

<style>
	.bboard {
		width: calc(var(--w) * 1px);
		height: calc(var(--h) * 1px);
		background-color: lightgray;
		position: relative;
		display: inline-block;
	}
</style>
