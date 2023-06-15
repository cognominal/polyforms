<script lang="ts">
    const numRows = 10;
    const numCols = 10;
    const hexSize = 50;
    const hexHeight = Math.sqrt(3) * hexSize;
    const hexWidth = 2 * hexSize;
    const gridWidth = numCols * hexWidth + hexSize;
    const gridHeight = numRows * hexHeight + hexHeight / 2;
  </script>
  
  <style>
    .hex {
      fill: #ccc;
      stroke: #000;
      stroke-width: 2;
    }
  </style>
  
  <svg width={gridWidth} height={gridHeight}>
    {#each Array(numRows) as _, row}
      {#each Array(numCols) as _, col}
        <g transform={`translate(${col * hexWidth + (row % 2) * hexSize}, ${row * hexHeight})`}>
          <polygon class="hex" points={`${hexSize},0 ${hexWidth},${hexHeight / 2} ${hexWidth},${hexHeight / 2 + hexHeight} ${hexSize},${hexHeight * 2} 0,${hexHeight / 2 + hexHeight} 0,${hexHeight / 2}`} />
        </g>
      {/each}
    {/each}
  </svg>