export const START_GAME_DONE = 'START_GAME_DONE';
export const NEW_GAME_DONE = 'NEW_GAME_DONE';
export const UNDO_MOVE_DONE = 'UNDO_MOVE_DONE';
export const REDO_MOVE_DONE = 'REDO_MOVE_DONE';
export const VISIT_PROFILE_DONE = 'VISIT_PROFILE_DONE';
export const VISIT_ORIGINAL_DONE = 'VISIT_ORIGINAL_DONE';
export const VISIT_CONTRIBUTE_DONE = 'VISIT_CONTRIBUTE_DONE';

interface StartGameDone {
    type: typeof START_GAME_DONE;
    payload: {
        globalGamesPlayed: string;
        globalPlayersPlaying: string;
        gameId: string;
    };
}

interface NewGameDone {
    type: typeof NEW_GAME_DONE;
}

interface UndoMoveDone {
    type: typeof UNDO_MOVE_DONE;
}

interface RedoMoveDone {
    type: typeof REDO_MOVE_DONE;
}

interface VisitProfileDone {
    type: typeof VISIT_PROFILE_DONE;
}

interface VisitOriginalDone {
    type: typeof VISIT_ORIGINAL_DONE;
}

interface VisitContributeDone {
    type: typeof VISIT_CONTRIBUTE_DONE;
}

export type GameInfoActionTypes =
    | StartGameDone
    | NewGameDone
    | UndoMoveDone
    | RedoMoveDone
    | VisitProfileDone
    | VisitOriginalDone
    | VisitContributeDone;

export interface GameInfoState {
    globalGamesPlayed: string;
    globalPlayersPlaying: string;
    timesUndo: number;
    timesRedo: number;
    timesNewGame: number;
    hasVisitedProfile: boolean;
    hasVisitedContribute: boolean;
    hasVisitedOriginal: boolean;
    gameId: string;
}
