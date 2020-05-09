import {
    APP_LOADED,
    VISIT_CONTRIBUTE,
    VISIT_ORIGINAL,
    VISIT_PROFILE,
} from '../app/types';
import axios from 'axios';
import { REDO, RESET, UNDO } from '../undoable/types';
import {
    NEW_GAME_DONE,
    REDO_MOVE_DONE,
    START_GAME_DONE,
    UNDO_MOVE_DONE,
    VISIT_CONTRIBUTE_DONE,
    VISIT_ORIGINAL_DONE,
    VISIT_PROFILE_DONE,
} from './types';
import { RootState } from '../types';
import {
    deleteItemFromLocalStorage,
    getItemFromLocalStorage,
} from '../../utils/local-storage';

axios.defaults.headers.common['Content-Type'] = 'application/json';

const gameInfoMiddleware = (store) => {
    return (next) => async (action) => {
        next(action);
        let dispatch = store.dispatch;
        let getState: RootState = store.getState();
        const { type } = action;

        switch (type) {
            case APP_LOADED:
                await startGame(dispatch, getState);
                break;
            case RESET:
                await newGame(dispatch, getState);
                break;
            case UNDO:
                await undoMove(dispatch, getState);
                break;
            case REDO:
                await redoMove(dispatch, getState);
                break;
            case VISIT_PROFILE:
                await visitProfile(dispatch, getState);
                break;
            case VISIT_CONTRIBUTE:
                await visitContribute(dispatch, getState);
                break;
            case VISIT_ORIGINAL:
                await visitOriginal(dispatch, getState);
                break;
        }
    };
};

const startGame = async (dispatch, getState: RootState) => {
    let globalGamesPlayed, globalPlayersPlaying;
    let gameId = getState?.gameInfoState?.gameId;
    let isContinuedGame = false;
    if (gameId) {
        const res = await axios.get('/api/game-info/global-stats');
        globalGamesPlayed = res?.data?.globalGamesPlayed;
        globalPlayersPlaying = res?.data?.globalPlayersPlaying;
        isContinuedGame = true;
    } else {
        try {
            gameId = getItemFromLocalStorage('gameId') || ''; //This is for backward compatibility with older version of the app
            if (gameId) {
                deleteItemFromLocalStorage('gameId');
            }
            const res = await axios.post('/api/game-info', {
                data: { gameId: gameId },
            });
            globalGamesPlayed = res?.data?.globalGamesPlayed;
            globalPlayersPlaying = res?.data?.globalPlayersPlaying;
            gameId = res?.data?.gameId;
        } catch (e) {
            console.error(
                `Error while updating START_GAME event to server. ${JSON.stringify(
                    e
                )}`
            );
        }
    }
    dispatch({
        type: START_GAME_DONE,
        payload: {
            globalGamesPlayed: globalGamesPlayed,
            globalPlayersPlaying: globalPlayersPlaying,
            gameId: gameId,
            isContinuedGame: isContinuedGame,
        },
    });
};

const newGame = async (dispatch, getState: RootState) => {
    const {
        gameInfoState: { timesNewGame },
    } = getState;
    await updateGameInfo(dispatch, getState, NEW_GAME_DONE, {
        timesNewGame: timesNewGame + 1,
    });
};

const undoMove = async (dispatch, getState: RootState) => {
    const {
        gameInfoState: { timesUndo },
    } = getState;
    await updateGameInfo(dispatch, getState, UNDO_MOVE_DONE, {
        timesUndo: timesUndo + 1,
    });
};

const redoMove = async (dispatch, getState: RootState) => {
    const {
        gameInfoState: { timesRedo },
    } = getState;
    await updateGameInfo(dispatch, getState, REDO_MOVE_DONE, {
        timesRedo: timesRedo + 1,
    });
};

const visitProfile = async (dispatch, getState: RootState) => {
    await updateGameInfo(dispatch, getState, VISIT_PROFILE_DONE, {
        hasVisitedProfile: true,
    });
};

const visitOriginal = async (dispatch, getState: RootState) => {
    await updateGameInfo(dispatch, getState, VISIT_ORIGINAL_DONE, {
        hasVisitedOriginal: true,
    });
};

const visitContribute = async (dispatch, getState: RootState) => {
    await updateGameInfo(dispatch, getState, VISIT_CONTRIBUTE_DONE, {
        hasVisitedContribute: true,
    });
};

const updateGameInfo = async (dispatch, getState, actionType, data) => {
    dispatch({
        type: actionType,
    });
    const {
        gameInfoState: { gameId },
    } = getState;
    if (!gameId) return;
    try {
        await axios.put(`/api/game-info/${gameId}`, { data: data });
    } catch (e) {
        console.error(
            `Error while updating ${actionType} event to server. ${JSON.stringify(
                e
            )}`
        );
    }
};

export default gameInfoMiddleware;
