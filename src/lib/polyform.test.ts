import { describe, it, expect } from 'vitest';
import { connexParts, occupiedCell, polyominoFloodFillWalk, isWithinMatrix, calcPerimeter } from '$lib/polyform';
import type { PBoard } from '$lib/polyform';
import * as calc from '$lib/polyform'
describe('sanity', function () {
    it('sanity', () => {
        expect(1).toBe(1)
    })
})

describe('matrix utils', function () {
    it('walkMatrixPred', () => {
        const m = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
        const r = calc.walkMatrixPred(m, (x) => x == 4)
        expect(r).toEqual({ x: 1, y: 1 })
    })
})
describe('tile utils', function () {
    const tile = calc.newTile(2)
    it('newTile 1', () => {
        expect(tile).toEqual([[0, 0], [0, 0]])

    })
    it('newTile 2', () => {
        const tile2 = calc.newTile(2)
        expect(tile2).toEqual([[0, 0], [0, 0]])
    })

    it('normalizeTile', () => {
        const t0 = [[0, 1, 2], [0, 3, 4], [0, 0, 0]]
        const t1 = [[0, 0, 0], [1, 2, 0], [3, 4, 0]]
        const n = [[1, 2, 0], [3, 4, 0], [0, 0, 0]]
        const n0 = calc.normalizeTile(t0)
        const n1 = calc.normalizeTile(t1)
        expect(n0).toEqual(n)
        expect(n1).toEqual(n)
        // const n = no        

    })
    it('flipTile', () => {
        const t1 = [[1, 2], [3, 4]]
        expect(calc.flipTile(t1)).toEqual([[3, 4], [1, 2]])
        const t2 = [[0, 1, 2], [0, 3, 4], [0, 0, 0]]
        const ftn2 = [[3, 4, 0], [1, 2, 0], [0, 0, 0]]
        expect(calc.flipTile(t2)).toEqual(ftn2)
        const ft2 = [[0, 0, 0], [0, 3, 4], [0, 1, 2]]
        expect(calc.flipTile(t2, false)).toEqual(ft2)

    })
    it('rotateTile', () => {
        const t1 = [[1, 2], [3, 4]]
        const rt1 = [[3, 1], [4, 2]]
        expect(calc.rotnmino(t1)).toEqual(rt1)
        const t2 = [[0, 1, 2], [0, 3, 4], [0, 0, 0]]
        const rtn2 = [[3, 1, 0], [4, 2, 0], [0, 0, 0]]
        const rt2 = [[0, 0, 0], [0, 3, 1], [0, 4, 2]]
        expect(calc.rotnmino(t2)).toEqual(rtn2)
        expect(calc.rotnmino(t2, false)).toEqual(rt2)

    })
    it('test calc.enlargeTile', () => {
        const t1 = [[1]]
        const t2 = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
        expect(calc.enlargeTile(t1)).toEqual(t2)

    })
    it('test calc.stripTile', () => {
        const t1 = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
        const t2 = [[1]]
        expect(calc.stripTile(t1)).toEqual(t2)

    })



})
describe('conversions', function () {
    const crossString = " x\nxxx\n x"
    const crossTile = [[0, 1, 0], [1, 1, 1], [0, 1, 0]]

    // it('opts.tileNm', () => {
    //     log('help')
    //     log(calc.tileToString([[1]]))

    // });

    it('stringToTile', () => {
        const t = calc.stringToTileInstance(crossString)
        expect(t.tile).toEqual(crossTile)
        expect(t.nr).toEqual(1)
    })

    it('round trip', () => {
        const s = calc.tileToString(calc.stringToTileInstance(crossString).tile)
        expect(crossString, s)

    })
})

1
const polyominos = calc.calcPolyominos(6)

