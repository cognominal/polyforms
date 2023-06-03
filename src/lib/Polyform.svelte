<script lang="ts">
	import { calcPerimeter, perimeterPolylinePoints } from '$lib/polyform'
	import type { Tile, Int, Pos, PBoard, TileInfo } from '$lib/polyform'
	export let tileI: Int;
	export let pBoard: PBoard;
	export let cellSize = 8

	let boardSize = 50; // tile[0].length *squareSize
	// export let dragActions: DragActions

	function tileFromI(pBoard: PBoard , i: Int): Tile {
		return pBoard.tilesInfo[i].orients[0].matrix
	}
	function handleClick() {
		
	}
	function handleKeypress() {
		
	}
</script>

<script lang="ts" context="module">
	import { asDroppable } from 'svelte-drag-and-drop-actions';
	// import DragDropTouch from 'svelte-drag-drop-touch';
</script>

<span use:asDroppable={{}} on:dblclick={handleClick} on:click={handleClick} on:keypress={handleKeypress}>
	<svg width={boardSize} height={boardSize} viewBox="0 0 {boardSize} {boardSize}">
		<polyline points={perimeterPolylinePoints(tileFromI(pBoard, tileI), cellSize)} class="pentamino draggable" />
	</svg>
</span>
<span class="nrInstances">{pBoard.tilesLeft[tileI]}</span>

<!-- </span> -->

<style>
	.nrInstances {
		margin: auto
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
    -webkit-touch-callout:none;
    -ms-touch-action:none; touch-action:none;
    -moz-user-select:none; -webkit-user-select:none; -ms-user-select:none; user-select:none;
  }
</style>

