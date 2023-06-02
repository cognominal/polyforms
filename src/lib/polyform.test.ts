import { describe, it, expect } from 'vitest';
import { connexParts, occupiedCell, polyominoFloodFillWalk, isWithinMatrix, calcPerimeter } from './polyform';
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
)})


describe('connexity', () => {
	it('connexity', () => {
        const matrix = [[0, 1, 1], [1, 0, 0], [0, 1, 1]]
        const expected = [
            [ { x: 1, y: 0 }, { x: 2, y: 0 } ],
            [ { x: 0, y: 1 } ],
            [ { x: 1, y: 2 }, { x: 2, y: 2 } ]
          ]
        expect(connexParts(matrix, occupiedCell, polyominoFloodFillWalk)).toStrictEqual(expected)

    })
    it('perimeter of a connex part', () => {
        const matrix = [[0, 1, 1], [1, 0, 0], [0, 1, 1]]
        const connexParts_ = connexParts(matrix, occupiedCell, polyominoFloodFillWalk)
        const perimeter = calcPerimeter(matrix, connexParts_[0])
        console.log(perimeter)
        
    });
})