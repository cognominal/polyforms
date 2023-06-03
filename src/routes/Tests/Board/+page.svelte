<script lang="ts">
	import { toSafeInteger } from 'lodash';
	import { calcPolyominos, setPBoard, GridMode } from '$lib/polyform';
	import type { TileInfo, PBoard } from '$lib/polyform';
	import Pentamino from '$lib/Polyform.svelte';
	import Grid from '$lib/Grid.svelte';
	import TileBoard from '$lib/TileBoard.svelte';
	import PPBoard from '$lib/PPBoard.svelte';
	let ti: TileInfo[][] = calcPolyominos(6);
	let pentaminoTi = ti[4];
	let tile = pentaminoTi[0].orients[0].matrix;
	let w = 8;
	let h = 8;
	let cellSize = 8;
	let boardSize = w * cellSize;

	let pBoard: PBoard = setPBoard(10, 6, pentaminoTi);
</script>

<p>Both editors will diverge. Baord editor will display in black occupied cells.
	So the perimeter is uneeded. A tile editor will enforce a single connex part
</p>
<p>A start at a board editor</p>
<div class="container" style="height:{boardSize}px;">
	<Grid squareSize={cellSize} matrix={tile} mode={GridMode.BoardEditor} />
</div>
<p>A start at a tile editor</p>
<div class="container" style="height:{boardSize}px;">
	<Grid squareSize={cellSize} matrix={tile} mode={GridMode.TileEditor} />
</div>

<hr />
<p>A tile board and a problem board. One drag a tile from the former to
	drop it in the latter. (drop TBD)
</p>
<div>
	<TileBoard {pBoard} {cellSize} />
	<PPBoard {pBoard} />
</div>

<style>
	.container {
		position: relative;
	}
</style>
