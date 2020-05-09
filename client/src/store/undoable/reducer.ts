import { REDO, RESET, UNDO, UndoableActionTypes, UndoableState } from './types';

const undoableReducer = function <S, A>(
    reducer: (s: S | undefined, a: A | any) => S
) {
    const initialState: UndoableState<S> = {
        past: [],
        present: reducer(undefined, {}),
        future: [],
    };

    return function (
        state: UndoableState<S> = initialState,
        action: A & UndoableActionTypes
    ): UndoableState<S> {
        const { past, present, future } = state;
        switch (action.type) {
            case UNDO:
                if (!past?.length) {
                    return state;
                }
                const previous = past[past.length - 1];
                const newPast = past.slice(0, past.length - 1);
                return {
                    past: newPast,
                    present: previous,
                    future: [present, ...future],
                };
            case REDO:
                if (!future.length) {
                    return state;
                }
                const next = future[0];
                const newFuture = future.slice(1);
                return {
                    past: [...past, present],
                    present: next,
                    future: newFuture,
                };
            case RESET:
                return {
                    ...initialState,
                };
            default:
                const newPresent = reducer(present, action);
                if (newPresent === present) {
                    return state;
                }
                return {
                    past: [...past, present],
                    present: newPresent,
                    future: [],
                };
        }
    };
};

export default undoableReducer;
