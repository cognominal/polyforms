<script lang="ts">
	import {
		perimeterPolylinePoints,
		tileFromIdx,
	} from '$lib/polyform';
	import type { LaidTile, PBoard } from '$lib/polyform';
	export let ltile: LaidTile;
	export let pboard: PBoard;
	export let squareSize = 8;

	let tile = tileFromIdx(pboard, ltile.idx);
</script>

<polyline
	class="tile"
	points={perimeterPolylinePoints(tile, squareSize)}
/>

<style>
	.tile {
		fill: var(--fill,lightblue);
		stroke: red;
		stroke-width: 2;
		display: inline-block;
		/* same transform but with calc() to specify pixel init */
		transform: translate(calc(var(--posx) * 1px), calc(var(--posy) * 1px));
		/* transition: transform 0.5s; */
		pointer-events: auto;

	}

	/* .draggable {
    cursor: move;
} */

	.tile:hover {
		fill: blue;
	}
</style>
