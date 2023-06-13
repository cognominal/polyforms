<script lang="ts">
	import { toSafeInteger } from 'lodash';
	import { calcPolyominos, setPBoard, GridMode, 
		solveRectangle, solveRectangleToString, solve, genSolver } from '$lib/polyform';
	import type { TileInfo, PBoard } from '$lib/polyform';
	import Pentamino from '$lib/Polyform.svelte';
	import Tile from '$lib/Tile.svelte';
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


	const boardSizes = [[1, 1 ],[1, 2], [2, 3], [4,5], [6,10] ]
	const pboards = boardSizes.map(([w, h], i) => setPBoard(w, h, ti[i]))
	let pboard: PBoard = setPBoard(10, 6, pentaminoTi);

	function simpleProblem() {
		const pboard = setPBoard(1, 1, 'x')
		const boards = solve(pboard)
		return boards[0]

	}

	// function _simpleProblem() {
	// const pboard = setPBoard(1, 1, 'x')
    //     const gen = genSolver(pboard)
    //     let i = 0
    //     let v: PBoard
    //     while (gen.next().done === false) {
    //         i++
    //         v = gen.next().value as PBoard

    //     }
	// 	return v as PBoard
	// }
	// simpleProblem()
</script>

<p>Board editor. Click to toggle between a free or a forbidden cell</p>
<div class="container" style="height:{boardSize}px;">
	<Grid squareSize={cellSize} matrix={tile} mode={GridMode.BoardEditor} />
</div>
<p>Tile editor. A tile must be connex</p>
<div class="container" style="height:{boardSize}px;">
	<Grid squareSize={cellSize} matrix={tile} mode={GridMode.TileEditor} />
</div>

<hr />
<p>
	A tile board and a problem board. One drags a tile from the former to drop it in the latter.
	Currently the grid has been removed because it interfers with drag events. When there are many
	instances of a tile, the number of instances is displayed in the tile (correct CSS TBD). The tile
	board is filled with pentaminoes created by the generator of polyominos.
</p>
{#each pboards as pboard, i}
	<div>
		<TileBoard {pboard} {cellSize} />
		<PPBoard {pboard} />
	</div>
{/each}

<p>Experimenting with tile flip/rotation transition</p>

<Tile {pboard} tileI={4} />

<p>printing simple solved board</p>

<PPBoard pboard={simpleProblem()} />

<style>
	.container {
		position: relative;
	}
</style>
