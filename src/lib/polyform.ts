import _ from 'lodash'

//#region preliminary remarks
// the endgame is doing many types of polyform. Currently the square values
// are one or zero. For other polyforms, a square will potentially hold
// many cells of a polyform. The number for a square will reflect that.
// The code has been designed to be eventually adaptable to polyforms other
// than polyominos.

// my polyomino generator is extremely naive and explodes the GC at the 12th generation
// probably all the tentavive orientations are somehow accesiible and should not be.
// learning ts, I reenvented many wheels. Many things should be rewritten using `loash` functions.

// I started using old C style `for(;;)` loops and then switched to `forEach` than to `map` and `filter`
//#endregion

//#region types
export type Int = number
// Position on a board or relative position of a square in a tile
export type Pos = { x: Int, y: Int }
// Seen as object with squares, Tiles, Boards and orient are
// just a bidimentional array of integers
// We assume tile to be connex so no empty rows or columns except 
// at the beginning and the end
export type Matrix = Int[][] // non null integers are squares of the tile
export type Tile = Matrix
// type Board = Int[][]
// firstX is the x coordinate of the first occupied square of the tile
type Orient = { matrix: Int[][], firstX: Int }
// An alternative representation of a tile orientation with the coordinates of the squares
// type FTile = [Pos]

//   pboard being a PBoard  an orientation is accessed as pboard.tileInfos[tileI].orients[orientI]
type OrientIdx = { tileI: Int; orientI: Int }
// A laid title has a position and an orientation 
type laidTile = { pos: Pos; idx: OrientIdx }
// A tile has a name and a list of orients
// As instances are laid, `instancesLeft` is decremented
export type TileInfo = { orients: Orient[]; name?: string }


// A problem board or `PBoard` is self contained and represents a problem to solve
// or the state of thearch
// has a board to fill, a list of tile infos
// about the tiles to lay,
// a list of already laid tiles, 
export type PBoard = {
    board: Int[][] // 0 = empty, 1 = filled
    laidTiles: laidTile[]
    tilesInfo: TileInfo[]
    tilesLeft: Int[] // number of tiles instances left for each tile
    // idx: OrientIdx

}
type TileAsString = { s: string, nr: Int } | string
type TileInstance = { tile: Tile, nr: Int } // nr is the number of instances of the tile

type ConnectedParts = Map<string, Int>
export enum GridMode { TileEditor, BoardEditor, Play }

// distinctive colors, lfted from https://sashamaps.net/docs/resources/20-colors/
export const dcolors =  ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0',
 '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', 
 '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']
 enum PolyformType { Polyomino, Polyabolo, Polyiamond, Polyhex }


//#endregion
//#region random stuff
// for polyominos
const relativeAdjacent = [{ x: 1, y: 0 }, { x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 1 }]
// for hexaminoes, untested
// impairs rows are shifted to the right
// function hexaminosRelativeAdjacent(y: Int): Pos[] {
//     const m = y % 2
//     return [{ x: 1, y: 0 }, { x: -1, y: 0 }, // horizontal adjacents
//     { x: m - 1, y: -1 }, { x: m, y: -1 }, { x: m - 1, y: 1 }, { x: m, y: 1 }]
// }

export function isWithinMatrix(m: Int[][], x: Int, y: Int): boolean {
    if (x < 0 || y < 0) return false
    if (y >= m.length || x >= m[0].length) return false
    return true
}
//#endregion
//#region  string to matrix and back

function mkMatrix(size: Int): Int[][] {
    return _.range(size).map(() => Array(size).fill(0))
}

export function stringToTile(s: string): Tile {
    s = _.trimEnd(s)
    const lns = s.split('\n')
    const h = lns.length
    const w = lns.reduce((acc, l) => Math.max(acc, l.length), 0)
    const tile = mkMatrix(Math.max(h, w))
    lns.forEach((l: string, rowI) => {
        l = l.trimEnd()
        l.split('').forEach((c, colI) => {
            tile[rowI][colI] = c == ' ' ? 0 : 1
        })
    })
    return tile
}

