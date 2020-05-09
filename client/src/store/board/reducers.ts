import {
    BoardActionTypes,
    BoardState,
    Cell,
    INITIALISE,
    MOVE_BOTTOM,
    MOVE_LEFT,
    MOVE_RIGHT,
    MOVE_TOP,
} from './types';
import undoableReducer from '../undoable/reducer';

const initialState: BoardState = {
    cells: [
        [new Cell(null), new Cell(null), new Cell(null), new Cell(null)],
        [new Cell(null), new Cell(null), new Cell(null), new Cell(null)],
        [new Cell(null), new Cell(null), new Cell(null), new Cell(null)],
        [new Cell(null), new Cell(null), new Cell(null), new Cell(null)],
    ],
    gameOver: false,
    gameWon: false,
    boardSize: 4,
    score: 0,
};

function boardReducer(
    state = initialState,
    action: BoardActionTypes
): BoardState {
    const cells = cloneCells(state.cells);
    switch (action.type) {
        case MOVE_LEFT:
            return moveLeft({
                ...state,
                cells: cloneCells(state.cells),
            });
        case MOVE_RIGHT:
            return moveRight({
                ...state,
                cells: cloneCells(state.cells),
            });
        case MOVE_TOP:
            return moveTop({
                ...state,
                cells: cloneCells(state.cells),
            });
        case MOVE_BOTTOM:
            return moveBottom({
                ...state,
                cells: cloneCells(state.cells),
            });
        case INITIALISE:
            insertRandom(cells);
            insertRandom(cells);
            return {
                ...state,
                cells: cells,
            };
        default:
            return state;
    }
}

const calculateResult = (state: BoardState): BoardState => {
    const cells = state.cells;
    const boardSize = cells.length;
    let anyCellFree = false;
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (cells[row][col].value === 2048) {
                state.gameOver = false;
                state.gameWon = true;
                return state;
            } else if (cells[row][col].value === null) {
                anyCellFree = true;
            }
        }
    }
    if (!anyCellFree) {
        const cellsCopy = cloneCells(cells);
        if (
            collapseLeft(cellsCopy) === 0 &&
            collapseRight(cellsCopy) === 0 &&
            collapseTop(cellsCopy) === 0 &&
            collapseBottom(cellsCopy) === 0
        ) {
            state.gameOver = true;
            state.gameWon = false;
        }
    }
    return state;
};

const moveLeft = (state: BoardState) => {
    const cells: Cell[][] = state.cells;
    shiftLeft(cells);
    state.score = state.score + collapseLeft(cells);
    shiftLeft(cells);
    calculateResult(state);
    if (!state.gameOver) {
        insertRandom(cells);
        calculateResult(state);
    }
    return state;
};

const moveRight = (state: BoardState) => {
    const cells: Cell[][] = state.cells;
    shiftRight(cells);
    state.score = state.score + collapseRight(cells);
    shiftRight(cells);
    calculateResult(state);
    if (!state.gameOver) {
        insertRandom(cells);
        calculateResult(state);
    }
    return state;
};

const moveTop = (state: BoardState) => {
    const cells: Cell[][] = state.cells;
    shiftTop(cells);
    state.score = state.score + collapseTop(cells);
    shiftTop(cells);
    calculateResult(state);
    if (!state.gameOver) {
        insertRandom(cells);
        calculateResult(state);
    }
    return state;
};

const moveBottom = (state: BoardState) => {
    const cells: Cell[][] = state.cells;
    shiftBottom(cells);
    state.score = state.score + collapseBottom(cells);
    shiftBottom(cells);
    calculateResult(state);
    if (!state.gameOver) {
        insertRandom(cells);
        calculateResult(state);
    }
    return state;
};

const insertRandom = (cells: Cell[][]) => {
    const boardSize = cells.length;
    const emptyCells: Cell[] = [];
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (cells[row][col].value === null) {
                emptyCells.push(cells[row][col]);
            }
        }
    }
    if (emptyCells.length) {
        const index = Math.floor(Math.random() * Math.floor(emptyCells.length));
        const randomOptions = [2, 4];
        emptyCells[index].value =
            randomOptions[Math.floor(Math.random() * Math.floor(2))];
    }
    return cells;
};

const shiftLeft = (cells: Cell[][]) => {
    const boardSize = cells.length;
    for (let row = 0; row < boardSize; row++) {
        const rowData = cells[row];
        for (let col = 0; col < boardSize; col++) {
            if (rowData[col].value !== null) {
                for (let col1 = col - 1; col1 >= 0; col1--) {
                    if (rowData[col1].value !== null) break;
                    rowData[col1].value = rowData[col1 + 1].value;
                    rowData[col1 + 1].value = null;
                }
            }
        }
    }
    return cells;
};

