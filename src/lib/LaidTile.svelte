<script lang="ts">
	import { calcPerimeter, perimeterPolylinePoints, tileFromIdx, nrOrientsFromI } from '$lib/polyform';
	import type { LaidTile, Int, LPos, Pos, PBoard, TileInfo, FloatingTile } from '$lib/polyform';
    export let ltile: LaidTile;
	// export let tileI: Int = 0;
	// export let orientI: Int = 0;
	export let pboard: PBoard;
	export let squareSize = 8;
	let tile = tileFromIdx(pboard, ltile.idx);
	let boardSize = 50; // tile[0].length *squareSize

	function handleClick(evt: MouseEvent) {
		// orientI = (orientI + 1) % nrOrientsFromI(pboard, tileI);
	}
</script>


<polyline class="tile" points={perimeterPolylinePoints(tile, squareSize)} />

<style>
.tile {
    fill: lightblue;
    stroke: red;
    stroke-width: 2;
    display: inline-block;

}

/* .draggable {
    cursor: move;
} */

.tile:hover {
    fill: blue;
}
</style>
