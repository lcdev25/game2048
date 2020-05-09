export const MOVE_LEFT = 'MOVE_LEFT';
export const MOVE_RIGHT = 'MOVE_RIGHT';
export const MOVE_TOP = 'MOVE_TOP';
export const MOVE_BOTTOM = 'MOVE_BOTTOM';
export const INITIALISE = 'INITIALISE';

interface MoveLeftAction {
    type: typeof MOVE_LEFT;
}

interface MoveRightAction {
    type: typeof MOVE_RIGHT;
}

interface MoveTopAction {
    type: typeof MOVE_TOP;
}

interface MoveBottomAction {
    type: typeof MOVE_BOTTOM;
}

interface Initialise {
    type: typeof INITIALISE;
}

export type BoardActionTypes =
    | MoveLeftAction
    | MoveRightAction
    | MoveTopAction
    | MoveBottomAction
    | Initialise;

export class Cell {
    value: number | null;

    constructor(value: number | null) {
        this.value = value;
    }
}

export interface BoardState {
    cells: Cell[][];
    gameOver: boolean;
    gameWon: boolean;
    boardSize: 4;
    score: number;
}
