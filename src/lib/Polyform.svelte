<script lang="ts">
    import { calcPerimeter,  }  from '$lib/polyform'
    import type { Tile, Int, Pos } from '$lib/polyform'
    // import type { DragActions } from '$lib/drag'
    export let tile : Tile
    export let squareSize = 8
    
    let boardSize =  50 // tile[0].length *squareSize
    // export let dragActions: DragActions
    function polylinePoints(pentomino: Tile) {
        let perimeter = calcPerimeter(tile);
        let points = perimeter.map(  (coord) => `${coord.x*squareSize},${coord.y*squareSize}` )
        return points.join(' ')
    }
</script>
<svg width="{boardSize}" height="{boardSize}" viewBox="0 0 {boardSize} {boardSize}">
        <polyline points={polylinePoints(tile)} class="pentamino draggable">
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
    }p

    .pentamino:hover {
        fill: blue;
    }
    
</style>