export function stringToTileInfo(s: string): TileInfo {
    const nm = _.find(s.split(''), c => c != ' ' && c != '\n')
    return { orients: [stringOrient(s)], name: nm }
}

export function stringOrient(s: string): Orient {
    const t = stringToTile(s)
    const firstX = _.findIndex(t[0], v => v !== 0) as Int
    return { matrix: t, firstX }
}


export function stringToTileInstance(s: string, nr = 1): TileInstance {
    return { tile: stringToTile(s), nr }
}

//#endregion

//#region connected parts
const right = { x: 1, y: 0 }
const down = { x: 0, y: 1 }
const left = { x: -1, y: 0 }
const up = { x: 0, y: -1 }
const walk = [right, down, left, up]
type Pos = { x: Int, y: Int }
type Int = number

// different from the perimeter walk, we fill right and down because up and left are already explored
export const polyominoFloodFillWalk = [right, down]
export const polyhexFloodFillWalk = [down, right] // TBD



export function connexParts(matrix: Int[][], pred: CellPredicate,
    walk: Pos[] = polyominoFloodFillWalk): Pos[][] {
    const connectedParts: Pos[][] = []
    let connexIdx = 0
    function key(x: Int, y: Int) {
        return `${x},${y}`
    }
    function floodFill(x: Int, y: Int, connectedPart: Pos[]) {
        for (const dir of walk) {
            const cx = x + dir.x
            const cy = y + dir.y
            MaybeAddCell(cx, cy, connectedPart)
        }
    }

    function MaybeAddCell(x: Int, y: Int, connectedPart) {
        if (isWithinMatrix(matrix, x, y) && pred(matrix, x, y)) {
            if (!map.has(key(x, y))) {
                map.set(key(x, y), connexIdx)
                connectedPart.push({ x, y })
                floodFill(x, y, connectedPart)
            }
        }
    }
    const map: Map<string, number> = new Map()
    matrix.map((row, y) => row.map((cell, x) => {
        const connectedPart: Pos[] = []
        if (pred(matrix, x, y) && !map.has(key(x, y))) {
            MaybeAddCell(x, y, connectedPart) // add first cell to `connectedPart`, not maybe here
            connexIdx++
            connectedParts.push(connectedPart)
        }
    }))
    return connectedParts
}

type CellPredicate = (matrix: Int[][], x: Int, y: Int) => boolean
export const occupiedCell: CellPredicate = (matrix, x, y) => {
    return matrix[y][x] != 0
}
export const freeCell: CellPredicate = (matrix, x, y) => {
    return matrix[y][x] == 0
}


//#endregion

//#region  calculate the next generation of polyominos 

// maybeTileInfo used with the map returns unique orientations, if any, 
// among the set of polyominos, or null if none
// while calcTileInfo returns unique orientation for the current polyomino

export function calcTileInfo(tile: Tile): TileInfo { return maybeTileInfo(tile) as TileInfo }

export function maybeTileInfo(tile: Tile, tileIdx?: Int, orientToTileIdx?: Map<string, Int>): TileInfo | null {
    const n1 = normalizeTile(tile)
    const sn1 = tileToString(n1)
    if (!orientToTileIdx) orientToTileIdx = new Map<string, Int>()
    if (orientToTileIdx.has(sn1)) return null
    orientToTileIdx.set(sn1, tileIdx as Int)

    const n2 = rotnmino(n1)
    const n3 = rotnmino(n2)
    const n4 = rotnmino(n3)
    const n5 = flipTile(n4)
    const n6 = rotnmino(n5)
    const n7 = rotnmino(n6)
    const n8 = rotnmino(n7)
    const newTiles = [n2, n3, n4, n5, n6, n7, n8]
    const filtered = newTiles.filter(t => {
        const s = tileToString(t)
        // if any orientation of the ti le has already been seen, it is not a new tile
        if (!orientToTileIdx) return true
        if (orientToTileIdx.has(s)) return false
        orientToTileIdx.set(s, tileIdx as Int)
        return true
    })
    // if (uniqueOrients.length === 0) return null
    const orients: Orient[] = [n1, ...filtered].map(m => {
        const firstX = _.findIndex(m[0], v => v !== 0) as Int
        return { matrix: m, firstX }
    })
    const tileInfo: TileInfo = { orients }
    return tileInfo
}

