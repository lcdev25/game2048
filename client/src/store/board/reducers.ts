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
import undoableReducer from '../undoable/undoable.reducer';

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
        collapseLeft(cellsCopy);
        if (areCellsIdentical(cells, cellsCopy)) {
            collapseRight(cellsCopy);
            if (areCellsIdentical(cells, cellsCopy)) {
                collapseTop(cellsCopy);
                if (areCellsIdentical(cells, cellsCopy)) {
                    collapseBottom(cellsCopy);
                    if (areCellsIdentical(cells, cellsCopy)) {
                        state.gameOver = true;
                        state.gameWon = false;
                    }
                }
            }
        }
    }
    return state;
};

const moveLeft = (state: BoardState) => {
    const cells: Cell[][] = state.cells;
    shiftLeft(cells);
    collapseLeft(cells);
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
    collapseRight(cells);
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
    collapseTop(cells);
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
    collapseBottom(cells);
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
    for (let row = 0; row < boardSize; row++) {
        const rowData = cells[row];
        for (let col = 0; col < boardSize - 1; col++) {
            if (
                rowData[col].value !== null &&
                rowData[col].value === rowData[col + 1].value
            ) {
                // @ts-ignore
                rowData[col].value = rowData[col].value * 2;
                rowData[col + 1].value = null;
                col++;
            }
        }
    }
    return cells;
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
    for (let row = 0; row < boardSize; row++) {
        const rowData = cells[row];
        for (let col = boardSize - 1; col > 0; col--) {
            if (
                rowData[col].value !== null &&
                rowData[col].value === rowData[col - 1].value
            ) {
                // @ts-ignore
                rowData[col].value = rowData[col].value * 2;
                rowData[col - 1].value = null;
                col--;
            }
        }
    }
    return cells;
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
    for (let col = 0; col < boardSize; col++) {
        for (let row = 0; row < boardSize - 1; row++) {
            if (
                cells[row][col].value !== null &&
                cells[row][col].value === cells[row + 1][col].value
            ) {
                // @ts-ignore
                cells[row][col].value = cells[row][col].value * 2;
                cells[row + 1][col].value = null;
                row++;
            }
        }
    }
    return cells;
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
    return cells;
};

const collapseBottom = (cells: Cell[][]) => {
    const boardSize = cells.length;
    for (let col = 0; col < boardSize; col++) {
        for (let row = boardSize - 1; row > 0; row--) {
            if (
                cells[row][col].value !== null &&
                cells[row][col].value === cells[row - 1][col].value
            ) {
                // @ts-ignore
                cells[row][col].value = cells[row][col].value * 2;
                cells[row - 1][col].value = null;
                row--;
            }
        }
    }
    return cells;
};

const cloneCells = (cells: Cell[][]) => {
    const boardSize = cells.length;
    const newBoard = [];
    for (let row = 0; row < boardSize; row++) {
        const newRow = [];
        for (let col = 0; col < boardSize; col++) {
            newRow.push(new Cell(cells[row][col].value));
        }
        newBoard.push(newRow);
    }
    return newBoard;
};

const areCellsIdentical = (cells1: Cell[][], cells2: Cell[][]) => {
    if (cells1.length !== cells2.length) return false;
    const boardSize = cells1.length;
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (cells1[row][col].value !== cells2[row][col].value) {
                return false;
            }
        }
    }
    return true;
};

export default undoableReducer<BoardState, BoardActionTypes>(boardReducer);
