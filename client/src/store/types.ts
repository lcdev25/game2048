import { GameInfoState } from './game-info/types';
import { UndoableState } from './undoable/types';
import { BoardState } from './board/types';
import { AppState } from './app/types';

export interface RootState {
    appState: AppState;
    gameInfoState: GameInfoState;
    boardState: UndoableState<BoardState>;
}
