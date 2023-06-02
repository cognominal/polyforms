<script lang="ts">
    import {calcPolyominos} from '$lib/polyform'
    import type { TileInfo } from '$lib/polyform'
    import Pentamino from '$lib/Polyform.svelte'
    import Grid from '$lib/Grid.svelte'
    let ti : TileInfo[][] = calcPolyominos(6)
    let pentaminoTi = ti[4]
    let tile = pentaminoTi[0].orients[0].matrix
</script> 

<div class="container">
<Grid w={8} h={8} squareSize={8} matrix={tile} active={true} />
<Pentamino {tile} squareSize={8} />
<!-- <PiecesBoard></PiecesBoard> -->
</div>

<style>
.container {
    position: relative;
  }
</style>