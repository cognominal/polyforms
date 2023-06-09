<script lang="ts">
	import { calcPerimeter, perimeterPolylinePoints, tileFromI } from '$lib/polyform';
	import type { Tile, Int, LPos, Pos, PBoard, TileInfo, FloatingTile } from '$lib/polyform';
	export let tileI: Int = 0;
	export let pboard: PBoard;
	export let cellSize = 8;
	let boardSize = 50; // tile[0].length *squareSize
</script>

<span >
	<svg
		width={boardSize}
		height={boardSize}
		viewBox="0 0 {boardSize} {boardSize}"
		class="pentamino draggable"
	>
		<polyline points={perimeterPolylinePoints(tileFromI(pboard, tileI), cellSize)} />
	</svg>
</span>
