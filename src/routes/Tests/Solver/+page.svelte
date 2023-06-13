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
		const pboard = setPBoard(2, 2, ['x', 'xx\nx']);
		return genSolver(pboard);
	}


</script>

<!-- <PPBoard pboard={simpleProblem()} />
<hr/>
{#each solverIterator() as item}
<PPBoard pboard={item} />

{/each} -->
