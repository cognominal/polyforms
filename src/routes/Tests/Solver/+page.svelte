<script lang="ts">
	import { setPBoard, solve, genSolver } from '$lib/polyform';
	import type { Tile, Int, LPos, Pos, PBoard, TileInfo, FloatingTileInfo } from '$lib/polyform';
	import PPBoard from '$lib/PPBoard.svelte';
	function simpleProblem() {
		const pboard = setPBoard(2, 2, ['x', 'xx\nx']);
		const boards = solve(pboard);
		return boards[0];
	}
	function solverIterator() {
		const pboard = setPBoard(3, 4, [{ s: 'xxx', nr: 2 }, { s: 'x', nr: 3 }, 'xx\nx']);
		return genSolver(pboard);
	}

	let gen = solverIterator();
	let pboards: PBoard[] = [];
	let debug: boolean[] = [];
	let result = gen.next();
	let s = '';
	let v: PBoard;
	while (result.done === false) {
		pboards.push(result.value);
		debug.push(false);
		result = gen.next();
	}
</script>


{#each pboards as pboard, i}
	<hr/>
	<span id="label">
	{i}
	<label>
		<input type="checkbox" bind:checked={debug[i]} />
		debug
	</label>
	</span>
	<div><PPBoard {pboard} DEBUG={debug[i]} /></div>
{/each}

<!-- <style>
	label { display: none; }
	label:hover {  display: inline-block; }
</style> -->