<script lang="ts">
	import { calcPolyominos, GridMode } from '$lib/polyform';
	import type { TileInfo, Int, PBoard } from '$lib/polyform';
	import Polyform from './Polyform.svelte';
	import Grid from './Grid.svelte';
	export let pBoard: PBoard;
	import type { TileDropInfo } from '$lib/polyform';
	import { dropzone } from '$lib/dnd'
	import '$lib/global.css';

	function on_dropzone(dataAsText: string , e: MouseEvent ) {
		let data = JSON.parse(dataAsText);
		console.log("on_dropzone", data, e);
		
	}


</script>


<div class="bboard" use:dropzone={on_dropzone }>
<!-- <Grid mode={GridMode.Play} squareSize={8} matrix={pBoard.board} /> -->
</div>

<style>
	.bboard {
		width: 100px;
		height: 100px;
		background-color: lightgray;
	}
	:global(.dropZone) {
		outline: 0.1rem solid var(--sk-theme-1);
		outline-offset: 0.25rem;
	}

	:global(.dropZone) * {
		pointer-events: none;
	}	




</style>