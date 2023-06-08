<script lang="ts">
	import { calcPolyominos, GridMode } from '$lib/polyform';
	import type { TileInfo, Int, PBoard } from '$lib/polyform';
	import Polyform from './Polyform.svelte';
	import Grid from './Grid.svelte';
	export let pBoard: PBoard;
	import type { TileDropInfo } from '$lib/polyform';
	import { dropzone } from '$lib/dnd'
	import '$lib/global.css';

	function on_dropzone(data: string , e: MouseEvent ) {
		let parsedData = JSON.parse(data);
		console.log("on_dropzone", parsedData, e);
		
	}


</script>


<div use:dropzone={{on_dropzone }} >
<Grid mode={GridMode.Play} squareSize={8} matrix={pBoard.board} 
/>
</div>