// const polyhexActions = []
// const polyominosActions = [rotnmino, rotnmino, rotnmino, flipTile, rotnmino, rotnmino, rotnmino]
// // const polyominosActions = [rotnmino, rotnmino, rotnmino, flipTile, rotnmino, rotnmino, rotnmino]
// export function mkOrients(): Orient[] {

// }

export function calcGenPolyominos(tilesInfo: TileInfo[]): TileInfo[] {
    const newGeneration: TileInfo[] = []
    const orientToTileIdx = new Map<string, Int>
    let tileIdx = 0

    function addToNewGenerationUniqueOrientations(tile: Tile) {
        if (orientToTileIdx.has(tileToString(tile))) return
        const tileInfo = maybeTileInfo(tile, tileIdx, orientToTileIdx)
        if (tileInfo !== null) {
            newGeneration.push(tileInfo)
            tileIdx++
        }

    }

    tilesInfo.forEach(tileInfo => {
        const tile = tileInfo.orients[0]
        const t: Tile = enlargeTile(tile.matrix)
        const sz = t.length
        _.range(1, sz - 1).forEach((y) => {
            _.range(1, sz - 1).forEach((x) => {
                if (t[y][x] !== 0) {
                    relativeAdjacent.forEach(adj => {
                        const ax = x + adj.x
                        const ay = y + adj.y
                        if (t[ay][ax] === 0) {
                            const ct = copyTile(t)
                            ct[ay][ax] = 1
                            addToNewGenerationUniqueOrientations(ct)
                        }
                    })
                }
            })
        })
    });

    return newGeneration
}

//#endregion
//#region tile as 2d array manipulations

// make space in four directions

/**
 * Create a new tile
 * @param size size of tile or another tile from which to copy size
 * @returns new tile of specified size
 */
export function newTile(size: Int | Tile): Tile {
    // determine size of new tile
    const sz: Int = typeof size === 'number' ? size : size[0].length
    return _.range(sz).map(() => Array(sz).fill(0))
}

export function copyTile(t: Tile): Tile {
    const o: Tile = []
    for (let i = 0; i < t.length; i++) {
        const oRow: Int[] = []
        o.push(oRow)
        const tRow = t[i]
        for (let j = 0; j < tRow.length; j++) {
            oRow.push(tRow[j])
        }
    }
    return o
}

export function eqtiles(a: Tile, b: Tile): boolean {
    a = normalizeTile(a)
    b = normalizeTile(b)
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
        if (a[i].length !== b[i].length) return false
        for (let j = 0; j < a[i].length; j++) {
            if (a[i][j] !== b[i][j]) return false
        }
    }
    return true
}

// assume non empty Tile
// offset will be use give place to augment a n-omino to generate n+1-minos
export function normalizeTile(o: Tile, offset = 0): Tile {
    const sz = o[0].length
    const n: Tile = newTile(sz + offset)
    let firstx = sz
    let firsty: Int | undefined = undefined
    for (let y = 0; y < sz; y++) {
        for (let x = 0; x < sz; x++) {
            if (o[y][x] != 0) {
                if (firsty === undefined) {
                    firsty = y
                }
                if (x < firstx) {
                    firstx = x
                }
                break
            }
        }
    }
    for (let y = 0; y < sz - firsty; y++) {
        for (let x = 0; x < sz - firstx; x++) {
            n[y + offset][x + offset] = o[y + firsty][x + firstx]
        }
    }
    return n;
}

// Add borders of zeros around a tile
export function enlargeTile(tile: Tile): Tile {
    const enlargedTile = tile.map(row => {
        const newRow = row.map(square => {
            return square
        })
        newRow.push(0)
        newRow.unshift(0)
        return newRow
    })
    const firstRow = Array(enlargedTile[0].length).fill(0)
    const lastRow = Array(enlargedTile[0].length).fill(0)
    enlargedTile.push(lastRow)
    enlargedTile.unshift(firstRow)
    return enlargedTile
}

