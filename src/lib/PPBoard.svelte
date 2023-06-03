<script lang="ts" context="module">
	import { asDroppable } from 'svelte-drag-and-drop-actions';
	// import DragDropTouch from 'svelte-drag-drop-touch';
</script>

<script lang="ts">
	import { calcPolyominos, GridMode } from '$lib/polyform';
	import type { TileInfo, Int, PBoard } from '$lib/polyform';
	import Polyform from './Polyform.svelte';
	import Grid from './Grid.svelte';
	export let pBoard: PBoard;
</script>

<Grid mode={GridMode.Play} squareSize={8} matrix={pBoard.board} />
