<script lang="ts">
	import { calcPolyominos, GridMode, tileFromIdx, calcPerimeter } from '$lib/polyform';
	import type { TileInfo, Int, PBoard, FloatingTile } from '$lib/polyform';
	import Polyform from './Polyform.svelte';
	import Grid from './Grid.svelte';
	export let pboard: PBoard;
	import type { TileDropInfo } from '$lib/polyform';
	import { dropzone } from '$lib/dnd';
	import '$lib/global.css';
	import LaidTile from './LaidTile.svelte';
	import Layout from '../routes/+layout.svelte';
	import { json } from '@sveltejs/kit';

	export let squareSize = 15;
	let w = pboard.board[0].length * squareSize;
	let h = pboard.board.length * squareSize;
	const DEBUG = true

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


<hr />
<div class="bboard" use:dropzone={{ on_dropzone }} style="--w:{w};--h:{h}">
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
{#if DEBUG}
<div class="tilesinfo">
	{#each pboard.laidTiles as ltile}
		<div>{JSON.stringify(ltile)}
			 {JSON.stringify(tileFromIdx(pboard, ltile.idx))}
			 {ltile.idx.tileI == 1 &&  ltile.idx.orientI == 2 ? 
			 JSON.stringify(calcPerimeter(tileFromIdx(pboard, ltile.idx))) :''
			 }
			</div>
	{/each}
</div>
{/if}

<style>
	.bboard {
		width: calc(var(--w) * 1px);
		height: calc(var(--h) * 1px);
		background-color: lightgray;
		position: relative;
		display: inline-block;
	}
	.tilesinfo {
		/* smaller font */
		display: inline-block;
		font-size: 0.5em;
	}

</style>