// XXXX make it square
// remove borders of zeros around a tile
// `eqTile` return false for tiles with same content but shifted so
// use stripTile before comparaison
export function stripTile(tile: Tile): Tile {
    const t = copyTile(tile)
    let firstColumn = t.length
    let lastColumn = 0
    spliceEmptyRows()
    skipNonEmptyRows()
    spliceEmptyRows()
    calculateFirstLastEmptyColumn()
    spliceEmptyColumns()
    return t

    function spliceEmptyColumns() {
        for (let i = 0; i < t.length; i++) {
            t[i].splice(0, firstColumn)
            t[i].splice(lastColumn - firstColumn + 1)
        }
    }

    function calculateFirstLastEmptyColumn() {
        for (let rowI = 0; rowI < t.length; rowI++) {
            const first = _.findIndex(t[rowI], square => square !== 0)
            const last = _.findLastIndex(t[rowI], square => square !== 0)
            firstColumn = Math.min(firstColumn, first)
            lastColumn = Math.max(lastColumn, last)
        }
    }


    function skipNonEmptyRows() {
        for (let j = 0; j < t.length; j++) {
            if (!t[j].every(square => square === 0)) {
                // firstColumn = j
                break
            }
        }
    }
    function spliceEmptyRows() {
        for (let j = 0; j < t.length; j++) {
            if (t[j].every(square => square === 0)) {
                t.splice(j, 1)
                j--
            }
        }
    }
}


export function flipTile(o: Tile, normalize = true): Tile {
    let n: Tile = newTile(o)
    const sz = o[0].length
    for (let i = 0; i < sz; i++) {
        for (let j = 0; j < sz; j++) {
            n[i][j] = o[sz - 1 - i][j];
        }
    }
    if (normalize) {
        n = normalizeTile(n)
    }
    return n;
}

export function rotnmino(o: Tile, normalize = true): Tile {
    let n: Tile = newTile(o)
    const sz = o[0].length
    for (let i = 0; i < sz; i++) {
        for (let j = 0; j < sz; j++) {
            n[i][j] = o[sz - 1 - j][i];
        }
    }
    if (normalize) {
        n = normalizeTile(n)
    }

    return n
}

export function tileToString(o: Tile, opts?: { tileNm?: string, onelineMode?: boolean }): string {
    if (opts && !opts.tileNm) opts.tileNm = 'X'
    let s = ''
    o.forEach(row => {
        row.forEach(col => {
            s += col === 0 ? ' ' : opts && opts.tileNm
        })
        s = s.trimEnd()
        s += opts && opts.onelineMode ? '\\n' : '\n'
    })
    return s
}

//#endregion
//#region solver

// A good algorithm would result 
// 1. in a shallow tree too search 
// 2. prioritize the exploration of branches that have a 
// higher probability of leading to solutions.

// To get 1. and 2. the algorithm should lay the most difficult tiles first.
// The most difficult tiles verifies the following criteria listed by decreasinf order of importance:
// the most concave ones, 
// the longest ones the ones, and the ones that have the least number of orients
// u x w r t z s y  i l p

// To get 1. The naive algorithm tries to fill the board in top-down, left-right order.
// So the board height should be less than equal than the width.
// diagram needed

// The smarter algorithm does the following. It calculates how many orients can be laid in each position
// and tries to lay the most constrained position first.
// So each step of the recursion is way more costly, but the number of steps is much less because 
// the tree explored is shallow so we
// fail early
// We assume that all tiles or none are named
// We assume 26 tiles max
// we calculate a printed board from the laid tiles and from that a string

// export function solutionToStringIdxs(pboard: PBoard): string {
//     // instead of printing a board it will list, the array of Idx of a tentative
//     return ''
// }

