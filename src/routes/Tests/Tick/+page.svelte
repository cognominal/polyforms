<script lang="ts">
	import { tick } from 'svelte';
	import { genSolver, pentaminosTI, setPBoard } from '$lib/polyform';
	import type { PBoard } from '$lib/polyform';

	import PPBoard from '$lib/PPBoard.svelte';
	import _ from 'lodash';

	let _pboard = setPBoard(6, 10, pentaminosTI);
	let pboards: PBoard[] = [];
	const gen = genSolver(_pboard, 0);

	async function updateBoard() {
		_.range(100).forEach(async () => {
			const { done, value } = gen.next();
			if (!done) {
				pboards.push(value as PBoard);
			}
		});
	}

    updateBoard();
</script>


{#each pboards as pboard}
	<div><PPBoard {pboard} DEBUG={true}/></div>
{/each}
