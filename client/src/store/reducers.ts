import { RootState } from './types';
import { combineReducers } from 'redux';
import { gameInfoReducer } from './game-info/reducer';
import boardReducer from './board/reducers';
import { appReducer } from './app/reducers';

export const rootReducer = combineReducers<RootState>({
    appState: appReducer,
    boardState: boardReducer,
    gameInfoState: gameInfoReducer,
});