// now modal. if many instances of a piece, it will print a character, starting at 'A' incremented at each
// piece laid out. Otherwhise it will use the indices of the laid out piece as index
// to the hexa string.
export function solutionToString(pboard: PBoard): string {
    // let printedBoard: string[][] = [];
    const manyInstances = _.some(pboard.tilesLeft, tl => tl != 1)
    const rows = pboard.board.length
    const cols = pboard.board[0].length
    let charCode = 65 // A
    let s = ''
    const hexa = '0123456789ABCDEF'
    const printedBoard = Array(rows).fill(0).map(() => Array(cols).fill(' '))
    pboard.laidTiles.forEach(laidTile => {
        const tile = pboard.tilesInfo[laidTile.idx.tileI]
        // const name = tile.name
        const orient = tile.orients[laidTile.idx.orientI]
        const pos = laidTile.pos
        orient.matrix.map((row, y) => {
            row.map((val, x) => {
                if (val !== 0) {
                    const c: string = manyInstances ? String.fromCharCode(charCode) : hexa[laidTile.idx.tileI]
                    printedBoard[pos.y + y][pos.x + x - orient.firstX] = c
                }
            })
        })
        charCode++
    })
    printedBoard.map(
        row => s += row.join('') + '\n'
    )
    return s //+ '\n'

}

function solve(pboard: PBoard): PBoard[] {
    const solutions: PBoard[] = []
    const board = pboard.board
    let pos = { x: 0, y: 0 }
    if (board[pos.y][pos.x] !== 0) {
        pos = nextFreeSquare(board) as Pos
    }

    recSolve(pboard, pos, solutions, 0)
    return solutions
}

function recSolve(pboard: PBoard, pos: Pos, solutions: PBoard[], recLevel: Int): void {
    const board = pboard.board
    let idx: OrientIdx | null = { tileI: 0, orientI: 0 }
    while (idx !== null) {
        const tileinfo = pboard.tilesInfo[idx.tileI]
        const orient = tileinfo.orients[idx.orientI]
        if (pboard.tilesLeft[idx.tileI] && isTilePlaceable(board, orient, pos)) {
            const nextPos = placeTile(pboard, pos, idx)
            if (nextPos === null) {
                solutions.push(_.cloneDeep(pboard))

            } else {
                recSolve(pboard, nextPos, solutions, recLevel + 1)
            }
            pos = rmTile(pboard, pos, idx)
        }
        idx = nextOrient(pboard, idx)
    }
}


// next orientation or first orientatio of next tile
function nextOrient(pboard: PBoard, idx: OrientIdx): OrientIdx | null {
    const tilesInfo = pboard.tilesInfo
    let tileI = idx.tileI
    let orientI = idx.orientI
    if (++orientI < tilesInfo[idx.tileI].orients.length) {
        return { tileI, orientI }
    }
    if (++tileI < tilesInfo.length && pboard.tilesLeft[tileI] > 0) {
        return { tileI, orientI: 0 }
    }
    return null
}


function matrixMap<X>(matrix: Int[][], func: (valSquare: Int, x: Int, y: Int) => X) {
    return matrix.map((row, y) => row.map((valSquare, x) => func(valSquare, x, y)))
}


type Predicate<T> = (value: T) => boolean;

export function walkMatrixPred<T>(matrix: T[][], predicate: Predicate<T>): Pos | null {
    // Find the first matching row
    const row = _.find(matrix, row => _.some(row, predicate));
    if (row) {
        // Find the index of the first matching row
        const rowIndex = _.findIndex(matrix, r => r === row);
        // Find the index of the first matching element in the row
        const colIndex = _.findIndex(row, predicate);
        return { y: rowIndex, x: colIndex };
    }
    return null;
}

function nextFreeSquare(board: Int[][]): Pos | null {
    return walkMatrixPred(board, val => val === 0)
}



function matrixBool(matrix: Int[][], func: (valSquare: Int, x: Int, y: Int) => boolean) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
            if (!func(matrix[y][x], x, y)) return false
        }
    }
    return true
}

