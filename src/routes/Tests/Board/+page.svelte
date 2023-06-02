<script lang="ts">
    import {calcPolyominos} from '$lib/polyform'
    import type { TileInfo } from '$lib/polyform'
    import Pentamino from '$lib/Polyform.svelte'
    import Grid from '$lib/Grid.svelte'
    let ti : TileInfo[][] = calcPolyominos(6)
    let pentaminoTi = ti[4]
    let tile = pentaminoTi[0].orients[0].matrix
    let w = 8
    let h = 8
    let squareSize = 8
    let boardSize = w * squareSize
</script> 

<div class="container" style="height:{boardSize}px;">
<Grid {w} {h} {squareSize} matrix={tile} active={false} />
<!-- <Pentamino {tile} squareSize={8} /> -->
<!-- <PiecesBoard></PiecesBoard> -->
</div>
<hr/> 
<!-- <div class="container" style="height:{boardSize}px;">
<Grid w={8} h={8} squareSize={8} matrix={tile} active={true} />
</div> -->
<style>
.container {
    position: relative;
  }
</style>