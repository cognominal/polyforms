<script lang="ts">
	import { draggable } from '$lib/dnd';
	import { calcPerimeter, perimeterPolylinePoints, tileFromI } from '$lib/polyform';
	import type { Tile, Int, LPos, Pos, PBoard, TileInfo, FloatingTile } from '$lib/polyform';
	import Grid from './Grid.svelte';
	export let tileI: Int = 0;
	export let pboard: PBoard;
	export let cellSize = 8;
	export let ftile = undefined as unknown as FloatingTile;
	let boardSize = 50; // tile[0].length *squareSize
	$: style = setStyle(ftile);
	$: TileI = ftile ? ftile.oidx.tileI : tileI;

	function setStyle(ftile: FloatingTile) {
		console.log("setStyle", ftile);
		if (ftile) {
			const pos = ftile.pos;
			return `
				transform: translate(${pos.x * cellSize}px, ${pos.y * cellSize}px)
				poaition: absolute;
				`;
		} 
		// else if (lpos) {
		// 	// TBD 
		// }
	}



	let clicked = false;

	function handleClick(evt: MouseEvent) {
		if (!clicked) {
			clicked = true;
			setTimeout(() => {
				if (clicked) {
					clicked = false;
					// handle single click
					pboard.tilesLeft[tileI]++;
				}
			}, 300);
		} else {
			clicked = false;
			evt.preventDefault();
			// handle double click
			// or should I remove the tile? grey it out?
			if (pboard.tilesLeft[tileI] > 1) pboard.tilesLeft[tileI]--;
		}
	}
	function handleKeypress() {}

</script>

<span class="span" 
	style={style}
	on:dblclick={handleClick} on:click={handleClick} on:keypress={handleKeypress}>
	<div tabindex="-1" use:draggable={{ tileI, pBoard: pboard }}>
		<svg
			width={boardSize}
			height={boardSize}
			viewBox="0 0 {boardSize} {boardSize}"
			class="pentamino draggable"
		>
			<polyline points={perimeterPolylinePoints(tileFromI(pboard, tileI), cellSize)} />
		</svg>
	</div>
	{#if pboard.tilesLeft[tileI] != 1}
		<div class="nrInstances" id="inr{tileI}">{pboard.tilesLeft[tileI]}</div>
	{/if}
</span>

<style>
	.span {
		display: inline-block;
		margin: auto;
	}
	.nrInstances {
		display: inline-block;
		margin: auto;
		text-align: center;
	}

	.pentamino {
		fill: lightblue;
		stroke: red;
		stroke-width: 2;
	}

	/* .draggable {
		cursor: move;
	} */

	.pentamino:hover {
		fill: blue;
	}
</style>