function isTilePlaceable(board: Int[][], orient: Orient, pos: Pos): boolean {
    const boardWidth = board[0].length
    const boardHeight = board.length
    const tile = orient.matrix
    const firstX = orient.firstX
    return matrixBool(tile, (_, x, y) => {
        if (tile[y][x] !== 0) {
            const boardX = pos.x + x - firstX
            const boardY = pos.y + y
            if (boardX >= boardWidth || boardY >= boardHeight) {
                return false
            }
            if (board[boardY][boardX] !== 0) {
                return false
            }

        }
        return true
    })
}

function placeTile(pboard: PBoard, pos: Pos, idx: OrientIdx) {
    const orient: Orient = pboard.tilesInfo[idx.tileI].orients[idx.orientI]
    matrixMap(orient.matrix, (col, x, y) => {
        if (col !== 0) { pboard.board[y + pos.y][x + pos.x - orient.firstX] = 1 }
    })
    pboard.laidTiles.push({ pos, idx })
    pboard.tilesLeft[idx.tileI]--
    return nextFreeSquare(pboard.board)
}

function rmTile(pboard: PBoard, pos: Pos, idx: OrientIdx): Pos {
    const orient: Orient = pboard.tilesInfo[idx.tileI].orients[idx.orientI]
    matrixMap(orient.matrix, (_, x, y) => {
        if (orient.matrix[y][x] !== 0) {
            pboard.board[y + pos.y][x + pos.x - orient.firstX] = 0
        }
    })
    pboard.laidTiles.pop()
    pboard.tilesLeft[idx.tileI]++
    return nextFreeSquare(pboard.board) as Pos
}

// function placeFTile(board: Board, ftile: FTile, pos: Pos, tileI: Int) {
//     board[pos.y][pos.x] = tileI
//     ftile.forEach((tpos) => {
//         board[tpos.y + pos.y][tpos.x + pos.x] = tileI
//     })
// }

//#endregion

// generate polyonimos up to 8 generations

export function calcPolyominos(lastGenNr: Int): TileInfo[][] {
    const monoOrient: Orient = { matrix: [[1]], firstX: 0 }
    let gen: TileInfo[] = [{ orients: [monoOrient] }]
    const polyominos = [gen]
    _.range(1, lastGenNr).forEach(() => {
        gen = calcGenPolyominos(gen)
        polyominos.push(gen)

    })
    return polyominos
}

export function solveRectangleToString(height: Int, width: Int, tiles: TileAsString[] | TileAsString | TileInfo[]): string {
    return solveRectangle(width, height, tiles).map((pb) => solutionToString(pb)).join('\n')
}
export function solveRectangle(width: Int, height: Int, tiles: TileAsString[] | TileAsString | TileInfo[]): PBoard[] {

    return solve(setPBoard(width, height, tiles))
}

// update PBoard in place
export function mkTiles(pb: PBoard, tas: TileAsString[]): PBoard {
    tas.map((ti, i) => {
        const tas = typeof ti == 'string' ? { s: ti, nr: 1 } : ti
        const tinr: TileInstance = stringToTileInstance(tas.s, tas.nr)
        pb.tilesInfo[i] = calcTileInfo(tinr.tile)
        pb.tilesLeft[i] = tinr.nr
    })
    return pb
}

// We copytilesInfo because we may modify it
export function setPBoard(width: Int, height: Int, ti: TileAsString[] | TileAsString | TileInfo[]): PBoard {
    const board: Int[][] = new Array(height).fill(0).map(() => new Array(width).fill(0))
    let tilesLeft: Int[] = []
    if (!Array.isArray(ti)) {
        ti = [ti]
    }
    let tilesInfo
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (typeof ti[0] === 'object' && ti[0]?.orients) { // TileInfo[]
        tilesInfo = _.cloneDeep(ti) as TileInfo[]
        tilesLeft = Array(tilesInfo.length).fill(1)

    } else { // TileAsString[]
        const tiles: TileInstance[] = (ti as TileAsString[]
        ).map((t) => {
            const snr: TileAsString = typeof t == 'string' ? { s: t, nr: 1 } : t
            return stringToTileInstance(snr.s, snr.nr)
        })
        tilesInfo = tiles.map(
            tinr => {
                const tile = tinr.tile
                tilesLeft.push(tinr.nr)
                return calcTileInfo(tile)
            })
    }


    // let tilesInfo = _.cloneDeep(tilesInfo)
    return { board, laidTiles: [], tilesInfo, tilesLeft } as PBoard
}

