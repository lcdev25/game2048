export const UNDO = 'UNDO';
export const REDO = 'REDO';
export const RESET = 'RESET';

interface UndoAction {
    type: typeof UNDO;
}

interface RedoAction {
    type: typeof REDO;
}

interface ResetAction {
    type: typeof RESET;
}

export type UndoableActionTypes = UndoAction | RedoAction | ResetAction;

export interface UndoableState<S> {
    past: S[];
    present: S;
    future: S[];
}
