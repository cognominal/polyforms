<script lang="ts" context="module">
	import { asDroppable } from 'svelte-drag-and-drop-actions';
	// import DragDropTouch from 'svelte-drag-drop-touch';
</script>

<script lang="ts">
	import { calcPerimeter, perimeterPolylinePoints } from '$lib/polyform';
	import type { Tile, Int, Pos, PBoard, TileInfo } from '$lib/polyform';
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
</script>

<span
	use:asDroppable={{}}
	on:dblclick={handleClick}
	on:click={handleClick}
	on:keypress={handleKeypress}
>
	<svg width={boardSize} height={boardSize} viewBox="0 0 {boardSize} {boardSize}">
		<polyline
			points={perimeterPolylinePoints(tileFromI(pBoard, tileI), cellSize)}
			class="pentamino draggable"
		/>
	</svg>
</span>
{#if pBoard.tilesLeft[tileI] != 1}
	<span class="nrInstances" id="inr{tileI}">{pBoard.tilesLeft[tileI]}</span>
{/if}

<!-- </span> -->

<style>
	.nrInstances {
		margin: auto;
	}

	.pentamino {
		fill: lightblue;
		stroke: red;
		stroke-width: 2;
	}

	.draggable {
		cursor: move;
	}

	.pentamino:hover {
		fill: blue;
	}
	:global([draggable]) {
		-webkit-touch-callout: none;
		-ms-touch-action: none;
		touch-action: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
