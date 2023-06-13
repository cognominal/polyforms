<script lang="ts">
	import { setPBoard, solve, genSolver } from '$lib/polyform';
	import type { Tile, Int, LPos, Pos, PBoard, TileInfo, FloatingTile } from '$lib/polyform';
	import PPBoard from '$lib/PPBoard.svelte';
	function simpleProblem() {
		const pboard = setPBoard(2, 2, ['x', 'xx\nx']);
		const boards = solve(pboard);
		return boards[0];
	}
	function solverIterator() {
		const pboard = setPBoard(3, 2, [ {s: 'x', nr: 3}, 'xx\nx']);
		return genSolver(pboard);
	}

	let gen = solverIterator();
	let pboards: PBoard[] = [];
	let result = gen.next();
	let s = '';
	let v: PBoard;
	while (result.done === false) {
		pboards.push(result.value);
		result = gen.next();
	}
</script>

<!-- <PPBoard pboard={simpleProblem()} /> -->
<hr />
{#each pboards as pboard}
	<div><PPBoard {pboard} /></div>
{/each}
