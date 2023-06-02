<script lang="ts">
    import { calcPerimeter, perimeterPolylinePoints }  from '$lib/polyform'
    import type { Tile, Int, Pos } from '$lib/polyform'
    // import type { DragActions } from '$lib/drag'
    export let tile : Tile
    export let squareSize = 8
    
    let boardSize =  50 // tile[0].length *squareSize
    // export let dragActions: DragActions
</script>
<svg width="{boardSize}" height="{boardSize}" viewBox="0 0 {boardSize} {boardSize}">
        <polyline points={perimeterPolylinePoints(tile, squareSize)} class="pentamino draggable"/>
</svg>
<!-- </span> -->

<style>
    .pentamino {
        fill: lightblue;
        stroke: red;
        stroke-width: 2;
    }

    .draggable {
        cursor: move;
    }

    .pentamino:hover {
        fill: blue;
    }
    
</style>