const collapseLeft = (cells: Cell[][]) => {
    const boardSize = cells.length;
    let moveScore = 0;
    for (let row = 0; row < boardSize; row++) {
        const rowData = cells[row];
        for (let col = 0; col < boardSize - 1; col++) {
            if (
                rowData[col].value !== null &&
                rowData[col].value === rowData[col + 1].value
            ) {
                // @ts-ignore
                rowData[col].value = rowData[col].value * 2;
                // @ts-ignore
                moveScore += rowData[col].value;
                rowData[col + 1].value = null;
                col++;
            }
        }
    }
    return moveScore;
};

const shiftRight = (cells: Cell[][]) => {
    const boardSize = cells.length;
    for (let row = 0; row < boardSize; row++) {
        const rowData = cells[row];
        for (let col = boardSize - 1; col >= 0; col--) {
            if (rowData[col].value !== null) {
                for (let col1 = col + 1; col1 < boardSize; col1++) {
                    if (rowData[col1].value !== null) break;
                    rowData[col1].value = rowData[col1 - 1].value;
                    rowData[col1 - 1].value = null;
                }
            }
        }
    }
    return cells;
};

const collapseRight = (cells: Cell[][]) => {
    const boardSize = cells.length;
    let moveScore = 0;
    for (let row = 0; row < boardSize; row++) {
        const rowData = cells[row];
        for (let col = boardSize - 1; col > 0; col--) {
            if (
                rowData[col].value !== null &&
                rowData[col].value === rowData[col - 1].value
            ) {
                // @ts-ignore
                rowData[col].value = rowData[col].value * 2;
                // @ts-ignore
                moveScore += rowData[col].value;
                rowData[col - 1].value = null;
                col--;
            }
        }
    }
    return moveScore;
};

const shiftTop = (cells: Cell[][]) => {
    const boardSize = cells.length;
    for (let col = 0; col < boardSize; col++) {
        for (let row = 0; row < boardSize; row++) {
            if (cells[row][col].value !== null) {
                for (let row1 = row - 1; row1 >= 0; row1--) {
                    if (cells[row1][col].value !== null) break;
                    cells[row1][col].value = cells[row1 + 1][col].value;
                    cells[row1 + 1][col].value = null;
                }
            }
        }
    }
    return cells;
};

const collapseTop = (cells: Cell[][]) => {
    const boardSize = cells.length;
    let moveScore = 0;
    for (let col = 0; col < boardSize; col++) {
        for (let row = 0; row < boardSize - 1; row++) {
            if (
                cells[row][col].value !== null &&
                cells[row][col].value === cells[row + 1][col].value
            ) {
                // @ts-ignore
                cells[row][col].value = cells[row][col].value * 2;
                // @ts-ignore
                moveScore += cells[row][col].value;
                cells[row + 1][col].value = null;
                row++;
            }
        }
    }
    return moveScore;
};

const shiftBottom = (cells: Cell[][]) => {
    const boardSize = cells.length;
    for (let col = 0; col < boardSize; col++) {
        for (let row = boardSize - 1; row >= 0; row--) {
            if (cells[row][col].value !== null) {
                for (let row1 = row + 1; row1 < boardSize; row1++) {
                    if (cells[row1][col].value !== null) break;
                    cells[row1][col].value = cells[row1 - 1][col].value;
                    cells[row1 - 1][col].value = null;
                }
            }
        }
    }
};

const collapseBottom = (cells: Cell[][]) => {
    const boardSize = cells.length;
    let moveScore = 0;
    for (let col = 0; col < boardSize; col++) {
        for (let row = boardSize - 1; row > 0; row--) {
            if (
                cells[row][col].value !== null &&
                cells[row][col].value === cells[row - 1][col].value
            ) {
                // @ts-ignore
                cells[row][col].value = cells[row][col].value * 2;
                // @ts-ignore
                moveScore += cells[row][col].value;
                cells[row - 1][col].value = null;
                row--;
            }
        }
    }
    return moveScore;
};

const cloneCells = (cells: Cell[][]) => {
    const boardSize = cells.length;
    const newBoard: Cell[][] = [];
    for (let row = 0; row < boardSize; row++) {
        const newRow: Cell[] = [];
        for (let col = 0; col < boardSize; col++) {
            newRow.push(new Cell(cells[row][col].value));
        }
        newBoard.push(newRow);
    }
    return newBoard;
};

export default undoableReducer<BoardState, BoardActionTypes>(boardReducer);
