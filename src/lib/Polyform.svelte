

<script lang="ts">
	import { draggable } from '$lib/dnd';
	import { calcPerimeter, perimeterPolylinePoints } from '$lib/polyform';
	import type { Tile, Int, Pos, PBoard, TileInfo } from '$lib/polyform';
	import Grid from './Grid.svelte';
	export let tileI: Int;
	export let pBoard: PBoard;
	export let cellSize = 8;

	let boardSize = 50; // tile[0].length *squareSize
	// export let dragActions: DragActions

	function tileFromI(pBoard: PBoard, i: Int): Tile {
		return pBoard.tilesInfo[i].orients[0].matrix;
	}

	let clicked = false;

	function handleClick(evt: MouseEvent) {
		if (!clicked) {
			clicked = true;
			setTimeout(() => {
				if (clicked) {
					clicked = false;
					// handle single click
					pBoard.tilesLeft[tileI]++;
				}
			}, 300);
		} else {
			clicked = false;
			evt.preventDefault();
			// handle double click
			// or should I remove the tile? grey it out?
			if (pBoard.tilesLeft[tileI] > 1) pBoard.tilesLeft[tileI]--;
		}
	}
	function handleKeypress() {}
	function onDragMove(x: number, y: number, dx: number, dy: number, DroppableExtras: any): void {
		// console.log('onDragMove', x,y, dx,dy, DroppableExtras);
	}
	function onDropped(x: number, y: number, Operation: string, TypeTransferred: string, DataTransferred: any, DropZoneExtras: any, DroppableExtras: any) : void {
		console.log('onDropped', x,y, Operation, TypeTransferred, DataTransferred, DropZoneExtras, DroppableExtras);
	}

</script>

<span class="span" on:dblclick={handleClick} on:click={handleClick} on:keypress={handleKeypress}>
	<div
		tabindex="-1"
		use:draggable={{ tileI, pBoard }}
	>
		<svg
			width={boardSize}
			height={boardSize}
			viewBox="0 0 {boardSize} {boardSize}"
			class="pentamino draggable"
		>
			<polyline points={perimeterPolylinePoints(tileFromI(pBoard, tileI), cellSize)} />
		</svg>
	</div>
	{#if pBoard.tilesLeft[tileI] != 1}
		<div class="nrInstances" id="inr{tileI}">{pBoard.tilesLeft[tileI]}</div>
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
