<script lang="ts">
	import {
		tileFromIdx,
		perimeterPolylinePoints,
		firstXFromIdx,
		dcolors
	} from '$lib/polyform';
	import type { TileInfo, Int, PBoard, FloatingTileInfo, Tile } from '$lib/polyform';
	import FloatingTile from './FloatingTile.svelte';
	export let pboard: PBoard;
	import { dropzone } from '$lib/dnd';
	import '$lib/global.css';
	import LaidTile from './LaidTile.svelte';

	export let squareSize = 15;
	let w = pboard.board[0].length * squareSize;
	let h = pboard.board.length * squareSize;
	export let DEBUG = false;
	$: showTile = pboard.laidTiles.map(() => true);
	$: infoEltsHighlight = pboard.laidTiles.map(() => false);


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

	function onMouseEvent(i: Int) {
		infoEltsHighlight[i] = !infoEltsHighlight[i]

	}

	$: highlightBool = (i: Int) => infoEltsHighlight[i] 
	$: highlightClass = (i: Int) => infoEltsHighlight[i] ? 'highlight' : ''



	function debugInfos(ltile: LaidTile) {
		const tile: Tile = tileFromIdx(pboard, ltile.idx);
		const strfy = JSON.stringify;
		return strfy(ltile.idx) + strfy(tile) + perimeterPolylinePoints(tile, squareSize);
	}

	function posx(ltile: LaidTile) {
		return (ltile.pos.x - firstXFromIdx(pboard, ltile.idx)) * squareSize;
	}
	function posy(ltile: LaidTile) {
		return ltile.pos.y * squareSize;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="bboard"
	use:dropzone={{ on_dropzone }}
	on:keypress={(e) => 0}
	on:focus={(e) => 0}
	style="--w:{w};--h:{h}"
>
	<svg width={w} height={h} viewBox="0 0 {w} {h}">
		{#each pboard.floatingTiles as ftile, i}
			<FloatingTile {pboard} {ftile} />
		{/each}
		{#each pboard.laidTiles as ltile, i}
		{#if showTile[i]}
			<g class="absolute"  style="--posx:{posx(ltile)};--posy:{posy(ltile)}; --fill:{dcolors[i]}"
			on:mouseover={() => onMouseEvent(i)}
			on:mouseleave={() => onMouseEvent(i)}
			on:focus={() => onMouseEvent(i)}

		
			>
				<LaidTile {ltile} {squareSize} {pboard} />
			</g>
			{/if}
		{/each}
	</svg>

	<!-- <Grid mode={GridMode.Play} squareSize={8} matrix={pBoard.board} /> -->
</div>
{#if DEBUG}
	<div class="tilesinfo">
		{#each pboard.laidTiles as ltile, i}
			<div  on:click={()=> {showTile[i]= !showTile[i]}}     class={highlightClass(i)}>
				<input type="checkbox" bind:checked={showTile[i]} />

				{debugInfos(ltile)}
				<svg width={w/4} height={h/4} viewBox="0 0 {w/4} {h/4}">
					<g class="absolute" style="--posx:{0};--posy:{0} ">
						<LaidTile {ltile} squareSize={squareSize/4} {pboard} />
					</g>
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
	.absolute {
		position: absolute;
	}
	.tilesinfo {
		/* smaller font */
		display: inline-block;
		font-size: 0.5em;
	}

	.highlight {
		background-color: yellow;
	}
</style>
