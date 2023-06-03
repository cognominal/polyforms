<script lang="ts">
    import { calcPolyominos } from '$lib/polyform';
    import type { TileInfo, Int, PBoard } from '$lib/polyform';
    import Polyform from './Polyform.svelte';
    import Grid from './Grid.svelte';
    export let pBoard : PBoard;
 </script>

<Grid  squareSize={8} matrix={pBoard.board}/>

