<script lang="ts">
	import {} from '$lib/polyform';
	import type { Int, Tile, Matrix } from '$lib/polyform';
	import _ from 'lodash'
	// import log from 'console';
	export let w: Int;
	export let h: Int;
	export let squareSize: Int;
	export let matrix: Matrix;
	export let active: boolean;
	const cw = w * squareSize;
	const ch = h * squareSize;
	function gridrectClass(y: number, x: number): string {
		return matrix[y][x] == 0 ? 'gridrect-free' : 'gridrect-occupied';
	}

    function handleClick(evt: MouseEvent) {
            let target = evt.target as SVGElement
        console.log(target.id)
		let nm = _.cloneDeep(matrix)
    }
    function handleKey(evt:KeyboardEvent) {
        
    }
</script>

<!-- <span class="contained"> -->
	<span class="contained" on:click={handleClick} on:keypress={handleKey}>
	<svg width={cw} height={ch} viewBox="0 0 {cw} {ch}">
		{#each Array(h + 1) as _, i}
			<line x1="0" y1={i * squareSize} x2={squareSize * w} y2={i * squareSize} class="gridline" />
		{/each}
		{#each Array(w + 1) as _, i}
			<line y1="0" x1={i * squareSize} y2={squareSize * h} x2={i * squareSize} class="gridline" />
		{/each}
		{#each matrix as item, y}
			{#each item as _, x}
				<rect
					x={x * squareSize}
					y={y * squareSize}
					width={squareSize}
					height={squareSize}
					id="{x}-{y}"
					class={gridrectClass(y, x)}
				/>
			{/each}
		{/each}
	</svg>
</span>

<style>
	.contained {
		position: absolute;
	}
	.gridline {
		stroke: grey;
		stroke-width: 0.5;
	}
	.gridrect-free {
		fill: rgb(93, 102, 29);
		fill-opacity: 0.1;
	}
	.gridrect-free:hover {
		fill: gray;
		fill-opacity: 0.8;
	}
	.gridrect-occupied {
		fill: lightgreen;
		opacity: 0.5;
	}
	.gridrect-occupied:hover {
		opacity: 0.5;
		fill: green;
	}
</style>
