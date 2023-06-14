<script lang="ts">
	import {
		calcPerimeter,
		perimeterPolylinePoints,
		tileFromIdx,
		nrOrientsFromI,
		firstXFromIdx
	} from '$lib/polyform';
	import type { LaidTile, Int, LPos, Pos, PBoard, TileInfo, FloatingTileInfo } from '$lib/polyform';
	export let ltile: LaidTile;
	export let pboard: PBoard;
	export let squareSize = 8;
	let posx = (ltile.pos.x - firstXFromIdx(pboard, ltile.idx)) * squareSize;
	let posy = ltile.pos.y * squareSize;

	let tile = tileFromIdx(pboard, ltile.idx);
	let boardSize = 50; // tile[0].length *squareSize

	function handleClick(evt: MouseEvent) {
		// orientI = (orientI + 1) % nrOrientsFromI(pboard, tileI);
	}
</script>

<polyline
	style="--posx:{posx};--posy:{posy}"
	class="tile"
	points={perimeterPolylinePoints(tile, squareSize)}
/>

<style>
	.tile {
		fill: lightblue;
		stroke: red;
		stroke-width: 2;
		display: inline-block;
		/* same transform but with calc() to specify pixel init */
		transform: translate(calc(var(--posx) * 1px), calc(var(--posy) * 1px));
		/* transition: transform 0.5s; */
	}

	/* .draggable {
    cursor: move;
} */

	.tile:hover {
		fill: blue;
	}
</style>
