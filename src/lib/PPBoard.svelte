<script lang="ts">
	import {
		calcPolyominos,
		GridMode,
		tileFromIdx,
		calcPerimeter,
		perimeterPolylinePoints
	} from '$lib/polyform';
	import type { TileInfo, Int, PBoard, FloatingTileInfo as FloatingTileInfo } from '$lib/polyform';
	import FloatingTile from './FloatingTile.svelte';
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
	export let DEBUG = false;

	$: {
		w = pboard.board[0].length * squareSize;
		h = pboard.board.length * squareSize;
	}

	function on_dropzone(dataAsText: string, e: MouseEvent) {
		let data = JSON.parse(dataAsText);
		console.log('on_dropzone', data, e);
		let floatingTile: FloatingTileInfo = {
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

	function on_mouseover(e: MouseEvent) {
		console.log('on_mouseover', e);
	}
</script>

<hr />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="bboard"
	use:dropzone={{ on_dropzone }}
	on:mouseover={on_mouseover}
	on:keypress={(e) => 0}
	on:focus={(e) => 0}
	style="--w:{w};--h:{h}"
>
	<svg width={w} height={h} viewBox="0 0 {w} {h}">
		{#each pboard.floatingTiles as ftile, i}
			<FloatingTile {pboard} {ftile} />
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
			<div>
				{JSON.stringify(ltile)}
				{JSON.stringify(tileFromIdx(pboard, ltile.idx))}
				{JSON.stringify(calcPerimeter(tileFromIdx(pboard, ltile.idx)))}
				<!-- {perimeterPolylinePoints(tileFromIdx(pboard, ltile.idx), squareSize, ltile.pos)} -->
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
