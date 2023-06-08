

<script lang="ts">
	// import '$lib/global.css'
	import { dropzone } from '$lib/dnd'
	import { connexParts, occupiedCell, perimeterPolylinePoints, dcolors } from '$lib/polyform';
	import { type Int, type Pos, type Tile, type Matrix, GridMode } from '$lib/polyform';
	import type { TileDropInfo } from '$lib/polyform';
	import _ from 'lodash';
	// import log from 'console';
	export let squareSize: Int;
	export let matrix: Matrix;
	export let w: Int = matrix[0].length;
	export let h: Int = matrix.length;
	export let mode: GridMode;
	const cw = w * squareSize;
	const ch = h * squareSize;
	let connexParts_: Pos[][] = [];
	$: connexParts_ = connexParts(matrix, occupiedCell);

	function gridrectClass(matrix: Int[][], y: number, x: number): string {
		const _class = matrix[y][x] == 0 ? 'gridrect-free' : 'gridrect-occupied';
		if (mode == GridMode.Play) {
			return _class + '-play'; // no hover effect non play mode
		} else {
			return _class;
		}
	}

	function handleClick(evt: MouseEvent) {
		if (mode == GridMode.TileEditor || mode == GridMode.BoardEditor) {
			let target = evt.target as SVGElement;
			// let nm = _.cloneDeep(matrix);
			const [x, y] = target.id.split('-').map((s) => parseInt(s));
			matrix[y][x] = matrix[y][x] == 0 ? 1 : 0;
			if (mode == GridMode.TileEditor && connexParts(matrix, occupiedCell).length != 1) {
				matrix[y][x] = matrix[y][x] == 0 ? 1 : 0; // revert
			}
			matrix = matrix;
		}
	}
	function handleKey(evt: KeyboardEvent) {}

</script>

<span class="contained" on:click={handleClick} on:keypress={handleKey} >
	<!-- Draw the grid proper	-->
	<svg width={cw} height={ch} viewBox="0 0 {cw} {ch}">
		{#each Array(h + 1) as _, i}
			<line x1="0" y1={i * squareSize} x2={squareSize * w} y2={i * squareSize} class="gridline" />
		{/each}
		{#each Array(w + 1) as _, i}
			<line y1="0" x1={i * squareSize} y2={squareSize * h} x2={i * squareSize} class="gridline" />
		{/each}
		<!--  Draw the grid cells -->
		{#each matrix as item, y}
			{#each item as _, x}
				<rect
					x={x * squareSize}
					y={y * squareSize}
					width={squareSize}
					height={squareSize}
					id="{x}-{y}"
					class={gridrectClass(matrix, y, x)}
				/>
			{/each}
		{/each}
		<!-- draw the perimeter of the connex parts -->
		{#if mode != GridMode.BoardEditor}
			{#each connexParts_ as part, i}
				<polyline
					points={perimeterPolylinePoints(matrix, squareSize, part)}
					style="fill:{dcolors[i]};stroke:black;stroke-width:1"
					class="noevents"
				/>
			{/each}
		{/if}
	</svg>
</span>

<style>
	.noevents {
		pointer-events: none;
	}
	.contained {
		position: absolute;
	}
	.gridline {
		stroke: grey;
		stroke-width: 0.5;
	}

	.gridrect-free-play {
		fill: rgb(93, 102, 29);
		fill-opacity: 0.1;
	}
	.gridrect-occupied-play {
		fill: lightgreen;
		opacity: 0.5;
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
		fill: black;
		opacity: 0.5;
	}
	.gridrect-occupied:hover {
		opacity: 0.5;
		fill: green;
	}

	:global(.droppable) {
		outline: 0.1rem solid var(--sk-theme-1);
		outline-offset: 0.25rem;
	}

	:global(.droppable) * {
		pointer-events: none;
	}

</style>
