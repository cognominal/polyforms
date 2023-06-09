<script lang="ts">
	import { calcPerimeter, perimeterPolylinePoints, tileFromI, nrOrientsFromI } from '$lib/polyform';
	import type { Tile, Int, LPos, Pos, PBoard, TileInfo, FloatingTile } from '$lib/polyform';
	export let tileI: Int = 0;
	export let orientI: Int = 0;
	export let pboard: PBoard;
	export let cellSize = 8;
	let boardSize = 50; // tile[0].length *squareSize

	function handleClick(evt: MouseEvent) {
		orientI = (orientI + 1) % nrOrientsFromI(pboard, tileI);

	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span on:click={handleClick}>
	<svg
		width={boardSize}
		height={boardSize}
		viewBox="0 0 {boardSize} {boardSize}"
		class="pentamino draggable"
	>
		<polyline points={perimeterPolylinePoints(tileFromI(pboard, tileI, orientI), cellSize)} />
	</svg>
</span>
