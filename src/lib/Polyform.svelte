<script lang="ts">
	import { calcPerimeter, perimeterPolylinePoints } from '$lib/polyform';
	import type { Tile, Int, Pos } from '$lib/polyform';
	export let tile: Tile;
	export let cellSize = 8;

	let boardSize = 50; // tile[0].length *squareSize
	// export let dragActions: DragActions
</script>

<script lang="ts" context="module">
	import { asDroppable } from 'svelte-drag-and-drop-actions';
	// import DragDropTouch from 'svelte-drag-drop-touch';
</script>

<span use:asDroppable={{}}>
	<svg width={boardSize} height={boardSize} viewBox="0 0 {boardSize} {boardSize}">
		<polyline points={perimeterPolylinePoints(tile, cellSize)} class="pentamino draggable" />
	</svg>
</span>

<!-- </span> -->

<style>
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