describe('polyominos', function () {
    // it('uniqueOrients', () => {
    //     const s = "###\n #"
    //     const t = calc.stringToTile(s, 3)
    //     const u = calc.maybeTileInfo(t.tile)
    //     expect(u.orients.length).toEqual(4)
    //     const os = u.orients.map(x => calc.tileToString(x.matrix)).join('\n')

    //     const expected = "xxx\n x\n\n x\nxx\n x\n\n x\nxxx\n\nx\nxx\nx\n"
    //     expect(os).toEqual(expected)

    // })
    it('generations', () => {
        const s = polyominos.map(t => t.length).join(',')
        expect(s).toEqual('1,1,2,5,12,35')
    })

})

describe('solver', function () {
    const c = calc.solveRectangleToString
    it('solve monomino board', () => {
        expect(c(1, 1, 'x')).toEqual("A\n")

    })
    it('solve domino, horizontal board', () => {
        expect(c(1, 2, 'xx')).toEqual("AA\n")

    })
    it('solve domino vertical board', () => {
        expect(c(2, 1, 'xx')).toEqual("A\nA\n")

    })

    it('solve two monominos on horizontal  board', () => {
        const s = c(1, 2, { s: 'x', nr: 2 })
        expect(s).toEqual("AB\n")

    })
    it('solve two monominos on vertical board', () => {
        expect(c(2, 1, { s: 'x', nr: 2 })).toEqual("A\nB\n")

    })
    it('solve with two different pieces', () => {
        const s = 'AB\nBB\n\nAA\nAB\n\nAA\nBA\n\nAB\nAA\n'

        expect(c(2, 2, ['x', 'xx\nx'])).toEqual(s)

    })
    it('perimeter', () => {
        function stringToPerimeter(s: string, expected: string) {
            const squareSize = 8
            const tile = calc.stringToTile(s)
            const perimeter = calcPerimeter(tile)
            const points = perimeter.map((coord) => `${coord.x * squareSize},${coord.y * squareSize}`)
            const pointsS = points.join(' ')
            // log(pointsS)
            expect(pointsS).toEqual(expected)

        }
        stringToPerimeter("x", "0,0 8,0 8,8 0,8 0,0")
        stringToPerimeter(" x\nxxx\n x", "8,0 16,0 16,8 24,8 24,16 16,16 16,24 8,24 8,16 0,16 0,8 8,8 8,0")

    })
})



// describe('pentaminos', function () {
//     const pentaminos = polyominos[4]
//     it('6x10', () => {
//         expect(pentaminos.length).toEqual(12)
//         const solutions = calc.solveRectangleToString(20, 3, pentaminos)
//         log(solutions.length)

//     })

// })z


describe('sanity', () => {
    it('sanity', () => {
        expect(true).toBe(true);
    });
});

describe('isWithinMatrix', () => {
    it('isWithinMatrix', () => {
        const matrix = [[0]]
        expect(isWithinMatrix(matrix, 0, 0)).toBe(true)
        expect(isWithinMatrix(matrix, -1, 0)).toBe(false)
        expect(isWithinMatrix(matrix, 0, -1)).toBe(false)
        expect(isWithinMatrix(matrix, 1, 0)).toBe(false)
        expect(isWithinMatrix(matrix, 0, 1)).toBe(false)
    }
    )
})


describe('connexity', () => {
    it('connexity', () => {
        const matrix = [[0, 1, 1], [1, 0, 0], [0, 1, 1]]
        const expected = [
            [{ x: 1, y: 0 }, { x: 2, y: 0 }],
            [{ x: 0, y: 1 }],
            [{ x: 1, y: 2 }, { x: 2, y: 2 }]
        ]
        expect(connexParts(matrix, occupiedCell, polyominoFloodFillWalk)).toStrictEqual(expected)

    })
})

describe('solver generator', () => {
    it('solver generator', () => {
        const pboard = calc.setPBoard(1, 1, 'x')
        const gen = calc.genSolver(pboard)
        let i = 0
        let v: PBoard
        while (gen.next().done === false) {
            i++
            v = gen.next().value as PBoard

        }
        expect(i).toEqual(1)
        calc.laidTilesToString(v)
        // console.log(calc.laidTilesToString(v));
    })


});