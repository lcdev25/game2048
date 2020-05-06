import { REDO, RESET, UNDO, UndoableActionTypes } from './undoable.types';

export function undo(): UndoableActionTypes {
    return {
        type: UNDO,
    };
}

export function redo(): UndoableActionTypes {
    return {
        type: REDO,
    };
}

export function reset(): UndoableActionTypes {
    return {
        type: RESET,
    };
}