export type Coords = { x: Int, y: Int, direction?: Direction }


enum Direction { Right, Down, Left, Up }
// type Movement = { x: Int, y: Int, direction: Direction }

export function perimeterPolylinePoints(tile: Tile, squareSize: Int, pos?: Pos|Pos[]): string {
    const perimeter = calcPerimeter(tile, pos);
    const points = perimeter.map(  (coord) => `${coord.x*squareSize},${coord.y*squareSize}` )
    return points.join(' ')
}


// callulate the perimeter of connex component
// if `firstSquare` is given, it is supposed a square Pos of a connex component
// or the connex component Pos[]
// if not, we walk the board to find an occuptied square 
// does not handle tiles with holes
export function calcPerimeter(tile: Tile, firstSquare?: Pos| Pos[]): Pos[] {
    const tileSize = tile.length

    let pos: Coords = { x: 0, y: 0 }
    let plPos: Coords = { x: 0, y: 0 }
    let direction: Direction = Direction.Right;
    let firstSquarePos: Coords | null = 
        firstSquare ? Array.isArray(firstSquare) ? firstSquare[0] : firstSquare : null
    let firstSquareDirection = Direction.Right
    const svgPolyline: Coords[] = []
    let beginning = true

    function isOccupied(_pos = pos) {
        return _pos.y < tileSize && _pos.x < tileSize && _pos.y >= 0
            && _pos.x >= 0 && tile[_pos.y][_pos.x] != 0
    }
    function backToBeginning() {
        if (beginning) {
            beginning = false
            return false
        }
        return firstSquarePos.y == pos.y && firstSquarePos.x == pos.x && firstSquareDirection == direction
    }
    // function rightOfSquarePos() { return forwardSquarePos(rightDirection()) }
    // function rightOfSquareOccupied() { return isOccupied(forwardSquarePos(direction + 1)) }
    // function LeftOfSquarePos() { return forwardSquarePos(leftDirection()) }
    function LeftOfSquareOccupied() { return isOccupied(forwardSquarePos(direction + 3)) }
    function forwardSquareOccupied() { return isOccupied(forwardSquarePos()) }
    function goForward() { pos = forwardSquarePos() }
    function goLeft() { direction = (direction - 1 + 4) % 4; goForward() }
    // forward, right and left are relative to the current direction
    function forwardSquarePos(_direction = direction) {
        return { x: pos.x + walk[(_direction + 4) % 4].x, y: pos.y + walk[(_direction + 4) % 4].y }
    }
    function rightDirection() { return (direction + 1) % 4 }
    // function leftDirection() { return (direction + 3) % 4 }


    function pushCoords(init = false) {
        if (init) {
            plPos = { x: pos.x, y: pos.y, direction: direction }

        } else {
            plPos = { x: plPos.x + walk[(direction) % 4].x, y: plPos.y + walk[(direction) % 4].y, direction: direction }
        }
        svgPolyline.push(plPos);
    }
    if (!firstSquare) {
        loop:
        for (let y = 0; y < tileSize; y++) {
            for (let x = 0; x < tileSize; x++) {
                if (tile[y][x] != 0) {
                    pos = { x, y }
                    break loop
                }
            }
        }
        firstSquarePos = { x: pos.x, y: pos.y }
    } else {
        pos = firstSquarePos
    }
    firstSquareDirection = Direction.Right
    pushCoords(true)  // init

    let i = 0
    // eslint-disable-next-line no-constant-condition     
    while (true) {
        i++
        if (i > 1000) {
            alert('infinite loop')
            return svgPolyline;
        }
        if (LeftOfSquareOccupied()) {
            goLeft()
            continue
        }
        while (!forwardSquareOccupied()) {
            pushCoords()
            direction = rightDirection()
            if (backToBeginning()) {
                return svgPolyline;
            }
        }
        pushCoords()
        goForward()
    }
    alert('should not be here')
    return svgPolyline;
}


