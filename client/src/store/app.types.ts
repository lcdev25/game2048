import { BoardState } from './board/types';
import { UndoableState } from './undoable/undoable.types';

export interface AppState {
    boardState: UndoableState<BoardState>;
}
