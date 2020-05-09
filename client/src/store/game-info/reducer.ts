import {
    GameInfoActionTypes,
    GameInfoState,
    NEW_GAME_DONE,
    REDO_MOVE_DONE,
    START_GAME_DONE,
    UNDO_MOVE_DONE,
    VISIT_CONTRIBUTE_DONE,
    VISIT_ORIGINAL_DONE,
    VISIT_PROFILE_DONE,
} from './types';

const initialState: GameInfoState = {
    globalGamesPlayed: '',
    globalPlayersPlaying: '',
    hasVisitedContribute: false,
    hasVisitedOriginal: false,
    hasVisitedProfile: false,
    timesNewGame: 0,
    timesRedo: 0,
    timesUndo: 0,
    gameId: '',
    isContinuedGame: false,
};

export const gameInfoReducer = (
    state = initialState,
    action: GameInfoActionTypes
): GameInfoState => {
    switch (action.type) {
        case NEW_GAME_DONE:
            return {
                ...state,
                timesNewGame: state.timesNewGame + 1,
            };
        case REDO_MOVE_DONE:
            return {
                ...state,
                timesRedo: state.timesRedo + 1,
            };
        case START_GAME_DONE:
            return {
                ...state,
                globalGamesPlayed: action.payload.globalGamesPlayed || '',
                globalPlayersPlaying: action.payload.globalPlayersPlaying || '',
                gameId: action.payload.gameId,
                isContinuedGame: action.payload.isContinuedGame,
            };
        case UNDO_MOVE_DONE:
            return {
                ...state,
                timesUndo: state.timesUndo + 1,
            };
        case VISIT_CONTRIBUTE_DONE:
            return {
                ...state,
                hasVisitedContribute: true,
            };
        case VISIT_ORIGINAL_DONE:
            return {
                ...state,
                hasVisitedOriginal: true,
            };
        case VISIT_PROFILE_DONE:
            return {
                ...state,
                hasVisitedProfile: true,
            };
        default:
            return state;
    }
};
