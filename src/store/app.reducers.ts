import { combineReducers } from 'redux';
import boardReducer from './board/reducers';
import { AppState } from './app.types';

export const appReducer = combineReducers<AppState>({
    boardState: boardReducer,
});
