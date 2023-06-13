<script lang="ts">
    import { tick } from 'svelte';
    import { genSolver, pentaminosTI, setPBoard } from '$lib/polyform'
    import type { PBoard } from '$lib/polyform'
    import PPBoard from '$lib/PPBoard.svelte'


    let pboard = setPBoard(6, 10, pentaminosTI)
    const gen = genSolver(pboard) 

    let nr = 0
    const { done, value } = gen.next()
    pboard = value as PBoard


    async function updateBoard() {
        while (true) {
            const { done, value } = gen.next()
            if (done) break
            pboard = value
            pboard = pboard
            await tick()
        }
    }

    // updateBoard()
</script>

<div>{nr}</div>
<div>{done}</div>

<div><PPBoard {pboard} /></div>
